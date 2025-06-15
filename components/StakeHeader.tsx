'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  Bell, 
  Wallet, 
  User, 
  ChevronDown, 
  Menu,
  X,
  Coins,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

interface StakeHeaderProps {
  onMenuToggle: () => void
  isMobileMenuOpen: boolean
}

export default function StakeHeader({ onMenuToggle, isMobileMenuOpen }: StakeHeaderProps) {
  const [user, setUser] = useState<any>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="bg-[#0f1419] border-b border-[#1a2332] sticky top-0 z-50">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 hover:bg-[#1a2332] rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
              Stake
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="flex items-center gap-6 text-white">
            <Link href="/dashboard" className="hover:text-[#00d4ff] transition-colors font-medium px-2 py-1">
              Dashboard
            </Link>
            <Link href="/casino" className="hover:text-[#00d4ff] transition-colors font-medium px-2 py-1 text-[#00d4ff] border border-[#00d4ff] rounded">
              🎰 Casino
            </Link>
            <Link href="/sports" className="hover:text-[#00d4ff] transition-colors font-medium px-2 py-1">
              Sports
            </Link>
            <Link href="/originals" className="hover:text-[#00d4ff] transition-colors font-medium px-2 py-1">
              Originals
            </Link>
            <Link href="/promotions" className="hover:text-[#00d4ff] transition-colors font-medium px-2 py-1">
              Promotions
            </Link>
          </nav>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a2332] border border-[#2d3748] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Balance */}
              <div className="hidden sm:flex items-center gap-4 bg-[#1a2332] rounded-lg px-4 py-2">
                <div className="text-center">
                  <div className="text-[#00d4ff] font-semibold">$0.00</div>
                  <div className="text-xs text-gray-400">Balance</div>
                </div>
              </div>

              {/* Deposit Button */}
              <button className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] hover:from-[#00b8e6] hover:to-[#6b21d4] text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2">
                <Wallet size={16} />
                <span className="hidden sm:inline">Deposit</span>
              </button>

              {/* Notifications */}
              <button className="p-2 hover:bg-[#1a2332] rounded-lg transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-[#1a2332] rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {user.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={16} className="hidden sm:inline" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a2332] border border-[#2d3748] rounded-lg shadow-xl">
                    <div className="p-3 border-b border-[#2d3748]">
                      <div className="font-medium">{user.email?.split('@')[0]}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                    <div className="py-2">
                      <Link href="/wallet" className="flex items-center gap-3 px-3 py-2 hover:bg-[#0f1419] transition-colors">
                        <Wallet size={16} />
                        Wallet
                      </Link>
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2 hover:bg-[#0f1419] transition-colors">
                        <User size={16} />
                        Profile
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 px-3 py-2 hover:bg-[#0f1419] transition-colors">
                        <Settings size={16} />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#0f1419] transition-colors text-red-400"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] hover:from-[#00b8e6] hover:to-[#6b21d4] text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1a2332] border-t border-[#2d3748]">
          <nav className="px-4 py-4 space-y-2">
            <Link
              href="/dashboard"
              onClick={onMenuToggle}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0f1419] rounded-lg transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/casino"
              onClick={onMenuToggle}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0f1419] rounded-lg transition-colors font-medium"
            >
              Casino
            </Link>
            <Link
              href="/sports"
              onClick={onMenuToggle}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0f1419] rounded-lg transition-colors font-medium"
            >
              Sports
            </Link>
            <Link
              href="/originals"
              onClick={onMenuToggle}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0f1419] rounded-lg transition-colors font-medium"
            >
              Originals
            </Link>
            <Link
              href="/promotions"
              onClick={onMenuToggle}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-[#0f1419] rounded-lg transition-colors font-medium"
            >
              Promotions
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
} 