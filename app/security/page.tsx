"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Fingerprint, Lock, Shield, AlertTriangle, Eye, EyeOff, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SecurityPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [fraudAlertsEnabled, setFraudAlertsEnabled] = useState(true)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }

    // Clear form and show success message
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError("")

    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    })
  }

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(true)
    toast({
      title: "Two-Factor Authentication",
      description: "Two-factor authentication has been enabled for your account.",
    })
  }

  const handleSecurityCheck = () => {
    toast({
      title: "Security Check Complete",
      description: "Your account security is strong. No issues found.",
    })
  }

  return (
    <MobileLayout title="Security & Privacy" showBackButton>
      <div className="p-4 space-y-6">
        {/* Security Status */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Security Status</h3>
                <p className="text-primary-foreground/70 mt-1">Your account is secure</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4">Authentication</h3>
          <Card>
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Fingerprint className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Biometric Authentication</p>
                    <p className="text-sm text-muted-foreground">Use fingerprint or face ID</p>
                  </div>
                </div>
                <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
              </div>
              <Separator />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={handleEnableTwoFactor} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Change Password */}
        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <Card>
            <CardContent className="p-4">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {passwordError && (
                  <div className="text-sm text-red-500 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {passwordError}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Fraud Protection */}
        <div>
          <h3 className="text-lg font-medium mb-4">Fraud Protection</h3>
          <Card>
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Fraud Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified of suspicious activity</p>
                  </div>
                </div>
                <Switch checked={fraudAlertsEnabled} onCheckedChange={setFraudAlertsEnabled} />
              </div>
              <Separator />
              <div className="p-4">
                <Button variant="outline" className="w-full" onClick={handleSecurityCheck}>
                  Run Security Check
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4">Privacy</h3>
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <Button variant="outline" className="w-full" onClick={() => router.push("/privacy-policy")}>
                  Privacy Policy
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="p-4">
                <Button variant="outline" className="w-full" onClick={() => router.push("/data-export")}>
                  Export Your Data
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="p-4">
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  )
}

