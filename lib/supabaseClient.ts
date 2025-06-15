import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClientComponentClient()

// For server-side operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key'
)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          phone: string | null
          created_at: string
          btc_address: string | null
          eth_address: string | null
        }
        Insert: {
          id: string
          email?: string | null
          phone?: string | null
          created_at?: string
          btc_address?: string | null
          eth_address?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          phone?: string | null
          created_at?: string
          btc_address?: string | null
          eth_address?: string | null
        }
      }
      deposits: {
        Row: {
          id: string
          user_id: string
          currency: string
          amount: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          currency: string
          amount: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          currency?: string
          amount?: number
          created_at?: string
        }
      }
      withdrawals: {
        Row: {
          id: string
          user_id: string
          currency: string
          amount: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          currency: string
          amount: number
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          currency?: string
          amount?: number
          status?: string
          created_at?: string
        }
      }
    }
  }
} 