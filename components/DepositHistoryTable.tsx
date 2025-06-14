'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabaseClient'
import { formatCurrency, getCurrencyIcon } from '@/lib/addressUtils'
import { motion } from 'framer-motion'

interface Deposit {
  id: string
  currency: string
  amount: number
  created_at: string
  status?: string
}

interface DepositHistoryTableProps {
  userId: string
}

export default function DepositHistoryTable({ userId }: DepositHistoryTableProps) {
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeposits()
  }, [userId])

  const fetchDeposits = async () => {
    try {
      const { data, error } = await supabase
        .from('deposits')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching deposits:', error)
        return
      }

      setDeposits(data || [])
    } catch (error) {
      console.error('Error fetching deposits:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusBadge = (status: string = 'confirmed') => {
    const statusConfig = {
      confirmed: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Confirmed' },
      pending: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Pending' },
      failed: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Failed' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.confirmed

    return (
      <Badge className={`${config.color} border`}>
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deposit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stake-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Deposit History</span>
            <Badge variant="outline" className="text-xs">
              {deposits.length} transactions
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {deposits.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No deposits yet</div>
              <p className="text-xs text-gray-500">
                Your deposit history will appear here once you make your first deposit.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {deposits.map((deposit, index) => (
                <motion.div
                  key={deposit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-stake-gray/30 rounded-lg border border-stake-accent hover:bg-stake-gray/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getCurrencyIcon(deposit.currency)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {formatCurrency(deposit.amount, deposit.currency)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(deposit.created_at)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(deposit.status)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 