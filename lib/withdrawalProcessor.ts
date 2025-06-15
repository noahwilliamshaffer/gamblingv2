import { supabase } from './supabaseClient'
import { validateBTCAddress, validateETHAddress } from './addressUtils'
import * as bitcoin from 'bitcoinjs-lib'
import { ECPairFactory } from 'ecpair'
import * as ecc from 'tiny-secp256k1'
import { ethers } from 'ethers'

const ECPair = ECPairFactory(ecc)

export interface WithdrawalRequest {
  id: string
  userId: string
  currency: 'BTC' | 'ETH'
  amount: number
  destinationAddress: string
  status: 'pending' | 'approved' | 'processing' | 'completed' | 'failed' | 'rejected'
  createdAt: Date
  processedAt?: Date
  transactionHash?: string
  adminNotes?: string
}

export interface WithdrawalLimits {
  minAmount: number
  maxDailyAmount: number
  requireKYC: boolean
}

// Get withdrawal limits for currency
export function getWithdrawalLimits(currency: 'BTC' | 'ETH'): WithdrawalLimits {
  const limits = {
    BTC: {
      minAmount: parseFloat(process.env.MIN_WITHDRAWAL_BTC || '0.001'),
      maxDailyAmount: 1, // 1 BTC per day default
      requireKYC: true
    },
    ETH: {
      minAmount: parseFloat(process.env.MIN_WITHDRAWAL_ETH || '0.01'),
      maxDailyAmount: 10, // 10 ETH per day default
      requireKYC: true
    }
  }
  
  return limits[currency]
}

// Validate withdrawal request
export async function validateWithdrawalRequest(
  userId: string,
  currency: 'BTC' | 'ETH',
  amount: number,
  destinationAddress: string
): Promise<{ valid: boolean; error?: string }> {
  try {
    // Basic validation
    if (amount <= 0) {
      return { valid: false, error: 'Amount must be greater than 0' }
    }

    // Check address format
    const isValidAddress = currency === 'BTC' 
      ? validateBTCAddress(destinationAddress)
      : validateETHAddress(destinationAddress)
    
    if (!isValidAddress) {
      return { valid: false, error: `Invalid ${currency} address format` }
    }

    // Check withdrawal limits
    const limits = getWithdrawalLimits(currency)
    if (amount < limits.minAmount) {
      return { valid: false, error: `Minimum withdrawal is ${limits.minAmount} ${currency}` }
    }

    // Check daily withdrawal limit
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { data: todayWithdrawals } = await supabase
      .from('withdrawals')
      .select('amount')
      .eq('user_id', userId)
      .eq('currency', currency)
      .gte('created_at', today.toISOString())
      .in('status', ['pending', 'approved', 'processing', 'completed'])

    const totalToday = todayWithdrawals?.reduce((sum, w) => sum + w.amount, 0) || 0
    
    if (totalToday + amount > limits.maxDailyAmount) {
      return { valid: false, error: `Daily withdrawal limit exceeded (${limits.maxDailyAmount} ${currency})` }
    }

    // Check account balance
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (!userProfile) {
      return { valid: false, error: 'User profile not found' }
    }

    // In production, check real balance from blockchain
    // For now, we'll assume balance tracking in database
    const { data: deposits } = await supabase
      .from('deposits')
      .select('amount')
      .eq('user_id', userId)
      .eq('currency', currency)
      .eq('status', 'completed')

    const { data: withdrawals } = await supabase
      .from('withdrawals')
      .select('amount')
      .eq('user_id', userId)
      .eq('currency', currency)
      .eq('status', 'completed')

    const totalDeposits = deposits?.reduce((sum, d) => sum + d.amount, 0) || 0
    const totalWithdrawals = withdrawals?.reduce((sum, w) => sum + w.amount, 0) || 0
    const availableBalance = totalDeposits - totalWithdrawals

    if (amount > availableBalance) {
      return { valid: false, error: 'Insufficient balance' }
    }

    return { valid: true }
  } catch (error) {
    console.error('Error validating withdrawal:', error)
    return { valid: false, error: 'Validation failed' }
  }
}

// Create withdrawal request
export async function createWithdrawalRequest(
  userId: string,
  currency: 'BTC' | 'ETH',
  amount: number,
  destinationAddress: string
): Promise<{ success: boolean; withdrawalId?: string; error?: string }> {
  try {
    // Validate request
    const validation = await validateWithdrawalRequest(userId, currency, amount, destinationAddress)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // Create withdrawal record
    const { data: withdrawal, error } = await supabase
      .from('withdrawals')
      .insert({
        user_id: userId,
        currency,
        amount,
        destination_address: destinationAddress,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: 'Failed to create withdrawal request' }
    }

    // Send notification to admins for manual review
    await notifyAdminsOfWithdrawal(withdrawal.id)

    return { success: true, withdrawalId: withdrawal.id }
  } catch (error) {
    console.error('Error creating withdrawal:', error)
    return { success: false, error: 'Failed to create withdrawal request' }
  }
}

