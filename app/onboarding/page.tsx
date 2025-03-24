"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Mic,
  Globe,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Target,
  Wallet,
  PiggyBank,
  Fingerprint,
  Shield,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [language, setLanguage] = useState("english")
  const [voiceEnabled, setVoiceEnabled] = useState("yes")
  const [currency, setCurrency] = useState("inr")
  const [financialGoals, setFinancialGoals] = useState<string[]>([])
  const [monthlyIncome, setMonthlyIncome] = useState("50000")
  const [fixedExpenses, setFixedExpenses] = useState("30000")
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [savingsPercentage, setSavingsPercentage] = useState(20)
  const [investmentPreferences, setInvestmentPreferences] = useState<string[]>([])
  const [biometricAuth, setBiometricAuth] = useState("yes")
  const [nationality, setNationality] = useState("india")
  const [occupation, setOccupation] = useState("")
  const [incomeSource, setIncomeSource] = useState("salary")
  const [taxBracket, setTaxBracket] = useState("")

  const totalSteps = 7
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold">Setup Your Account</h1>
              <p className="text-sm text-muted-foreground">
                Step {step} of {totalSteps}
              </p>
            </div>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Welcome to FINNAVA</CardTitle>
              <CardDescription>Let's personalize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                      <SelectItem value="malayalam">മലയാളം (Malayalam)</SelectItem>
                      <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                      <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                      <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                      <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select defaultValue={nationality} onValueChange={setNationality}>
                    <SelectTrigger id="nationality">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Currency Preference</CardTitle>
              <CardDescription>Choose your preferred currency for financial tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select defaultValue={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR (₹) - Indian Rupee</SelectItem>
                    <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                    <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
                    <SelectItem value="jpy">JPY (¥) - Japanese Yen</SelectItem>
                    <SelectItem value="cad">CAD ($) - Canadian Dollar</SelectItem>
                    <SelectItem value="aud">AUD ($) - Australian Dollar</SelectItem>
                    <SelectItem value="sgd">SGD ($) - Singapore Dollar</SelectItem>
                    <SelectItem value="aed">AED (د.إ) - UAE Dirham</SelectItem>
                  </SelectContent>
                </Select>

                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium">Popular Indian Financial Services</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: "UPI", logo: "/placeholder.svg?height=40&width=40" },
                      { name: "Paytm", logo: "/placeholder.svg?height=40&width=40" },
                      { name: "PhonePe", logo: "/placeholder.svg?height=40&width=40" },
                      { name: "Google Pay", logo: "/placeholder.svg?height=40&width=40" },
                      { name: "BHIM", logo: "/placeholder.svg?height=40&width=40" },
                      { name: "Amazon Pay", logo: "/placeholder.svg?height=40&width=40" },
                    ].map((service, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-2 border rounded-md cursor-pointer hover:border-primary"
                      >
                        <img src={service.logo || "/placeholder.svg"} alt={service.name} className="w-8 h-8 mb-1" />
                        <span className="text-xs text-center">{service.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    You can connect these services later in the app
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Income Details</CardTitle>
              <CardDescription>Tell us about your income sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Select value={occupation} onValueChange={setOccupation}>
                    <SelectTrigger id="occupation">
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried Employee</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="professional">Professional (Doctor, Lawyer, etc.)</SelectItem>
                      <SelectItem value="government">Government Employee</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income-source">Primary Income Source</Label>
                  <Select value={incomeSource} onValueChange={setIncomeSource}>
                    <SelectTrigger id="income-source">
                      <SelectValue placeholder="Select income source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="business">Business Income</SelectItem>
                      <SelectItem value="investments">Investment Returns</SelectItem>
                      <SelectItem value="rental">Rental Income</SelectItem>
                      <SelectItem value="pension">Pension</SelectItem>
                      <SelectItem value="freelance">Freelance Work</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-income">Monthly Income (₹)</Label>
                  <Input
                    id="monthly-income"
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    placeholder="e.g., 50,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-bracket">Income Tax Bracket</Label>
                  <Select value={taxBracket} onValueChange={setTaxBracket}>
                    <SelectTrigger id="tax-bracket">
                      <SelectValue placeholder="Select tax bracket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-tax">No Tax (Up to ₹2.5 Lakhs)</SelectItem>
                      <SelectItem value="5-percent">5% (₹2.5 to 5 Lakhs)</SelectItem>
                      <SelectItem value="10-percent">10% (₹5 to 7.5 Lakhs)</SelectItem>
                      <SelectItem value="15-percent">15% (₹7.5 to 10 Lakhs)</SelectItem>
                      <SelectItem value="20-percent">20% (₹10 to 12.5 Lakhs)</SelectItem>
                      <SelectItem value="25-percent">25% (₹12.5 to 15 Lakhs)</SelectItem>
                      <SelectItem value="30-percent">30% (Above ₹15 Lakhs)</SelectItem>
                      <SelectItem value="not-sure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixed-expenses">Fixed Monthly Expenses (₹)</Label>
                  <Input
                    id="fixed-expenses"
                    type="number"
                    value={fixedExpenses}
                    onChange={(e) => setFixedExpenses(e.target.value)}
                    placeholder="e.g., 30,000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include rent, utilities, EMIs, and other regular payments
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <PiggyBank className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Savings & Investment</CardTitle>
              <CardDescription>Tell us about your savings and investment preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>What percentage of income would you like to save?</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      value={[savingsPercentage]}
                      onValueChange={(value) => setSavingsPercentage(value[0])}
                      max={50}
                      step={5}
                    />
                    <span className="w-12 text-center font-medium">{savingsPercentage}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Risk Tolerance</Label>
                  <div className="space-y-1">
                    <Slider
                      value={[riskTolerance]}
                      onValueChange={(value) => setRiskTolerance(value[0])}
                      max={100}
                      step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Conservative</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Investment Preferences</Label>
                  <div className="space-y-2">
                    {[
                      { id: "stocks", label: "Stocks" },
                      { id: "mutual-funds", label: "Mutual Funds" },
                      { id: "fixed-deposits", label: "Fixed Deposits" },
                      { id: "ppf", label: "PPF" },
                      { id: "nps", label: "NPS" },
                      { id: "real-estate", label: "Real Estate" },
                      { id: "gold", label: "Gold" },
                      { id: "crypto", label: "Cryptocurrency" },
                    ].map((preference) => (
                      <div key={preference.id} className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox
                          id={preference.id}
                          checked={investmentPreferences.includes(preference.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setInvestmentPreferences([...investmentPreferences, preference.id])
                            } else {
                              setInvestmentPreferences(investmentPreferences.filter((p) => p !== preference.id))
                            }
                          }}
                        />
                        <Label htmlFor={preference.id} className="flex-1 cursor-pointer">
                          {preference.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 5 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>What are your primary financial goals?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: "save", label: "Save Money" },
                  { id: "invest", label: "Invest for the Future" },
                  { id: "debt", label: "Pay Off Debt" },
                  { id: "budget", label: "Better Budgeting" },
                  { id: "home", label: "Buy a Home" },
                  { id: "car", label: "Buy a Car" },
                  { id: "retirement", label: "Plan for Retirement" },
                  { id: "education", label: "Children's Education" },
                  { id: "wedding", label: "Plan a Wedding" },
                  { id: "travel", label: "Travel" },
                  { id: "tax", label: "Tax Planning" },
                ].map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-2 rounded-md border p-3">
                    <Checkbox
                      id={goal.id}
                      checked={financialGoals.includes(goal.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFinancialGoals([...financialGoals, goal.id])
                        } else {
                          setFinancialGoals(financialGoals.filter((g) => g !== goal.id))
                        }
                      }}
                    />
                    <Label htmlFor={goal.id} className="flex-1 cursor-pointer">
                      {goal.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 6 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Voice & Accessibility</CardTitle>
              <CardDescription>Customize your interaction preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <RadioGroup defaultValue={voiceEnabled} onValueChange={setVoiceEnabled} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Voice Interaction</Label>
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="yes" id="voice-yes" />
                      <Label htmlFor="voice-yes" className="flex-1 cursor-pointer">
                        <div className="font-medium">Yes, enable voice</div>
                        <div className="text-sm text-muted-foreground">
                          I want to use voice commands with the AI assistant
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="no" id="voice-no" />
                      <Label htmlFor="voice-no" className="flex-1 cursor-pointer">
                        <div className="font-medium">No, text only</div>
                        <div className="text-sm text-muted-foreground">I prefer to type my commands and questions</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <div className="space-y-4">
                  <Label>Accessibility Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="large-text" />
                      <Label htmlFor="large-text">Larger Text</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="high-contrast" />
                      <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="screen-reader" />
                      <Label htmlFor="screen-reader">Screen Reader Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="reduced-motion" />
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 7 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Security Setup</CardTitle>
              <CardDescription>Set up your security preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Tabs defaultValue="biometric">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="biometric">Biometric</TabsTrigger>
                    <TabsTrigger value="pin">PIN/Password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="biometric" className="space-y-4 mt-4">
                    <div className="flex justify-center">
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <Fingerprint className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <p className="text-center text-sm">
                      Use your fingerprint or face recognition for quick and secure access to your account
                    </p>
                    <RadioGroup defaultValue={biometricAuth} onValueChange={setBiometricAuth} className="space-y-4">
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="yes" id="biometric-yes" />
                        <Label htmlFor="biometric-yes" className="flex-1 cursor-pointer">
                          <div className="font-medium">Enable Biometric Authentication</div>
                          <div className="text-sm text-muted-foreground">
                            Use fingerprint or face recognition to log in
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="no" id="biometric-no" />
                        <Label htmlFor="biometric-no" className="flex-1 cursor-pointer">
                          <div className="font-medium">Skip for now</div>
                          <div className="text-sm text-muted-foreground">You can enable this later in settings</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </TabsContent>
                  <TabsContent value="pin" className="space-y-4 mt-4">
                    <p className="text-center text-sm">
                      Set up a PIN or password as an alternative authentication method
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="pin">4-Digit PIN</Label>
                      <div className="flex justify-between gap-2">
                        <Input type="password" maxLength={1} className="text-center" />
                        <Input type="password" maxLength={1} className="text-center" />
                        <Input type="password" maxLength={1} className="text-center" />
                        <Input type="password" maxLength={1} className="text-center" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember-device" />
                      <Label htmlFor="remember-device">Remember this device</Label>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label>Additional Security Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="two-factor" defaultChecked />
                      <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="login-notifications" defaultChecked />
                      <Label htmlFor="login-notifications">Login Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="transaction-alerts" defaultChecked />
                      <Label htmlFor="transaction-alerts">Transaction Alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-lock" defaultChecked />
                      <Label htmlFor="app-lock">Auto-lock App After 5 Minutes</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Complete Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

