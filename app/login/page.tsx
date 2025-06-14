'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { signInWithGoogle, signInWithPhone, verifyOtp } from '@/lib/auth'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import { Phone, Mail, Shield, AlertTriangle } from 'lucide-react'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router])

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signInWithPhone(phone)
      if (error) {
        setError(error.message)
      } else {
        setOtpSent(true)
      }
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await verifyOtp(phone, otp)
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred during verification')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stake-darker via-stake-dark to-stake-gray p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-stake-accent">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-stake-primary to-stake-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <CardTitle className="text-2xl font-bold neon-text">Welcome to StakeCrypto</CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access your crypto wallet
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="google" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-stake-gray">
                <TabsTrigger value="google" className="data-[state=active]:bg-stake-accent">
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-stake-accent">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="google" className="space-y-4">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Mail className="w-4 h-4 mr-2" />
                  )}
                  Continue with Google
                </Button>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handlePhoneSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !phone}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      ) : (
                        <Phone className="w-4 h-4 mr-2" />
                      )}
                      Send SMS Code
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpVerification} className="space-y-4">
                    <div>
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="mt-1"
                        maxLength={6}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Code sent to {phone}
                      </p>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !otp}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      ) : (
                        <Shield className="w-4 h-4 mr-2" />
                      )}
                      Verify Code
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setOtpSent(false)
                        setOtp('')
                      }}
                      className="w-full text-xs"
                    >
                      Change phone number
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg flex items-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-stake-accent/20 rounded-lg border border-stake-accent/30">
              <h4 className="text-sm font-semibold text-stake-primary mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Security Notice
              </h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• One verified account per user</li>
                <li>• Enable 2FA after signup for enhanced security</li>
                <li>• Abuse detection actively monitored</li>
                <li>• Funds may be forfeited if violations detected</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 