"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  Car,
  CreditCard,
  GraduationCap,
  Plus,
  AlertCircle,
  Calendar,
  Sparkles,
  FileText,
  RefreshCw,
  ChevronRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoansPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("active")
  const [addLoanOpen, setAddLoanOpen] = useState(false)
  const [refinanceDialogOpen, setRefinanceDialogOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<any>(null)

  // Sample data
  const activeLoans = [
    {
      id: 1,
      name: "Home Loan",
      lender: "HDFC Bank",
      amount: 3500000,
      remainingAmount: 2800000,
      emi: 32000,
      interestRate: 8.5,
      tenure: 240,
      remainingTenure: 192,
      nextPayment: "Mar 15, 2023",
      icon: Home,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Car Loan",
      lender: "ICICI Bank",
      amount: 800000,
      remainingAmount: 560000,
      emi: 15000,
      interestRate: 9.2,
      tenure: 60,
      remainingTenure: 42,
      nextPayment: "Mar 10, 2023",
      icon: Car,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Personal Loan",
      lender: "SBI Bank",
      amount: 500000,
      remainingAmount: 350000,
      emi: 12000,
      interestRate: 12.5,
      tenure: 48,
      remainingTenure: 36,
      nextPayment: "Mar 20, 2023",
      icon: CreditCard,
      color: "bg-purple-500",
    },
  ]

  const completedLoans = [
    {
      id: 4,
      name: "Education Loan",
      lender: "Axis Bank",
      amount: 400000,
      emi: 9000,
      interestRate: 10.5,
      tenure: 48,
      completedDate: "Jan 15, 2023",
      icon: GraduationCap,
      color: "bg-amber-500",
    },
  ]

  const refinanceOptions = [
    {
      lender: "SBI Bank",
      interestRate: 7.8,
      processingFee: 5000,
      monthlySavings: 3200,
      totalSavings: 153600,
    },
    {
      lender: "ICICI Bank",
      interestRate: 8.0,
      processingFee: 4000,
      monthlySavings: 2800,
      totalSavings: 134400,
    },
  ]

  const loanAlerts = [
    {
      id: 1,
      title: "EMI Due Soon",
      description: "Your Home Loan EMI of ₹32,000 is due in 3 days",
      type: "warning",
      loan: "Home Loan",
    },
    {
      id: 2,
      title: "Refinance Opportunity",
      description: "You could save ₹3,200/month by refinancing your Home Loan",
      type: "opportunity",
      loan: "Home Loan",
    },
    {
      id: 3,
      title: "Rate Change Alert",
      description: "Your Car Loan interest rate will increase by 0.25% next month",
      type: "warning",
      loan: "Car Loan",
    },
  ]

  const handleAddLoan = () => {
    toast({
      title: "Loan Added",
      description: "Your new loan has been added successfully",
    })
    setAddLoanOpen(false)
  }

  const handleRefinance = () => {
    toast({
      title: "Refinance Application Submitted",
      description: "We'll process your refinance application and get back to you soon",
    })
    setRefinanceDialogOpen(false)
  }

  const openRefinanceDialog = (loan: any) => {
    setSelectedLoan(loan)
    setRefinanceDialogOpen(true)
  }

  return (
    <MobileLayout title="Loan Management" showBackButton>
      <div className="p-4 space-y-6">
        {/* Loan Summary */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-primary-foreground/70">Total Loan Balance</p>
              <h3 className="text-3xl font-bold">₹37,10,000</h3>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-xs text-primary-foreground/70">Monthly EMI</p>
                  <p className="text-lg font-semibold">₹59,000</p>
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/70">Active Loans</p>
                  <p className="text-lg font-semibold">3</p>
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/70">Avg. Interest</p>
                  <p className="text-lg font-semibold">9.8%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Alerts */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Loan Alerts</h3>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              3 New
            </Badge>
          </div>

          <div className="space-y-3">
            {loanAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        alert.type === "warning"
                          ? "bg-amber-100 dark:bg-amber-900/20"
                          : "bg-blue-100 dark:bg-blue-900/20"
                      }`}
                    >
                      {alert.type === "warning" ? (
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{alert.title}</p>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {alert.loan}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      {alert.type === "opportunity" && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary text-sm mt-1"
                          onClick={() => openRefinanceDialog(activeLoans[0])}
                        >
                          View Refinance Options
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs for active and completed loans */}
        <Tabs defaultValue="active" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Loans</TabsTrigger>
            <TabsTrigger value="completed">Completed Loans</TabsTrigger>
          </TabsList>

          {/* Active Loans Tab */}
          <TabsContent value="active" className="space-y-4 mt-4">
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full ${loan.color} flex items-center justify-center`}>
                          <loan.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{loan.name}</p>
                          <p className="text-xs text-muted-foreground">{loan.lender}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        onClick={() => router.push(`/loans/${loan.id}`)}
                      >
                        Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Loan Amount</p>
                          <p className="font-medium">₹{loan.amount.toLocaleString("en-IN")}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">EMI</p>
                          <p className="font-medium">₹{loan.emi.toLocaleString("en-IN")}/month</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Interest Rate</p>
                          <p className="font-medium">{loan.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Remaining Tenure</p>
                          <p className="font-medium">{loan.remainingTenure} months</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Repayment Progress</span>
                          <span>{Math.round(((loan.amount - loan.remainingAmount) / loan.amount) * 100)}%</span>
                        </div>
                        <Progress value={((loan.amount - loan.remainingAmount) / loan.amount) * 100} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Next payment: {loan.nextPayment}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => openRefinanceDialog(loan)}>
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Refinance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Loans Tab */}
          <TabsContent value="completed" className="space-y-4 mt-4">
            <div className="space-y-4">
              {completedLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full ${loan.color} flex items-center justify-center`}>
                          <loan.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{loan.name}</p>
                          <p className="text-xs text-muted-foreground">{loan.lender}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Loan Amount</p>
                          <p className="font-medium">₹{loan.amount.toLocaleString("en-IN")}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">EMI</p>
                          <p className="font-medium">₹{loan.emi.toLocaleString("en-IN")}/month</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Interest Rate</p>
                          <p className="font-medium">{loan.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tenure</p>
                          <p className="font-medium">{loan.tenure} months</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Completed on: {loan.completedDate}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/loans/${loan.id}`)}>
                          <FileText className="h-3 w-3 mr-1" />
                          View Statement
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Loan Dialog */}
        <Dialog open={addLoanOpen} onOpenChange={setAddLoanOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Loan</DialogTitle>
              <DialogDescription>Enter the details of your loan to track and manage it.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loan-type" className="text-right">
                  Loan Type
                </Label>
                <Select defaultValue="home">
                  <SelectTrigger id="loan-type" className="col-span-3">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="car">Car Loan</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="education">Education Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lender" className="text-right">
                  Lender
                </Label>
                <Input id="lender" placeholder="Bank or lender name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Loan Amount
                </Label>
                <Input id="amount" type="number" placeholder="e.g., 1000000" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="interest" className="text-right">
                  Interest Rate
                </Label>
                <Input id="interest" type="number" step="0.1" placeholder="e.g., 8.5" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenure" className="text-right">
                  Tenure (months)
                </Label>
                <Input id="tenure" type="number" placeholder="e.g., 240" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="emi" className="text-right">
                  EMI Amount
                </Label>
                <Input id="emi" type="number" placeholder="e.g., 25000" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddLoanOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLoan}>Add Loan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Refinance Dialog */}
        <Dialog open={refinanceDialogOpen} onOpenChange={setRefinanceDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Refinance Options</DialogTitle>
              <DialogDescription>
                {selectedLoan && `Better rates available for your ${selectedLoan.name}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {refinanceOptions.map((option, index) => (
                <Card key={index} className={index === 0 ? "border-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{option.lender}</p>
                        <p className="text-sm text-muted-foreground">Interest Rate: {option.interestRate}%</p>
                      </div>
                      {index === 0 && <Badge className="bg-primary">Best Offer</Badge>}
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-sm">
                        <span>Processing Fee</span>
                        <span>₹{option.processingFee.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Monthly Savings</span>
                        <span className="text-green-600 font-medium">
                          ₹{option.monthlySavings.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Savings</span>
                        <span className="text-green-600 font-medium">
                          ₹{option.totalSavings.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-3"
                      variant={index === 0 ? "default" : "outline"}
                      onClick={handleRefinance}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRefinanceDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add loan button */}
        <div className="fixed bottom-20 right-4">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setAddLoanOpen(true)}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}

