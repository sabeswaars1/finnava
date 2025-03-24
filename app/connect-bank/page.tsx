"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BanknoteIcon as Bank, Lock, CreditCard, Shield, CheckCircle, AlertCircle } from "lucide-react"

export default function ConnectBankPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedBank, setSelectedBank] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  const popularBanks = [
    { id: "chase", name: "Chase Bank" },
    { id: "bofa", name: "Bank of America" },
    { id: "wells", name: "Wells Fargo" },
    { id: "citi", name: "Citibank" },
    { id: "capital", name: "Capital One" },
  ]

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId)
    setStep(2)
  }

  const handleConnect = () => {
    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)

      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3
      if (success) {
        setIsConnected(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setConnectionError(true)
      }
    }, 3000)
  }

  const handleRetry = () => {
    setConnectionError(false)
    setStep(1)
  }

  return (
    <MobileLayout title="Connect Bank Account" showBackButton>
      <div className="p-4 space-y-6">
        {/* Security notice */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start space-x-3">
          <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Secure Connection</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
              We use bank-level encryption to securely connect to your accounts. We can never access your login
              credentials.
            </p>
          </div>
        </div>

        {step === 1 && !isConnected && !connectionError && (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Bank</CardTitle>
              <CardDescription>Connect your bank account to automatically track your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {popularBanks.map((bank) => (
                    <Button
                      key={bank.id}
                      variant="outline"
                      className="justify-start h-auto py-3 px-4"
                      onClick={() => handleBankSelect(bank.id)}
                    >
                      <Bank className="h-5 w-5 mr-3 text-primary" />
                      {bank.name}
                    </Button>
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or search</span>
                  </div>
                </div>

                <div className="relative">
                  <Input placeholder="Search for your bank" />
                  <Button className="absolute right-1 top-1 h-7" size="sm" onClick={() => setStep(2)}>
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
                Skip for now
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && !isConnected && !connectionError && (
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedBank ? popularBanks.find((b) => b.id === selectedBank)?.name : "Bank Login"}
              </CardTitle>
              <CardDescription>Enter your bank credentials to securely connect your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type="password" />
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="bg-secondary p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">
                    <Lock className="inline h-3 w-3 mr-1" />
                    Your credentials are securely encrypted and never stored on our servers
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Select accounts to connect</Label>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="all" id="all-accounts" />
                      <Label htmlFor="all-accounts" className="flex-1 cursor-pointer">
                        All accounts
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="checking" id="checking" />
                      <Label htmlFor="checking" className="flex-1 cursor-pointer">
                        Checking accounts only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="savings" id="savings" />
                      <Label htmlFor="savings" className="flex-1 cursor-pointer">
                        Savings accounts only
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Connecting...
                  </>
                ) : (
                  "Connect Securely"
                )}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep(1)} disabled={isConnecting}>
                Back
              </Button>
            </CardFooter>
          </Card>
        )}

        {isConnected && (
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Successfully Connected!</h3>
              <p className="text-muted-foreground mb-4">
                Your bank account has been successfully connected. Your transactions will be imported shortly.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>3 accounts connected</span>
              </div>
            </CardContent>
          </Card>
        )}

        {connectionError && (
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connection Failed</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't connect to your bank account. This could be due to incorrect credentials or a temporary
                issue with the bank's servers.
              </p>
              <div className="flex flex-col space-y-2">
                <Button onClick={handleRetry}>Try Again</Button>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Skip for now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MobileLayout>
  )
}

