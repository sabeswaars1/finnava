"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GoalsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 5000,
      targetDate: new Date(2025, 11, 31),
      category: "Savings",
      priority: "High",
    },
    {
      id: 2,
      name: "Down Payment for House",
      targetAmount: 50000,
      currentAmount: 15000,
      targetDate: new Date(2027, 5, 30),
      category: "Major Purchase",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Vacation Fund",
      targetAmount: 5000,
      currentAmount: 2000,
      targetDate: new Date(2025, 7, 31),
      category: "Travel",
      priority: "Low",
    },
  ])

  const handleEditGoal = (id: number) => {
    router.push(`/goals/edit/${id}`)
  }

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
    toast({
      title: "Goal Deleted",
      description: "Your financial goal has been deleted successfully.",
    })
  }

  const handleAddGoal = () => {
    router.push("/goals/add")
  }

  return (
    <MobileLayout title="Financial Goals" showBackButton>
      <div className="p-4 space-y-6">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Your Financial Goals</h2>
            <p className="text-primary-foreground/70">
              Track your progress and stay motivated to achieve your financial dreams.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100
            const daysLeft = Math.ceil((goal.targetDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))

            return (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">{goal.category}</p>
                    </div>
                    <Badge>{goal.priority} Priority</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Amount</p>
                      <p className="font-medium">${goal.currentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target Amount</p>
                      <p className="font-medium">${goal.targetAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target Date</p>
                      <p className="font-medium">{goal.targetDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Days Left</p>
                      <p className="font-medium">{daysLeft} days</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditGoal(goal.id)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="fixed bottom-20 right-4">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={handleAddGoal}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">AI Tip</p>
            </div>
            <p className="text-xs mt-2">
              Setting specific, measurable, achievable, relevant, and time-bound (SMART) goals can significantly
              increase your chances of financial success. Consider breaking larger goals into smaller milestones for
              easier tracking and motivation.
            </p>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}

