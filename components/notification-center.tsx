"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success"
  timestamp: Date
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Budget Alert",
      message: "You've reached 80% of your dining out budget for this month.",
      type: "warning",
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "Goal Milestone",
      message: "Congratulations! You've reached 50% of your vacation savings goal.",
      type: "success",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "3",
      title: "New Feature",
      message: "Check out our new AI-powered investment recommendations!",
      type: "info",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
  ])

  const [isOpen, setIsOpen] = useState(false)

  const toggleNotifications = () => setIsOpen(!isOpen)

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={toggleNotifications}>
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {notifications.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto z-50">
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-muted-foreground">No new notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b last:border-b-0 ${getNotificationColor(notification.type)}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm mt-1">{notification.message}</p>
                      <p className="text-xs mt-2 text-muted-foreground">{notification.timestamp.toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => dismissNotification(notification.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

