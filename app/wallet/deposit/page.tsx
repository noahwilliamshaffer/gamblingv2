'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import WalletCard from '@/components/WalletCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'

export default function DepositPage() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState<'BTC' | 'ETH'>('BTC')
  const router = useRouter()

  const checkUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setUserProfile(profile)
      }
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

  const simulateDeposit = async () => {
    if (!user || !amount) return

    try {
      await supabase
        .from('deposits')
        .insert({
          user_id: user.id,
          currency,
          amount: parseFloat(amount),
          status: 'pending'
        })

      // Reset form
      setAmount('')
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch {
      console.error('Error simulating deposit')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stake-primary"></div>
      </div>
    )
  }

  if (!user || !userProfile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-darker via-stake-dark to-stake-gray p-4">
      <div className="max-w-4xl mx-auto space-y-8">
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
            <h1 className="text-3xl font-bold text-white">Deposit Crypto</h1>
            <p className="text-gray-400">
              Send cryptocurrency to your wallet addresses
            </p>
          </div>
        </motion.div>

        {/* Wallet Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <WalletCard
            currency="BTC"
            address={userProfile.btc_address}
            balance={0}
          />
          <WalletCard
            currency="ETH"
            address={userProfile.eth_address}
            balance={0}
          />
        </motion.div>

        {/* Transaction Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="card-glow border-green-600/30">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <Plus className="w-5 h-5 mr-2" />
                Live Transaction Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Automatic Detection</h4>
                <p className="text-green-300/80 text-sm">
                  Your deposit addresses are being monitored 24/7. Any incoming transactions 
                  will be automatically detected and credited to your account after network confirmation.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h5 className="font-medium text-white">Bitcoin Network</h5>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Minimum: 0.0001 BTC</li>
                    <li>• Confirmations: 3 blocks</li>
                    <li>• Processing: ~30 minutes</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-white">Ethereum Network</h5>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Minimum: 0.001 ETH</li>
                    <li>• Confirmations: 12 blocks</li>
                    <li>• Processing: ~3 minutes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-stake-primary/30">
            <CardHeader>
              <CardTitle className="text-stake-primary">How to Deposit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-stake-primary rounded-full flex items-center justify-center text-xs font-bold text-white">1</div>
                <div>
                  <h4 className="font-semibold text-white">Copy Your Deposit Address</h4>
                  <p className="text-gray-400 text-sm">Use the copy button on your chosen wallet card above</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-stake-primary rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                <div>
                  <h4 className="font-semibold text-white">Send from Your External Wallet</h4>
                  <p className="text-gray-400 text-sm">Use your external wallet to send crypto to the address</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-stake-primary rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                <div>
                  <h4 className="font-semibold text-white">Wait for Confirmation</h4>
                  <p className="text-gray-400 text-sm">Your deposit will appear after network confirmation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 