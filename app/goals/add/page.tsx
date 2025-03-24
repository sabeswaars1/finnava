"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/mobile-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addYears, differenceInMonths } from "date-fns";
import {
  CalendarIcon,
  Sparkles,
  AlertCircle,
  Landmark,
  PiggyBank,
  Home,
  Car,
  GraduationCap,
  Plane,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddGoalPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("templates");
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    addYears(new Date(), 5)
  );
  const [category, setCategory] = useState("savings");
  const [priority, setPriority] = useState("medium");
  const [investmentType, setInvestmentType] = useState("mutual_fund");
  const [riskLevel, setRiskLevel] = useState("moderate");
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(10);
  const [aiRecommendations, setAiRecommendations] = useState<string | null>(
    null
  );
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] =
    useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Predefined goal templates
  const goalTemplates = [
    {
      id: "emergency_fund",
      name: "Emergency Fund",
      description: "Save 3-6 months of expenses for unexpected situations",
      icon: PiggyBank,
      color: "bg-blue-500",
      defaultAmount: 300000,
      defaultTimeframe: 24,
      category: "savings",
      priority: "high",
    },
    {
      id: "home_down_payment",
      name: "Home Down Payment",
      description: "Save for a down payment on your dream home",
      icon: Home,
      color: "bg-green-500",
      defaultAmount: 1500000,
      defaultTimeframe: 60,
      category: "major_purchase",
      priority: "high",
    },
    {
      id: "car_purchase",
      name: "Car Purchase",
      description: "Save for buying a new or used car",
      icon: Car,
      color: "bg-purple-500",
      defaultAmount: 800000,
      defaultTimeframe: 36,
      category: "major_purchase",
      priority: "medium",
    },
    {
      id: "education",
      name: "Education Fund",
      description: "Save for higher education or skill development",
      icon: GraduationCap,
      color: "bg-amber-500",
      defaultAmount: 500000,
      defaultTimeframe: 48,
      category: "education",
      priority: "medium",
    },
    {
      id: "vacation",
      name: "Vacation Fund",
      description: "Save for your dream vacation",
      icon: Plane,
      color: "bg-pink-500",
      defaultAmount: 200000,
      defaultTimeframe: 12,
      category: "travel",
      priority: "low",
    },
    {
      id: "retirement",
      name: "Retirement",
      description: "Long-term savings for comfortable retirement",
      icon: Landmark,
      color: "bg-teal-500",
      defaultAmount: 5000000,
      defaultTimeframe: 300,
      category: "retirement",
      priority: "high",
    },
  ];

  // Calculate suggested monthly savings
  const calculateMonthlySavings = (amount: number, months: number) => {
    if (months > 0) {
      return Math.ceil(amount / months);
    }
    return 0;
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = goalTemplates.find((t) => t.id === templateId);

    if (template) {
      setName(template.name);
      setTargetAmount(template.defaultAmount.toString());
      setTargetDate(
        addYears(new Date(), Math.floor(template.defaultTimeframe / 12))
      );
      setCategory(template.category);
      setPriority(template.priority);

      // Calculate monthly savings
      const months = template.defaultTimeframe;
      const monthlySaving = calculateMonthlySavings(
        template.defaultAmount,
        months
      );
      setMonthlySavings(monthlySaving);

      // Switch to custom tab to allow editing
      setActiveTab("custom");
    }
  };

  // Generate AI recommendations using Google Gemini 2.0 Flash
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
                    text: `You are a financial advisor. Provide personalized recommendations for achieving this financial goal:
                    
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name || !targetAmount || !targetDate || !category || !priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would save the goal to your database
    toast({
      title: "Goal Added",
      description: "Your financial goal has been successfully added.",
    });

    // Navigate back to goals page
    router.push("/goals");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MobileLayout title="Add Financial Goal" showBackButton>
      <div className="p-4 space-y-6">
        <Tabs
          defaultValue="templates"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom Goal</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Choose from common financial goals to get started quickly
            </p>

            <div className="grid grid-cols-2 gap-4">
              {goalTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${
                    selectedTemplate === template.id ? "border-primary" : ""
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-4">
                    <div
                      className={`h-10 w-10 rounded-full ${template.color} flex items-center justify-center mb-3`}
                    >
                      <template.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {template.description}
                    </p>
                    <p className="text-sm font-medium mt-2">
                      {formatCurrency(template.defaultAmount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(template.defaultTimeframe / 12)} years
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Custom Goal Tab */}
          <TabsContent value="custom" className="space-y-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Goal Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Goal Details</CardTitle>
                  <CardDescription>Define your financial goal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Form fields for goal details */}
                  <div className="space-y-2">
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input
                      id="goal-name"
                      placeholder="e.g., Retirement, House Down Payment"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-amount">Target Amount (₹)</Label>
                    <Input
                      id="target-amount"
                      type="number"
                      placeholder="0"
                      value={targetAmount}
                      onChange={(e) => {
                        setTargetAmount(e.target.value);
                        if (e.target.value && targetDate) {
                          const amount = Number.parseFloat(e.target.value);
                          const months = differenceInMonths(
                            targetDate,
                            new Date()
                          );
                          if (!isNaN(amount) && amount > 0 && months > 0) {
                            setMonthlySavings(
                              calculateMonthlySavings(amount, months)
                            );
                          }
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
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
                          onSelect={(date) => {
                            setTargetDate(date);
                            if (date && targetAmount) {
                              const amount = Number.parseFloat(targetAmount);
                              const months = differenceInMonths(
                                date,
                                new Date()
                              );
                              if (!isNaN(amount) && amount > 0 && months > 0) {
                                setMonthlySavings(
                                  calculateMonthlySavings(amount, months)
                                );
                              }
                            }
                          }}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="retirement">Retirement</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="major_purchase">
                            Major Purchase
                          </SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Strategy Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Strategy</CardTitle>
                  <CardDescription>
                    Define how you'll achieve this goal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="investment-type">
                      Preferred Investment Type
                    </Label>
                    <Select
                      value={investmentType}
                      onValueChange={setInvestmentType}
                    >
                      <SelectTrigger id="investment-type">
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                        <SelectItem value="stocks">Stocks</SelectItem>
                        <SelectItem value="fixed_deposit">
                          Fixed Deposit
                        </SelectItem>
                        <SelectItem value="ppf">PPF</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="real_estate">Real Estate</SelectItem>
                        <SelectItem value="mixed">Mixed Portfolio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="risk-level">Risk Tolerance</Label>
                    <Select value={riskLevel} onValueChange={setRiskLevel}>
                      <SelectTrigger id="risk-level">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">
                          Conservative
                        </SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="savings-percentage">
                        Monthly Savings (% of Income)
                      </Label>
                      <span className="text-sm">{savingsPercentage}%</span>
                    </div>
                    <Slider
                      id="savings-percentage"
                      min={5}
                      max={50}
                      step={1}
                      value={[savingsPercentage]}
                      onValueChange={(value) => setSavingsPercentage(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Percentage of your monthly income to be automatically
                      saved for this goal
                    </p>
                  </div>

                  {monthlySavings > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              Suggested Monthly Savings
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Based on your goal and timeline
                            </p>
                          </div>
                          <p className="text-lg font-bold">
                            {formatCurrency(monthlySavings)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* AI Recommendations Card */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    Get personalized advice for your goal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={generateRecommendations}
                    disabled={isGeneratingRecommendations}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isGeneratingRecommendations
                      ? "Generating Recommendations..."
                      : "Get AI Recommendations"}
                  </Button>

                  {isGeneratingRecommendations ? (
                    <div className="bg-muted p-4 rounded-md flex justify-center">
                      <div className="flex space-x-2">
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  ) : aiRecommendations ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                        <div className="text-sm">{aiRecommendations}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4 mx-auto mb-2" />
                      Fill in the details and click "Get AI Recommendations" for
                      personalized advice
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Form Submission Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Goal</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
