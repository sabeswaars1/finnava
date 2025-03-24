"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Mail, Phone, MessageSquare, ChevronRight, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function HelpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")

  const faqs = [
    {
      question: "How do I connect my bank account?",
      answer:
        "To connect your bank account, go to Settings > Financial Settings > Connected Accounts and follow the instructions. We use bank-level security to ensure your information is protected.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your data. We never store your bank credentials, and all data is encrypted both in transit and at rest.",
    },
    {
      question: "How does the AI advisor work?",
      answer:
        "Our AI advisor analyzes your financial data to provide personalized insights and recommendations. It looks at your spending patterns, savings goals, and investment portfolio to help you make better financial decisions.",
    },
    {
      question: "Can I export my financial data?",
      answer:
        "Yes, you can export your financial data in CSV or PDF format. Go to Transactions, click on the export button, and select your preferred format.",
    },
    {
      question: "How do I set up a budget?",
      answer:
        "To set up a budget, go to the Budget section and click on 'Create Budget'. You can set spending limits for different categories and track your progress throughout the month.",
    },
    {
      question: "What if I notice an incorrect transaction?",
      answer:
        "If you notice an incorrect transaction, you can flag it by clicking on the transaction and selecting 'Report Issue'. Our team will investigate and help resolve the issue.",
    },
  ]

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!contactName || !contactEmail || !contactMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the contact form to a backend
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly.",
    })

    // Reset form
    setContactName("")
    setContactEmail("")
    setContactMessage("")
  }

  return (
    <MobileLayout title="Help & Support" showBackButton>
      <div className="p-4 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions about FINNAVA</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-4">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <Button variant="link" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => router.push("/help/chat")}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Chat Support</h3>
              <p className="text-xs text-muted-foreground mt-1">Chat with our support team</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground mt-2" />
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => router.push("/help/call")}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Call Support</h3>
              <p className="text-xs text-muted-foreground mt-1">Speak with a representative</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Send us a message and we'll get back to you as soon as possible</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm">support@finnava.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm">+91 1800-123-4567</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}

