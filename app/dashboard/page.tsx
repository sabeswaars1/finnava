"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  ArrowDownRight,
  Coffee,
  ShoppingCart,
  Home,
  Car,
  CreditCard,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Bell,
  Calendar,
  DollarSign,
  Globe,
  PieChart,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AIFinancialMonitor } from "@/components/ai-financial-monitor"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { toast } = useToast()

  // Sample data
  const balance = 874232
  const income = 450000
  const expenses = 215068
  const budgetProgress = 65
  const savingsProgress = 42

  const recentTransactions = [
    { id: 1, name: "Starbucks", category: "Food & Drink", amount: -499, date: "Today", icon: Coffee },
    { id: 2, name: "Amazon", category: "Shopping", amount: -2999, date: "Yesterday", icon: ShoppingCart },
    { id: 3, name: "Rent", category: "Housing", amount: -120000, date: "Mar 1", icon: Home },
    { id: 4, name: "Car Insurance", category: "Transport", amount: -8999, date: "Feb 28", icon: Car },
  ]

  const insights = [
    {
      id: 1,
      title: "Subscription Alert",
      description: "You have 3 unused subscriptions totaling ₹4,297/month",
      icon: AlertCircle,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
    },
    {
      id: 2,
      title: "Investment Opportunity",
      description: "Based on your profile, consider investing in index funds",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
      id: 3,
      title: "Credit Score Update",
      description: "Your credit score increased by 15 points this month",
      icon: CreditCard,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
  ]

  const upcomingBills = [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: 1499,
      dueDate: "Mar 15",
      icon: CreditCard,
      category: "Entertainment",
    },
    {
      id: 2,
      name: "Electricity Bill",
      amount: 8550,
      dueDate: "Mar 18",
      icon: Home,
      category: "Utilities",
    },
    {
      id: 3,
      name: "Phone Bill",
      amount: 6599,
      dueDate: "Mar 22",
      icon: CreditCard,
      category: "Utilities",
    },
  ]

  const handleNotification = () => {
    toast({
      title: "New Notification",
      description: "Your March credit card statement is ready to view.",
      duration: 5000,
    })
  }

  const handleFraudAlert = () => {
    toast({
      title: "Fraud Alert",
      description: "Unusual transaction detected on your credit card. Please verify.",
      variant: "destructive",
      duration: 5000,
    })
  }

  // New state for financial goals summary
  const [topGoals, setTopGoals] = useState([
    { name: "Emergency Fund", progress: 65, targetAmount: 1000000, currentAmount: 650000 },
    { name: "Vacation Savings", progress: 30, targetAmount: 500000, currentAmount: 150000 },
  ])

  return (
    <MobileLayout title="Dashboard">
      <div className="p-4 space-y-6">
        {/* User greeting */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Hello, Alex</h2>
            <p className="text-muted-foreground">Welcome back to your finances</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={handleNotification}>
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="cursor-pointer" onClick={() => router.push("/settings")}>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Balance card */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-primary-foreground/70">Total Balance</p>
              <h3 className="text-3xl font-bold">₹{balance.toLocaleString("en-IN")}</h3>
              <div className="flex justify-between mt-4">
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm text-emerald-300">+₹{income.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-primary-foreground/70">Income</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowDownRight className="h-4 w-4 text-red-300" />
                  <span className="text-sm text-red-300">-₹{expenses.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-primary-foreground/70">Expenses</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Financial Monitor */}
        <AIFinancialMonitor transactions={recentTransactions} goals={topGoals} investments={[]} />

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
            onClick={() => router.push("/news")}
          >
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-xs">News</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
            onClick={() => router.push("/budget")}
          >
            <PieChart className="h-5 w-5 text-primary" />
            <span className="text-xs">Budget</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
            onClick={() => router.push("/loans")}
          >
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-xs">Loans</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
            onClick={() => router.push("/transactions/add")}
          >
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-xs">Add Expense</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
            onClick={() => router.push("/bills")}
          >
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-xs">Bills</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 space-y-1"
            onClick={() => router.push("/investments")}
          >
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-xs">Invest</span>
          </Button>
        </div>

        {/* Financial Goals Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Top Financial Goals</h3>
              <Button variant="ghost" size="sm" onClick={() => router.push("/goals")}>
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {topGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ₹{goal.currentAmount.toLocaleString("en-IN")} / ₹{goal.targetAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget progress */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Monthly Budget</h3>
            <span className="text-sm text-muted-foreground">
              ₹{expenses.toLocaleString("en-IN")} of ₹{(income * 0.7).toLocaleString("en-IN")}
            </span>
          </div>
          <Progress value={budgetProgress} className="h-2" />
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Savings Goal</h3>
            <span className="text-sm text-muted-foreground">₹1,80,000 of ₹5,00,000</span>
          </div>
          <Progress value={savingsProgress} className="h-2" />
        </div>

        {/* Tabs for transactions and insights */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="bills">Upcoming Bills</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Recent Transactions</h3>
              <Button variant="ghost" size="sm" onClick={() => router.push("/transactions")}>
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
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
                  <span className={transaction.amount < 0 ? "text-red-500" : "text-emerald-500"}>
                    {transaction.amount < 0 ? "-" : "+"}₹{Math.abs(transaction.amount).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="insights" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">AI Financial Insights</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                3 New
              </Badge>
            </div>

            <div className="space-y-3">
              {insights.map((insight) => (
                <div key={insight.id} className="p-3 bg-card rounded-lg border">
                  <div className="flex items-start space-x-3">
                    <div className={`h-10 w-10 rounded-full ${insight.bgColor} flex items-center justify-center`}>
                      <insight.icon className={`h-5 w-5 ${insight.color}`} />
                    </div>
                    <div>
                      <p className="font-medium">{insight.title}</p>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline" onClick={() => router.push("/ai-chat")}>
              Ask AI Assistant
            </Button>
          </TabsContent>
          <TabsContent value="bills" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Upcoming Bills</h3>
              <Button variant="ghost" size="sm" onClick={() => router.push("/bills")}>
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <bill.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {bill.category} • Due {bill.dueDate}
                      </p>
                    </div>
                  </div>
                  <span className="text-red-500">-₹{bill.amount.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline" onClick={() => router.push("/bills/add")}>
              Add Bill Reminder
            </Button>
          </TabsContent>
        </Tabs>

        {/* Fraud Alert Demo Button */}
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50"
          onClick={handleFraudAlert}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Demo Fraud Alert
        </Button>
      </div>
    </MobileLayout>
  )
}

