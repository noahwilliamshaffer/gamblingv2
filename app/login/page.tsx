'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Smartphone, 
  ArrowRight, 
  Star, 
  Shield, 
  Gift, 
  Users,
  Gamepad2,
  TrendingUp,
  Crown
} from 'lucide-react'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      router.push('/dashboard')
    }
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
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

  return (
    <div className="min-h-screen bg-[#0f1419] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-12 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent mb-4">
              Stake
            </div>
            <div className="text-xl text-gray-300">
              The world's biggest crypto casino
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white" size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">3000+ Games</div>
                <div className="text-gray-400 text-sm">Slots, Live Casino, Sports & More</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">Provably Fair</div>
                <div className="text-gray-400 text-sm">Verify every bet with blockchain</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">Instant Withdrawals</div>
                <div className="text-gray-400 text-sm">Get your winnings in seconds</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">2M+ Players</div>
                <div className="text-gray-400 text-sm">Join the biggest community</div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00d4ff]">$2.8M</div>
              <div className="text-sm text-gray-400">Paid Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">47,291</div>
              <div className="text-sm text-gray-400">Online Now</div>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-[#7c3aed]/5" />
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#00d4ff]/20 rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#7c3aed]/20 rounded-full" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent mb-2">
              Stake
            </div>
            <div className="text-gray-400">The world's biggest crypto casino</div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-400">Sign in to continue playing</p>
          </div>

          {/* Welcome Bonus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Gift className="text-yellow-400" size={20} />
              <span className="font-semibold text-white">Welcome Bonus</span>
            </div>
            <div className="text-sm text-gray-300">
              Get up to <span className="text-yellow-400 font-bold">200% bonus</span> on your first deposit
            </div>
          </motion.div>

          {/* Login Options */}
          <div className="space-y-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={signInWithGoogle}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1a2332]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0f1419] text-gray-400">Or</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full bg-[#1a2332] hover:bg-[#2d3748] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 border border-[#2d3748] hover:border-[#4a5568]"
            >
              <Smartphone size={20} />
              Continue with Phone
            </motion.button>
          </div>

          {/* Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center"
            >
              {message}
            </motion.div>
          )}

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center text-xs text-gray-500"
          >
            By signing in, you agree to our{' '}
            <a href="#" className="text-[#00d4ff] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#00d4ff] hover:underline">
              Privacy Policy
            </a>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>Licensed in Curacao</span>
              <span>•</span>
              <span>18+ Only</span>
              <span>•</span>
              <span>Gamble Responsibly</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 