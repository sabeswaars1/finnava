"use client"

import { useState } from "react"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, BarChart, LineChart } from "lucide-react"

export default function AnalyticsPage() {
  const [timeFrame, setTimeFrame] = useState("month")

  // Mock data for charts
  const categoryData = [
    { category: "Food & Drink", amount: 450 },
    { category: "Housing", amount: 1200 },
    { category: "Transport", amount: 300 },
    { category: "Entertainment", amount: 200 },
    { category: "Utilities", amount: 150 },
  ]

  const monthlySpending = [
    { month: "Jan", amount: 2100 },
    { month: "Feb", amount: 2300 },
    { month: "Mar", amount: 2000 },
    { month: "Apr", amount: 2200 },
    { month: "May", amount: 2400 },
    { month: "Jun", amount: 2150 },
  ]

  const incomeVsExpenses = [
    { month: "Jan", income: 4000, expenses: 2100 },
    { month: "Feb", income: 4000, expenses: 2300 },
    { month: "Mar", income: 4000, expenses: 2000 },
    { month: "Apr", income: 4000, expenses: 2200 },
    { month: "May", income: 4000, expenses: 2400 },
    { month: "Jun", income: 4000, expenses: 2150 },
  ]

  return (
    <MobileLayout title="Analytics" showBackButton>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Financial Analytics</h2>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-full w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-full w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="income" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-full w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Income Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-full w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart className="h-full w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-full w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

