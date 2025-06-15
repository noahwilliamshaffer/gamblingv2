'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  Gamepad2, 
  Wallet, 
  TrendingUp, 
  Settings, 
  MessageCircle, 
  Trophy,
  Dice1,
  Coins,
  Flame,
  Zap,
  Gift,
  Users,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

interface StakeLayoutProps {
  children: React.ReactNode
}

export default function StakeLayout({ children }: StakeLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [balance, setBalance] = useState({ gc: 250000, sc: 25 })
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Casino', href: '/casino', icon: Gamepad2 },
    { name: 'Originals', href: '/originals', icon: Dice1 },
    { name: 'Slots', href: '/slots', icon: Coins },
    { name: 'Live Casino', href: '/live', icon: Users },
  ]

  const promotions = [
    { name: 'Challenges', href: '/challenges', icon: Trophy },
    { name: 'Promotions', href: '/promotions', icon: Gift },
    { name: 'VIP Club', href: '/vip', icon: Flame },
    { name: 'Rakeback', href: '/rakeback', icon: TrendingUp },
  ]

  const tools = [
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Statistics', href: '/statistics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="stake-layout">
      {/* Sidebar */}
      <div className={`stake-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <Link href="/dashboard" className="stake-logo">
            Stake
          </Link>
        </div>

        {/* Balance */}
        <div className="p-4">
          <div className="stake-balance">
            <span className="stake-balance-amount">{balance.gc.toLocaleString()}</span>
            <span className="stake-balance-label">Gold Coins</span>
          </div>
          <div className="stake-balance">
            <span className="stake-balance-amount">{balance.sc}</span>
            <span className="stake-balance-label">Stake Cash</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="stake-nav-section">Games</div>
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`stake-nav-item ${pathname === item.href ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}

          <div className="stake-nav-section">Promotions</div>
          {promotions.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`stake-nav-item ${pathname === item.href ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}

          <div className="stake-nav-section">Tools</div>
          {tools.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`stake-nav-item ${pathname === item.href ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        {user && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {user.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-gray-400">Online</div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="stake-main">
        {/* Header */}
        <header className="stake-header">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden stake-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="stake-input pl-10"
                />
              </div>
            </div>
          </div>

          <div className="stake-user-menu">
            <button className="stake-btn">
              <Coins size={18} />
              Buy Gold Coins
            </button>
            
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <div className="stake-notification-dot"></div>
            </button>

            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <MessageCircle size={20} />
              <div className="stake-notification-dot"></div>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="stake-content">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
} 