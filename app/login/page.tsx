'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import { motion } from 'framer-motion'
import { Mail, Smartphone, ArrowRight, Star, Shield, Gift, Users } from 'lucide-react'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [])

  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) throw error
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: Gift,
      title: '250,000 Gold Coins',
      description: 'Free welcome bonus'
    },
    {
      icon: Star,
      title: '25 Stake Cash',
      description: 'Redeemable for real prizes'
    },
    {
      icon: Shield,
      title: 'Provably Fair',
      description: 'Transparent gaming'
    },
    {
      icon: Users,
      title: '2M+ Players',
      description: 'Join the community'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stake
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The ultimate social casino experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <Icon className="text-blue-400 mb-2" size={24} />
                  <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-sm"
          >
            <p>★★★★★ Rated 4.8/5 by players</p>
            <p className="mt-2">Join millions of players worldwide</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to continue your gaming journey</p>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                {message}
              </motion.div>
            )}

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Mail size={20} />
                    Continue with Google
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">More options coming soon</span>
                </div>
              </div>

              <button
                disabled
                className="w-full bg-gray-600/50 text-gray-400 font-semibold py-4 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-3"
              >
                <Smartphone size={20} />
                Phone Number (Coming Soon)
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                New to Stake?{' '}
                <span className="text-blue-400 font-semibold">
                  Get 250K Gold Coins + 25 SC free!
                </span>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-600 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy.
                Must be 21+ to play.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 