'use client'

import { useState } from 'react'
import StakeLayout from '../../components/StakeLayout'
import { motion } from 'framer-motion'
import { 
  Play, 
  Star, 
  TrendingUp, 
  Users, 
  Zap,
  Target,
  Dice1,
  Circle,
  Square,
  Triangle,
  ArrowUp,
  Gamepad2
} from 'lucide-react'

export default function Originals() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const originalsGames = [
    {
      name: 'Plinko',
      description: 'Drop the ball and watch it bounce to your fortune',
      players: 2341,
      icon: Circle,
      color: 'from-blue-500 to-cyan-500',
      preview: 'Classic Plinko with customizable risk levels and rows',
      maxPayout: '1000x',
      rtp: '99%'
    },
    {
      name: 'Crash',
      description: 'Cash out before the rocket crashes!',
      players: 1876,
      icon: ArrowUp,
      color: 'from-red-500 to-orange-500',
      preview: 'Watch the multiplier rise and cash out at the perfect moment',
      maxPayout: '∞',
      rtp: '99%'
    },
    {
      name: 'Mines',
      description: 'Uncover gems while avoiding the mines',
      players: 734,
      icon: Square,
      color: 'from-green-500 to-emerald-500',
      preview: 'Choose your grid size and mine count for custom volatility',
      maxPayout: '5000x',
      rtp: '99%'
    },
    {
      name: 'Wheel',
      description: 'Spin the wheel of fortune',
      players: 321,
      icon: Circle,
      color: 'from-purple-500 to-pink-500',
      preview: 'Customizable risk levels from safe to extreme',
      maxPayout: '50x',
      rtp: '99%'
    },
    {
      name: 'Dice',
      description: 'Simple yet exciting dice game',
      players: 456,
      icon: Dice1,
      color: 'from-yellow-500 to-amber-500',
      preview: 'Roll over or under your chosen number',
      maxPayout: '9900x',
      rtp: '99%'
    },
    {
      name: 'HiLo',
      description: 'Higher or lower card prediction',
      players: 198,
      icon: Triangle,
      color: 'from-indigo-500 to-blue-500',
      preview: 'Predict if the next card will be higher or lower',
      maxPayout: '1000x',
      rtp: '99%'
    },
  ]

  const features = [
    {
      title: 'Provably Fair',
      description: 'All games use cryptographic hashing to ensure fairness',
      icon: Star
    },
    {
      title: 'Instant Play',
      description: 'No loading times, play immediately',
      icon: Zap
    },
    {
      title: 'High RTP',
      description: '99% return to player on all Originals',
      icon: TrendingUp
    },
    {
      title: 'Social Features',
      description: 'Chat and compete with other players',
      icon: Users
    }
  ]

  return (
    <StakeLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="stake-title text-4xl mb-4">
            Stake Originals
          </h1>
          <p className="stake-subtitle text-lg max-w-2xl mx-auto">
            Experience our exclusive collection of provably fair games, designed for maximum excitement and transparency.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="stake-card text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {originalsGames.map((game, index) => {
            const Icon = game.icon
            return (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="stake-card cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedGame(selectedGame === game.name ? null : game.name)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Users size={14} />
                        {game.players}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">playing now</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{game.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{game.maxPayout}</div>
                      <div className="text-xs text-gray-500">Max Payout</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{game.rtp}</div>
                      <div className="text-xs text-gray-500">RTP</div>
                    </div>
                  </div>

                  {selectedGame === game.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-700 pt-4 mt-4"
                    >
                      <p className="text-gray-300 text-sm mb-4">{game.preview}</p>
                    </motion.div>
                  )}

                  <button className="stake-btn-primary w-full group-hover:scale-105 transition-transform">
                    <Play size={16} />
                    Play {game.name}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Game Preview Modal */}
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="stake-card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{selectedGame}</h3>
                <p className="text-gray-400 mb-6">
                  Game preview will be implemented here with actual game interface
                </p>
                <div className="flex gap-3">
                  <button 
                    className="stake-btn-primary flex-1"
                    onClick={() => setSelectedGame(null)}
                  >
                    <Play size={16} />
                    Play Now
                  </button>
                  <button 
                    className="stake-btn flex-1"
                    onClick={() => setSelectedGame(null)}
                  >
                    Demo Mode
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stake-card text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Play?</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Join thousands of players enjoying our Originals games. Start with free coins or purchase gold packages.
          </p>
          <div className="flex justify-center gap-4">
            <button className="stake-btn-primary">
              <Gamepad2 size={16} />
              Start Playing
            </button>
            <button className="stake-btn">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </StakeLayout>
  )
} 