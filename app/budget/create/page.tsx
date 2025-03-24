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
import {
  DollarSign,
  Home,
  ShoppingCart,
  Utensils,
  Car,
  Film,
  Smartphone,
  Zap,
  Droplet,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Plane,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CreateBudgetPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [categoryName, setCategoryName] = useState("")
  const [categoryIcon, setCategoryIcon] = useState("")
  const [budgetAmount, setBudgetAmount] = useState("")
  const [rollover, setRollover] = useState(false)
  const [customName, setCustomName] = useState("")

  const categories = [
    { id: "housing", name: "Housing", icon: Home },
    { id: "food", name: "Food & Dining", icon: Utensils },
    { id: "transportation", name: "Transportation", icon: Car },
    { id: "entertainment", name: "Entertainment", icon: Film },
    { id: "shopping", name: "Shopping", icon: ShoppingCart },
    { id: "utilities", name: "Utilities", icon: Zap },
    { id: "phone", name: "Phone & Internet", icon: Smartphone },
    { id: "water", name: "Water", icon: Droplet },
    { id: "healthcare", name: "Healthcare", icon: HeartPulse },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "travel", name: "Travel", icon: Plane },
    { id: "work", name: "Work Expenses", icon: Briefcase },
    { id: "custom", name: "Custom Category", icon: null },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if ((!categoryName || categoryName === "custom") && !customName) {
      toast({
        title: "Missing Information",
        description: "Please select a category or enter a custom name.",
        variant: "destructive",
      })
      return
    }

    if (!budgetAmount) {
      toast({
        title: "Missing Information",
        description: "Please enter a budget amount.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would save the budget category to your database here
    toast({
      title: "Budget Category Created",
      description: "Your budget category has been successfully created.",
    })

    // Navigate back to budget page
    router.push("/budget")
  }

  return (
    <MobileLayout title="Create Budget Category" showBackButton>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>New Budget Category</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={categoryName} onValueChange={setCategoryName}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center">
                          {category.icon && <category.icon className="h-4 w-4 mr-2" />}
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Category Name (if custom selected) */}
              {categoryName === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-name">Custom Category Name</Label>
                  <Input
                    id="custom-name"
                    placeholder="Enter category name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Budget Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Monthly Budget Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-10"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Rollover Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rollover"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={rollover}
                  onChange={(e) => setRollover(e.target.checked)}
                />
                <Label htmlFor="rollover" className="text-sm font-medium">
                  Roll over unused budget to next month
                </Label>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <Label>Category Color</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "bg-blue-500",
                    "bg-green-500",
                    "bg-amber-500",
                    "bg-purple-500",
                    "bg-pink-500",
                    "bg-yellow-500",
                    "bg-indigo-500",
                    "bg-red-500",
                  ].map((color, index) => (
                    <div
                      key={index}
                      className={`h-8 w-8 rounded-full ${color} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary`}
                      onClick={() => setCategoryIcon(color)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Create Budget</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MobileLayout>
  )
}

