"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Bell,
  Lock,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Globe,
  Mic,
  Moon,
  Sun,
  Shield,
  Smartphone,
  Wallet,
  FileText,
  Sparkles,
  BrainCircuit,
  MessageSquare,
} from "lucide-react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [biometricsEnabled, setBiometricsEnabled] = useState(true)
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [aiSettingsOpen, setAiSettingsOpen] = useState(false)
  const [aiModel, setAiModel] = useState("gpt-4o")
  const [aiPersonality, setAiPersonality] = useState("balanced")
  const [aiPrivacyLevel, setAiPrivacyLevel] = useState("standard")
  const [aiCreativityLevel, setAiCreativityLevel] = useState(70)
  const [aiEnabled, setAiEnabled] = useState(true)

  const languages = [
    { value: "english", label: "English" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "malayalam", label: "മലയാളം (Malayalam)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
  ]

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  const saveLanguageSettings = () => {
    // In a real app, this would save the language preference to the user's profile
    setLanguageDialogOpen(false)
  }

  const saveAiSettings = () => {
    // In a real app, this would save the AI settings to the user's profile
    setAiSettingsOpen(false)
  }

  return (
    <MobileLayout title="Settings" showBackButton>
      <div className="p-4 space-y-6">
        {/* Profile section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">Alex Johnson</h3>
                <p className="text-muted-foreground">alex.johnson@example.com</p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary text-sm"
                  onClick={() => router.push("/profile")}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings sections */}
        <div className="space-y-6">
          {/* AI Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">AI Assistant</h3>
            <Card>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">AI Assistant</p>
                      <p className="text-sm text-muted-foreground">Enable AI-powered financial insights</p>
                    </div>
                  </div>
                  <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">AI Settings</p>
                      <p className="text-sm text-muted-foreground">Customize your AI assistant</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setAiSettingsOpen(true)}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">AI Chat History</p>
                      <p className="text-sm text-muted-foreground">Manage your AI conversations</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/ai-chat/history")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            <Card>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-primary" />
                    ) : (
                      <Sun className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Toggle dark mode on/off</p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">
                        {languages.find((lang) => lang.value === selectedLanguage)?.label || "English"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setLanguageDialogOpen(true)}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mic className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Voice Commands</p>
                      <p className="text-sm text-muted-foreground">Enable voice interaction</p>
                    </div>
                  </div>
                  <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-lg font-medium mb-4">Security</h3>
            <Card>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/security")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Security Settings</p>
                      <p className="text-sm text-muted-foreground">Manage security options</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/security")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Biometric Authentication</p>
                      <p className="text-sm text-muted-foreground">Use fingerprint or face ID</p>
                    </div>
                  </div>
                  <Switch checked={biometricsEnabled} onCheckedChange={setBiometricsEnabled} />
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-muted-foreground">Manage notification settings</p>
                    </div>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Financial Settings</h3>
            <Card>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/payment-methods")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wallet className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Connected Accounts</p>
                      <p className="text-sm text-muted-foreground">Manage linked bank accounts</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/connect-bank")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Currency Preferences</p>
                      <p className="text-sm text-muted-foreground">Set your preferred currency</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/currency-settings")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Other</h3>
            <Card>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Help & Support</p>
                      <p className="text-sm text-muted-foreground">Get help with the app</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/help")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <Separator />
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Terms & Privacy</p>
                      <p className="text-sm text-muted-foreground">View legal information</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/terms")}>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Logout button */}
          <Button variant="destructive" className="w-full" onClick={() => router.push("/login")}>
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Language Selection Dialog */}
      <Dialog open={languageDialogOpen} onOpenChange={setLanguageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
            <DialogDescription>Choose your preferred language for the app</DialogDescription>
          </DialogHeader>
          <RadioGroup value={selectedLanguage} onValueChange={handleLanguageChange} className="space-y-3">
            {languages.map((lang) => (
              <div key={lang.value} className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value={lang.value} id={`lang-${lang.value}`} />
                <Label htmlFor={`lang-${lang.value}`} className="flex-1 cursor-pointer">
                  {lang.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLanguageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveLanguageSettings}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Settings Dialog */}
      <Dialog open={aiSettingsOpen} onOpenChange={setAiSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>AI Assistant Settings</DialogTitle>
            <DialogDescription>Customize how your AI financial assistant works</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="ai-model">AI Model</Label>
              <Select value={aiModel} onValueChange={setAiModel}>
                <SelectTrigger id="ai-model">
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                More advanced models provide better financial insights but may be slower
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai-personality">AI Personality</Label>
              <Select value={aiPersonality} onValueChange={setAiPersonality}>
                <SelectTrigger id="ai-personality">
                  <SelectValue placeholder="Select AI personality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai-privacy">Privacy Level</Label>
              <Select value={aiPrivacyLevel} onValueChange={setAiPrivacyLevel}>
                <SelectTrigger id="ai-privacy">
                  <SelectValue placeholder="Select privacy level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Minimal data sharing</SelectItem>
                  <SelectItem value="standard">Standard - Balanced</SelectItem>
                  <SelectItem value="enhanced">Enhanced - More personalization</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Higher privacy means less personalized recommendations
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="ai-creativity">Creativity Level: {aiCreativityLevel}%</Label>
              </div>
              <Slider
                id="ai-creativity"
                min={0}
                max={100}
                step={10}
                value={[aiCreativityLevel]}
                onValueChange={(value) => setAiCreativityLevel(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Creative</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAiSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveAiSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  )
}

