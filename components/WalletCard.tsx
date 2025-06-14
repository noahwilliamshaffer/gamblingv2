'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, QrCode, ExternalLink } from 'lucide-react'
import { getCurrencyIcon } from '@/lib/addressUtils'
import { motion } from 'framer-motion'

interface WalletCardProps {
  currency: 'BTC' | 'ETH'
  address: string
  balance?: number
  onCopy?: () => void
}

export default function WalletCard({ currency, address, balance = 0, onCopy }: WalletCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const currencyIcon = getCurrencyIcon(currency)
  const currencyColor = currency === 'BTC' ? 'text-orange-400' : 'text-blue-400'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`text-3xl ${currencyColor}`}>
                {currencyIcon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{currency}</h3>
                <p className="text-sm text-gray-400">
                  {currency === 'BTC' ? 'Bitcoin' : 'Ethereum'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {balance.toFixed(currency === 'BTC' ? 8 : 6)}
              </div>
              <div className="text-sm text-gray-400">{currency}</div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Deposit Address */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Deposit Address
            </label>
            <div className="bg-stake-gray/50 rounded-lg p-3 border border-stake-accent">
              <div className="text-sm text-white font-mono break-all">
                {address}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopy}
              disabled={copied}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            
            <Button
              variant="outline"
              className="flex-1"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
            
            <Button
              variant="outline"
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Explorer
            </Button>
          </div>

          {/* Deposit Info */}
          <div className="bg-stake-accent/30 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold text-stake-primary">
              Deposit Information
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Minimum deposit: {currency === 'BTC' ? '0.0001 BTC' : '0.01 ETH'}</li>
              <li>• Network: {currency === 'BTC' ? 'Bitcoin Mainnet' : 'Ethereum Mainnet'}</li>
              <li>• Confirmations required: {currency === 'BTC' ? '3' : '12'}</li>
              <li>• No deposit fees</li>
            </ul>
          </div>

          {/* Warning */}
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
            <p className="text-xs text-yellow-200">
              ⚠️ Only send {currency} to this address. Sending other cryptocurrencies may result in permanent loss.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 