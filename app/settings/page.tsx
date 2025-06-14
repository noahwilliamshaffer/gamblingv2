'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { motion } from 'framer-motion'
import { User, Shield, Key, LogOut, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
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
      
      // Check 2FA status from user metadata
      setTwoFactorEnabled(user.user_metadata?.two_factor_enabled || false)
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle2FA = async () => {
    if (!user) return

    try {
      const newStatus = !twoFactorEnabled
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: { two_factor_enabled: newStatus }
      })

      if (!error) {
        setTwoFactorEnabled(newStatus)
      }
    } catch (error) {
      console.error('Error updating 2FA status:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stake-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-darker via-stake-dark to-stake-gray p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">
            Manage your account security and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Email</Label>
                  <div className="mt-1 p-3 bg-stake-gray/50 rounded-lg border border-stake-accent">
                    <span className="text-white">{user.email || 'Not provided'}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Phone</Label>
                  <div className="mt-1 p-3 bg-stake-gray/50 rounded-lg border border-stake-accent">
                    <span className="text-white">{user.phone || 'Not provided'}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Member Since</Label>
                  <div className="mt-1 p-3 bg-stake-gray/50 rounded-lg border border-stake-accent">
                    <span className="text-white">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-white">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-xs text-gray-400 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={handleToggle2FA}
                    />
                    <Badge
                      variant={twoFactorEnabled ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-stake-accent">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-white">
                        Password Security
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Managed by your authentication provider
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Key className="w-3 h-3 mr-1" />
                      Protected
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="flex-1"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-red-600/30 bg-red-900/10">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-200 mb-2">Important Security Information</h4>
                    <ul className="text-red-300/80 text-sm space-y-1">
                      <li>• Never share your account credentials with anyone</li>
                      <li>• Enable 2FA for enhanced security</li>
                      <li>• Report suspicious activity immediately</li>
                      <li>• Multiple accounts per user are strictly prohibited</li>
                      <li>• Violations may result in account suspension and fund forfeiture</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 