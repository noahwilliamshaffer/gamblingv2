'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'
import StakeMainLayout from '../../components/StakeMainLayout'
import { 
  Play, 
  Star, 
  Flame, 
  TrendingUp, 
  Users, 
  Zap,
  Trophy,
  Gift,
  Coins,
  Dice1,
  Target,
  Crown,
  Sparkles,
  Filter,
  Home,
  Gamepad2
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
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
  }

  const categories = [
    { id: 'all', name: 'All Games', count: 3000 },
    { id: 'originals', name: 'Stake Originals', count: 18 },
    { id: 'slots', name: 'Slots', count: 2500 },
    { id: 'live', name: 'Live Casino', count: 150 },
    { id: 'table', name: 'Table Games', count: 45 },
    { id: 'game-shows', name: 'Game Shows', count: 25 },
  ]

  const featuredGames = [
    { 
      name: 'Crash', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: true, 
      players: 12847,
      image: 'https://via.placeholder.com/300x200/ff6b35/ffffff?text=CRASH',
      multiplier: '1000x'
    },
    { 
      name: 'Plinko', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: true, 
      players: 8932,
      image: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=PLINKO',
      multiplier: '1000x'
    },
    { 
      name: 'Gates of Olympus', 
      provider: 'Pragmatic Play', 
      category: 'slots', 
      hot: true, 
      players: 15467,
      image: 'https://via.placeholder.com/300x200/45b7d1/ffffff?text=GATES+OF+OLYMPUS',
      multiplier: '5000x'
    },
    { 
      name: 'Sweet Bonanza', 
      provider: 'Pragmatic Play', 
      category: 'slots', 
      hot: true, 
      players: 11892,
      image: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=SWEET+BONANZA',
      multiplier: '21100x'
    },
    { 
      name: 'Mines', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: false, 
      players: 6734,
      image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=MINES',
      multiplier: '2400x'
    },
    { 
      name: 'Lightning Roulette', 
      provider: 'Evolution Gaming', 
      category: 'live', 
      hot: false, 
      players: 3456,
      image: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=LIGHTNING+ROULETTE',
      multiplier: '500x'
    },
    { 
      name: 'Wheel', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: false, 
      players: 4321,
      image: 'https://via.placeholder.com/300x200/1abc9c/ffffff?text=WHEEL',
      multiplier: '49x'
    },
    { 
      name: 'HiLo', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: false, 
      players: 2198,
      image: 'https://via.placeholder.com/300x200/34495e/ffffff?text=HILO',
      multiplier: '990x'
    },
    { 
      name: 'Wanted Dead or a Wild', 
      provider: 'Hacksaw Gaming', 
      category: 'slots', 
      hot: false, 
      players: 7567,
      image: 'https://via.placeholder.com/300x200/8e44ad/ffffff?text=WANTED',
      multiplier: '12500x'
    },
    { 
      name: 'Big Bass Bonanza', 
      provider: 'Pragmatic Play', 
      category: 'slots', 
      hot: true, 
      players: 9678,
      image: 'https://via.placeholder.com/300x200/27ae60/ffffff?text=BIG+BASS',
      multiplier: '2100x'
    },
    { 
      name: 'Money Train 3', 
      provider: 'Relax Gaming', 
      category: 'slots', 
      hot: true, 
      players: 8543,
      image: 'https://via.placeholder.com/300x200/f1c40f/ffffff?text=MONEY+TRAIN+3',
      multiplier: '50000x'
    },
    { 
      name: 'Blackjack', 
      provider: 'Evolution Gaming', 
      category: 'live', 
      hot: false, 
      players: 2234,
      image: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=BLACKJACK',
      multiplier: '3:2'
    },
  ]

  const filteredGames = selectedCategory === 'all' 
    ? featuredGames 
    : featuredGames.filter(game => game.category === selectedCategory)

  if (loading) {
    return (
      <StakeMainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </StakeMainLayout>
    )
  }

  return (
    <StakeMainLayout>
      <div className="space-y-8">
        {/* Quick Navigation Bar */}
        <div className="bg-[#1a2332] rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <h2 className="text-lg font-semibold text-white">Quick Access:</h2>
            <Link 
              href="/dashboard" 
              className="px-4 py-2 bg-[#00d4ff] text-white rounded-lg hover:bg-[#00b8e6] transition-colors font-medium"
            >
              🏠 Dashboard
            </Link>
            <Link 
              href="/casino" 
              className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg hover:from-[#00b8e6] hover:to-[#6b21d4] transition-colors font-medium"
            >
              🎰 Casino Games
            </Link>
            <Link 
              href="/originals" 
              className="px-4 py-2 bg-[#2d3748] text-white rounded-lg hover:bg-[#4a5568] transition-colors font-medium"
            >
              ⭐ Stake Originals
            </Link>
            <Link 
              href="/settings" 
              className="px-4 py-2 bg-[#2d3748] text-white rounded-lg hover:bg-[#4a5568] transition-colors font-medium"
            >
              ⚙️ Settings
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a2332] rounded-xl p-2"
        >
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="bg-[#00d4ff] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              <Home size={16} />
              Dashboard
            </Link>
            <Link
              href="/casino"
              className="bg-[#0f1419] hover:bg-[#2d3748] text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-[#2d3748]"
            >
              <Gamepad2 size={16} />
              Casino
            </Link>
            <Link
              href="/wallet"
              className="bg-[#0f1419] hover:bg-[#2d3748] text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-[#2d3748]"
            >
              <Coins size={16} />
              Wallet
            </Link>
            <Link
              href="/originals"
              className="bg-[#0f1419] hover:bg-[#2d3748] text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-[#2d3748]"
            >
              <Dice1 size={16} />
              Originals
            </Link>
            <Link
              href="/sports"
              className="bg-[#0f1419] hover:bg-[#2d3748] text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-[#2d3748]"
            >
              <Target size={16} />
              Sports
            </Link>
            <Link
              href="/promotions"
              className="bg-[#0f1419] hover:bg-[#2d3748] text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-[#2d3748]"
            >
              <Gift size={16} />
              Promotions
            </Link>
          </div>
        </motion.div>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#1a2332] rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to Stake! 🎰
              </h1>
              <p className="text-gray-400">
                Play thousands of games with crypto. Provably fair & instant withdrawals.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00d4ff]">47,291</div>
                <div className="text-sm text-gray-400">Players Online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$2.8M</div>
                <div className="text-sm text-gray-400">Paid Today</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3">
              <Trophy className="text-white" size={24} />
              <div>
                <div className="font-semibold text-white">Daily Bonus</div>
                <div className="text-sm text-blue-100">Claim your reward</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3">
              <Gift className="text-white" size={24} />
              <div>
                <div className="font-semibold text-white">Weekly Boost</div>
                <div className="text-sm text-yellow-100">Up to 200% bonus</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3">
              <Crown className="text-white" size={24} />
              <div>
                <div className="font-semibold text-white">VIP Program</div>
                <div className="text-sm text-purple-100">Exclusive rewards</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="text-white" size={24} />
              <div>
                <div className="font-semibold text-white">Rakeback</div>
                <div className="text-sm text-green-100">Get cash back</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Games</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter size={16} />
              <span>Filter by category</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#00d4ff] text-white'
                    : 'bg-[#1a2332] text-gray-300 hover:bg-[#2d3748] hover:text-white'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-[#1a2332] rounded-xl overflow-hidden hover:bg-[#2d3748] transition-colors cursor-pointer group"
            >
              {/* Game Image */}
              <div className="relative">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-40 object-cover"
                />
                
                {/* Hot Badge */}
                {game.hot && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Flame size={12} />
                    HOT
                  </div>
                )}

                {/* Max Win */}
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  Max {game.multiplier}
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <button className="bg-[#00d4ff] hover:bg-[#00b8e6] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Play size={16} />
                    Play Now
                  </button>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1">{game.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{game.provider}</span>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{game.players.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <div className="text-center">
          <button className="bg-[#1a2332] hover:bg-[#2d3748] text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Games
          </button>
        </div>
      </div>
    </StakeMainLayout>
  )
}
