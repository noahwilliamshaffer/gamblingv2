'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Wallet, Shield, Zap, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-darker via-stake-dark to-stake-gray">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-stake-primary to-stake-secondary bg-clip-text text-transparent">
                StakeCrypto
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The most secure and user-friendly crypto deposit platform. 
              Deposit Bitcoin and Ethereum with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8 py-4">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose StakeCrypto?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the next generation of crypto deposit services with unmatched security and ease of use.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Multi-layer security with 2FA and advanced fraud detection"
              },
              {
                icon: Zap,
                title: "Instant Deposits",
                description: "Fast confirmation times with real-time balance updates"
              },
              {
                icon: Wallet,
                title: "Multiple Currencies",
                description: "Support for Bitcoin, Ethereum, and more cryptocurrencies"
              },
              {
                icon: TrendingUp,
                title: "Low Fees",
                description: "Competitive rates with transparent fee structure"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-stake-gray/50 rounded-xl p-6 border border-stake-accent hover:border-stake-primary/50 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-stake-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-stake-primary/10 to-stake-secondary/10 rounded-2xl p-12 border border-stake-accent"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of traders who trust StakeCrypto for their crypto deposits.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8 py-4">
              Create Account
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
} 