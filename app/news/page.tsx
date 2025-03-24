"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Clock,
  Bookmark,
  Share2,
  Globe,
  BarChart,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  image?: string;
  sentiment: "positive" | "negative" | "neutral";
  aiSummary?: string;
  isBookmarked?: boolean;
}

export default function NewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  // Mock news data (in a real app, this would come from an API)
  const mockNewsData: NewsArticle[] = [
    {
      id: "1",
      title: "RBI Holds Repo Rate at 6.5%, Maintains Growth Forecast at 7%",
      description:
        "The Reserve Bank of India's Monetary Policy Committee (MPC) voted to keep the repo rate unchanged at 6.5% for the seventh consecutive time, maintaining its stance of withdrawal of accommodation.",
      source: "Economic Times",
      url: "https://economictimes.indiatimes.com/news/economy/policy/rbi-holds-repo-rate-at-6-5-maintains-growth-forecast-at-7/articleshow/108765432.cms",
      publishedAt: "2025-03-14T09:30:00Z",
      category: "economy",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "neutral",
    },
    {
      id: "2",
      title: "Sensex Hits All-Time High, Crosses 80,000 Mark for First Time",
      description:
        "Indian benchmark indices hit fresh record highs on Friday with the BSE Sensex crossing the 80,000 mark for the first time, driven by strong foreign institutional investor inflows and positive global cues.",
      source: "Mint",
      url: "https://www.livemint.com/market/stock-market-news/sensex-hits-all-time-high-crosses-80-000-mark-for-first-time-11647234567890.html",
      publishedAt: "2025-03-14T10:15:00Z",
      category: "markets",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "positive",
    },
    {
      id: "3",
      title:
        "Reliance Industries Announces ₹75,000 Crore Green Energy Investment",
      description:
        "Reliance Industries Chairman Mukesh Ambani announced a massive ₹75,000 crore investment in green energy initiatives over the next three years, aiming to become carbon neutral by 2035.",
      source: "Business Standard",
      url: "https://www.business-standard.com/article/companies/reliance-industries-announces-rs-75-000-crore-green-energy-investment-123031400123_1.html",
      publishedAt: "2025-03-14T08:45:00Z",
      category: "stocks",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "positive",
    },
    {
      id: "4",
      title: "Cryptocurrency Market Faces Volatility as Bitcoin Drops 8%",
      description:
        "The cryptocurrency market experienced significant volatility as Bitcoin dropped 8% in 24 hours following regulatory concerns in major markets and profit-taking after recent rallies.",
      source: "CoinDesk",
      url: "https://www.coindesk.com/markets/2025/03/14/cryptocurrency-market-faces-volatility-as-bitcoin-drops-8/",
      publishedAt: "2025-03-14T07:20:00Z",
      category: "crypto",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "negative",
    },
    {
      id: "5",
      title: "SEBI Introduces New Regulations for Alternative Investment Funds",
      description:
        "The Securities and Exchange Board of India (SEBI) has introduced new regulations for Alternative Investment Funds (AIFs) to enhance transparency and investor protection in the growing alternative investment space.",
      source: "Financial Express",
      url: "https://www.financialexpress.com/market/sebi-introduces-new-regulations-for-alternative-investment-funds/2435678/",
      publishedAt: "2025-03-13T16:45:00Z",
      category: "regulation",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "neutral",
    },
    {
      id: "6",
      title: "Mutual Fund Industry AUM Crosses ₹50 Lakh Crore Milestone",
      description:
        "India's mutual fund industry has achieved a significant milestone with Assets Under Management (AUM) crossing the ₹50 lakh crore mark, driven by strong inflows into equity schemes and systematic investment plans.",
      source: "AMFI",
      url: "https://www.amfiindia.com/mutual-fund-industry-aum-crosses-rs-50-lakh-crore-milestone",
      publishedAt: "2025-03-13T14:30:00Z",
      category: "mutual_funds",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "positive",
    },
    {
      id: "7",
      title: "Government Announces PLI Scheme for Semiconductor Manufacturing",
      description:
        "The Indian government has announced a Production Linked Incentive (PLI) scheme worth ₹76,000 crore for semiconductor manufacturing to reduce dependency on imports and boost domestic production.",
      source: "PIB",
      url: "https://pib.gov.in/PressReleasePage.aspx?PRID=1876543",
      publishedAt: "2025-03-13T12:15:00Z",
      category: "economy",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "positive",
    },
    {
      id: "8",
      title:
        "Global Inflation Concerns Rise as US CPI Data Exceeds Expectations",
      description:
        "Global inflation concerns have intensified after US Consumer Price Index (CPI) data exceeded market expectations, potentially influencing central bank policies worldwide including in emerging markets like India.",
      source: "Reuters",
      url: "https://www.reuters.com/markets/global-inflation-concerns-rise-as-us-cpi-data-exceeds-expectations-2025-03-13/",
      publishedAt: "2025-03-13T09:50:00Z",
      category: "global",
      image: "/placeholder.svg?height=200&width=400",
      sentiment: "negative",
    },
  ];

  // Fetch news data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNewsArticles(mockNewsData);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filter news based on search and category
  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (category === "all") return matchesSearch;
    return matchesSearch && article.category === category;
  });

  // Generate AI summary for an article using Gemini 2.0 Flash API
  const generateAISummary = async (article: NewsArticle) => {
    setIsGeneratingSummary(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCJrCsIfnkep6z-FnSBCejQFDtTQxM6GbY",
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
                    text: `Summarize this financial news article in 2-3 concise sentences, highlighting the key points and potential market impact:
                    
                    Title: ${article.title}
                    Content: ${article.description}
                    Source: ${article.source}
                    Category: ${article.category}
                    
                    Provide only the summary without any introductory phrases like "Here's a summary" or "This article discusses".`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      const summary = data.candidates[0].content.parts[0].text;

      // Update the article with AI summary
      const updatedArticle = { ...article, aiSummary: summary };
      setSelectedArticle(updatedArticle);

      // Update the article in the news list
      setNewsArticles((prevArticles) =>
        prevArticles.map((a) => (a.id === article.id ? updatedArticle : a))
      );
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Handle article selection
  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsArticleDialogOpen(true);

    // Generate AI summary if not already generated
    if (!article.aiSummary) {
      generateAISummary(article);
    }
  };

  // Handle bookmark toggle
  const toggleBookmark = (articleId: string) => {
    if (bookmarkedArticles.includes(articleId)) {
      setBookmarkedArticles((prev) => prev.filter((id) => id !== articleId));
      toast({
        title: "Bookmark Removed",
        description: "Article removed from your bookmarks",
      });
    } else {
      setBookmarkedArticles((prev) => [...prev, articleId]);
      toast({
        title: "Bookmark Added",
        description: "Article saved to your bookmarks",
      });
    }
  };

  // Handle share article
  const handleShareArticle = (article: NewsArticle) => {
    // In a real app, this would use the Web Share API or a custom sharing solution
    toast({
      title: "Share Article",
      description: "Sharing functionality would be implemented here",
    });
  };

  // Format published date
  const formatPublishedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Refresh news
  const handleRefreshNews = () => {
    setIsLoading(true);
    // In a real app, this would fetch fresh news from the API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "News Refreshed",
        description: "Latest financial news has been loaded",
      });
    }, 1500);
  };

  return (
    <MobileLayout title="Financial News" showBackButton>
      <div className="p-4 space-y-6">
        {/* Search and filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="flex-1">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="markets">Markets</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                <SelectItem value="global">Global Markets</SelectItem>
                <SelectItem value="regulation">Regulations</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefreshNews}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* News categories tabs */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setCategory("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="markets" onClick={() => setCategory("markets")}>
              Markets
            </TabsTrigger>
            <TabsTrigger value="stocks" onClick={() => setCategory("stocks")}>
              Stocks
            </TabsTrigger>
            <TabsTrigger value="economy" onClick={() => setCategory("economy")}>
              Economy
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* News articles */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-40 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full mb-1"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredNews.length > 0 ? (
            filteredNews.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleArticleClick(article)}
              >
                {article.image && (
                  <div className="relative h-40 w-full">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${
                        article.sentiment === "positive"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                          : article.sentiment === "negative"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                      }`}
                    >
                      {article.sentiment === "positive" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : article.sentiment === "negative" ? (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      ) : (
                        <BarChart className="h-3 w-3 mr-1" />
                      )}
                      {article.sentiment.charAt(0).toUpperCase() +
                        article.sentiment.slice(1)}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {article.category.charAt(0).toUpperCase() +
                          article.category.slice(1).replace("_", " ")}
                      </Badge>
                      <span>{article.source}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatPublishedDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No news articles found</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Article detail dialog */}
      <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArticle.title}</DialogTitle>
                <DialogDescription>
                  {selectedArticle.source} •{" "}
                  {formatPublishedDate(selectedArticle.publishedAt)}
                </DialogDescription>
              </DialogHeader>

              {selectedArticle.image && (
                <div className="relative h-48 w-full mb-4">
                  <img
                    src={selectedArticle.image || "/placeholder.svg"}
                    alt={selectedArticle.title}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              )}

              <div className="space-y-4">
                {/* AI Summary */}
                <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-4 w-4 text-primary mr-2" />
                    <h4 className="font-medium text-sm">AI Summary</h4>
                  </div>
                  {isGeneratingSummary ? (
                    <div className="flex justify-center space-x-2 py-2">
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
                    <p className="text-sm">
                      {selectedArticle.aiSummary || "Summary not available"}
                    </p>
                  )}
                </div>

                <p className="text-sm">{selectedArticle.description}</p>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleBookmark(selectedArticle.id)}
                  >
                    <Bookmark
                      className={`h-4 w-4 mr-2 ${
                        bookmarkedArticles.includes(selectedArticle.id)
                          ? "fill-primary"
                          : ""
                      }`}
                    />
                    {bookmarkedArticles.includes(selectedArticle.id)
                      ? "Bookmarked"
                      : "Bookmark"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShareArticle(selectedArticle)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Button
                  className="w-full"
                  onClick={() => window.open(selectedArticle.url, "_blank")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Read Full Article
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
