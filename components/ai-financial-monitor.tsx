"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, AlertCircle, TrendingUp, RefreshCw, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface AIMonitorProps {
  transactions?: any[]
  goals?: any[]
  investments?: any[]
}

export function AIFinancialMonitor({ transactions = [], goals = [], investments = [] }: AIMonitorProps) {
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<any>(null)

  const calculatePercentages = (data: any) => {
    if (data.transactions) {
      data.transactions = data.transactions.map((t: any) => ({
        ...t,
        percentOfIncome: ((t.amount / data.totalIncome) * 100).toFixed(2),
        percentChange: t.previousAmount ? (((t.amount - t.previousAmount) / t.previousAmount) * 100).toFixed(2) : null,
      }))
    }

    if (data.investments) {
      data.investments = data.investments.map((i: any) => ({
        ...i,
        returnPercentage: (((i.currentValue - i.investedAmount) / i.investedAmount) * 100).toFixed(2),
        allocationPercentage: ((i.currentValue / data.totalInvestments) * 100).toFixed(2),
      }))
    }

    if (data.goals) {
      data.goals = data.goals.map((g: any) => ({
        ...g,
        completionPercentage: ((g.currentAmount / g.targetAmount) * 100).toFixed(2),
        monthlyContributionPercentage: ((g.monthlyContribution / data.monthlyIncome) * 100).toFixed(2),
      }))
    }

    return data
  }

  const generateInsights = async () => {
    setLoading(true)
    setError(null)

    try {
      const financialData = calculatePercentages({
        transactions: transactions.slice(0, 10),
        goals: goals,
        investments: investments,
        totalIncome: 75000,
        totalInvestments: 1245000,
        monthlyIncome: 75000,
      })

      const prompt = `
        As a financial AI assistant, analyze this user's financial data and provide 3-4 actionable insights:
        ${JSON.stringify(financialData)}
        
        Focus on:
        1. Spending patterns and budget recommendations
        2. Progress towards financial goals
        3. Investment portfolio optimization
        4. Savings opportunities
        
        Format your response as a JSON array of objects with these properties:
        - title: A short, attention-grabbing title
        - description: A detailed explanation (1-2 sentences)
        - type: "tip", "warning", or "opportunity"
        - category: The financial category this relates to
        - priority: "high", "medium", or "low"
        - percentageMetric: A relevant percentage metric from the data
        - action: A specific action the user can take
      `

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      const text = data.candidates[0].content.parts[0].text

      const parsedInsights = JSON.parse(text)
      setInsights(parsedInsights)
    } catch (error) {
      console.error("Error generating insights:", error)
      setError("Failed to generate insights. Please check your API key or try again later.")

      setInsights([
        {
          title: "Budget Alert",
          description:
            "You've spent 85% of your dining budget with 10 days remaining in the month. Consider limiting restaurant expenses.",
          type: "warning",
          category: "Budgeting",
          priority: "high",
          percentageMetric: "85%",
          action: "Review dining expenses",
        },
        {
          title: "Savings Opportunity",
          description:
            "Based on your spending patterns, you could save an additional ₹9,000/month by reducing subscription services.",
          type: "opportunity",
          category: "Savings",
          priority: "medium",
          percentageMetric: "12%",
          action: "Review subscriptions",
        },
        {
          title: "Investment Rebalancing",
          description:
            "Your equity allocation has increased to 68% of your portfolio, above your target of 60%. Consider rebalancing to maintain your risk profile.",
          type: "tip",
          category: "Investments",
          priority: "medium",
          percentageMetric: "68%",
          action: "Rebalance portfolio",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const openInsightDetails = (insight: any) => {
    setSelectedInsight(insight)
    setDetailsOpen(true)
  }

  useEffect(() => {
    generateInsights()
  }, [])

  return (
    <>
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <CardTitle className="text-lg">AI Financial Insights</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={generateInsights} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {insights.length === 0 && loading ? (
            <div className="text-center py-4">
              <div className="flex justify-center space-x-2 mb-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div
                  className="h-2 w-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">Analyzing your financial data...</p>
            </div>
          ) : (
            insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                {insight.type === "warning" ? (
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                ) : insight.type === "opportunity" ? (
                  <TrendingUp className="h-5 w-5 text-emerald-500 mt-0.5" />
                ) : (
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                )}
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    {insight.percentageMetric && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {insight.percentageMetric}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={`ml-2 text-xs ${
                        insight.priority === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : insight.priority === "medium"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                      }`}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">{insight.description}</p>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-primary text-xs"
                      onClick={() => openInsightDetails(insight)}
                    >
                      View Details
                    </Button>
                    {insight.action && (
                      <Button variant="link" size="sm" className="p-0 h-auto text-primary text-xs ml-4">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Insight Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedInsight?.title}</DialogTitle>
            <DialogDescription>Detailed analysis and recommendations</DialogDescription>
          </DialogHeader>

          {selectedInsight && (
            <div className="space-y-4 py-2">
              <div className="flex items-start space-x-3">
                {selectedInsight.type === "warning" ? (
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                ) : selectedInsight.type === "opportunity" ? (
                  <TrendingUp className="h-5 w-5 text-emerald-500 mt-0.5" />
                ) : (
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                )}
                <div>
                  <p>{selectedInsight.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="text-sm font-medium">{selectedInsight.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Priority:</span>
                      <span className="text-sm font-medium">{selectedInsight.priority}</span>
                    </div>
                    {selectedInsight.percentageMetric && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Metric:</span>
                        <span className="text-sm font-medium">{selectedInsight.percentageMetric}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Recommended Actions:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <span className="text-sm">{selectedInsight.action || "Review your financial data"}</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <span className="text-sm">Consult with a financial advisor for personalized advice</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <span className="text-sm">Set up automated alerts for similar situations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Close
                </Button>
                <Button>Take Action</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