// Process Bitcoin withdrawal (admin function)
export async function processBTCWithdrawal(
  withdrawalId: string,
  privateKey: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    const { data: withdrawal } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('id', withdrawalId)
      .single()

    if (!withdrawal || withdrawal.status !== 'approved') {
      return { success: false, error: 'Withdrawal not found or not approved' }
    }

    // Create Bitcoin transaction
    const network = bitcoin.networks.bitcoin // Use testnet for testing
    const keyPair = ECPair.fromWIF(privateKey, network)
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network })

    // Build transaction (simplified - in production, use proper UTXO management)
    const psbt = new bitcoin.Psbt({ network })
    
    // Add inputs (UTXOs) - this would come from your wallet's UTXO set
    // psbt.addInput({...})
    
    // Add output
    psbt.addOutput({
      address: withdrawal.destination_address,
      value: Math.floor(withdrawal.amount * 100000000) // Convert to satoshis
    })

    // Add change output if needed
    // psbt.addOutput({...})

    // Sign transaction
    psbt.signAllInputs(keyPair)
    psbt.finalizeAllInputs()

    const txHex = psbt.extractTransaction().toHex()
    
    // Broadcast transaction (use BlockCypher, Bitcoin Core RPC, etc.)
    const response = await fetch('https://api.blockcypher.com/v1/btc/main/txs/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tx: txHex })
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to broadcast transaction')
    }

    // Update withdrawal status
    await supabase
      .from('withdrawals')
      .update({
        status: 'processing',
        transaction_hash: result.tx.hash,
        processed_at: new Date().toISOString()
      })
      .eq('id', withdrawalId)

    return { success: true, txHash: result.tx.hash }
  } catch (error) {
    console.error('Error processing BTC withdrawal:', error)
    
    // Update withdrawal as failed
    await supabase
      .from('withdrawals')
      .update({
        status: 'failed',
        admin_notes: error instanceof Error ? error.message : 'Processing failed'
      })
      .eq('id', withdrawalId)

    return { success: false, error: error instanceof Error ? error.message : 'Processing failed' }
  }
}

// Process Ethereum withdrawal
export async function processETHWithdrawal(
  withdrawalId: string,
  privateKey: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    const { data: withdrawal } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('id', withdrawalId)
      .single()

    if (!withdrawal || withdrawal.status !== 'approved') {
      return { success: false, error: 'Withdrawal not found or not approved' }
    }

    // Connect to Ethereum network
    const provider = new ethers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
    const wallet = new ethers.Wallet(privateKey, provider)

    // Create transaction
    const tx = await wallet.sendTransaction({
      to: withdrawal.destination_address,
      value: ethers.parseEther(withdrawal.amount.toString())
    })

    // Update withdrawal status
    await supabase
      .from('withdrawals')
      .update({
        status: 'processing',
        transaction_hash: tx.hash,
        processed_at: new Date().toISOString()
      })
      .eq('id', withdrawalId)

    return { success: true, txHash: tx.hash }
  } catch (error) {
    console.error('Error processing ETH withdrawal:', error)
    
    // Update withdrawal as failed
    await supabase
      .from('withdrawals')
      .update({
        status: 'failed',
        admin_notes: error instanceof Error ? error.message : 'Processing failed'
      })
      .eq('id', withdrawalId)

    return { success: false, error: error instanceof Error ? error.message : 'Processing failed' }
  }
}

// Get user's withdrawal history
export async function getUserWithdrawals(userId: string): Promise<WithdrawalRequest[]> {
  const { data: withdrawals } = await supabase
    .from('withdrawals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return withdrawals || []
}

// Admin function to get all pending withdrawals
export async function getPendingWithdrawals(): Promise<WithdrawalRequest[]> {
  const { data: withdrawals } = await supabase
    .from('withdrawals')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  return withdrawals || []
}

// Approve withdrawal (admin function)
export async function approveWithdrawal(
  withdrawalId: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('withdrawals')
      .update({
        status: 'approved',
        admin_notes: `Approved by admin ${adminId}`
      })
      .eq('id', withdrawalId)
      .eq('status', 'pending')

    if (error) {
      return { success: false, error: 'Failed to approve withdrawal' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to approve withdrawal' }
  }
}

// Reject withdrawal (admin function)
export async function rejectWithdrawal(
  withdrawalId: string,
  adminId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('withdrawals')
      .update({
        status: 'rejected',
        admin_notes: `Rejected by admin ${adminId}: ${reason}`
      })
      .eq('id', withdrawalId)
      .eq('status', 'pending')

    if (error) {
      return { success: false, error: 'Failed to reject withdrawal' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to reject withdrawal' }
  }
}

// Send admin notification (placeholder)
async function notifyAdminsOfWithdrawal(withdrawalId: string) {
  // In production, implement email/SMS/Slack notifications
  console.log(`New withdrawal request: ${withdrawalId}`)
} 