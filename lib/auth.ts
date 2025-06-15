import { supabase } from './supabaseClient'

export const signInWithGoogle = async () => {
  // Force the correct redirect URL for production
  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/dashboard`
    : 'https://gamblingstakev2-4pmqpjndy-noahwilliamshaffers-projects.vercel.app/dashboard'
    
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl
    }
  })
  
  if (error) {
    console.error('Error signing in with Google:', error)
  }
  
  return { data, error }
}

export const signInWithPhone = async (phone: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      channel: 'sms'
    }
  })
  
  if (error) {
    console.error('Error signing in with phone:', error)
  }
  
  return { data, error }
}

export const verifyOtp = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms'
  })
  
  if (error) {
    console.error('Error verifying OTP:', error)
  }
  
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
  }
  
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error getting current user:', error)
  }
  
  return { user, error }
} 