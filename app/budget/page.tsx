"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  ShoppingCart,
  Utensils,
  Car,
  Film,
  Smartphone,
  Zap,
  Droplet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calendar,
  Edit,
  Trash2,
  PieChart,
  AlertCircle,
  MessageSquare,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BudgetPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMonth, setSelectedMonth] = useState("current")

  // Sample data
  const monthlyIncome = 4500
  const monthlyExpenses = 3200
  const savingsGoal = 1000
  const currentSavings = 300

  const budgetCategories = [
    { name: "Housing", spent: 1200, budget: 1300, icon: Home, color: "bg-blue-500" },
    { name: "Food", spent: 420, budget: 500, icon: Utensils, color: "bg-green-500" },
    { name: "Transport", spent: 310, budget: 350, icon: Car, color: "bg-amber-500" },
    { name: "Entertainment", spent: 180, budget: 200, icon: Film, color: "bg-purple-500" },
    { name: "Shopping", spent: 250, budget: 300, icon: ShoppingCart, color: "bg-pink-500" },
    { name: "Utilities", spent: 220, budget: 250, icon: Zap, color: "bg-yellow-500" },
    { name: "Phone & Internet", spent: 120, budget: 150, icon: Smartphone, color: "bg-indigo-500" },
    { name: "Water", spent: 80, budget: 100, icon: Droplet, color: "bg-blue-400" },
  ]

  const recentTransactions = [
    { id: 1, name: "Grocery Store", category: "Food", amount: -85.32, date: "Today", icon: ShoppingCart },
    { id: 2, name: "Electric Bill", category: "Utilities", amount: -120.5, date: "Yesterday", icon: Zap },
    { id: 3, name: "Gas Station", category: "Transport", amount: -45.75, date: "Mar 8", icon: Car },
    { id: 4, name: "Restaurant", category: "Food", amount: -65.2, date: "Mar 7", icon: Utensils },
  ]

  const budgetInsights = [
    {
      id: 1,
      title: "Spending Alert",
      description: "You've spent 90% of your entertainment budget with 2 weeks remaining.",
      category: "Entertainment",
      type: "warning",
    },
    {
      id: 2,
      title: "Savings Opportunity",
      description: "You could save $50 more this month by reducing food delivery expenses.",
      category: "Food",
      type: "opportunity",
    },
    {
      id: 3,
      title: "Budget Achievement",
      description: "You've stayed under your utilities budget for 3 consecutive months!",
      category: "Utilities",
      type: "success",
    },
  ]

  const handleAddBudget = () => {
    router.push("/budget/create")
  }

  const handleEditCategory = (category: string) => {
    toast({
      title: "Edit Budget Category",
      description: `Editing budget for ${category}`,
    })
  }

  const handleDeleteCategory = (category: string) => {
    toast({
      title: "Delete Budget Category",
      description: `Are you sure you want to delete ${category}?`,
      variant: "destructive",
    })
  }

  return (
    <MobileLayout title="Budget Management" showBackButton>
      <div className="p-4 space-y-6">
        {/* Budget summary */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-primary-foreground/70">Monthly Budget</p>
                <h3 className="text-3xl font-bold">${monthlyIncome.toLocaleString()}</h3>
              </div>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[130px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="previous">Previous Month</SelectItem>
                  <SelectItem value="next">Next Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <ArrowDownRight className="h-4 w-4 text-red-300 mr-1" />
                  <p className="text-sm text-primary-foreground/70">Spent</p>
                </div>
                <p className="text-xl font-semibold">${monthlyExpenses.toLocaleString()}</p>
                <p className="text-xs text-primary-foreground/70">
                  {Math.round((monthlyExpenses / monthlyIncome) * 100)}% of income
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-emerald-300 mr-1" />
                  <p className="text-sm text-primary-foreground/70">Saved</p>
                </div>
                <p className="text-xl font-semibold">${currentSavings.toLocaleString()}</p>
                <p className="text-xs text-primary-foreground/70">Goal: ${savingsGoal.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Budget Assistant Button */}
        <Button
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => router.push("/budget/chatbot")}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Ask AI Budget Assistant</span>
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Budget progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Budget Progress</h3>
                <span className="text-sm text-muted-foreground">
                  ${monthlyExpenses.toLocaleString()} of ${monthlyIncome.toLocaleString()}
                </span>
              </div>
              <Progress
                value={(monthlyExpenses / monthlyIncome) * 100}
                className="h-2"
                indicatorClassName={monthlyExpenses > monthlyIncome ? "bg-red-500" : undefined}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Savings Progress</h3>
                <span className="text-sm text-muted-foreground">
                  ${currentSavings.toLocaleString()} of ${savingsGoal.toLocaleString()}
                </span>
              </div>
              <Progress value={(currentSavings / savingsGoal) * 100} className="h-2" />
            </div>

            {/* Budget allocation chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-20 w-20 mx-auto mb-2" />
                    <p>Budget allocation chart</p>
                    <p className="text-xs">(Interactive chart would be here)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {budgetCategories.slice(0, 6).map((category, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                      <span className="text-xs">
                        {category.name} ({Math.round((category.budget / monthlyIncome) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent transactions */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Recent Transactions</h3>
                <Button variant="ghost" size="sm" onClick={() => router.push("/transactions")}>
                  View All
                </Button>
              </div>

              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <transaction.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span className="text-red-500 font-medium">${Math.abs(transaction.amount).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Budget Categories</h3>
              <Button variant="outline" size="sm" onClick={handleAddBudget}>
                <Plus className="h-4 w-4 mr-1" />
                Add Category
              </Button>
            </div>

            <div className="space-y-4">
              {budgetCategories.map((category, index) => {
                const percentage = Math.round((category.spent / category.budget) * 100)
                const isOverBudget = category.spent > category.budget

                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`h-10 w-10 rounded-full ${category.color} flex items-center justify-center`}>
                            <category.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-xs text-muted-foreground">Budget: ${category.budget.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category.name)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.name)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={isOverBudget ? "text-red-500" : "text-muted-foreground"}>
                            ${category.spent.toLocaleString()} of ${category.budget.toLocaleString()}
                          </span>
                          <span className={isOverBudget ? "text-red-500 font-medium" : "text-muted-foreground"}>
                            {percentage}%
                          </span>
                        </div>
                        <Progress
                          value={percentage > 100 ? 100 : percentage}
                          className={`h-2 ${isOverBudget ? "bg-red-200" : ""}`}
                          indicatorClassName={isOverBudget ? "bg-red-500" : undefined}
                        />
                      </div>
                      {isOverBudget && (
                        <div className="mt-2 text-xs text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Over budget by ${(category.spent - category.budget).toLocaleString()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Budget Insights</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                AI Powered
              </Badge>
            </div>

            <div className="space-y-3">
              {budgetInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          insight.type === "warning"
                            ? "bg-amber-100 dark:bg-amber-900/20"
                            : insight.type === "opportunity"
                              ? "bg-blue-100 dark:bg-blue-900/20"
                              : "bg-emerald-100 dark:bg-emerald-900/20"
                        }`}
                      >
                        {insight.type === "warning" ? (
                          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        ) : insight.type === "opportunity" ? (
                          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Badge className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{insight.title}</p>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {insight.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        {insight.type === "opportunity" && (
                          <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1">
                            View Suggestions
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Recommendation */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <div className="flex items-start space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Smart Budget Recommendation</CardTitle>
                    <CardDescription>Based on your spending patterns</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Based on your spending patterns, we recommend adjusting your food budget from $500 to $550 and
                  reducing your entertainment budget from $200 to $150.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Apply Recommendations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add budget button */}
        <div className="fixed bottom-20 right-4">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={handleAddBudget}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}

