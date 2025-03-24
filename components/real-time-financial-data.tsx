"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, RefreshCw, Info, TrendingUp, TrendingDown, Clock } from "lucide-react"

interface InvestmentDetail {
  id: string
  type: string
  name: string
  value: number
  change?: number
  yield?: number
  maturityDate?: string
  interestRate?: number
  startDate?: string
  monthlyContribution?: number
  totalInvested?: number
  returns?: number
  lastUpdated?: string
  bank?: string
  accountNumber?: string
  nominee?: string
  lockInPeriod?: string
  taxStatus?: string
  riskLevel?: string
}

export function RealTimeFinancialData() {
  const [data, setData] = useState<InvestmentDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentDetail | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const fetchData = async () => {
    setLoading(true)
    // In a real application, this would be an API call to fetch live data
    // For this example, we'll use mock data
    const mockData: InvestmentDetail[] = [
      {
        id: "fd1",
        type: "Fixed Deposit",
        name: "HDFC Bank FD",
        value: 100000,
        yield: 5.5,
        maturityDate: "2025-06-15",
        interestRate: 5.5,
        startDate: "2023-06-15",
        totalInvested: 100000,
        returns: 5500,
        bank: "HDFC Bank",
        accountNumber: "XXXX1234",
        nominee: "Priya Sharma",
        lockInPeriod: "1 year",
        taxStatus: "Taxable",
        riskLevel: "Low",
        lastUpdated: "2023-12-10",
      },
      {
        id: "fd2",
        type: "Fixed Deposit",
        name: "SBI Tax Saver FD",
        value: 150000,
        yield: 6.2,
        maturityDate: "2028-03-20",
        interestRate: 6.2,
        startDate: "2023-03-20",
        totalInvested: 150000,
        returns: 9300,
        bank: "State Bank of India",
        accountNumber: "XXXX5678",
        nominee: "Rahul Sharma",
        lockInPeriod: "5 years",
        taxStatus: "Tax Saving under 80C",
        riskLevel: "Low",
        lastUpdated: "2023-12-10",
      },
      {
        id: "sip1",
        type: "SIP",
        name: "ICICI Prudential Bluechip Fund",
        value: 85000,
        change: 12.5,
        monthlyContribution: 5000,
        startDate: "2022-01-10",
        totalInvested: 75000,
        returns: 10000,
        riskLevel: "Moderate",
        lastUpdated: "2023-12-10",
      },
      {
        id: "sip2",
        type: "SIP",
        name: "Axis Long Term Equity Fund",
        value: 120000,
        change: 15.2,
        monthlyContribution: 8000,
        startDate: "2021-08-15",
        totalInvested: 104000,
        returns: 16000,
        riskLevel: "Moderate-High",
        lastUpdated: "2023-12-10",
      },
      {
        id: "gold1",
        type: "Gold",
        name: "Digital Gold",
        value: 50000,
        change: 8.3,
        totalInvested: 45000,
        returns: 5000,
        riskLevel: "Moderate",
        lastUpdated: "2023-12-10",
      },
      {
        id: "stock1",
        type: "Stock",
        name: "Reliance Industries",
        value: 75000,
        change: 22.5,
        totalInvested: 60000,
        returns: 15000,
        riskLevel: "High",
        lastUpdated: "2023-12-10",
      },
      {
        id: "stock2",
        type: "Stock",
        name: "HDFC Bank",
        value: 45000,
        change: -3.2,
        totalInvested: 48000,
        returns: -3000,
        riskLevel: "High",
        lastUpdated: "2023-12-10",
      },
      {
        id: "ppf1",
        type: "PPF",
        name: "Public Provident Fund",
        value: 250000,
        yield: 7.1,
        interestRate: 7.1,
        startDate: "2018-04-01",
        totalInvested: 210000,
        returns: 40000,
        lockInPeriod: "15 years",
        taxStatus: "Tax-free",
        riskLevel: "Low",
        lastUpdated: "2023-12-10",
      },
      {
        id: "rd1",
        type: "Recurring Deposit",
        name: "Canara Bank RD",
        value: 60000,
        yield: 5.8,
        monthlyContribution: 5000,
        interestRate: 5.8,
        startDate: "2022-09-01",
        maturityDate: "2025-09-01",
        totalInvested: 55000,
        returns: 5000,
        bank: "Canara Bank",
        riskLevel: "Low",
        lastUpdated: "2023-12-10",
      },
    ]

    setData(mockData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // Set up an interval to fetch data every 60 seconds
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const openInvestmentDetails = (investment: InvestmentDetail) => {
    setSelectedInvestment(investment)
    setIsDialogOpen(true)
  }

  const filteredData =
    activeTab === "all" ? data : data.filter((item) => item.type.toLowerCase() === activeTab.toLowerCase())

  // Calculate total portfolio value
  const totalPortfolioValue = data.reduce((sum, item) => sum + item.value, 0)

  // Calculate total returns
  const totalReturns = data.reduce((sum, item) => sum + (item.returns || 0), 0)

  // Calculate total invested
  const totalInvested = data.reduce((sum, item) => sum + (item.totalInvested || 0), 0)

  // Calculate return percentage
  const returnPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              Real-Time Financial Data
              <Badge variant="outline" className="ml-2 flex items-center">
                <RefreshCw className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleString("en-IN")}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="flex justify-center space-x-2 mb-4">
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
            </div>
            <p className="text-muted-foreground">Loading your investment data...</p>
          </div>
        ) : (
          <>
            {/* Portfolio Summary */}
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Portfolio Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-xl font-bold">₹{totalPortfolioValue.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-xl font-bold">₹{totalInvested.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                  <p className={`text-xl font-bold ${totalReturns >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {totalReturns >= 0 ? "+" : ""}₹{totalReturns.toLocaleString("en-IN")}
                    <span className="text-sm ml-1">({returnPercentage.toFixed(2)}%)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Investment Type Tabs */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="fixed deposit">FD</TabsTrigger>
                <TabsTrigger value="sip">SIP</TabsTrigger>
                <TabsTrigger value="stock">Stocks</TabsTrigger>
                <TabsTrigger value="gold">Gold</TabsTrigger>
                <TabsTrigger value="ppf">PPF</TabsTrigger>
              </TabsList>
            </Tabs>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Returns</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => openInvestmentDetails(item)}
                  >
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">₹{item.value.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right">
                      {item.change !== undefined ? (
                        <span className={item.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {item.change >= 0 ? (
                            <ArrowUpRight className="inline h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="inline h-4 w-4 mr-1" />
                          )}
                          {Math.abs(item.change)}%
                        </span>
                      ) : item.yield !== undefined ? (
                        <span className="text-blue-600">{item.yield}% yield</span>
                      ) : (
                        <span>-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>

      {/* Investment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedInvestment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedInvestment.name}</DialogTitle>
                <DialogDescription>{selectedInvestment.type}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-xl font-bold">₹{selectedInvestment.value.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Returns</p>
                    {selectedInvestment.returns !== undefined && (
                      <p className={`font-bold ${selectedInvestment.returns >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {selectedInvestment.returns >= 0 ? "+" : ""}₹
                        {selectedInvestment.returns.toLocaleString("en-IN")}
                        {selectedInvestment.totalInvested && (
                          <span className="text-xs block">
                            ({((selectedInvestment.returns / selectedInvestment.totalInvested) * 100).toFixed(2)}%)
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {selectedInvestment.totalInvested && (
                    <div>
                      <p className="text-sm text-muted-foreground">Total Invested</p>
                      <p className="font-medium">₹{selectedInvestment.totalInvested.toLocaleString("en-IN")}</p>
                    </div>
                  )}
                  {selectedInvestment.interestRate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-medium">{selectedInvestment.interestRate}%</p>
                    </div>
                  )}
                  {selectedInvestment.startDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {new Date(selectedInvestment.startDate).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  )}
                  {selectedInvestment.maturityDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Maturity Date</p>
                      <p className="font-medium">
                        {new Date(selectedInvestment.maturityDate).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  )}
                  {selectedInvestment.monthlyContribution && (
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                      <p className="font-medium">₹{selectedInvestment.monthlyContribution.toLocaleString("en-IN")}</p>
                    </div>
                  )}
                  {selectedInvestment.bank && (
                    <div>
                      <p className="text-sm text-muted-foreground">Bank</p>
                      <p className="font-medium">{selectedInvestment.bank}</p>
                    </div>
                  )}
                  {selectedInvestment.accountNumber && (
                    <div>
                      <p className="text-sm text-muted-foreground">Account Number</p>
                      <p className="font-medium">{selectedInvestment.accountNumber}</p>
                    </div>
                  )}
                  {selectedInvestment.nominee && (
                    <div>
                      <p className="text-sm text-muted-foreground">Nominee</p>
                      <p className="font-medium">{selectedInvestment.nominee}</p>
                    </div>
                  )}
                  {selectedInvestment.lockInPeriod && (
                    <div>
                      <p className="text-sm text-muted-foreground">Lock-in Period</p>
                      <p className="font-medium">{selectedInvestment.lockInPeriod}</p>
                    </div>
                  )}
                  {selectedInvestment.taxStatus && (
                    <div>
                      <p className="text-sm text-muted-foreground">Tax Status</p>
                      <p className="font-medium">{selectedInvestment.taxStatus}</p>
                    </div>
                  )}
                  {selectedInvestment.riskLevel && (
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="font-medium">{selectedInvestment.riskLevel}</p>
                    </div>
                  )}
                  {selectedInvestment.lastUpdated && (
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(selectedInvestment.lastUpdated).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Performance
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Tax Impact
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

