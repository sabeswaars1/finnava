"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, BarChart3, MessageSquare, PieChart, Settings, ChevronLeft, BookOpen } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { NotificationCenter } from "@/components/notification-center"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileLayoutProps {
  children: React.ReactNode
  title?: string
  showBackButton?: boolean
  showHeader?: boolean
}

export default function MobileLayout({
  children,
  title = "FINNAVA",
  showBackButton = false,
  showHeader = true,
}: MobileLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: BarChart3, label: "Transactions", path: "/transactions" },
    { icon: MessageSquare, label: "AI Chat", path: "/ai-chat" },
    { icon: PieChart, label: "Investments", path: "/investments" },
    { icon: BookOpen, label: "Learning", path: "/learning" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background border-x border-border">
      {showHeader && (
        <header className="px-4 py-3 border-b flex items-center justify-between sticky top-0 bg-background z-10">
          <div className="flex items-center">
            {showBackButton && (
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <NotificationCenter />
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => router.push("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-auto">{children}</main>

      <nav className="border-t bg-background sticky bottom-0">
        <div className="flex justify-between px-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex flex-col items-center py-2 px-0 h-16 rounded-none flex-1 ${
                isActive(item.path) ? "text-primary border-t-2 border-primary" : "text-muted-foreground"
              }`}
              onClick={() => router.push(item.path)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      <Toaster />
    </div>
  )
}

