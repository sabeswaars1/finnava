"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Clock, ArrowRight, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function HelpCallPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [callReason, setCallReason] = useState("")
  const [callTime, setCallTime] = useState("")
  const [callDate, setCallDate] = useState("")

  const handleScheduleCall = () => {
    // Validate form
    if (!callReason || !callTime || !callDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would schedule a call with the support team
    toast({
      title: "Call Scheduled",
      description: `Your call has been scheduled for ${callDate} at ${callTime}. We'll call you at your registered number.`,
    })

    // Navigate back to help page
    router.push("/help")
  }

  const handleCallNow = () => {
    // In a real app, this would initiate a call to the support team
    window.location.href = "tel:+911800123456"
  }

  return (
    <MobileLayout title="Call Support" showBackButton>
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Call Us Now</CardTitle>
            <CardDescription>Speak with our support team immediately</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Customer Support</p>
                  <p className="text-sm">+91 1800-123-4567</p>
                </div>
              </div>
              <Button onClick={handleCallNow}>Call Now</Button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <p>Available: Monday to Friday, 9:00 AM - 6:00 PM IST</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule a Call</CardTitle>
            <CardDescription>Choose a convenient time for our support team to call you back</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for Call</Label>
              <Select value={callReason} onValueChange={setCallReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="payment">Payment Problems</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="feature">Feature Questions</SelectItem>
                  <SelectItem value="billing">Billing Inquiries</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Select value={callDate} onValueChange={setCallDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="day-after">Day After Tomorrow</SelectItem>
                  <SelectItem value="next-week">Next Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Select value={callTime} onValueChange={setCallTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-11">9:00 AM - 11:00 AM</SelectItem>
                  <SelectItem value="11-1">11:00 AM - 1:00 PM</SelectItem>
                  <SelectItem value="1-3">1:00 PM - 3:00 PM</SelectItem>
                  <SelectItem value="3-5">3:00 PM - 5:00 PM</SelectItem>
                  <SelectItem value="5-6">5:00 PM - 6:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleScheduleCall}>
              Schedule Call
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Prefer Chat Support?</p>
                  <p className="text-sm text-muted-foreground">Chat with our support team online</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => router.push("/help/chat")}>
                Chat Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}

// Label component for this page
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium mb-1.5">{children}</p>
}

