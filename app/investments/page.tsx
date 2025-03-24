"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  AlertCircle,
  ArrowRight,
  Plus,
  AlertTriangle,
  Sparkles,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Clock,
  Briefcase,
  Building,
  Globe,
  Cpu,
  ShoppingBag,
  DollarSign,
  Award,
  Landmark,
  Coins,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AddGoalModal } from "@/components/add-goal-modal"
// Import the GoalWallet component at the top of the file
import { GoalWallet } from "@/components/goal-wallet"

export default function InvestmentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("portfolio")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("value")
  const [sortOrder, setSortOrder] = useState("desc")
  const [refreshing, setRefreshing] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null)
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false)
  const [investmentGoals, setInvestmentGoals] = useState([
    {
      id: 1,
      name: "Retirement",
      targetAmount: 5000000,
      currentAmount: 1250000,
      targetDate: new Date(2045, 0, 1),
      monthlyContribution: 15000,
      riskLevel: "Moderate",
      progress: 25,
      projectedAmount: 5200000,
      onTrack: true,
    },
    {
      id: 2,
      name: "House Down Payment",
      targetAmount: 2500000,
      currentAmount: 1750000,
      targetDate: new Date(2025, 5, 1),
      monthlyContribution: 25000,
      riskLevel: "Conservative",
      progress: 70,
      projectedAmount: 2600000,
      onTrack: true,
    },
    {
      id: 3,
      name: "Child's Education",
      targetAmount: 3000000,
      currentAmount: 450000,
      targetDate: new Date(2035, 8, 1),
      monthlyContribution: 10000,
      riskLevel: "Moderate",
      progress: 15,
      projectedAmount: 2625000,
      onTrack: false,
    },
  ])

  // Sample data with Indian currency
  const portfolioValue = 1245067
  const portfolioChange = 3.2
  const portfolioChangeAmount = 38545
  const totalInvested = 1000000
  const totalGain = 245067
  const gainPercentage = ((totalGain / totalInvested) * 100).toFixed(2)

  const investments = [
    {
      id: 1,
      name: "Nifty 50 Index Fund",
      ticker: "UTI-NIFTY",
      value: 523045,
      shares: 12.5,
      avgPrice: 38025,
      currentPrice: 41844,
      change: 2.1,
      changeAmount: 10750,
      allocation: 42,
      category: "Mutual Fund",
      sector: "Large Cap",
      color: "bg-blue-500",
      icon: Globe,
      interestRate: null,
      maturityDate: null,
      nominee: "Priya Sharma",
      taxStatus: "ELSS - 3 Year Lock-in",
      returnPercentage: 10.04,
      investmentDate: "15 Jan 2022",
      fundManager: "Aditya Khemka",
      riskRating: "Moderate",
      expenseRatio: 0.1,
      sipAmount: 10000,
      sipDay: 5,
    },
    {
      id: 2,
      name: "Fixed Deposit - HDFC",
      ticker: "FD-HDFC",
      value: 312022,
      shares: null,
      avgPrice: null,
      currentPrice: null,
      change: 0,
      changeAmount: 0,
      allocation: 25,
      category: "Fixed Deposit",
      sector: "Banking",
      color: "bg-green-500",
      icon: Building,
      interestRate: 7.1,
      maturityDate: "12 Dec 2024",
      nominee: "Rahul Sharma",
      taxStatus: "Taxable",
      returnPercentage: 7.1,
      investmentDate: "12 Dec 2021",
      bankName: "HDFC Bank",
      fdType: "Cumulative",
      autoRenewal: true,
      principalAmount: 300000,
    },
    {
      id: 3,
      name: "IT Sector Fund",
      ticker: "ICICI-TECH",
      value: 285000,
      shares: 8,
      avgPrice: 32050,
      currentPrice: 35625,
      change: 4.3,
      changeAmount: 11750,
      allocation: 23,
      category: "Mutual Fund",
      sector: "Technology",
      color: "bg-purple-500",
      icon: Cpu,
      interestRate: null,
      maturityDate: null,
      nominee: "Priya Sharma",
      taxStatus: "ELSS - 3 Year Lock-in",
      returnPercentage: 11.15,
      investmentDate: "23 Mar 2022",
      fundManager: "Neelesh Surana",
      riskRating: "High",
      expenseRatio: 0.8,
      sipAmount: 8000,
      sipDay: 10,
    },
    {
      id: 4,
      name: "PPF Account",
      ticker: "PPF-SBI",
      value: 125000,
      shares: null,
      avgPrice: null,
      currentPrice: null,
      change: 0,
      changeAmount: 0,
      allocation: 10,
      category: "PPF",
      sector: "Government",
      color: "bg-amber-500",
      icon: Landmark,
      interestRate: 7.1,
      maturityDate: "31 Mar 2037",
      nominee: "Rahul Sharma",
      taxStatus: "Tax Free",
      returnPercentage: 7.1,
      investmentDate: "01 Apr 2020",
      accountNumber: "XXXXXXX7890",
      yearlyContribution: 150000,
      maturityAmount: 3500000,
      lockInPeriod: "15 years",
    },
    {
      id: 5,
      name: "Gold ETF",
      ticker: "GOLDBEES",
      value: 85000,
      shares: 50,
      avgPrice: 1850,
      currentPrice: 1700,
      change: -2.8,
      changeAmount: -2450,
      allocation: 7,
      category: "ETF",
      sector: "Commodities",
      color: "bg-yellow-500",
      icon: Coins,
      interestRate: null,
      maturityDate: null,
      nominee: "Priya Sharma",
      taxStatus: "LTCG after 1 year",
      returnPercentage: -8.11,
      investmentDate: "05 Jun 2022",
      assetManager: "Nippon India",
      purity: "99.5%",
      trackingError: 0.3,
      goldQuantity: "25 grams",
    },
    {
      id: 6,
      name: "Reliance Industries",
      ticker: "RELIANCE",
      value: 320000,
      shares: 150,
      avgPrice: 1802.5,
      currentPrice: 2133.33,
      change: 1.8,
      changeAmount: 5670,
      allocation: 26,
      category: "Stock",
      sector: "Energy",
      color: "bg-gray-500",
      icon: Briefcase,
      interestRate: null,
      maturityDate: null,
      nominee: "Rahul Sharma",
      taxStatus: "LTCG after 1 year",
      returnPercentage: 18.35,
      investmentDate: "18 Aug 2021",
      dividendYield: 0.5,
      peRatio: 28.4,
      marketCap: "16.2 Lakh Crore",
      sector: "Oil & Gas",
    },
    {
      id: 7,
      name: "Sukanya Samriddhi",
      ticker: "SSY-PNB",
      value: 95000,
      shares: null,
      avgPrice: null,
      currentPrice: null,
      change: 0,
      changeAmount: 0,
      allocation: 8,
      category: "Government Scheme",
      sector: "Savings",
      color: "bg-blue-400",
      icon: Award,
      interestRate: 8.2,
      maturityDate: "12 Jun 2039",
      nominee: "Ananya Sharma",
      taxStatus: "Tax Free",
      returnPercentage: 8.2,
      investmentDate: "12 Jun 2021",
      accountNumber: "XXXXXXX4567",
      yearlyContribution: 30000,
      maturityAmount: 1800000,
      childName: "Ananya Sharma",
      childDOB: "12 Jun 2018",
    },
    {
      id: 8,
      name: "ELSS Tax Saver",
      ticker: "AXIS-ELSS",
      value: 110000,
      shares: 15,
      avgPrice: 7025,
      currentPrice: 7333,
      change: 1.5,
      changeAmount: 1635,
      allocation: 9,
      category: "Mutual Fund",
      sector: "Diversified",
      color: "bg-orange-500",
      icon: ShoppingBag,
      interestRate: null,
      maturityDate: null,
      nominee: "Priya Sharma",
      taxStatus: "ELSS - 3 Year Lock-in",
      returnPercentage: 4.38,
      investmentDate: "28 Feb 2023",
      fundManager: "Jinesh Gopani",
      riskRating: "Moderate to High",
      expenseRatio: 0.5,
      sipAmount: 12500,
      sipDay: 15,
    },
  ]

  const marketNews = [
    {
      id: 1,
      title: "RBI Holds Repo Rate at 6.5%",
      description:
        "The Reserve Bank of India maintained the repo rate at 6.5% for the fifth consecutive time, citing inflation concerns.",
      source: "Economic Times",
      time: "2 hours ago",
      impact: "neutral",
      sectors: ["Banking", "Real Estate", "NBFCs"],
    },
    {
      id: 2,
      title: "IT Stocks Rally on Strong Q1 Results",
      description: "Major IT companies reported better than expected quarterly results, driving the sector higher.",
      source: "Mint",
      time: "5 hours ago",
      impact: "positive",
      sectors: ["Technology", "IT Services"],
    },
    {
      id: 3,
      title: "Crude Oil Prices Drop Amid Supply Concerns",
      description:
        "Crude oil prices fell 3% as OPEC+ considers increasing production amid global economic slowdown fears.",
      source: "Business Standard",
      time: "Yesterday",
      impact: "negative",
      sectors: ["Energy", "Transportation"],
    },
    {
      id: 4,
      title: "GST Collections Hit ₹1.68 Lakh Crore in April",
      description:
        "GST collections reached a record high of ₹1.68 lakh crore in April, indicating strong economic activity.",
      source: "CNBC-TV18",
      time: "Yesterday",
      impact: "positive",
      sectors: ["Retail", "Manufacturing"],
    },
    {
      id: 5,
      title: "Semiconductor Shortage Easing",
      description:
        "Industry reports suggest the global chip shortage is finally easing, potentially relieving supply chain pressures.",
      source: "The Hindu BusinessLine",
      time: "2 days ago",
      impact: "positive",
      sectors: ["Technology", "Automotive", "Manufacturing"],
    },
  ]

  const aiRecommendations = [
    {
      id: 1,
      title: "Portfolio Rebalancing",
      description:
        "Your technology allocation has grown to 49% of your portfolio. Consider rebalancing to maintain your target asset allocation of 35%.",
      type: "suggestion",
      priority: "medium",
      actions: ["View Details", "Rebalance Now"],
    },
    {
      id: 2,
      title: "Diversification Alert",
      description:
        "Your portfolio is heavily weighted in technology. Consider diversifying into other sectors like healthcare or consumer staples.",
      type: "alert",
      priority: "high",
      actions: ["View Recommendations", "Dismiss"],
    },
    {
      id: 3,
      title: "Investment Opportunity",
      description:
        "Based on your risk profile and goals, consider adding international exposure to your portfolio through a developed markets fund.",
      type: "opportunity",
      priority: "medium",
      actions: ["Explore Options", "Learn More"],
    },
    {
      id: 4,
      title: "Tax-Loss Harvesting",
      description:
        "You have potential tax-loss harvesting opportunities with your Gold ETF that could save approximately ₹12,000 in taxes.",
      type: "suggestion",
      priority: "medium",
      actions: ["View Details", "Take Action"],
    },
    {
      id: 5,
      title: "Dividend Reinvestment",
      description:
        "Enable dividend reinvestment on your Nifty 50 Index Fund to maximize long-term growth through compounding.",
      type: "suggestion",
      priority: "low",
      actions: ["Enable DRIP", "Learn More"],
    },
  ]

  // Format currency in Indian format
  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Filter investments based on search and category
  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch =
      investment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.sector.toLowerCase().includes(searchQuery.toLowerCase())

    if (filterCategory === "all") return matchesSearch
    return matchesSearch && investment.category.toLowerCase() === filterCategory.toLowerCase()
  })

  // Sort investments
  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    let comparison = 0

    if (sortBy === "value") {
      comparison = a.value - b.value
    } else if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "change") {
      comparison = a.change - b.change
    } else if (sortBy === "allocation") {
      comparison = a.allocation - b.allocation
    } else if (sortBy === "return") {
      comparison = (a.returnPercentage || 0) - (b.returnPercentage || 0)
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleRefresh = () => {
    setRefreshing(true)

    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
      toast({
        title: "Portfolio Updated",
        description: "Your investment data has been refreshed with the latest market values.",
      })
    }, 2000)
  }

  const handleAddInvestment = () => {
    router.push("/investments/add")
  }

  const handleViewDetails = (investment: any) => {
    setSelectedInvestment(investment)
    setDetailsOpen(true)
  }

  const handleFraudAlert = () => {
    toast({
      title: "Suspicious Activity Detected",
      description:
        "We've detected unusual login attempts to your brokerage account. Please verify your security settings.",
      variant: "destructive",
    })
  }

  const handleAddGoal = () => {
    setIsAddGoalModalOpen(true)
  }

  const handleAddNewGoal = (newGoal) => {
    setInvestmentGoals([...investmentGoals, newGoal])
  }

  return (
    <MobileLayout title="Investments" showBackButton>
      <div className="p-4 space-y-6">
        {/* Portfolio summary */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Portfolio Value</p>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={portfolioChange >= 0 ? "outline" : "destructive"}
                    className={
                      portfolioChange >= 0
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : ""
                    }
                  >
                    {portfolioChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {portfolioChange >= 0 ? "+" : ""}
                    {portfolioChange}%
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${refreshing ? "animate-spin" : ""}`}
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-3xl font-bold">{formatIndianCurrency(portfolioValue)}</h3>
              <p
                className={`text-sm ${portfolioChange >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
              >
                {portfolioChange >= 0 ? "+" : ""}
                {formatIndianCurrency(portfolioChangeAmount)} today
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Invested</p>
                  <p className="font-medium">{formatIndianCurrency(totalInvested)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Gain/Loss</p>
                  <p
                    className={`font-medium ${totalGain >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {totalGain >= 0 ? "+" : ""}
                    {formatIndianCurrency(totalGain)}
                    <span className="text-xs ml-1">({gainPercentage}%)</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Advisor Card */}
        <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">AI Investment Advisor</h3>
                <p className="text-sm opacity-90">
                  Get personalized investment recommendations and stock predictions powered by AI.
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <Button
              className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => router.push("/investments/ai-advisor")}
            >
              Get AI Insights
            </Button>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="portfolio" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="insights">AI</TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4 mt-4">
            {/* Search and filter */}
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investments..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="flex-1">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="mutual fund">Mutual Funds</SelectItem>
                    <SelectItem value="fixed deposit">Fixed Deposits</SelectItem>
                    <SelectItem value="stock">Stocks</SelectItem>
                    <SelectItem value="etf">ETFs</SelectItem>
                    <SelectItem value="ppf">PPF</SelectItem>
                    <SelectItem value="government scheme">Govt. Schemes</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="change">Performance</SelectItem>
                    <SelectItem value="allocation">Allocation</SelectItem>
                    <SelectItem value="return">Return %</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Portfolio allocation chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-20 w-20 mx-auto mb-2" />
                    <p>Portfolio allocation chart</p>
                    <p className="text-xs">(Interactive chart would be here)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Mutual Funds (42%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Fixed Deposits (25%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs">Stocks (26%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-xs">Other (7%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investments list */}
            <div className="space-y-3">
              {sortedInvestments.length > 0 ? (
                sortedInvestments.map((investment) => (
                  <Card key={investment.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 cursor-pointer" onClick={() => handleViewDetails(investment)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`h-10 w-10 rounded-full ${investment.color} flex items-center justify-center`}
                            >
                              <investment.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">{investment.name}</p>
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {investment.ticker}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {investment.sector} • {investment.category}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatIndianCurrency(investment.value)}</p>
                            {investment.change !== 0 && (
                              <p
                                className={`text-xs ${investment.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                              >
                                {investment.change >= 0 ? "+" : ""}
                                {investment.change}%
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Allocation</span>
                            <span>{investment.allocation}%</span>
                          </div>
                          <Progress value={investment.allocation} className="h-1.5" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {investment.returnPercentage !== null && (
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Return</p>
                              <p
                                className={`text-sm ${investment.returnPercentage >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                              >
                                {investment.returnPercentage >= 0 ? "+" : ""}
                                {investment.returnPercentage}%
                              </p>
                            </div>
                          )}
                          {investment.interestRate !== null && (
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Interest</p>
                              <p className="text-sm">{investment.interestRate}%</p>
                            </div>
                          )}
                          {investment.shares !== null && (
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Units</p>
                              <p className="text-sm">{investment.shares}</p>
                            </div>
                          )}
                          {investment.maturityDate !== null && (
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Maturity</p>
                              <p className="text-sm">{investment.maturityDate}</p>
                            </div>
                          )}
                          {investment.taxStatus !== null && (
                            <div className="space-y-1 col-span-2">
                              <p className="text-xs text-muted-foreground">Tax Status</p>
                              <p className="text-sm truncate">{investment.taxStatus}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No investments found</p>
                  <Button className="mt-4" onClick={handleAddInvestment}>
                    Add Investment
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-4 mt-4">
            {/* Market indices */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Market Indices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">NIFTY 50</p>
                        <p className="text-sm">22,782.45</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">+0.82%</p>
                      <p className="text-xs text-muted-foreground">+185.25</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">SENSEX</p>
                        <p className="text-sm">74,742.50</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">+0.76%</p>
                      <p className="text-xs text-muted-foreground">+564.35</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">BANK NIFTY</p>
                        <p className="text-sm">48,325.75</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">+1.12%</p>
                      <p className="text-xs text-muted-foreground">+536.80</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market news */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Market News</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              {marketNews.map((news) => (
                <Card key={news.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{news.title}</h4>
                          {news.impact === "positive" ? (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Bullish
                            </Badge>
                          ) : news.impact === "negative" ? (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Bearish
                            </Badge>
                          ) : null}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{news.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {news.sectors.map((sector, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <span>{news.source}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{news.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Investment Goals</h3>
              <Button variant="outline" size="sm" onClick={handleAddGoal}>
                <Plus className="h-4 w-4 mr-1" />
                Add Goal
              </Button>
            </div>

            <GoalWallet
              goals={investmentGoals}
              onUpdateGoal={(updatedGoal) => {
                setInvestmentGoals(investmentGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
              }}
            />
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">AI Investment Insights</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                5 New
              </Badge>
            </div>

            {/* Fraud Alert */}
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Potential Fraud Alert</p>
                    <p className="text-sm text-muted-foreground">
                      We've detected unusual activity in cryptocurrency markets related to assets in your watchlist.
                      Exercise caution with any investment in these tokens.
                    </p>
                    <Button variant="destructive" size="sm" className="mt-2" onClick={handleFraudAlert}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          rec.type === "alert"
                            ? "bg-amber-100 dark:bg-amber-900/20"
                            : rec.type === "opportunity"
                              ? "bg-emerald-100 dark:bg-emerald-900/20"
                              : "bg-blue-100 dark:bg-blue-900/20"
                        }`}
                      >
                        <AlertCircle
                          className={`h-5 w-5 ${
                            rec.type === "alert"
                              ? "text-amber-600 dark:text-amber-400"
                              : rec.type === "opportunity"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-blue-600 dark:text-blue-400"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{rec.title}</p>
                          {rec.priority === "high" && (
                            <Badge className="ml-2 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                        <div className="flex space-x-2 mt-2">
                          {rec.actions.map((action, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Market Trend Insight */}
              <Card className="border-blue-200 dark:border-blue-800">
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Market Trend Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        Based on current market conditions and your portfolio, consider increasing allocation to value
                        stocks as inflation concerns ease.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1">
                        View Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Optimization */}
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Tax Optimization Opportunity</p>
                      <p className="text-sm text-muted-foreground">
                        You have potential tax-loss harvesting opportunities that could save you approximately ₹42,000
                        in taxes this year.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary text-sm mt-1">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full" onClick={() => router.push("/ai-chat")}>
              Get Personalized Advice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </TabsContent>
        </Tabs>

        {/* Add investment button */}
        <div className="fixed bottom-20 right-4">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={handleAddInvestment}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Investment Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedInvestment?.name}</DialogTitle>
            <DialogDescription>
              {selectedInvestment?.category} • {selectedInvestment?.sector}
            </DialogDescription>
          </DialogHeader>

          {selectedInvestment && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-10 w-10 rounded-full ${selectedInvestment.color} flex items-center justify-center`}
                  >
                    <selectedInvestment.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedInvestment.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedInvestment.ticker}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatIndianCurrency(selectedInvestment.value)}</p>
                  {selectedInvestment.change !== 0 && (
                    <p
                      className={`text-xs ${selectedInvestment.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {selectedInvestment.change >= 0 ? "+" : ""}
                      {selectedInvestment.change}%
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Allocation</p>
                  <p className="font-medium">{selectedInvestment.allocation}%</p>
                </div>
                {selectedInvestment.returnPercentage !== null && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Return</p>
                    <p
                      className={`font-medium ${selectedInvestment.returnPercentage >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {selectedInvestment.returnPercentage >= 0 ? "+" : ""}
                      {selectedInvestment.returnPercentage}%
                    </p>
                  </div>
                )}
                {selectedInvestment.interestRate !== null && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Interest Rate</p>
                    <p className="font-medium">{selectedInvestment.interestRate}%</p>
                  </div>
                )}
                {selectedInvestment.shares !== null && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Units/Shares</p>
                    <p className="font-medium">{selectedInvestment.shares}</p>
                  </div>
                )}
                {selectedInvestment.investmentDate && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Investment Date</p>
                    <p className="font-medium">{selectedInvestment.investmentDate}</p>
                  </div>
                )}
                {selectedInvestment.maturityDate && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Maturity Date</p>
                    <p className="font-medium">{selectedInvestment.maturityDate}</p>
                  </div>
                )}
                {selectedInvestment.nominee && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Nominee</p>
                    <p className="font-medium">{selectedInvestment.nominee}</p>
                  </div>
                )}
                {selectedInvestment.taxStatus && (
                  <div className="space-y-1 col-span-2">
                    <p className="text-xs text-muted-foreground">Tax Status</p>
                    <p className="font-medium">{selectedInvestment.taxStatus}</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Category-specific details */}
              {selectedInvestment.category === "Mutual Fund" && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Mutual Fund Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Fund Manager</p>
                      <p className="text-sm">{selectedInvestment.fundManager}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Risk Rating</p>
                      <p className="text-sm">{selectedInvestment.riskRating}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Expense Ratio</p>
                      <p className="text-sm">{selectedInvestment.expenseRatio}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">SIP Amount</p>
                      <p className="text-sm">{formatIndianCurrency(selectedInvestment.sipAmount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">SIP Date</p>
                      <p className="text-sm">{selectedInvestment.sipDay}th of every month</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedInvestment.category === "Fixed Deposit" && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Fixed Deposit Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Bank</p>
                      <p className="text-sm">{selectedInvestment.bankName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">FD Type</p>
                      <p className="text-sm">{selectedInvestment.fdType}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Principal</p>
                      <p className="text-sm">{formatIndianCurrency(selectedInvestment.principalAmount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Auto Renewal</p>
                      <p className="text-sm">{selectedInvestment.autoRenewal ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedInvestment.category === "Stock" && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Stock Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Dividend Yield</p>
                      <p className="text-sm">{selectedInvestment.dividendYield}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">P/E Ratio</p>
                      <p className="text-sm">{selectedInvestment.peRatio}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Market Cap</p>
                      <p className="text-sm">{selectedInvestment.marketCap}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Sector</p>
                      <p className="text-sm">{selectedInvestment.sector}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Close
                </Button>
                <Button>Edit Investment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <AddGoalModal
        isOpen={isAddGoalModalOpen}
        onClose={() => setIsAddGoalModalOpen(false)}
        onAddGoal={handleAddNewGoal}
      />
    </MobileLayout>
  )
}

