'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { validateBTCAddress, validateETHAddress } from '@/lib/addressUtils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowLeft, Wallet, AlertTriangle, Shield } from 'lucide-react'

export default function WithdrawPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [currency, setCurrency] = useState<'BTC' | 'ETH'>('BTC')
  const [isValidAddress, setIsValidAddress] = useState(false)
  const router = useRouter()

  const checkUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  useEffect(() => {
    if (address) {
      if (currency === 'BTC') {
        setIsValidAddress(validateBTCAddress(address))
      } else {
        setIsValidAddress(validateETHAddress(address))
      }
    } else {
      setIsValidAddress(false)
    }
  }, [address, currency])

  const handleWithdrawRequest = async () => {
    if (!user || !amount || !address || !isValidAddress) return

    try {
      await supabase
        .from('withdrawals')
        .insert({
          user_id: user.id,
          currency,
          amount: parseFloat(amount),
          status: 'pending'
        })

      // Reset form
      setAmount('')
      setAddress('')
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch {
      console.error('Error requesting withdrawal')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stake-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-darker via-stake-dark to-stake-gray p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Withdraw Crypto</h1>
            <p className="text-gray-400">
              Send your cryptocurrency to an external wallet
            </p>
          </div>
        </motion.div>

        {/* Balance Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-yellow-600/30 bg-yellow-900/10">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div>
                  <h4 className="font-semibold text-yellow-200">Demo Mode</h4>
                  <p className="text-yellow-300/80 text-sm">
                    This is a withdrawal simulation. No actual funds will be transferred.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Withdrawal Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Withdrawal Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'BTC' | 'ETH')}
                  className="w-full mt-1 px-3 py-2 bg-stake-gray border border-stake-accent rounded-md text-white"
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="address">Destination Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder={currency === 'BTC' ? 'bc1q...' : '0x...'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1"
                />
                <div className="mt-1 flex items-center space-x-2">
                  {address && (
                    <Badge 
                      variant={isValidAddress ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {isValidAddress ? 'Valid Address' : 'Invalid Address'}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.00000001"
                  placeholder="0.00000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Available balance: 0.00000000 {currency}
                </p>
              </div>

              <Button
                onClick={handleWithdrawRequest}
                disabled={!amount || !address || !isValidAddress}
                className="w-full"
              >
                Request Withdrawal
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-stake-primary/30">
            <CardHeader>
              <CardTitle className="text-stake-primary flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-300 space-y-2">
                <p>• All withdrawal requests are manually reviewed for security</p>
                <p>• Processing time: 24-48 hours for most requests</p>
                <p>• Minimum withdrawal amounts apply</p>
                <p>• Network fees will be deducted from your withdrawal</p>
                <p>• Double-check your destination address before submitting</p>
              </div>
              <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3 mt-4">
                <p className="text-red-400 text-xs">
                  ⚠️ Withdrawals to incorrect addresses cannot be recovered. 
                  Always verify the destination address before confirming.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 