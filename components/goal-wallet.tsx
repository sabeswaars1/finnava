"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  AlertCircle,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  monthlyContribution: number;
  riskLevel: string;
  progress: number;
  projectedAmount: number;
  onTrack: boolean;
  savingsPercentage: number;
  createdAt: Date;
}

interface Transaction {
  id: string;
  goalId: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: Date;
  description: string;
  automatic: boolean;
}

interface GoalWalletProps {
  goals: Goal[];
  onUpdateGoal: (updatedGoal: Goal) => void;
}

export function GoalWallet({ goals, onUpdateGoal }: GoalWalletProps) {
  const { toast } = useToast();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Open wallet for a specific goal
  const openWallet = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsWalletOpen(true);

    // Filter transactions for this goal
    const goalTransactions = transactions.filter((t) => t.goalId === goal.id);

    // Generate AI insight if no transactions yet
    if (goalTransactions.length === 0) {
      generateAiInsight(goal);
    }
  };

  // Handle deposit
  const handleDeposit = () => {
    if (!selectedGoal) return;

    const amount = Number.parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      });
      return;
    }

    // Create transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      goalId: selectedGoal.id,
      amount,
      type: "deposit",
      date: new Date(),
      description: "Manual deposit",
      automatic: false,
    };

    setTransactions([...transactions, newTransaction]);

    // Update goal
    const updatedGoal = {
      ...selectedGoal,
      currentAmount: selectedGoal.currentAmount + amount,
      progress: Math.min(
        100,
        Math.round(
          ((selectedGoal.currentAmount + amount) / selectedGoal.targetAmount) *
            100
        )
      ),
    };

    onUpdateGoal(updatedGoal);
    setSelectedGoal(updatedGoal);
    setDepositAmount("");
    setIsDepositOpen(false);

    toast({
      title: "Deposit Successful",
      description: `${formatCurrency(amount)} has been added to your ${
        selectedGoal.name
      } goal.`,
    });

    // Generate new AI insight
    generateAiInsight(updatedGoal);
  };

  // Handle withdrawal
  const handleWithdraw = () => {
    if (!selectedGoal) return;

    const amount = Number.parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > selectedGoal.currentAmount) {
      toast({
        title: "Invalid Amount",
        description:
          "Please enter a valid withdrawal amount that doesn't exceed your current balance.",
        variant: "destructive",
      });
      return;
    }

    // Create transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      goalId: selectedGoal.id,
      amount,
      type: "withdrawal",
      date: new Date(),
      description: "Manual withdrawal",
      automatic: false,
    };

    setTransactions([...transactions, newTransaction]);

    // Update goal
    const updatedGoal = {
      ...selectedGoal,
      currentAmount: selectedGoal.currentAmount - amount,
      progress: Math.round(
        ((selectedGoal.currentAmount - amount) / selectedGoal.targetAmount) *
          100
      ),
    };

    onUpdateGoal(updatedGoal);
    setSelectedGoal(updatedGoal);
    setWithdrawAmount("");
    setIsWithdrawOpen(false);

    toast({
      title: "Withdrawal Successful",
      description: `${formatCurrency(amount)} has been withdrawn from your ${
        selectedGoal.name
      } goal.`,
    });

    // Generate new AI insight
    generateAiInsight(updatedGoal);
  };

  // Simulate automatic deposit
  const simulateAutomaticDeposit = () => {
    if (!selectedGoal) return;

    const amount = selectedGoal.monthlyContribution;

    // Create transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      goalId: selectedGoal.id,
      amount,
      type: "deposit",
      date: new Date(),
      description: "Automatic monthly deposit",
      automatic: true,
    };

    setTransactions([...transactions, newTransaction]);

    // Update goal
    const updatedGoal = {
      ...selectedGoal,
      currentAmount: selectedGoal.currentAmount + amount,
      progress: Math.min(
        100,
        Math.round(
          ((selectedGoal.currentAmount + amount) / selectedGoal.targetAmount) *
            100
        )
      ),
    };

    onUpdateGoal(updatedGoal);
    setSelectedGoal(updatedGoal);

    toast({
      title: "Automatic Deposit",
      description: `${formatCurrency(
        amount
      )} has been automatically added to your ${selectedGoal.name} goal.`,
    });

    // Generate new AI insight
    generateAiInsight(updatedGoal);
  };

  // Generate AI insight using Gemini 2.0 Flash API
  const generateAiInsight = async (goal: Goal) => {
    setIsGeneratingInsight(true);

    try {
      const goalTransactions = transactions.filter((t) => t.goalId === goal.id);

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
                    text: `You are a financial advisor AI. Analyze this financial goal and provide a brief, personalized insight or recommendation:
                    
                    Goal Name: ${goal.name}
                    Target Amount: ${formatCurrency(goal.targetAmount)}
                    Current Amount: ${formatCurrency(goal.currentAmount)}
                    Progress: ${goal.progress}%
                    Target Date: ${formatDate(goal.targetDate)}
                    Monthly Contribution: ${formatCurrency(
                      goal.monthlyContribution
                    )}
                    Risk Level: ${goal.riskLevel}
                    
                    Transaction History (${
                      goalTransactions.length
                    } transactions):
                    ${goalTransactions
                      .map(
                        (t) =>
                          `- ${formatDate(t.date)}: ${
                            t.type === "deposit" ? "Deposit" : "Withdrawal"
                          } of ${formatCurrency(t.amount)} (${
                            t.automatic ? "Automatic" : "Manual"
                          })`
                      )
                      .join("\n")}
                    
                    Provide a single, concise paragraph (2-3 sentences) with actionable advice to help the user reach their goal more effectively. Focus on savings rate, investment strategy, or timeline adjustments as appropriate.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate insight");
      }

      const data = await response.json();
      const insight = data.candidates[0].content.parts[0].text;
      setAiInsight(insight);
    } catch (error) {
      console.error("Error generating insight:", error);
      setAiInsight(
        "Based on your current savings rate, you're making good progress toward your goal. Consider increasing your monthly contribution slightly to reach your target faster, or explore investment options that align with your risk tolerance."
      );
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  // Get goal-specific transactions
  const getGoalTransactions = () => {
    if (!selectedGoal) return [];
    return transactions
      .filter((t) => t.goalId === selectedGoal.id)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  // Calculate time remaining
  const getTimeRemaining = (goal: Goal) => {
    const now = new Date();
    const targetDate = new Date(goal.targetDate);
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "1 day remaining";
    if (diffDays < 30) return `${diffDays} days remaining`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month remaining";
    if (diffMonths < 12) return `${diffMonths} months remaining`;

    const diffYears = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    if (remainingMonths === 0) {
      return diffYears === 1
        ? "1 year remaining"
        : `${diffYears} years remaining`;
    }

    return `${diffYears} year${
      diffYears > 1 ? "s" : ""
    }, ${remainingMonths} month${remainingMonths > 1 ? "s" : ""} remaining`;
  };

  return (
    <>
      {/* Goal cards */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{goal.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {getTimeRemaining(goal)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openWallet(goal)}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {formatCurrency(goal.currentAmount)} of{" "}
                    {formatCurrency(goal.targetAmount)}
                  </span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Monthly Savings
                  </p>
                  <p className="font-medium">
                    {formatCurrency(goal.monthlyContribution)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Auto-Save</p>
                  <p className="font-medium">
                    {goal.savingsPercentage}% of Income
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goal wallet dialog */}
      <Dialog open={isWalletOpen} onOpenChange={setIsWalletOpen}>
        <DialogContent className="max-w-md">
          {selectedGoal && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedGoal.name} Wallet</DialogTitle>
                <DialogDescription>
                  Manage your savings for this financial goal
                </DialogDescription>
              </DialogHeader>

              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Current Balance
                          </p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(selectedGoal.currentAmount)}
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <PiggyBank className="h-6 w-6 text-primary" />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{selectedGoal.progress}%</span>
                        </div>
                        <Progress
                          value={selectedGoal.progress}
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            Target Amount
                          </p>
                          <p className="font-medium">
                            {formatCurrency(selectedGoal.targetAmount)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            Target Date
                          </p>
                          <p className="font-medium">
                            {formatDate(selectedGoal.targetDate)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            Monthly Contribution
                          </p>
                          <p className="font-medium">
                            {formatCurrency(selectedGoal.monthlyContribution)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            Auto-Save Percentage
                          </p>
                          <p className="font-medium">
                            {selectedGoal.savingsPercentage}% of Income
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Insight */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">AI Insight</h4>
                          {isGeneratingInsight ? (
                            <div className="flex space-x-2 py-2">
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
                          ) : (
                            <p className="text-sm mt-1">
                              {aiInsight || "Loading insight..."}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsDepositOpen(true)}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2 text-emerald-500" />
                      Deposit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsWithdrawOpen(true)}
                      disabled={selectedGoal.currentAmount <= 0}
                    >
                      <ArrowDownRight className="h-4 w-4 mr-2 text-red-500" />
                      Withdraw
                    </Button>
                  </div>

                  <Button className="w-full" onClick={simulateAutomaticDeposit}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Simulate Monthly Auto-Deposit
                  </Button>
                </TabsContent>

                <TabsContent value="transactions" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Transaction History</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateAiInsight(selectedGoal)}
                    >
                      <RefreshCw
                        className={`h-4 w-4 mr-1 ${
                          isGeneratingInsight ? "animate-spin" : ""
                        }`}
                      />
                      Refresh
                    </Button>
                  </div>

                  {getGoalTransactions().length > 0 ? (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {getGoalTransactions().map((transaction) => (
                        <Card key={transaction.id}>
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                    transaction.type === "deposit"
                                      ? "bg-emerald-100 dark:bg-emerald-900/20"
                                      : "bg-red-100 dark:bg-red-900/20"
                                  }`}
                                >
                                  {transaction.type === "deposit" ? (
                                    <ArrowUpRight
                                      className={`h-4 w-4 ${
                                        transaction.type === "deposit"
                                          ? "text-emerald-600 dark:text-emerald-400"
                                          : "text-red-600 dark:text-red-400"
                                      }`}
                                    />
                                  ) : (
                                    <ArrowDownRight
                                      className={`h-4 w-4 ${
                                        transaction.type === "deposit"
                                          ? "text-emerald-600 dark:text-emerald-400"
                                          : "text-red-600 dark:text-red-400"
                                      }`}
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    {transaction.type === "deposit"
                                      ? "Deposit"
                                      : "Withdrawal"}
                                  </p>
                                  <div className="flex items-center">
                                    <p className="text-xs text-muted-foreground">
                                      {formatDate(transaction.date)}
                                    </p>
                                    {transaction.automatic && (
                                      <Badge
                                        variant="outline"
                                        className="ml-2 text-[10px]"
                                      >
                                        Automatic
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <p
                                className={`font-medium ${
                                  transaction.type === "deposit"
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {transaction.type === "deposit" ? "+" : "-"}
                                {formatCurrency(transaction.amount)}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        No transactions yet
                      </p>
                      <Button
                        variant="link"
                        onClick={() => setActiveTab("overview")}
                      >
                        Make your first deposit
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Deposit dialog */}
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Deposit to Goal</DialogTitle>
            <DialogDescription>
              Add funds to your {selectedGoal?.name} goal
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount (₹)</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeposit}>Deposit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Withdraw from Goal</DialogTitle>
            <DialogDescription>
              Withdraw funds from your {selectedGoal?.name} goal
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount (₹)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={selectedGoal?.currentAmount}
              />
              {selectedGoal && (
                <p className="text-xs text-muted-foreground">
                  Available balance:{" "}
                  {formatCurrency(selectedGoal.currentAmount)}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleWithdraw}>Withdraw</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
