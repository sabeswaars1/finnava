"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, Home, Smartphone, Wifi, Plus, Check, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BillsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")

  // Sample data
  const upcomingBills = [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: 14.99,
      dueDate: "Mar 15, 2025",
      category: "Entertainment",
      icon: Wifi,
      status: "upcoming",
      autopay: true,
    },
    {
      id: 2,
      name: "Electricity Bill",
      amount: 85.5,
      dueDate: "Mar 18, 2025",
      category: "Utilities",
      icon: Home,
      status: "upcoming",
      autopay: false,
    },
    {
      id: 3,
      name: "Phone Bill",
      amount: 65.99,
      dueDate: "Mar 22, 2025",
      category: "Utilities",
      icon: Smartphone,
      status: "upcoming",
      autopay: true,
    },
    {
      id: 4,
      name: "Credit Card Payment",
      amount: 350.0,
      dueDate: "Mar 25, 2025",
      category: "Financial",
      icon: CreditCard,
      status: "upcoming",
      autopay: false,
      warning: "Late payment will affect credit score",
    },
  ]

  const paidBills = [
    {
      id: 5,
      name: "Rent",
      amount: 1200.0,
      dueDate: "Mar 1, 2025",
      paidDate: "Feb 28, 2025",
      category: "Housing",
      icon: Home,
      status: "paid",
    },
    {
      id: 6,
      name: "Internet Service",
      amount: 59.99,
      dueDate: "Mar 5, 2025",
      paidDate: "Mar 3, 2025",
      category: "Utilities",
      icon: Wifi,
      status: "paid",
    },
    {
      id: 7,
      name: "Gym Membership",
      amount: 45.0,
      dueDate: "Mar 10, 2025",
      paidDate: "Mar 10, 2025",
      category: "Health",
      icon: CreditCard,
      status: "paid",
    },
  ]

  const handlePayBill = (billId: number) => {
    toast({
      title: "Bill Paid",
      description: "Your payment has been processed successfully.",
    })
  }

  const handleSetupAutopay = (billId: number) => {
    toast({
      title: "Autopay Enabled",
      description: "This bill will be automatically paid on the due date.",
    })
  }

  return (
    <MobileLayout title="Bills & Subscriptions" showBackButton>
      <div className="p-4 space-y-6">
        {/* Summary Card */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/70">Due This Month</p>
                <h3 className="text-3xl font-bold">$516.48</h3>
                <p className="text-sm text-primary-foreground/70 mt-1">4 upcoming bills</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          {/* Upcoming Bills Tab */}
          <TabsContent value="upcoming" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Upcoming Bills</h3>
              <Button variant="outline" size="sm" onClick={() => router.push("/bills/add")}>
                <Plus className="h-4 w-4 mr-1" />
                Add Bill
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingBills.map((bill) => (
                <Card key={bill.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                          <bill.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{bill.name}</p>
                            {bill.autopay && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                              >
                                Autopay
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{bill.category}</p>
                          <p className="text-xs mt-1">Due: {bill.dueDate}</p>
                          {bill.warning && (
                            <div className="flex items-center mt-1 text-amber-600 dark:text-amber-400">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              <p className="text-xs">{bill.warning}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${bill.amount.toFixed(2)}</p>
                        <div className="flex flex-col space-y-2 mt-2">
                          {!bill.autopay && (
                            <>
                              <Button size="sm" onClick={() => handlePayBill(bill.id)}>
                                Pay Now
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleSetupAutopay(bill.id)}>
                                Setup Autopay
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Paid Bills Tab */}
          <TabsContent value="paid" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Paid Bills</h3>
            </div>

            <div className="space-y-3">
              {paidBills.map((bill) => (
                <Card key={bill.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mt-1">
                          <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-medium">{bill.name}</p>
                          <p className="text-xs text-muted-foreground">{bill.category}</p>
                          <p className="text-xs mt-1">Due: {bill.dueDate}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">Paid: {bill.paidDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${bill.amount.toFixed(2)}</p>
                        <Badge
                          variant="outline"
                          className="mt-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                        >
                          Paid
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

