"use client"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Settings,
  CreditCard,
  BookOpen,
  Receipt,
  CalendarClock,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  BellRing,
  FileText,
  Wallet,
  Building,
  Gift,
} from "lucide-react"

export default function MorePage() {
  const router = useRouter()

  const menuItems = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", path: "/settings" },
        { icon: Settings, label: "Settings", path: "/settings" },
        { icon: BellRing, label: "Notifications", path: "/settings" },
        { icon: Shield, label: "Security & Privacy", path: "/settings" },
      ],
    },
    {
      title: "Financial Management",
      items: [
        { icon: Receipt, label: "Bills & Subscriptions", path: "/bills" },
        { icon: CalendarClock, label: "Recurring Payments", path: "/bills" },
        { icon: CreditCard, label: "Payment Methods", path: "/settings" },
        { icon: Wallet, label: "Accounts", path: "/connect-bank" },
      ],
    },
    {
      title: "Resources",
      items: [
        { icon: BookOpen, label: "Financial Education", path: "/learn" },
        { icon: FileText, label: "Documents & Reports", path: "/dashboard" },
        { icon: Building, label: "Financial Institutions", path: "/dashboard" },
        { icon: Gift, label: "Rewards & Offers", path: "/dashboard" },
      ],
    },
    {
      title: "Support",
      items: [{ icon: HelpCircle, label: "Help & Support", path: "/dashboard" }],
    },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <MobileLayout title="More Options">
      <div className="p-4 space-y-6">
        {/* User profile card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">Alex Johnson</h3>
                <p className="text-muted-foreground">alex.johnson@example.com</p>
              </div>
            </div>
            <div className="border-t p-4 flex justify-between items-center bg-muted/30">
              <span className="text-sm font-medium">View Profile</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Menu sections */}
        {menuItems.map((section, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground px-1">{section.title}</h3>
            <Card>
              <CardContent className="p-0">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {itemIndex > 0 && <div className="h-px bg-border mx-4" />}
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Logout button */}
        <Card>
          <CardContent className="p-0">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 text-red-500 dark:text-red-400"
              onClick={() => router.push("/login")}
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
                </div>
                <span>Log Out</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* App version */}
        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>FinGenius v1.0.0</p>
          <p className="mt-1">© 2023 FinGenius. All rights reserved.</p>
        </div>
      </div>
    </MobileLayout>
  )
}

