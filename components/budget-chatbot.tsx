"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, Mic, PieChart, TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

type BudgetSuggestion = {
  category: string
  currentAmount: number
  suggestedAmount: number
  change: number
}

export function BudgetChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your AI budgeting assistant. I can help you create a personalized budget plan. What's your monthly income?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showBudgetPlan, setShowBudgetPlan] = useState(false)
  const [budgetSuggestions, setBudgetSuggestions] = useState<BudgetSuggestion[]>([])
  const [savingsGoal, setSavingsGoal] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample budget suggestions
  const sampleBudgetSuggestions: BudgetSuggestion[] = [
    { category: "Housing", currentAmount: 25000, suggestedAmount: 22000, change: -3000 },
    { category: "Food", currentAmount: 12000, suggestedAmount: 10000, change: -2000 },
    { category: "Transportation", currentAmount: 8000, suggestedAmount: 6000, change: -2000 },
    { category: "Entertainment", currentAmount: 6000, suggestedAmount: 4000, change: -2000 },
    { category: "Shopping", currentAmount: 5000, suggestedAmount: 3000, change: -2000 },
    { category: "Utilities", currentAmount: 4000, suggestedAmount: 4000, change: 0 },
    { category: "Savings", currentAmount: 10000, suggestedAmount: 21000, change: 11000 },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (input.trim() === "") return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let botResponse: Message

      if (messages.length === 1) {
        // Response to income question
        botResponse = {
          id: Date.now().toString(),
          content:
            "Great! What are your current monthly expenses? You can list them by category (e.g., rent, food, transportation).",
          sender: "bot",
          timestamp: new Date(),
        }
      } else if (messages.length === 3) {
        // Response to expenses question
        botResponse = {
          id: Date.now().toString(),
          content:
            "Thanks for sharing. What are your financial goals? Are you saving for something specific or trying to reduce debt?",
          sender: "bot",
          timestamp: new Date(),
        }
      } else if (messages.length === 5) {
        // Final response with budget plan
        botResponse = {
          id: Date.now().toString(),
          content:
            "Based on your income, expenses, and goals, I've created a personalized budget plan for you. Take a look at the suggestions below.",
          sender: "bot",
          timestamp: new Date(),
        }
        setBudgetSuggestions(sampleBudgetSuggestions)
        setSavingsGoal(21000)
        setShowBudgetPlan(true)
      } else {
        // Generic response
        botResponse = {
          id: Date.now().toString(),
          content: "I understand. Is there anything specific about your budget you'd like to know?",
          sender: "bot",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, this would start/stop voice recording
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start max-w-[80%] space-x-2">
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showBudgetPlan && (
          <Card className="mt-4 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <PieChart className="h-5 w-5 text-primary" />
                <h3 className="font-medium">AI Budget Recommendations</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Savings Goal</span>
                    <span className="text-sm font-medium text-emerald-600">₹{savingsGoal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Suggested Budget Adjustments</h4>
                  {budgetSuggestions.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">₹{item.currentAmount.toLocaleString("en-IN")}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium">₹{item.suggestedAmount.toLocaleString("en-IN")}</span>
                        {item.change !== 0 && (
                          <span
                            className={`flex items-center ${item.change > 0 ? "text-emerald-600" : "text-red-500"}`}
                          >
                            {item.change > 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(item.change).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/10 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Optimization Insight</p>
                      <p className="text-xs text-muted-foreground">
                        Reducing entertainment and shopping expenses by ₹4,000 could help you reach your savings goal 3
                        months earlier.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={isRecording ? "bg-red-100 text-red-600 border-red-200" : ""}
            onClick={toggleRecording}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Ask about budgeting..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button size="icon" onClick={handleSend} disabled={input.trim() === ""}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

