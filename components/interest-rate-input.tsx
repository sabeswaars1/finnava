"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface InterestRateInputProps {
  onRateChange: (rate: number) => void
  investmentType: string
  riskLevel: string
  timeframe: string
}

export function InterestRateInput({ onRateChange, investmentType, riskLevel, timeframe }: InterestRateInputProps) {
  const [interestRate, setInterestRate] = useState<string>("")
  const [aiPrediction, setAiPrediction] = useState<string | null>(null)
  const [predictionRange, setPredictionRange] = useState<{ min: number; max: number } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable")

  // Generate AI prediction when investment parameters change
  useEffect(() => {
    if (investmentType && riskLevel && timeframe) {
      generatePrediction()
    }
  }, [investmentType, riskLevel, timeframe])

  // Handle interest rate change
  const handleRateChange = (value: string) => {
    setInterestRate(value)

    // Update parent component if valid number
    const rate = Number.parseFloat(value)
    if (!isNaN(rate)) {
      onRateChange(rate)
    }
  }

  // Generate AI prediction
  const generatePrediction = async () => {
    setIsGenerating(true)

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `You are a financial advisor AI. Based on current market conditions and historical data, predict the potential interest rate or return range for this investment:
        
        Investment Type: ${investmentType.replace("_", " ")}
        Risk Level: ${riskLevel}
        Time Horizon: ${timeframe}
        
        Provide your response in this exact JSON format:
        {
          "prediction": "A brief 1-2 sentence explanation of the predicted rate and factors affecting it",
          "minRate": X.X,
          "maxRate": Y.Y,
          "trend": "up" or "down" or "stable"
        }
        
        Where X.X and Y.Y are realistic percentage numbers (e.g., 5.5, 12.0) for this type of investment in India.
        The "trend" should indicate if rates for this investment type are generally trending up, down, or stable.
        
        Only return the JSON object, nothing else.`,
      })

      try {
        const parsedResponse = JSON.parse(text)
        setAiPrediction(parsedResponse.prediction)
        setPredictionRange({ min: parsedResponse.minRate, max: parsedResponse.maxRate })
        setTrend(parsedResponse.trend as "up" | "down" | "stable")

        // Set default interest rate to the middle of the range
        const defaultRate = ((parsedResponse.minRate + parsedResponse.maxRate) / 2).toFixed(1)
        setInterestRate(defaultRate)
        onRateChange(Number.parseFloat(defaultRate))
      } catch (parseError) {
        console.error("Error parsing prediction:", parseError)
        setAiPrediction(
          "Based on current market conditions, you can expect returns in the range of 6-8% for this type of investment.",
        )
        setPredictionRange({ min: 6, max: 8 })
        setTrend("stable")
      }
    } catch (error) {
      console.error("Error generating prediction:", error)
      setAiPrediction(
        "Based on current market conditions, you can expect returns in the range of 6-8% for this type of investment.",
      )
      setPredictionRange({ min: 6, max: 8 })
      setTrend("stable")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <span>Interest Rate / Expected Return</span>
          {trend === "up" && <TrendingUp className="h-4 w-4 ml-2 text-emerald-500" />}
          {trend === "down" && <TrendingDown className="h-4 w-4 ml-2 text-red-500" />}
        </CardTitle>
        <CardDescription>Enter expected annual return percentage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="interest-rate">Interest Rate (%)</Label>
          <div className="flex space-x-2">
            <Input
              id="interest-rate"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={interestRate}
              onChange={(e) => handleRateChange(e.target.value)}
              className="flex-1"
            />
            <span className="flex items-center text-lg font-medium">%</span>
          </div>
        </div>

        {isGenerating ? (
          <div className="bg-muted p-3 rounded-md flex justify-center">
            <div className="flex space-x-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
            </div>
          </div>
        ) : (
          <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <div className="flex items-center mb-1">
                  <h4 className="text-sm font-medium">AI Prediction</h4>
                  {predictionRange && (
                    <Badge variant="outline" className="ml-2">
                      {predictionRange.min}% - {predictionRange.max}%
                    </Badge>
                  )}
                </div>
                <p className="text-sm">{aiPrediction || "Loading prediction..."}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start space-x-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3 mt-0.5" />
          <p>Past performance is not indicative of future results. These are estimates based on historical data.</p>
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={generatePrediction} disabled={isGenerating}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
          Refresh Prediction
        </Button>
      </CardContent>
    </Card>
  )
}

// RefreshCw component for the interest rate input
function RefreshCw({ className }: { className?: string }) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}

