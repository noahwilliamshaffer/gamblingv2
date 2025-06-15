'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import StakeMainLayout from '../../components/StakeMainLayout'
import { 
  Play, 
  Star, 
  Flame, 
  TrendingUp, 
  Users, 
  Filter,
  Search,
  Grid3X3,
  List,
  ChevronDown,
  Heart,
  Share2,
  Info,
  Dice1,
  Target,
  Zap,
  Crown,
  Coins,
  Gamepad2
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Casino() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
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
    { id: 'all', name: 'All Games', count: 3000, icon: Star },
    { id: 'originals', name: 'Stake Originals', count: 18, icon: Dice1 },
    { id: 'slots', name: 'Slots', count: 2500, icon: Target },
    { id: 'live', name: 'Live Casino', count: 150, icon: Users },
    { id: 'table', name: 'Table Games', count: 45, icon: Crown },
    { id: 'game-shows', name: 'Game Shows', count: 25, icon: Zap },
  ]

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest First' },
    { id: 'alphabetical', name: 'A-Z' },
    { id: 'provider', name: 'Provider' },
  ]

  // Placeholder games data - will be replaced later
  const featuredGames = [
    { 
      id: 1,
      name: 'Crash', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: true, 
      players: 12847,
      image: 'https://via.placeholder.com/300x200/ff6b35/ffffff?text=CRASH',
      multiplier: '1000x',
      rtp: 99,
      featured: true
    },
    { 
      id: 2,
      name: 'Plinko', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: true, 
      players: 8932,
      image: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=PLINKO',
      multiplier: '1000x',
      rtp: 99,
      featured: true
    },
    { 
      id: 3,
      name: 'Mines', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: false, 
      players: 6734,
      image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=MINES',
      multiplier: '2400x',
      rtp: 99,
      featured: false
    },
    { 
      id: 4,
      name: 'Wheel', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: false, 
      players: 4321,
      image: 'https://via.placeholder.com/300x200/1abc9c/ffffff?text=WHEEL',
      multiplier: '49x',
      rtp: 99,
      featured: false
    },
    { 
      id: 5,
      name: 'HiLo', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: false, 
      players: 2198,
      image: 'https://via.placeholder.com/300x200/34495e/ffffff?text=HILO',
      multiplier: '990x',
      rtp: 99,
      featured: false
    },
    { 
      id: 6,
      name: 'Dice', 
      provider: 'Stake Originals', 
      category: 'originals', 
      hot: true, 
      players: 5432,
      image: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=DICE',
      multiplier: '9900x',
      rtp: 99,
      featured: false
    },
  ]

  const filteredGames = featuredGames.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Casino</span>
          <span>/</span>
          <span className="text-white">All Games</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Casino Games</h1>
            <p className="text-gray-400">
              Play thousands of games from top providers. Provably fair & instant withdrawals.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[#00d4ff]">3,000+</div>
              <div className="text-xs text-gray-400">Games</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">47,291</div>
              <div className="text-xs text-gray-400">Playing Now</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#1a2332] rounded-xl p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#00d4ff] text-white'
                        : 'bg-[#0f1419] text-gray-300 hover:bg-[#2d3748] hover:text-white border border-[#2d3748]'
                    }`}
                  >
                    <Icon size={16} />
                    {category.name}
                    <span className="text-xs opacity-75">({category.count})</span>
                  </button>
                )
              })}
            </div>

            {/* View Options */}
            <div className="flex items-center gap-4">
              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#0f1419] border border-[#2d3748] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff] appearance-none pr-10"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* View Toggle */}
              <div className="flex bg-[#0f1419] rounded-lg border border-[#2d3748] overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-[#00d4ff] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-[#00d4ff] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Games Section */}
        {selectedCategory === 'all' || selectedCategory === 'originals' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Star className="text-yellow-400" size={24} />
              <h2 className="text-xl font-bold text-white">Featured Games</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#1a2332] to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredGames.filter(game => game.featured).map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-[#1a2332] rounded-xl overflow-hidden hover:bg-[#2d3748] transition-colors cursor-pointer group relative"
                >
                  {/* Game Image */}
                  <div className="relative">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {game.hot && (
                        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Flame size={12} />
                          HOT
                        </div>
                      )}
                      {game.featured && (
                        <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Star size={12} />
                          FEATURED
                        </div>
                      )}
                    </div>

                    {/* Max Win */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Max {game.multiplier}
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                      <button className="bg-[#00d4ff] hover:bg-[#00b8e6] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                        <Play size={20} />
                        Play Now
                      </button>
                    </div>

                    {/* Favorite & Share */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-colors">
                        <Heart size={16} />
                      </button>
                      <button className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-2">{game.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span className="font-medium">{game.provider}</span>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{game.players.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        RTP: <span className="text-green-400">{game.rtp}%</span>
                      </div>
                      <button className="bg-[#00d4ff] hover:bg-[#00b8e6] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        Play
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}

        {/* All Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gamepad2 className="text-[#00d4ff]" size={24} />
              <h2 className="text-xl font-bold text-white">
                {selectedCategory === 'all' ? 'All Games' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-sm text-gray-400">
                ({filteredGames.length} games)
              </span>
            </div>
          </div>

          {/* Games Grid */}
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className={`bg-[#1a2332] rounded-xl overflow-hidden hover:bg-[#2d3748] transition-colors cursor-pointer group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Game Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-32 h-20' : 'w-full h-40'}`}>
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badges */}
                  {game.hot && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Flame size={10} />
                      HOT
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <Play className="text-white" size={viewMode === 'list' ? 16 : 24} />
                  </div>
                </div>

                {/* Game Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex items-center justify-between' : ''}`}>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <h3 className={`font-semibold text-white ${viewMode === 'list' ? 'text-sm' : 'text-base'} mb-1`}>
                      {game.name}
                    </h3>
                    <div className={`flex items-center ${viewMode === 'list' ? 'gap-4' : 'justify-between'} text-sm text-gray-400`}>
                      <span>{game.provider}</span>
                      {viewMode === 'grid' && (
                        <div className="flex items-center gap-1">
                          <Users size={12} />
                          <span>{game.players.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {viewMode === 'list' && (
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-gray-500">
                        <Users size={12} className="inline mr-1" />
                        {game.players.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-400">
                        RTP {game.rtp}%
                      </div>
                      <button className="bg-[#00d4ff] hover:bg-[#00b8e6] text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
                        Play
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center py-8">
            <button className="bg-[#1a2332] hover:bg-[#2d3748] text-white px-8 py-3 rounded-lg font-medium transition-colors border border-[#2d3748] hover:border-[#4a5568]">
              Load More Games
            </button>
          </div>
        </motion.div>
      </div>
    </StakeMainLayout>
  )
} 