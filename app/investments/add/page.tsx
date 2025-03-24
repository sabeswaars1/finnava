"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DollarSign, Hash, Briefcase, BarChart, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AddInvestmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [ticker, setTicker] = useState("")
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [sector, setSector] = useState("")
  const [enableDividendReinvestment, setEnableDividendReinvestment] = useState(false)
  const [enablePriceAlerts, setEnablePriceAlerts] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!name || !ticker || !shares || !price || !category || !sector) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would save the investment to your database here
    toast({
      title: "Investment Added",
      description: "Your investment has been successfully added to your portfolio.",
    })

    // Navigate back to investments page
    router.push("/investments")
  }

  return (
    <MobileLayout title="Add Investment" showBackButton>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Investment</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Investment Type */}
              <div className="space-y-2">
                <Label htmlFor="category">Investment Type</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="etf">ETF</SelectItem>
                    <SelectItem value="bond">Bond</SelectItem>
                    <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Investment Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Investment Name</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="e.g., Apple Inc., S&P 500 ETF"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Ticker Symbol */}
              <div className="space-y-2">
                <Label htmlFor="ticker">Ticker Symbol</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="ticker"
                    placeholder="e.g., AAPL, VOO"
                    className="pl-10"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    required
                  />
                </div>
              </div>

              {/* Sector */}
              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <div className="relative">
                  <BarChart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Select value={sector} onValueChange={setSector} required>
                    <SelectTrigger id="sector" className="pl-10">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="financials">Financials</SelectItem>
                      <SelectItem value="consumer_discretionary">Consumer Discretionary</SelectItem>
                      <SelectItem value="consumer_staples">Consumer Staples</SelectItem>
                      <SelectItem value="industrials">Industrials</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                      <SelectItem value="materials">Materials</SelectItem>
                      <SelectItem value="communication_services">Communication Services</SelectItem>
                      <SelectItem value="broad_market">Broad Market</SelectItem>
                      <SelectItem value="fixed_income">Fixed Income</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Number of Shares */}
              <div className="space-y-2">
                <Label htmlFor="shares">Number of Shares</Label>
                <Input
                  id="shares"
                  type="number"
                  step="0.0001"
                  placeholder="0"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  required
                />
              </div>

              {/* Purchase Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Purchase Price Per Share</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-10"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Dividend Reinvestment */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dividend-reinvestment" className="text-sm font-medium">
                    Dividend Reinvestment
                  </Label>
                  <p className="text-xs text-muted-foreground">Automatically reinvest dividends</p>
                </div>
                <Switch
                  id="dividend-reinvestment"
                  checked={enableDividendReinvestment}
                  onCheckedChange={setEnableDividendReinvestment}
                />
              </div>

              {/* Price Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="price-alerts" className="text-sm font-medium">
                    Price Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">Get notified of significant price changes</p>
                </div>
                <Switch id="price-alerts" checked={enablePriceAlerts} onCheckedChange={setEnablePriceAlerts} />
              </div>

              {/* Note */}
              <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  This information is for tracking purposes only. FINNAVA does not execute trades or manage your actual
                  investments.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Add Investment</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MobileLayout>
  )
}

