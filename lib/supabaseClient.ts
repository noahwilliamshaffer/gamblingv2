import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

// Handle missing environment variables during build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mvpvxsozylnboebsoxzn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12cHZ4c296eWxuYm9lYnNveHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NDU4OTIsImV4cCI6MjA2NTQyMTg5Mn0.aMwXki9THR8hicMjUNv4HPdxQjbUcT64Tzx0mhEbN5w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
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
