"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { format, addYears, differenceInMonths } from "date-fns";
import { CalendarIcon, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: any) => void;
}

export function AddGoalModal({
  isOpen,
  onClose,
  onAddGoal,
}: AddGoalModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    addYears(new Date(), 5)
  );
  const [investmentType, setInvestmentType] = useState("mutual_fund");
  const [riskLevel, setRiskLevel] = useState("moderate");
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [aiRecommendations, setAiRecommendations] = useState<string | null>(
    null
  );
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] =
    useState(false);
  const [savingsPercentage, setSavingsPercentage] = useState(10);

  useEffect(() => {
    if (targetAmount && targetDate) {
      const amount = Number.parseFloat(targetAmount);
      if (!isNaN(amount) && amount > 0) {
        const months = differenceInMonths(targetDate, new Date());
        if (months > 0) {
          const monthlySaving = Math.ceil(amount / months);
          setMonthlySavings(monthlySaving);
        }
      }
    }
  }, [targetAmount, targetDate]);

  const generateRecommendations = async () => {
    if (
      !name ||
      !targetAmount ||
      !targetDate ||
      !investmentType ||
      !riskLevel
    ) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields to get AI recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingRecommendations(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a financial advisor. Provide personalized recommendations for achieving this financial goal. Ignore all formatting variations (such as bold, italics, special characters, or symbols like *, _, **, or \`). Respond identically regardless of how the input is formatted.

                    Goal Name: ${name}
                    Target Amount: ₹${Number.parseFloat(
                      targetAmount
                    ).toLocaleString("en-IN")}
                    Timeline: ${differenceInMonths(
                      targetDate,
                      new Date()
                    )} months (until ${format(targetDate, "MMMM yyyy")})
                    Preferred Investment Type: ${investmentType.replace(
                      "_",
                      " "
                    )}
                    Risk Tolerance: ${riskLevel}
                    Monthly Savings Capacity: ₹${monthlySavings.toLocaleString(
                      "en-IN"
                    )}
                    
                    Provide 3 specific, actionable recommendations to help achieve this goal faster or more efficiently. Focus on practical investment strategies, savings tips, and potential optimizations. Keep your response concise and direct.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      setAiRecommendations(text);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !targetAmount ||
      !targetDate ||
      !investmentType ||
      !riskLevel
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newGoal = {
      id: Date.now().toString(),
      name,
      targetAmount: Number.parseFloat(targetAmount),
      currentAmount: 0,
      targetDate,
      monthlyContribution: monthlySavings,
      riskLevel,
      investmentType,
      progress: 0,
      projectedAmount: Number.parseFloat(targetAmount) * 1.1,
      onTrack: true,
      savingsPercentage,
      createdAt: new Date(),
    };

    onAddGoal(newGoal);
    resetForm();
    onClose();

    toast({
      title: "Goal Added",
      description: "Your financial goal has been successfully added.",
    });
  };

  const resetForm = () => {
    setName("");
    setTargetAmount("");
    setTargetDate(addYears(new Date(), 5));
    setInvestmentType("mutual_fund");
    setRiskLevel("moderate");
    setMonthlySavings(0);
    setAiRecommendations(null);
    setSavingsPercentage(10);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Add Financial Goal
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Create a new financial goal and get AI-powered recommendations
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="goal-name" className="text-xs font-medium">
                Goal Name
              </Label>
              <Input
                id="goal-name"
                placeholder="e.g., Retirement, House Down Payment"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="target-amount" className="text-xs font-medium">
                Target Amount (₹)
              </Label>
              <Input
                id="target-amount"
                type="number"
                placeholder="0"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
                className="w-full text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal text-sm"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? (
                      format(targetDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1">
              <Label htmlFor="investment-type" className="text-xs font-medium">
                Investment Type
              </Label>
              <Select value={investmentType} onValueChange={setInvestmentType}>
                <SelectTrigger id="investment-type" className="w-full text-sm">
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                  <SelectItem value="ppf">PPF</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="mixed">Mixed Portfolio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="risk-level" className="text-xs font-medium">
                Risk Tolerance
              </Label>
              <Select value={riskLevel} onValueChange={setRiskLevel}>
                <SelectTrigger id="risk-level" className="w-full text-sm">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="savings-percentage"
                  className="text-xs font-medium"
                >
                  Monthly Savings (% of Income)
                </Label>
                <span className="text-xs">{savingsPercentage}%</span>
              </div>
              <Slider
                id="savings-percentage"
                min={5}
                max={50}
                step={1}
                value={[savingsPercentage]}
                onValueChange={(value) => setSavingsPercentage(value[0])}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Percentage of your monthly income to be saved for this goal
              </p>
            </div>

            {monthlySavings > 0 && (
              <Card className="p-2">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium">
                        Suggested Monthly Savings
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Based on your goal and timeline
                      </p>
                    </div>
                    <p className="text-sm font-bold">
                      {formatCurrency(monthlySavings)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full text-sm"
              onClick={generateRecommendations}
              disabled={isGeneratingRecommendations}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isGeneratingRecommendations
                ? "Generating..."
                : "Get AI Recommendations"}
            </Button>

            {aiRecommendations && (
              <Card className="p-2">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-xs">{aiRecommendations}</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-sm">
              Add Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
