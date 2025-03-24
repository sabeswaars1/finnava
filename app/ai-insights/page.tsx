"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  PieChart,
  DollarSign,
  Target,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

interface InsightItem {
  title: string;
  description: string;
  type?: string;
  priority?: string;
  expectedReturn?: string;
  timeframe?: string;
}

interface InsightsState {
  overview: InsightItem[];
  spending: InsightItem[];
  investments: InsightItem[];
  goals: InsightItem[];
  [key: string]: InsightItem[]; // Add index signature to allow dynamic keys
}

// Helper function to extract JSON from a string that might contain markdown
const extractJsonFromText = (text: string): any => {
  try {
    // First try to parse the text directly
    return JSON.parse(text);
  } catch (e) {
    // If that fails, try to extract JSON from markdown code blocks
    const jsonRegex = /```(?:json)?\s*(\[[\s\S]*?\]|\{[\s\S]*?\})```/;
    const match = text.match(jsonRegex);

    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (e) {
        console.error("Failed to parse extracted JSON:", e);
      }
    }

    // If all else fails, return an empty array
    console.error("Could not extract valid JSON from response");
    return [];
  }
};

export default function AIInsightsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<InsightsState>({
    overview: [],
    spending: [],
    investments: [],
    goals: [],
  });

  // Initialize Google Generative AI with environment variable
  const genAI = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const generateInsights = async (category: string) => {
    setLoading(true);
    try {
      // Define prompts for different categories
      const prompts: Record<string, string> = {
        overview:
          "Provide 3 general financial insights for a user with $8,742 balance, $4,500 monthly income, and $2,150 monthly expenses. Return ONLY a raw JSON array with title, description, and type (tip, warning, opportunity) fields. Do not include markdown formatting, code blocks, or any explanatory text.",
        spending:
          "Analyze spending patterns for a user who spends $1,200 on housing, $420 on food, $310 on transport, and $180 on entertainment monthly. Provide 3 budget optimization tips as a raw JSON array with title, description, and priority fields. Do not include markdown formatting, code blocks, or any explanatory text.",
        investments:
          "Provide 3 investment recommendations for a moderate-risk investor with $12,450 portfolio (42% ETFs, 25% bonds, 23% tech stocks). Return ONLY a raw JSON array with title, description, and expectedReturn fields. Do not include markdown formatting, code blocks, or any explanatory text.",
        goals:
          "Suggest 3 strategies to help a user reach financial goals: $10,000 emergency fund (65% complete) and $5,000 vacation fund (30% complete). Return ONLY a raw JSON array with title, description, and timeframe fields. Do not include markdown formatting, code blocks, or any explanatory text.",
      };

      // Check if API key is available
      if (!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY) {
        throw new Error("Google Generative AI API key is not configured");
      }

      // Use Google Generative AI to generate insights with Gemini 2.0 Flash
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompts[category]);
      const response = await result.response;
      const text = response.text();

      // Parse the response, handling potential markdown formatting
      const parsedInsights = extractJsonFromText(text);

      // Update the insights state
      setInsights((prev: InsightsState) => ({
        ...prev,
        [category]: parsedInsights,
      }));
    } catch (error) {
      console.error(`Error generating ${category} insights:`, error);
      // Fallback insights
      const fallbackInsights = {
        overview: [
          {
            title: "Healthy Savings Rate",
            description:
              "You're saving about 52% of your income, which is excellent. Consider investing some of this surplus for long-term growth.",
            type: "tip",
          },
          {
            title: "Emergency Fund Status",
            description:
              "Your current balance could cover about 4 months of expenses, which is a good emergency fund. Aim for 6 months for optimal security.",
            type: "tip",
          },
          {
            title: "Budget Allocation",
            description:
              "Your expenses are well-managed at 48% of income. This balanced approach gives you flexibility for future financial goals.",
            type: "opportunity",
          },
        ],
        spending: [
          {
            title: "Food Budget Optimization",
            description:
              "Your food spending is slightly above average. Consider meal planning to reduce costs by 15-20%.",
            priority: "medium",
          },
          {
            title: "Housing Cost Ratio",
            description:
              "Housing costs are 26.7% of your income, which is within the recommended 30% threshold. Good job maintaining this balance.",
            priority: "low",
          },
          {
            title: "Entertainment Spending",
            description:
              "Your entertainment budget is well-controlled. Consider using subscription sharing services to further reduce costs.",
            priority: "low",
          },
        ],
        investments: [
          {
            title: "Portfolio Diversification",
            description:
              "Your portfolio is tech-heavy. Consider adding more sector diversity to reduce risk.",
            expectedReturn: "8-10% annually with reduced volatility",
          },
          {
            title: "ETF Allocation",
            description:
              "Your 42% ETF allocation provides good diversification. Consider increasing to 50-55% for better stability.",
            expectedReturn: "7-9% annually",
          },
          {
            title: "Bond Rebalancing",
            description:
              "In the current interest rate environment, consider shifting some bond allocation to short-term bonds or I-bonds.",
            expectedReturn: "4-5% with lower risk",
          },
        ],
        goals: [
          {
            title: "Accelerate Vacation Fund",
            description:
              "Increase monthly contributions by $100 to reach your vacation goal 3 months sooner.",
            timeframe: "6 months",
          },
          {
            title: "Emergency Fund Completion",
            description:
              "You're 65% to your emergency fund goal. Allocate an additional $200 monthly to complete it faster.",
            timeframe: "4 months",
          },
          {
            title: "Automated Savings Strategy",
            description:
              "Set up automatic transfers on payday to ensure consistent progress toward both goals.",
            timeframe: "Ongoing",
          },
        ],
      };

      setInsights((prev: InsightsState) => ({
        ...prev,
        [category]: fallbackInsights[category as keyof typeof fallbackInsights],
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Generate overview insights when component mounts
    generateInsights("overview");
  }, []);

  // Generate insights when tab changes
  useEffect(() => {
    if (!insights[activeTab] || insights[activeTab].length === 0) {
      generateInsights(activeTab);
    }
  }, [activeTab]);

  const getIconForType = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "opportunity":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-primary" />;
    }
  };

  const getIconForTab = (tab: string) => {
    switch (tab) {
      case "spending":
        return <DollarSign className="h-5 w-5" />;
      case "investments":
        return <PieChart className="h-5 w-5" />;
      case "goals":
        return <Target className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <MobileLayout title="AI Financial Insights" showBackButton>
      <div className="p-4 space-y-6">
        <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
                <p className="text-sm opacity-90">
                  Personalized financial analysis and recommendations using
                  Gemini 2.0 Flash
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {["overview", "spending", "investments", "goals"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {getIconForTab(tab)}
                  <h3 className="font-medium ml-2">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Insights
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateInsights(tab)}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>

              {loading ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-center items-center flex-col py-8">
                      <div className="flex space-x-2 mb-4">
                        <div
                          className="h-3 w-3 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-3 w-3 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-3 w-3 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                      <p className="text-muted-foreground">
                        Analyzing your financial data with Gemini 2.0 Flash...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {insights[activeTab] && insights[activeTab].length > 0 ? (
                    insights[activeTab].map(
                      (insight: InsightItem, index: number) => (
                        <Card
                          key={index}
                          className="overflow-hidden border-l-4"
                          style={{
                            borderLeftColor:
                              insight.type === "warning"
                                ? "var(--amber-500)"
                                : insight.type === "opportunity"
                                ? "var(--emerald-500)"
                                : "var(--primary)",
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                {insight.type
                                  ? getIconForType(insight.type)
                                  : getIconForTab(activeTab)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center flex-wrap gap-2">
                                  <h4 className="font-medium">
                                    {insight.title}
                                  </h4>
                                  {insight.priority && (
                                    <Badge
                                      variant="outline"
                                      className="ml-auto"
                                    >
                                      {insight.priority} priority
                                    </Badge>
                                  )}
                                  {insight.expectedReturn && (
                                    <Badge
                                      variant="outline"
                                      className="ml-auto bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                                    >
                                      {insight.expectedReturn}
                                    </Badge>
                                  )}
                                  {insight.timeframe && (
                                    <Badge
                                      variant="outline"
                                      className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                    >
                                      {insight.timeframe}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm mt-1">
                                  {insight.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p>No insights available. Try refreshing.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Card className="bg-muted/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">How It Works</CardTitle>
            <CardDescription>
              Our AI analyzes your financial data using Google's Gemini 2.0
              Flash model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              • Spending patterns are analyzed to identify savings opportunities
            </p>
            <p>• Investment portfolio is evaluated for optimization</p>
            <p>• Financial goals are tracked with actionable strategies</p>
            <p>
              • All insights are updated in real-time as your finances change
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Powered by Gemini 2.0 Flash - Google's advanced AI model
            </p>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
