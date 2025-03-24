"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Loader2,
  Send,
  Calculator,
  BarChart3,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Info,
  Sparkles,
  PiggyBank,
  LineChart,
  BarChart4,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "@/components/mobile-layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Type definitions
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MarketData {
  fdRates: { bank: string; rate: string }[];
  sdRates: { bank: string; rate: string }[];
  sipTrends: { fund: string; returns: string }[];
  goldPrices: { current: string; change: string };
  stockMarket: { sensex: string; nifty: string; change: string };
}

export default function AdvisorPage() {
  const isMobile = useIsMobile();

  // State variables
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI investment advisor powered by Gemini. Please provide your investment details, and I'll recommend the best options for you.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [expectedReturns, setExpectedReturns] = useState("");
  const [duration, setDuration] = useState("");
  const [durationType, setDurationType] = useState("years");
  const [riskPreference, setRiskPreference] = useState("");
  const [riskLevel, setRiskLevel] = useState<number[]>([50]);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [marketDataOpen, setMarketDataOpen] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("investment");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Map risk slider value to risk preference
  useEffect(() => {
    if (riskLevel[0] <= 33) {
      setRiskPreference("low");
    } else if (riskLevel[0] <= 66) {
      setRiskPreference("moderate");
    } else {
      setRiskPreference("high");
    }
  }, [riskLevel]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch market data
  const fetchMarketData = () => {
    setIsDataLoading(true);

    // Simulate API call with realistic data
    setTimeout(() => {
      setMarketData({
        fdRates: [
          { bank: "SBI", rate: "6.85%" },
          { bank: "HDFC", rate: "7.05%" },
          { bank: "ICICI", rate: "6.95%" },
          { bank: "Axis", rate: "7.15%" },
          { bank: "Kotak", rate: "7.25%" },
        ],
        sdRates: [
          { bank: "SBI", rate: "3.50%" },
          { bank: "HDFC", rate: "4.00%" },
          { bank: "ICICI", rate: "3.75%" },
          { bank: "Axis", rate: "3.85%" },
          { bank: "Kotak", rate: "4.10%" },
        ],
        sipTrends: [
          { fund: "HDFC Top 100", returns: "12.8%" },
          { fund: "Axis Bluechip", returns: "14.5%" },
          { fund: "SBI Small Cap", returns: "19.2%" },
          { fund: "ICICI Pru Value Discovery", returns: "15.7%" },
          { fund: "Mirae Asset Emerging Bluechip", returns: "17.3%" },
        ],
        goldPrices: {
          current: "₹62,850/10g",
          change: "+1.2%",
        },
        stockMarket: {
          sensex: "72,968",
          nifty: "22,104",
          change: "+0.8%",
        },
      });
      setIsDataLoading(false);
    }, 1000);
  };

  // Initialize market data
  useEffect(() => {
    fetchMarketData();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (!investmentAmount || !expectedReturns || !duration || !riskPreference) {
      return;
    }

    setLoading(true);

    if (isMobile) {
      setFormOpen(false);
    }

    // Add user message
    const userMessage = `I want to invest ₹${investmentAmount} for ${duration} ${durationType} with an expected return of ${expectedReturns}%. My risk preference is ${riskPreference}.`;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setActiveTab("chat");

    try {
      // Call Gemini API
      const response = await fetchGeminiResponse(userMessage);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered an error while processing your request. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setInputMessage("");

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    setLoading(true);

    try {
      // Call Gemini API
      const response = await fetchGeminiResponse(userMsg);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered an error while processing your request. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch response from Gemini API
  const fetchGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      // Using environment variable for API key
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;

      // Updated endpoint for Gemini 2.0 Flash
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are an AI investment advisor. Provide helpful, detailed, and personalized investment advice based on the following user query: ${prompt}
                  
                  If the query contains investment details like amount, duration, expected returns, and risk preference, provide specific investment recommendations with percentage allocations and expected returns.
                  
                  For queries about specific investment types like mutual funds, gold, or fixed deposits, provide current information and recommendations.
                  
                  Keep your responses professional but conversational, and include specific numbers and percentages where appropriate.`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Extract the response text from the Gemini API response
      // Updated response structure for Gemini 2.0
      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't generate a response at this time. Please try again.";

      return responseText;
    } catch (error) {
      console.error("Error calling Google Generative AI API:", error);
      return "I'm sorry, I encountered an error while processing your request. Please try again later.";
    }
  };

  // Get risk level label
  const getRiskLabel = () => {
    if (riskLevel[0] <= 33) return "Low Risk";
    if (riskLevel[0] <= 66) return "Moderate Risk";
    return "High Risk";
  };

  // Get risk level color
  const getRiskColor = () => {
    if (riskLevel[0] <= 33) return "bg-emerald-500";
    if (riskLevel[0] <= 66) return "bg-amber-500";
    return "bg-rose-500";
  };

  // Investment form component - extracted for better readability
  const InvestmentForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          Investment Amount (₹)
        </Label>
        <Input
          id="amount"
          type="number"
          placeholder="e.g., 100000"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          className="focus-visible:ring-primary min-w-0 flex-1"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="returns" className="flex items-center gap-2">
          <ArrowUpRight className="h-4 w-4 text-primary" />
          Expected Returns (%)
        </Label>
        <Input
          id="returns"
          type="number"
          placeholder="e.g., 12"
          value={expectedReturns}
          onChange={(e) => setExpectedReturns(e.target.value)}
          className="focus-visible:ring-primary min-w-0 flex-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="duration" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Duration
          </Label>
          <Input
            id="duration"
            type="number"
            placeholder="e.g., 5"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="focus-visible:ring-primary min-w-0 flex-1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="durationType" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Duration Type
          </Label>
          <Select value={durationType} onValueChange={setDurationType}>
            <SelectTrigger
              id="durationType"
              className="focus-visible:ring-primary"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="months">Months</SelectItem>
              <SelectItem value="years">Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Risk Preference
          </Label>
          <Badge
            variant="outline"
            className={`font-normal ${getRiskColor().replace(
              "bg-",
              "border-"
            )} border`}
          >
            {getRiskLabel()}
          </Badge>
        </div>

        <Slider
          id="risk"
          value={riskLevel}
          onValueChange={setRiskLevel}
          max={100}
          step={1}
          className="py-2"
          defaultValue={[50]}
        />

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden dark:bg-gray-700">
          <div
            className={`h-full ${getRiskColor()}`}
            style={{ width: `${riskLevel[0]}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Conservative</span>
          <span>Balanced</span>
          <span>Aggressive</span>
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
        onClick={handleSubmit}
        disabled={!investmentAmount || !expectedReturns || !duration || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            Get Recommendations
            <Sparkles className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );

  return (
    <MobileLayout title="AI Investment Advisor" showBackButton>
      <div className="container mx-auto py-4 md:py-6 px-3 md:px-4 bg-gradient-to-b from-background/50 to-background min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI Investment Advisor
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Get personalized investment recommendations powered by AI
            </p>
          </div>

          {isMobile ? (
            <>
              {/* Mobile Layout - Tabs for better organization */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full mb-20"
              >
                <TabsList className="grid w-full grid-cols-3 mb-4 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
                  <TabsTrigger
                    value="investment"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex items-center gap-1">
                      <PiggyBank className="h-4 w-4" />
                      <span className="text-xs">Invest</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex items-center gap-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs">Advisor</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex items-center gap-1">
                      <Calculator className="h-4 w-4" />
                      <span className="text-xs">Tools</span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="investment" className="mt-0 space-y-4">
                  <Card className="shadow-md border-t-4 border-t-primary">
                    <CardHeader className="pb-2 px-3 pt-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PiggyBank className="h-5 w-5 text-primary" />
                        Investment Parameters
                      </CardTitle>
                      <CardDescription>
                        Enter your investment details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                      <InvestmentForm />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="chat" className="mt-0 space-y-4">
                  <Card className="shadow-md border-t-4 border-t-primary">
                    <CardHeader className="pb-2 px-3 pt-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Investment Advisor
                      </CardTitle>
                      <CardDescription>Get personalized advice</CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                      <ScrollArea className="h-[350px] pr-3 mb-3 rounded-md">
                        <div ref={chatContainerRef} className="space-y-3">
                          {messages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${
                                message.role === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`p-2.5 rounded-lg max-w-[90%] ${
                                  message.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted border border-border"
                                }`}
                              >
                                <p className="whitespace-pre-line text-sm">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          ))}
                          {loading && (
                            <div className="flex justify-center items-center my-3">
                              <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full shadow-sm border border-border">
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                <span className="text-xs text-muted-foreground">
                                  AI is thinking...
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>

                      <div className="flex gap-2 w-full">
                        <Input
                          placeholder="Ask a question..."
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && inputMessage.trim()) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="focus-visible:ring-primary min-w-0 flex-1"
                          disabled={loading}
                        />
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim() || loading}
                          className="bg-primary hover:bg-primary/90 shrink-0"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tools" className="mt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-primary/20 hover:bg-primary/5"
                      onClick={() => setCalculatorOpen(true)}
                    >
                      <Calculator className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">
                        Investment Calculator
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-primary/20 hover:bg-primary/5"
                      onClick={() => setMarketDataOpen(true)}
                    >
                      <BarChart3 className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Market Data</span>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Fixed bottom navigation for mobile */}
              <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-4 flex justify-around z-10">
                <Button
                  variant={activeTab === "investment" ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-1.5 px-2"
                  onClick={() => setActiveTab("investment")}
                >
                  <PiggyBank className="h-4 w-4" />
                  <span className="text-[10px]">Invest</span>
                </Button>
                <Button
                  variant={activeTab === "chat" ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-1.5 px-2"
                  onClick={() => setActiveTab("chat")}
                >
                  <Bot className="h-4 w-4" />
                  <span className="text-[10px]">Advisor</span>
                </Button>
                <Button
                  variant={activeTab === "tools" ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-1.5 px-2"
                  onClick={() => setActiveTab("tools")}
                >
                  <Calculator className="h-4 w-4" />
                  <span className="text-[10px]">Tools</span>
                </Button>
              </div>
            </>
          ) : (
            // Desktop layout - Stacked layout for the requested order
            <div className="flex flex-col gap-6">
              {/* 1. Investment Parameters */}
              <Card className="border-t-4 border-t-primary shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-primary" />
                    Investment Parameters
                  </CardTitle>
                  <CardDescription>
                    Fill in your investment details to get personalized
                    recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <InvestmentForm />
                </CardContent>
              </Card>

              {/* 2. AI Investment Advisor */}
              <Card className="border-t-4 border-t-primary shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Investment Advisor
                  </CardTitle>
                  <CardDescription>
                    Get personalized investment advice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[450px] pr-4 mb-4 rounded-md">
                    <div ref={chatContainerRef} className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg max-w-[85%] ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted border border-border"
                            }`}
                          >
                            <p className="whitespace-pre-line">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      ))}
                      {loading && (
                        <div className="flex justify-center items-center my-4">
                          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full shadow-sm border border-border">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">
                              AI is thinking...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2 w-full">
                    <Input
                      placeholder="Ask a follow-up question..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && inputMessage.trim()) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="focus-visible:ring-primary min-w-0 flex-1"
                      disabled={loading}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || loading}
                      className="bg-primary hover:bg-primary/90 shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Investment Calculator and Market Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  className="shadow-md border-t-4 border-t-primary hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCalculatorOpen(true)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Investment Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate returns on your investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8">
                    <Calculator className="h-16 w-16 text-primary/40" />
                  </CardContent>
                </Card>

                <Card
                  className="shadow-md border-t-4 border-t-primary hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setMarketDataOpen(true)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Market Data
                    </CardTitle>
                    <CardDescription>
                      Latest financial market information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8">
                    <BarChart3 className="h-16 w-16 text-primary/40" />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calculator Dialog */}
      <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Investment Calculator
            </DialogTitle>
            <DialogDescription>
              Calculate returns on your investments
            </DialogDescription>
          </DialogHeader>
          <InvestmentCalculator />
        </DialogContent>
      </Dialog>

      {/* Market Data Dialog */}
      <Dialog open={marketDataOpen} onOpenChange={setMarketDataOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Market Data
            </DialogTitle>
            <DialogDescription>
              Latest financial market information
            </DialogDescription>
          </DialogHeader>
          <RealTimeData
            marketData={marketData}
            isLoading={isDataLoading}
            onRefresh={fetchMarketData}
          />
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}

function InvestmentCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [calculationType, setCalculationType] = useState("simple");
  const [result, setResult] = useState<{
    amount: number;
    interest: number;
    inflationAdjusted?: number;
    realGrowth?: number;
  } | null>(null);
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inflation, setInflation] = useState("6");

  const calculateInterest = () => {
    const p = Number.parseFloat(principal);
    const r = Number.parseFloat(rate) / 100;
    const t = Number.parseFloat(time);
    const m = Number.parseFloat(monthlyInvestment || "0");
    const inf = Number.parseFloat(inflation) / 100;

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      return;
    }

    let calculatedAmount = 0;
    let totalInvested = p;

    if (calculationType === "simple") {
      calculatedAmount = p * (1 + r * t);

      if (m > 0) {
        // For monthly additions with simple interest
        const monthlyContribution = m * 12 * t;
        const avgTimeForMonthly = t / 2; // Average time for all monthly contributions
        const monthlyInterest = monthlyContribution * (r * avgTimeForMonthly);
        calculatedAmount += monthlyContribution + monthlyInterest;
        totalInvested += monthlyContribution;
      }
    } else {
      if (m > 0) {
        // Compound interest with monthly additions
        calculatedAmount = p * Math.pow(1 + r / 12, 12 * t);

        // Calculate future value of monthly SIP
        // FV = P × ((1 + r)^n - 1) / r × (1 + r)
        const monthlyRate = r / 12;
        const n = 12 * t; // Total number of months
        const sipFV =
          m *
          ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) *
          (1 + monthlyRate);

        calculatedAmount += sipFV;
        totalInvested += m * 12 * t;
      } else {
        // Simple compound interest without monthly additions
        calculatedAmount = p * Math.pow(1 + r, t);
      }
    }

    // Adjust for inflation if advanced options are shown
    if (showAdvanced && !isNaN(inf)) {
      const inflationAdjusted = calculatedAmount / Math.pow(1 + inf, t);
      setResult({
        amount: calculatedAmount,
        interest: calculatedAmount - totalInvested,
        inflationAdjusted,
        realGrowth: inflationAdjusted - totalInvested,
      });
    } else {
      setResult({
        amount: calculatedAmount,
        interest: calculatedAmount - totalInvested,
      });
    }
  };

  return (
    <div className="space-y-3 py-3">
      <Tabs defaultValue="simple" onValueChange={setCalculationType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="simple"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <div className="flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Simple Interest</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="compound"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <div className="flex items-center gap-1">
              <BarChart4 className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Compound Interest</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="principal" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            Principal Amount (₹)
          </Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="focus-visible:ring-primary min-w-0 flex-1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Interest Rate (% per annum)
          </Label>
          <Input
            id="rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="focus-visible:ring-primary min-w-0 flex-1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Time Period (years)
          </Label>
          <Input
            id="time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="focus-visible:ring-primary min-w-0 flex-1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthly" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary" />
            Monthly Addition (₹)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Regular monthly investments in addition to your principal
                    amount
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="monthly"
            type="number"
            placeholder="e.g., 5000"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            className="focus-visible:ring-primary min-w-0 flex-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs border-primary/30 hover:bg-primary/5"
          >
            {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          </Button>
        </div>

        {showAdvanced && (
          <div className="space-y-2 pt-2 bg-muted/30 p-3 rounded-md border border-border">
            <Label htmlFor="inflation" className="flex items-center gap-2">
              <ArrowDownRight className="h-4 w-4 text-primary" />
              Inflation Rate (% per annum)
            </Label>
            <Input
              id="inflation"
              type="number"
              value={inflation}
              onChange={(e) => setInflation(e.target.value)}
              className="focus-visible:ring-primary min-w-0 flex-1"
            />
            <p className="text-xs text-muted-foreground">
              Inflation reduces the purchasing power of money over time.
            </p>
          </div>
        )}

        <Button
          className="w-full bg-primary hover:bg-primary/90"
          onClick={calculateInterest}
        >
          Calculate
        </Button>

        {result && (
          <div className="mt-3 p-3 bg-muted rounded-md border">
            <h3 className="font-medium text-base mb-2">Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Total Investment:
                </span>
                <span className="font-medium text-sm">
                  ₹
                  {Number.parseFloat(principal) +
                    (
                      Number.parseFloat(monthlyInvestment || "0") *
                      12 *
                      Number.parseFloat(time)
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Interest Earned:
                </span>
                <span className="font-medium text-sm text-emerald-600 dark:text-emerald-400">
                  ₹
                  {result.interest.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium text-sm">Final Amount:</span>
                <span className="font-bold text-base">
                  ₹
                  {result.amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {showAdvanced &&
                result &&
                "inflationAdjusted" in result &&
                result.inflationAdjusted !== undefined && (
                  <>
                    <Separator />
                    <div className="pt-2">
                      <h4 className="text-xs font-medium mb-2">
                        Inflation Adjusted (Today's Value)
                      </h4>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Adjusted Amount:
                        </span>
                        <span className="font-medium text-sm">
                          ₹
                          {result.inflationAdjusted?.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Real Growth:
                        </span>
                        <span
                          className={`font-medium text-sm ${
                            result.realGrowth && result.realGrowth > 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          ₹
                          {result.realGrowth?.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RealTimeData({
  marketData,
  isLoading,
  onRefresh,
}: {
  marketData: MarketData | null;
  isLoading: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="space-y-4 py-3">
      <div className="flex justify-between items-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="gap-1 border-primary/30 hover:bg-primary/5 text-xs"
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
          <p className="text-muted-foreground text-sm">
            Fetching latest market data...
          </p>
        </div>
      ) : marketData ? (
        <Tabs defaultValue="fd">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger
              value="fd"
              className="data-[state=active]:bg-primary/10 text-xs px-1"
            >
              FD Rates
            </TabsTrigger>
            <TabsTrigger
              value="sd"
              className="data-[state=active]:bg-primary/10 text-xs px-1"
            >
              SD Rates
            </TabsTrigger>
            <TabsTrigger
              value="sip"
              className="data-[state=active]:bg-primary/10 text-xs px-1"
            >
              SIP Trends
            </TabsTrigger>
            <TabsTrigger
              value="gold"
              className="data-[state=active]:bg-primary/10 text-xs px-1"
            >
              Gold
            </TabsTrigger>
            <TabsTrigger
              value="stocks"
              className="data-[state=active]:bg-primary/10 text-xs px-1"
            >
              Stocks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fd" className="mt-3">
            <Card>
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-base">
                  Fixed Deposit Interest Rates
                </CardTitle>
                <CardDescription className="text-xs">
                  Current best rates for 1-year tenure
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-1">
                  {marketData.fdRates.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-1.5 border-b last:border-0 items-center"
                    >
                      <span className="font-medium text-sm">{item.bank}</span>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-xs"
                      >
                        {item.rate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sd" className="mt-3">
            <Card>
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-base">
                  Savings Deposit Interest Rates
                </CardTitle>
                <CardDescription className="text-xs">
                  Current rates for regular savings accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-1">
                  {marketData.sdRates.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-1.5 border-b last:border-0 items-center"
                    >
                      <span className="font-medium text-sm">{item.bank}</span>
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary dark:bg-primary/20 border-primary/30 text-xs"
                      >
                        {item.rate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sip" className="mt-3">
            <Card>
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-base">
                  SIP Growth Trends (5-Year Returns)
                </CardTitle>
                <CardDescription className="text-xs">
                  Top performing mutual funds
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-1">
                  {marketData.sipTrends.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-1.5 border-b last:border-0 items-center"
                    >
                      <span className="font-medium text-sm">{item.fund}</span>
                      <Badge
                        variant="outline"
                        className="bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 border-violet-200 dark:border-violet-800 text-xs"
                      >
                        {item.returns}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gold" className="mt-3">
            <Card>
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-base">Gold Prices</CardTitle>
                <CardDescription className="text-xs">
                  Current market rates
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="text-center py-4">
                  <p className="text-2xl font-bold mb-2">
                    {marketData.goldPrices.current}
                  </p>
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">
                    {marketData.goldPrices.change} today
                  </Badge>
                  <div className="mt-4 text-center max-w-md mx-auto">
                    <p className="text-xs text-muted-foreground">
                      Gold prices have shown steady growth over the past
                      quarter, making it a reliable hedge against inflation.
                      Consider Sovereign Gold Bonds for tax-efficient gold
                      investment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stocks" className="mt-3">
            <Card>
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-base">Stock Market Trends</CardTitle>
                <CardDescription className="text-xs">
                  Current indices
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="grid grid-cols-2 gap-4 text-center py-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">SENSEX</p>
                    <p className="text-xl font-bold mb-1">
                      {marketData.stockMarket.sensex}
                    </p>
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">
                      {marketData.stockMarket.change}
                    </Badge>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">NIFTY</p>
                    <p className="text-xl font-bold mb-1">
                      {marketData.stockMarket.nifty}
                    </p>
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">
                      {marketData.stockMarket.change}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    Markets are showing positive momentum. Consider a SIP-based
                    approach for equity investments to average out market
                    volatility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground text-sm">
            No data available. Please refresh.
          </p>
        </div>
      )}
    </div>
  );
}
