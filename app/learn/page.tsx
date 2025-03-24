"use client"

import { useState } from "react"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Video,
  Award,
  TrendingUp,
  DollarSign,
  PiggyBank,
  Home,
  CreditCard,
  BarChart,
  Play,
  Clock,
  Star,
} from "lucide-react"

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("articles")

  // Sample data for articles
  const articles = [
    {
      id: 1,
      title: "Understanding Index Funds: A Beginner's Guide",
      description: "Learn how index funds work and why they're a popular investment choice for beginners.",
      category: "Investing",
      readTime: "5 min read",
      date: "Mar 2, 2023",
      image: "/placeholder.svg?height=120&width=200",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "5 Budgeting Methods to Help You Save More",
      description: "Discover different budgeting techniques and find the one that works best for your financial goals.",
      category: "Budgeting",
      readTime: "7 min read",
      date: "Feb 28, 2023",
      image: "/placeholder.svg?height=120&width=200",
      icon: DollarSign,
    },
    {
      id: 3,
      title: "Emergency Funds: How Much Should You Save?",
      description: "Learn why emergency funds are important and how to determine the right amount for your situation.",
      category: "Saving",
      readTime: "4 min read",
      date: "Feb 25, 2023",
      image: "/placeholder.svg?height=120&width=200",
      icon: PiggyBank,
    },
    {
      id: 4,
      title: "First-Time Home Buyer's Guide",
      description: "Everything you need to know about buying your first home, from mortgages to closing costs.",
      category: "Real Estate",
      readTime: "10 min read",
      date: "Feb 20, 2023",
      image: "/placeholder.svg?height=120&width=200",
      icon: Home,
    },
    {
      id: 5,
      title: "How to Improve Your Credit Score",
      description: "Practical tips to boost your credit score and qualify for better interest rates.",
      category: "Credit",
      readTime: "6 min read",
      date: "Feb 15, 2023",
      image: "/placeholder.svg?height=120&width=200",
      icon: CreditCard,
    },
  ]

  // Sample data for videos
  const videos = [
    {
      id: 1,
      title: "Investing Basics: Getting Started",
      description: "Learn the fundamentals of investing and how to build a diversified portfolio.",
      duration: "12:45",
      views: "24K",
      thumbnail: "/placeholder.svg?height=120&width=200",
      instructor: "Sarah Johnson, CFA",
    },
    {
      id: 2,
      title: "Understanding the Stock Market",
      description: "A comprehensive guide to how the stock market works and how to analyze stocks.",
      duration: "18:30",
      views: "32K",
      thumbnail: "/placeholder.svg?height=120&width=200",
      instructor: "Michael Chen, MBA",
    },
    {
      id: 3,
      title: "Retirement Planning in Your 30s",
      description: "Start planning for retirement early with these essential strategies.",
      duration: "15:20",
      views: "18K",
      thumbnail: "/placeholder.svg?height=120&width=200",
      instructor: "Lisa Rodriguez, CFP",
    },
    {
      id: 4,
      title: "Debt Payoff Strategies That Work",
      description: "Effective methods to eliminate debt and achieve financial freedom.",
      duration: "14:10",
      views: "42K",
      thumbnail: "/placeholder.svg?height=120&width=200",
      instructor: "David Park, Financial Coach",
    },
  ]

  // Sample data for quizzes
  const quizzes = [
    {
      id: 1,
      title: "Investment Basics Quiz",
      description: "Test your knowledge of investment fundamentals",
      questions: 10,
      completedQuestions: 7,
      category: "Investing",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Budgeting Mastery",
      description: "Challenge your budgeting skills and knowledge",
      questions: 15,
      completedQuestions: 0,
      category: "Budgeting",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Credit Score Challenge",
      description: "How much do you know about credit scores?",
      questions: 8,
      completedQuestions: 8,
      category: "Credit",
      difficulty: "Beginner",
    },
    {
      id: 4,
      title: "Advanced Tax Strategies",
      description: "Test your knowledge of tax optimization techniques",
      questions: 12,
      completedQuestions: 3,
      category: "Taxes",
      difficulty: "Advanced",
    },
  ]

  // Sample data for courses
  const courses = [
    {
      id: 1,
      title: "Personal Finance Fundamentals",
      description: "Master the basics of personal finance in this comprehensive course",
      modules: 8,
      completedModules: 5,
      duration: "4 hours",
      instructor: "Emma Wilson, CFP",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Stock Market Investing",
      description: "Learn how to analyze and invest in stocks with confidence",
      modules: 12,
      completedModules: 0,
      duration: "6 hours",
      instructor: "Robert Chen, MBA",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Real Estate Investment",
      description: "Discover strategies for successful real estate investing",
      modules: 10,
      completedModules: 2,
      duration: "5 hours",
      instructor: "James Miller, Real Estate Investor",
      rating: 4.7,
    },
  ]

  return (
    <MobileLayout title="Financial Education" showBackButton>
      <div className="p-4 space-y-6">
        {/* Featured content */}
        <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <CardContent className="pt-6">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-2">Featured</Badge>
            <h3 className="text-xl font-bold mb-2">Financial Freedom Course</h3>
            <p className="text-sm opacity-90 mb-4">
              Our most popular course with step-by-step guidance to achieve financial independence.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                <span className="text-xs ml-1">5.0 (324 ratings)</span>
              </div>
              <Button size="sm" variant="secondary">
                Start Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI-recommended content */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Recommended for You</h3>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              AI Curated
            </Badge>
          </div>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex space-x-3">
              {articles.slice(0, 3).map((article) => (
                <Card key={article.id} className="w-[250px] shrink-0">
                  <CardContent className="p-3">
                    <div className="aspect-video bg-muted rounded-md overflow-hidden mb-3">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {article.category}
                    </Badge>
                    <h4 className="font-medium text-sm line-clamp-2 h-10">{article.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {videos.slice(0, 2).map((video) => (
                <Card key={video.id} className="w-[250px] shrink-0">
                  <CardContent className="p-3">
                    <div className="aspect-video bg-muted rounded-md overflow-hidden mb-3 relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-black/60 flex items-center justify-center">
                          <Play className="h-5 w-5 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <h4 className="font-medium text-sm line-clamp-2 h-10">{video.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <span>{video.instructor}</span>
                      <span className="mx-1">•</span>
                      <span>{video.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Content tabs */}
        <Tabs defaultValue="articles" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">
              <BookOpen className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes">
              <Award className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Quizzes</span>
            </TabsTrigger>
            <TabsTrigger value="courses">
              <BarChart className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Courses</span>
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Financial Articles</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <article.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                        </div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Educational Videos</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-3">
                      <div className="w-24 h-16 rounded-md bg-muted overflow-hidden relative shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-black/60 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{video.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <span>{video.instructor}</span>
                          <span className="mx-1">•</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Financial Quizzes</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{quiz.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{quiz.description}</p>
                      </div>
                      <Badge
                        variant={
                          quiz.difficulty === "Beginner"
                            ? "outline"
                            : quiz.difficulty === "Intermediate"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {quiz.completedQuestions} of {quiz.questions} questions
                        </span>
                        <span>{Math.round((quiz.completedQuestions / quiz.questions) * 100)}% complete</span>
                      </div>
                      <Progress value={(quiz.completedQuestions / quiz.questions) * 100} className="h-2" />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <Badge variant="outline">{quiz.category}</Badge>
                      <Button size="sm">
                        {quiz.completedQuestions === 0
                          ? "Start Quiz"
                          : quiz.completedQuestions === quiz.questions
                            ? "Review"
                            : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Financial Courses</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {course.completedModules} of {course.modules} modules
                        </span>
                        <span>{Math.round((course.completedModules / course.modules) * 100)}% complete</span>
                      </div>
                      <Progress value={(course.completedModules / course.modules) * 100} className="h-2" />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                        <Separator orientation="vertical" className="mx-2 h-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <Button size="sm">{course.completedModules === 0 ? "Start Course" : "Continue"}</Button>
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

