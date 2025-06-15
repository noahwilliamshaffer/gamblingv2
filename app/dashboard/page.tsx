'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import StakeLayout from '../../components/StakeLayout'
import { 
  Play, 
  Star, 
  Flame, 
  TrendingUp, 
  Users, 
  Zap,
  Trophy,
  Gift,
  MessageCircle,
  Send,
  Coins,
  Dice1,
  Target,
  Crown,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { user: 'StakeBot', message: 'Welcome to Stake! 🎉', time: '10:30 AM' },
    { user: 'Player123', message: 'Just hit 1000x on Gates of Olympus! 🔥', time: '10:32 AM' },
    { user: 'CryptoKing', message: 'Nice! What was your bet?', time: '10:33 AM' },
    { user: 'Player123', message: '$5, so $5k win! 💰', time: '10:33 AM' },
  ])

  const router = useRouter()
  const supabase = createClientComponentClient()

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
    { id: 'all', name: 'All Games', icon: Star },
    { id: 'slots', name: 'Slots', icon: Coins },
    { id: 'originals', name: 'Originals', icon: Dice1 },
    { id: 'live', name: 'Live Casino', icon: Users },
    { id: 'table', name: 'Table Games', icon: Target },
  ]

  const featuredGames = [
    { name: 'Gates of Olympus', provider: 'Pragmatic Play', category: 'slots', hot: true, players: 1247 },
    { name: 'Sweet Bonanza', provider: 'Pragmatic Play', category: 'slots', hot: true, players: 892 },
    { name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', category: 'slots', hot: false, players: 567 },
    { name: 'Plinko', provider: 'Stake Originals', category: 'originals', hot: true, players: 2341 },
    { name: 'Crash', provider: 'Stake Originals', category: 'originals', hot: true, players: 1876 },
    { name: 'Mines', provider: 'Stake Originals', category: 'originals', hot: false, players: 734 },
    { name: 'Lightning Roulette', provider: 'Evolution Gaming', category: 'live', hot: false, players: 456 },
    { name: 'Blackjack', provider: 'Stake Live', category: 'live', hot: false, players: 234 },
    { name: 'Big Bass Bonanza', provider: 'Pragmatic Play', category: 'slots', hot: false, players: 678 },
    { name: 'Money Train 3', provider: 'Relax Gaming', category: 'slots', hot: true, players: 543 },
    { name: 'Wheel', provider: 'Stake Originals', category: 'originals', hot: false, players: 321 },
    { name: 'HiLo', provider: 'Stake Originals', category: 'originals', hot: false, players: 198 },
  ]

  const promotions = [
    {
      title: 'Daily Challenges',
      description: 'Complete daily tasks and earn rewards',
      reward: '50,000 GC + 5 SC',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Weekly Raffle',
      description: '2.5B GC + 25,000 SC prize pool',
      reward: 'Enter Now',
      icon: Gift,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'VIP Club',
      description: 'Exclusive perks and bonuses',
      reward: 'Join VIP',
      icon: Crown,
      color: 'from-blue-500 to-cyan-500'
    },
  ]

  const filteredGames = selectedCategory === 'all' 
    ? featuredGames 
    : featuredGames.filter(game => game.category === selectedCategory)

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        user: user?.email?.split('@')[0] || 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setChatMessage('')
    }
  }

  if (loading) {
    return (
      <StakeLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="stake-glow w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </StakeLayout>
    )
  }

  return (
    <StakeLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stake-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="stake-title">
                Welcome back, {user?.email?.split('@')[0]}! 🎮
              </h1>
              <p className="stake-subtitle">
                Ready to play and win? Check out our latest games and promotions.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="stake-stat">
                <span className="stake-stat-value">1,247</span>
                <span className="stake-stat-label">Players Online</span>
              </div>
              <div className="stake-stat">
                <span className="stake-stat-value">$2.5M</span>
                <span className="stake-stat-label">Daily Wins</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Promotions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="stake-section-title">
            <Sparkles className="text-yellow-400" />
            Promotions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promotions.map((promo, index) => {
              const Icon = promo.icon
              return (
                <motion.div
                  key={promo.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="stake-card cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${promo.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{promo.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{promo.description}</p>
                  <button className="stake-btn-primary w-full group-hover:scale-105 transition-transform">
                    {promo.reward}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Games Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="stake-section-title">
                  <Flame className="text-red-400" />
                  Games
                </h2>
              </div>

              {/* Category Filters */}
              <div className="stake-filters">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`stake-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    >
                      <Icon size={16} />
                      {category.name}
                    </button>
                  )
                })}
              </div>

              {/* Games Grid */}
              <div className="stake-games-grid">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="stake-game-card"
                  >
                    <div className="stake-game-thumbnail">
                      <Play size={32} />
                      {game.hot && (
                                                 <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                           <Flame size={12} />
                           HOT
                         </div>
                      )}
                    </div>
                    <div className="stake-game-info">
                      <div className="stake-game-title">{game.name}</div>
                      <div className="stake-game-provider">{game.provider}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Users size={12} />
                          {game.players}
                        </span>
                        <button className="stake-btn-primary text-xs px-3 py-1">
                          Play
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="stake-section-title">
                <MessageCircle className="text-green-400" />
                Live Chat
              </h2>
              
              <div className="stake-chat">
                <div className="stake-chat-header">
                  Global Chat • {chatMessages.length} messages
                </div>
                
                <div className="stake-chat-messages space-y-2">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-blue-400 font-medium">{msg.user}</span>
                      <span className="text-gray-500 text-xs ml-2">{msg.time}</span>
                      <div className="text-gray-300 mt-1">{msg.message}</div>
                    </div>
                  ))}
                </div>
                
                <div className="stake-chat-input">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 stake-input text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      className="stake-btn-primary px-3"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </StakeLayout>
  )
} 