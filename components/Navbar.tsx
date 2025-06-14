'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { User, Wallet, Settings, LogOut, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <nav className="bg-stake-darker/95 backdrop-blur-sm border-b border-stake-accent sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-stake-primary to-stake-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl">StakeCrypto</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-stake-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/wallet/deposit" className="text-gray-300 hover:text-stake-primary transition-colors">
                  Deposit
                </Link>
                <Link href="/wallet/withdraw" className="text-gray-300 hover:text-stake-primary transition-colors">
                  Withdraw
                </Link>
                <Link href="/settings" className="text-gray-300 hover:text-stake-primary transition-colors">
                  Settings
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">
                    {user.email || user.phone}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button variant="default">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-stake-accent mt-2 py-4"
            >
              <div className="flex flex-col space-y-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-gray-300 hover:text-stake-primary transition-colors flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/wallet/deposit"
                      className="text-gray-300 hover:text-stake-primary transition-colors flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Deposit</span>
                    </Link>
                    <Link
                      href="/wallet/withdraw"
                      className="text-gray-300 hover:text-stake-primary transition-colors flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Withdraw</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="text-gray-300 hover:text-stake-primary transition-colors flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <div className="pt-4 border-t border-stake-accent">
                      <div className="text-gray-400 text-sm mb-2">
                        {user.email || user.phone}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          handleSignOut()
                          setIsMenuOpen(false)
                        }}
                        className="text-gray-300 hover:text-white w-full justify-start"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 