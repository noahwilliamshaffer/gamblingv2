'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Gamepad2,
  Dice1,
  Users,
  Target,
  Crown,
  Gift,
  TrendingUp,
  Zap,
  Flame,
  Trophy,
  ChevronRight
} from 'lucide-react'

interface StakeSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function StakeSidebar({ isOpen, onClose }: StakeSidebarProps) {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState('casino')

  const casinoGames = [
    { name: 'All Games', href: '/casino', icon: Gamepad2 },
    { name: 'Slots', href: '/slots', icon: Target },
    { name: 'Live Casino', href: '/live', icon: Users },
    { name: 'Game Shows', href: '/game-shows', icon: Trophy },
    { name: 'Table Games', href: '/table-games', icon: Crown },
    { name: 'Originals', href: '/originals', icon: Dice1 },
  ]

  const sportsItems = [
    { name: 'Live Betting', href: '/sports/live', icon: Zap },
    { name: 'Soccer', href: '/sports/soccer', icon: Target },
    { name: 'Basketball', href: '/sports/basketball', icon: Target },
    { name: 'Tennis', href: '/sports/tennis', icon: Target },
    { name: 'Esports', href: '/sports/esports', icon: Gamepad2 },
  ]

  const promoItems = [
    { name: 'Daily Bonus', href: '/promotions/daily', icon: Gift },
    { name: 'VIP Club', href: '/vip', icon: Crown },
    { name: 'Rakeback', href: '/rakeback', icon: TrendingUp },
    { name: 'Challenges', href: '/challenges', icon: Trophy },
  ]

  const sections = [
    {
      id: 'casino',
      name: 'Casino',
      icon: Gamepad2,
      items: casinoGames,
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: Target,
      items: sportsItems,
    },
    {
      id: 'promotions',
      name: 'Promotions',
      icon: Gift,
      items: promoItems,
    },
  ]

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? '' : sectionId)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0f1419] border-r border-[#1a2332] z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:top-0 md:h-screen md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {/* Home */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-[#1a2332] text-[#00d4ff]'
                  : 'text-gray-300 hover:text-white hover:bg-[#1a2332]'
              }`}
            >
              <Home size={18} />
              <span className="font-medium">Home</span>
            </Link>

            {/* Sections */}
            {sections.map((section) => {
              const Icon = section.icon
              const isOpen = openSection === section.id
              
              return (
                <div key={section.id} className="space-y-1">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#1a2332] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="font-medium">{section.name}</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`transform transition-transform ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {/* Section Items */}
                  {isOpen && (
                    <div className="ml-6 space-y-1">
                      {section.items.map((item) => {
                        const ItemIcon = item.icon
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                              pathname === item.href
                                ? 'bg-[#1a2332] text-[#00d4ff]'
                                : 'text-gray-400 hover:text-white hover:bg-[#1a2332]'
                            }`}
                          >
                            <ItemIcon size={16} />
                            <span className="text-sm">{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Popular Games */}
            <div className="pt-4 border-t border-[#1a2332]">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Popular Games
              </div>
              <div className="space-y-1">
                <Link
                  href="/games/crash"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2332] transition-colors"
                >
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-400 to-orange-500" />
                  <span className="text-sm">Crash</span>
                  <span className="ml-auto flex items-center gap-1 text-xs">
                    <Flame size={12} className="text-red-500" />
                    <span className="text-red-500">HOT</span>
                  </span>
                </Link>
                <Link
                  href="/games/plinko"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2332] transition-colors"
                >
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-400 to-purple-500" />
                  <span className="text-sm">Plinko</span>
                </Link>
                <Link
                  href="/games/mines"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2332] transition-colors"
                >
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-green-400 to-blue-500" />
                  <span className="text-sm">Mines</span>
                </Link>
                <Link
                  href="/games/wheel"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a2332] transition-colors"
                >
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-400 to-pink-500" />
                  <span className="text-sm">Wheel</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#1a2332]">
            <div className="text-xs text-gray-500 space-y-1">
              <div>© 2024 Stake.com</div>
              <div>Curacao Licensed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 