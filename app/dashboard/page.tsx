'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { generateBTCAddress, generateETHAddress } from '@/lib/addressUtils'
import WalletCard from '@/components/WalletCard'
import DepositHistoryTable from '@/components/DepositHistoryTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { TrendingUp, Wallet, Plus, Clock } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/login')
        return
      }

      setUser(user)

      // Check if user profile exists, create if not
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code === 'PGRST116') {
        // User doesn't exist, create new profile
        const btcAddress = generateBTCAddress(user.id)
        const ethAddress = generateETHAddress(user.id)

        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            phone: user.phone,
            btc_address: btcAddress,
            eth_address: ethAddress,
          })
          .select()
          .single()

        if (createError) {
          console.error('Error creating user profile:', createError)
        } else {
          setUserProfile(newProfile)
        }
      } else if (!profileError) {
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyAddress = () => {
    // Optional: Add toast notification here
    console.log('Address copied to clipboard')
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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user.email?.split('@')[0] || 'User'}
            </h1>
            <p className="text-gray-400">
              Manage your crypto deposits and track your portfolio
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="neon-border">
              <Clock className="w-3 h-3 mr-1" />
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$0.00</div>
              <p className="text-xs text-gray-400 mt-1">
                Equivalent USD value
              </p>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Total Deposits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400 mt-1">
                Lifetime deposits
              </p>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Active Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2</div>
              <p className="text-xs text-gray-400 mt-1">
                BTC, ETH available
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wallet Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">Your Wallets</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WalletCard
              currency="BTC"
              address={userProfile.btc_address}
              balance={0}
              onCopy={handleCopyAddress}
            />
            <WalletCard
              currency="ETH"
              address={userProfile.eth_address}
              balance={0}
              onCopy={handleCopyAddress}
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={() => router.push('/wallet/deposit')}
            className="flex-1"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Make Deposit
          </Button>
          <Button
            onClick={() => router.push('/wallet/withdraw')}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Withdraw Funds
          </Button>
        </motion.div>

        {/* Deposit History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DepositHistoryTable userId={user.id} />
        </motion.div>
      </div>
    </div>
  )
} 