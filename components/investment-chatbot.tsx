"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Sparkles, RefreshCw, TrendingUp, AlertCircle, DollarSign, Target, PieChart } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  isLoading?: boolean
}

interface InvestmentRecommendation {
  type: string
  name: string
  description: string
  expectedReturn: string
  risk: string
  timeHorizon: string
  minInvestment: string
}

export function InvestmentChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your FINNAVA investment advisor. I can help you find the right investment options based on your financial goals and risk tolerance. Let's start by understanding your investment preferences.",
      timestamp: new Date(),
    },
    {
      id: "initial-questions",
      role: "assistant",
      content:
        "Please tell me about your risk appetite (conservative, moderate, or aggressive), investment timeframe, and financial goals.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [riskLevel, setRiskLevel] = useState("moderate")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [investmentTimeframe, setInvestmentTimeframe] = useState("medium")
  const [investmentGoal, setInvestmentGoal] = useState("growth")
  const [recommendations, setRecommendations] = useState<InvestmentRecommendation[]>([])
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!input.trim() && !showPreferences) return

    let userMessage: Message

    if (showPreferences) {
      // Send preferences as a structured message
      const preferencesText = `
        Risk Level: ${riskLevel}
        Investment Amount: ₹${investmentAmount || "Not specified"}
        Investment Timeframe: ${investmentTimeframe}
        Investment Goal: ${investmentGoal}
      `

      userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: preferencesText,
        timestamp: new Date(),
      }

      setShowPreferences(false)
    } else {
      // Send regular text message
      userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date(),
      }
      setInput("")
    }

    setMessages((prev) => [...prev, userMessage])

    // Add loading message
    const loadingMessageId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      {
        id: loadingMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isLoading: true,
      },
    ])

    setIsLoading(true)

    try {
      // Prepare conversation history for context
      const conversationHistory = messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
        .concat([{ role: userMessage.role, content: userMessage.content }])

      // Generate response using AI
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: `You are FINNAVA's investment advisor, an AI assistant specialized in providing personalized investment advice. 
        Your goal is to help users make informed investment decisions based on their risk tolerance, financial goals, and investment timeframe.
        
        When analyzing user preferences:
        - For conservative investors, recommend safer options like fixed deposits, debt funds, and blue-chip stocks
        - For moderate investors, suggest a balanced portfolio with a mix of equity and debt
        - For aggressive investors, recommend growth-focused options like equity funds, mid/small cap stocks, and alternative investments
        
        Always provide specific investment recommendations with expected returns, risks, and minimum investment amounts.
        Be conversational but concise. Focus on Indian investment options and use INR (₹) for currency.`,
        messages: conversationHistory,
        temperature: 0.7,
      })

      // Remove loading message and add response
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== loadingMessageId)
          .concat([
            {
              id: Date.now().toString(),
              role: "assistant",
              content: text,
              timestamp: new Date(),
            },
          ]),
      )

      // Check if we should generate investment recommendations
      if (
        userMessage.content.includes("Risk Level:") ||
        text.toLowerCase().includes("recommend") ||
        text.toLowerCase().includes("suggestion") ||
        text.toLowerCase().includes("here are some investment options")
      ) {
        generateInvestmentRecommendations()
      }
    } catch (error) {
      console.error("Error generating response:", error)

      // Remove loading message and add error message
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== loadingMessageId)
          .concat([
            {
              id: Date.now().toString(),
              role: "assistant",
              content: "I'm sorry, I encountered an error while processing your request. Please try again.",
              timestamp: new Date(),
            },
          ]),
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Generate investment recommendations
  const generateInvestmentRecommendations = async () => {
    setIsGeneratingRecommendations(true)

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Based on the following investment preferences, provide 3-5 specific investment recommendations:
        
        Risk Level: ${riskLevel}
        Investment Amount: ${investmentAmount ? `₹${investmentAmount}` : "Not specified"}
        Investment Timeframe: ${investmentTimeframe}
        Investment Goal: ${investmentGoal}
        
        Format your response as a JSON array of objects with these properties:
        - type: The investment type (e.g., "Mutual Fund", "Stock", "Fixed Deposit")
        - name: Specific investment name or example
        - description: Brief description
        - expectedReturn: Expected return percentage range
        - risk: Risk level (Low, Medium, High)
        - timeHorizon: Recommended holding period
        - minInvestment: Minimum investment amount
        
        Provide realistic Indian investment options with accurate details.`,
        temperature: 0.7,
      })

      // Parse recommendations
      try {
        const parsedRecommendations = JSON.parse(text)
        setRecommendations(parsedRecommendations)
      } catch (parseError) {
        console.error("Error parsing recommendations:", parseError)
        // Fallback recommendations
        setRecommendations([
          {
            type: "Mutual Fund",
            name: "Nifty 50 Index Fund",
            description: "Low-cost fund that tracks the Nifty 50 index, providing exposure to India's top 50 companies",
            expectedReturn: "10-12% annually",
            risk: "Medium",
            timeHorizon: "5+ years",
            minInvestment: "₹1,000",
          },
          {
            type: "Fixed Deposit",
            name: "Bank FD (5-year)",
            description: "Secure investment with guaranteed returns, ideal for conservative investors",
            expectedReturn: "5.5-6.5% annually",
            risk: "Low",
            timeHorizon: "5 years",
            minInvestment: "₹10,000",
          },
          {
            type: "Equity Fund",
            name: "Multicap Equity Fund",
            description: "Diversified equity fund investing across large, mid, and small-cap stocks",
            expectedReturn: "12-15% annually",
            risk: "High",
            timeHorizon: "7+ years",
            minInvestment: "₹5,000",
          },
        ])
      }
    } catch (error) {
      console.error("Error generating recommendations:", error)
      // Fallback recommendations
      setRecommendations([
        {
          type: "Mutual Fund",
          name: "Nifty 50 Index Fund",
          description: "Low-cost fund that tracks the Nifty 50 index, providing exposure to India's top 50 companies",
          expectedReturn: "10-12% annually",
          risk: "Medium",
          timeHorizon: "5+ years",
          minInvestment: "₹1,000",
        },
        {
          type: "Fixed Deposit",
          name: "Bank FD (5-year)",
          description: "Secure investment with guaranteed returns, ideal for conservative investors",
          expectedReturn: "5.5-6.5% annually",
          risk: "Low",
          timeHorizon: "5 years",
          minInvestment: "₹10,000",
        },
      ])
    } finally {
      setIsGeneratingRecommendations(false)
    }
  }

  // Show investment preferences form
  const handleShowPreferences = () => {
    setShowPreferences(true)
  }

  // Get badge color based on risk level
  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-start max-w-[80%] space-x-2">
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                {message.isLoading ? (
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </>
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}

        {/* Investment recommendations */}
        {recommendations.length > 0 && (
          <div className="flex justify-start w-full">
            <div className="max-w-[90%] space-y-2">
              <p className="text-sm font-medium flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Investment Recommendations
              </p>
              <div className="space-y-2">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {rec.type}
                            </Badge>
                            <h4 className="font-medium text-sm">{rec.name}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                            <div className="flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1 text-primary" />
                              <span>Return: {rec.expectedReturn}</span>
                            </div>
                            <div className="flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1 text-primary" />
                              <span>Risk: </span>
                              <Badge variant="outline" className={`ml-1 text-[10px] ${getRiskBadgeColor(rec.risk)}`}>
                                {rec.risk}
                              </Badge>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-primary" />
                              <span>Time: {rec.timeHorizon}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-3 w-3 mr-1 text-primary" />
                              <span>Min: {rec.minInvestment}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setRecommendations([])}>
                Hide Recommendations
              </Button>
            </div>
          </div>
        )}

        {isGeneratingRecommendations && (
          <div className="flex justify-start w-full">
            <div className="max-w-[90%]">
              <Card>
                <CardContent className="p-4 flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  <span className="text-sm">Generating investment recommendations...</span>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Investment preferences form */}
      {showPreferences && (
        <div className="p-4 border-t bg-muted/30">
          <h3 className="font-medium text-sm mb-3">Investment Preferences</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="risk-level">Risk Appetite</Label>
              <Select value={riskLevel} onValueChange={setRiskLevel}>
                <SelectTrigger id="risk-level">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment-amount">Investment Amount (₹)</Label>
              <Input
                id="investment-amount"
                type="number"
                placeholder="Enter amount"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment-timeframe">Investment Timeframe</Label>
              <Select value={investmentTimeframe} onValueChange={setInvestmentTimeframe}>
                <SelectTrigger id="investment-timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short-term (0-2 years)</SelectItem>
                  <SelectItem value="medium">Medium-term (3-5 years)</SelectItem>
                  <SelectItem value="long">Long-term (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment-goal">Investment Goal</Label>
              <Select value={investmentGoal} onValueChange={setInvestmentGoal}>
                <SelectTrigger id="investment-goal">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growth">Wealth Growth</SelectItem>
                  <SelectItem value="income">Regular Income</SelectItem>
                  <SelectItem value="preservation">Capital Preservation</SelectItem>
                  <SelectItem value="tax_saving">Tax Saving</SelectItem>
                  <SelectItem value="retirement">Retirement Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSendMessage}>
                Submit Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Message input */}
      {!showPreferences && (
        <div className="p-4 border-t bg-background">
          <div className="flex space-x-2 mb-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleShowPreferences}>
              <Target className="h-4 w-4 mr-2" />
              Set Investment Preferences
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={generateInvestmentRecommendations}
              disabled={isGeneratingRecommendations}
            >
              <PieChart className="h-4 w-4 mr-2" />
              Get Recommendations
            </Button>
          </div>
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about investments..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

// Clock component for the investment recommendations
function Clock({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

