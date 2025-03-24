"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  Search,
  Plus,
  Coffee,
  ShoppingCart,
  Home,
  Car,
  Briefcase,
  Utensils,
  Plane,
  Smartphone,
  Filter,
  CalendarIcon,
  ArrowDownUp,
  Download,
  BarChart,
} from "lucide-react"
import { Label } from "@/components/ui/label"

export default function TransactionsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [showFilters, setShowFilters] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [amountFilter, setAmountFilter] = useState("all")
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([])

  // Mock transactions data
  const transactions = [
    {
      id: 1,
      name: "Starbucks",
      category: "Food & Drink",
      amount: -4.99,
      date: new Date(2025, 2, 10),
      icon: Coffee,
      paymentMethod: "Credit Card",
      recurring: false,
    },
    {
      id: 2,
      name: "Amazon",
      category: "Shopping",
      amount: -29.99,
      date: new Date(2025, 2, 9),
      icon: ShoppingCart,
      paymentMethod: "Credit Card",
      recurring: false,
    },
    {
      id: 3,
      name: "Rent",
      category: "Housing",
      amount: -1200,
      date: new Date(2025, 2, 1),
      icon: Home,
      paymentMethod: "Bank Transfer",
      recurring: true,
    },
    {
      id: 4,
      name: "Car Insurance",
      category: "Transport",
      amount: -89.99,
      date: new Date(2025, 1, 28),
      icon: Car,
      paymentMethod: "Bank Transfer",
      recurring: true,
    },
    {
      id: 5,
      name: "Salary",
      category: "Income",
      amount: 3500,
      date: new Date(2025, 1, 28),
      icon: Briefcase,
      paymentMethod: "Direct Deposit",
      recurring: true,
    },
    {
      id: 6,
      name: "Restaurant",
      category: "Food & Drink",
      amount: -42.5,
      date: new Date(2025, 1, 27),
      icon: Utensils,
      paymentMethod: "Credit Card",
      recurring: false,
    },
    {
      id: 7,
      name: "Flight Tickets",
      category: "Travel",
      amount: -350,
      date: new Date(2025, 1, 25),
      icon: Plane,
      paymentMethod: "Credit Card",
      recurring: false,
    },
    {
      id: 8,
      name: "Phone Bill",
      category: "Utilities",
      amount: -65.99,
      date: new Date(2025, 1, 24),
      icon: Smartphone,
      paymentMethod: "Credit Card",
      recurring: true,
    },
    {
      id: 9,
      name: "Freelance Work",
      category: "Income",
      amount: 250,
      date: new Date(2025, 1, 22),
      icon: Briefcase,
      paymentMethod: "Bank Transfer",
      recurring: false,
    },
    {
      id: 10,
      name: "Grocery Store",
      category: "Food & Drink",
      amount: -78.35,
      date: new Date(2025, 1, 20),
      icon: ShoppingCart,
      paymentMethod: "Debit Card",
      recurring: false,
    },
  ]

  // Filter and sort transactions
  useEffect(() => {
    let result = [...transactions]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (transaction) =>
          transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by type (income/expenses/all)
    if (filter === "income") {
      result = result.filter((transaction) => transaction.amount > 0)
    } else if (filter === "expenses") {
      result = result.filter((transaction) => transaction.amount < 0)
    }

    // Filter by date range
    if (dateRange.from) {
      result = result.filter((transaction) => transaction.date >= dateRange.from!)
    }
    if (dateRange.to) {
      result = result.filter((transaction) => transaction.date <= dateRange.to!)
    }

    // Filter by category
    if (categoryFilter !== "all") {
      result = result.filter((transaction) => transaction.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    // Filter by amount
    const fifty = 50
    const fiveHundred = 500
    if (amountFilter === "small") {
      result = result.filter((transaction) => Math.abs(transaction.amount) < fifty)
    } else if (amountFilter === "medium") {
      result = result.filter(
        (transaction) => Math.abs(transaction.amount) >= fifty && Math.abs(transaction.amount) < fiveHundred,
      )
    } else if (amountFilter === "large") {
      result = result.filter((transaction) => Math.abs(transaction.amount) >= fiveHundred)
    }

    // Sort transactions
    result.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc" ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime()
      } else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      } else if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      return 0
    })

    setFilteredTransactions(result)
  }, [searchQuery, filter, dateRange, sortBy, sortOrder, categoryFilter, amountFilter])

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce(
    (groups, transaction) => {
      const date = format(transaction.date, "MMM d, yyyy")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {} as Record<string, typeof filteredTransactions>,
  )

  // Get unique categories for filter
  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  const handleAddTransaction = () => {
    router.push("/transactions/add")
  }

  const handleExportTransactions = () => {
    alert("Exporting transactions...")
    // In a real app, this would generate a CSV or PDF file
  }

  const handleViewAnalytics = () => {
    router.push("/transactions/analytics")
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <MobileLayout title="Transactions" showBackButton>
      <div className="p-4 space-y-6">
        {/* Search and filter */}
        <div className="space-y-2">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <Card className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="range" selected={dateRange} onSelect={setDateRange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category, index) => (
                          <SelectItem key={index} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Select value={amountFilter} onValueChange={setAmountFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Amount</SelectItem>
                        <SelectItem value="small">Small (&lt; $50)</SelectItem>
                        <SelectItem value="medium">Medium ($50 - $500)</SelectItem>
                        <SelectItem value="large">Large (&gt; $500)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <div className="flex space-x-2">
                      <Select value={sortBy} onValueChange={setSortBy} className="flex-1">
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="amount">Amount</SelectItem>
                          <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" onClick={toggleSortOrder}>
                        <ArrowDownUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDateRange({ from: undefined, to: undefined })
                      setCategoryFilter("all")
                      setAmountFilter("all")
                      setSortBy("date")
                      setSortOrder("desc")
                    }}
                  >
                    Reset Filters
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleExportTransactions}>
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleViewAnalytics}>
                      <BarChart className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" onClick={() => setFilter("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="income" onClick={() => setFilter("income")}>
              Income
            </TabsTrigger>
            <TabsTrigger value="expenses" onClick={() => setFilter("expenses")}>
              Expenses
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4 mt-4">
            {Object.keys(groupedTransactions).length > 0 ? (
              Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date} className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
                  {transactions.map((transaction) => (
                    <Card key={transaction.id}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <transaction.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">{transaction.name}</p>
                                {transaction.recurring && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    Recurring
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>{transaction.category}</span>
                                <span className="mx-1">•</span>
                                <span>{transaction.paymentMethod}</span>
                              </div>
                            </div>
                          </div>
                          <span
                            className={
                              transaction.amount < 0 ? "text-red-500 font-medium" : "text-emerald-500 font-medium"
                            }
                          >
                            {transaction.amount < 0 ? "-" : "+"}$
                            {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="income" className="space-y-4 mt-4">
            {/* Income transactions will be shown here */}
            {Object.keys(groupedTransactions).length > 0 ? (
              Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date} className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
                  {transactions
                    .filter((t) => t.amount > 0)
                    .map((transaction) => (
                      <Card key={transaction.id}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <transaction.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium">{transaction.name}</p>
                                  {transaction.recurring && (
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      Recurring
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span>{transaction.category}</span>
                                  <span className="mx-1">•</span>
                                  <span>{transaction.paymentMethod}</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-emerald-500 font-medium">
                              +${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No income transactions found</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4 mt-4">
            {/* Expense transactions will be shown here */}
            {Object.keys(groupedTransactions).length > 0 ? (
              Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date} className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
                  {transactions
                    .filter((t) => t.amount < 0)
                    .map((transaction) => (
                      <Card key={transaction.id}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <transaction.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium">{transaction.name}</p>
                                  {transaction.recurring && (
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      Recurring
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span>{transaction.category}</span>
                                  <span className="mx-1">•</span>
                                  <span>{transaction.paymentMethod}</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-red-500 font-medium">
                              -${Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No expense transactions found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Add transaction button */}
        <div className="fixed bottom-20 right-4">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={handleAddTransaction}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}

