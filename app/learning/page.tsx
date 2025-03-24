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
  Lock,
  Gift,
  CheckCircle,
  Sparkles,
  Flag,
  Trophy,
} from "lucide-react"

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("courses")
  const [selectedLevel, setSelectedLevel] = useState(1)

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

  // Sample data for level-based courses
  const courseLevels = [
    {
      id: 1,
      level: "Beginner",
      description: "Start your financial journey",
      position: { x: 20, y: 50 },
      isCompleted: true,
      isUnlocked: true,
      courses: [
        {
          id: 101,
          title: "Personal Finance Fundamentals",
          description: "Master the basics of personal finance",
          modules: 8,
          completedModules: 8,
          duration: "4 hours",
          instructor: "Emma Wilson, CFP",
          rating: 4.8,
          unlocked: true,
          completed: true,
          reward: "₹100 Amazon Voucher",
        },
        {
          id: 102,
          title: "Budgeting for Beginners",
          description: "Learn how to create and stick to a budget",
          modules: 6,
          completedModules: 4,
          duration: "3 hours",
          instructor: "John Smith, Financial Advisor",
          rating: 4.7,
          unlocked: true,
          completed: false,
          reward: "₹150 Flipkart Voucher",
        },
        {
          id: 103,
          title: "Debt Management Essentials",
          description: "Strategies to manage and reduce debt",
          modules: 5,
          completedModules: 0,
          duration: "2.5 hours",
          instructor: "Lisa Chen, Credit Counselor",
          rating: 4.9,
          unlocked: false,
          completed: false,
          reward: "₹200 Swiggy Voucher",
        },
      ],
    },
    {
      id: 2,
      level: "Intermediate",
      description: "Expand your financial knowledge",
      position: { x: 50, y: 30 },
      isCompleted: false,
      isUnlocked: true,
      courses: [
        {
          id: 201,
          title: "Stock Market Investing",
          description: "Learn how to analyze and invest in stocks",
          modules: 12,
          completedModules: 0,
          duration: "6 hours",
          instructor: "Robert Chen, MBA",
          rating: 4.9,
          unlocked: false,
          completed: false,
          reward: "₹250 Amazon Voucher",
        },
        {
          id: 202,
          title: "Tax Planning Strategies",
          description: "Optimize your taxes and save money",
          modules: 8,
          completedModules: 0,
          duration: "4 hours",
          instructor: "Sarah Johnson, CPA",
          rating: 4.6,
          unlocked: false,
          completed: false,
          reward: "₹300 Myntra Voucher",
        },
      ],
    },
    {
      id: 3,
      level: "Advanced",
      description: "Master complex financial concepts",
      position: { x: 80, y: 60 },
      isCompleted: false,
      isUnlocked: false,
      courses: [
        {
          id: 301,
          title: "Real Estate Investment",
          description: "Discover strategies for successful real estate investing",
          modules: 10,
          completedModules: 0,
          duration: "5 hours",
          instructor: "James Miller, Real Estate Investor",
          rating: 4.7,
          unlocked: false,
          completed: false,
          reward: "₹500 Amazon Voucher",
        },
        {
          id: 302,
          title: "Retirement Planning Mastery",
          description: "Advanced strategies for retirement planning",
          modules: 9,
          completedModules: 0,
          duration: "4.5 hours",
          instructor: "Patricia Wong, Retirement Specialist",
          rating: 4.8,
          unlocked: false,
          completed: false,
          reward: "₹600 Travel Voucher",
        },
      ],
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
        <Tabs defaultValue="courses" onValueChange={setActiveTab}>
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

          {/* Courses Tab - Updated with Game-like Map UI */}
          <TabsContent value="courses" className="space-y-6 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Learning Journey</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Earn Rewards
              </Badge>
            </div>

            {/* Game-like map UI */}
            <Card className="overflow-hidden border-2 border-primary/20">
              <CardContent className="p-0">
                <div className="relative h-[280px] bg-gradient-to-b from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 overflow-hidden">
                  {/* Background elements */}
                  <div className="absolute top-10 left-10 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-md"></div>
                  <div className="absolute top-20 right-20 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full blur-md"></div>
                  <div className="absolute bottom-10 left-1/4 w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full blur-md"></div>

                  {/* Path between levels */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Path from Level 1 to Level 2 */}
                    <path
                      d="M20,50 Q35,20 50,30"
                      stroke={courseLevels[0].isCompleted ? "#16a34a" : "#d1d5db"}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={courseLevels[0].isCompleted ? "0" : "5,5"}
                      strokeLinecap="round"
                    />

                    {/* Path from Level 2 to Level 3 */}
                    <path
                      d="M50,30 Q65,40 80,60"
                      stroke={courseLevels[1].isCompleted ? "#16a34a" : "#d1d5db"}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={courseLevels[1].isCompleted ? "0" : "5,5"}
                      strokeLinecap="round"
                    />

                    {/* Animated progress indicator on the first path if in progress */}
                    {courseLevels[0].isCompleted && !courseLevels[1].isCompleted && (
                      <circle r="3" fill="#16a34a">
                        <animateMotion path="M20,50 Q35,20 50,30" dur="3s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Animated progress indicator on the second path if in progress */}
                    {courseLevels[1].isCompleted && !courseLevels[2].isCompleted && (
                      <circle r="3" fill="#16a34a">
                        <animateMotion path="M50,30 Q65,40 80,60" dur="3s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </svg>

                  {/* Level nodes */}
                  {courseLevels.map((level, index) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        selectedLevel === level.id ? "scale-110" : "scale-100"
                      }`}
                      style={{
                        left: `${level.position.x}%`,
                        top: `${level.position.y}%`,
                        cursor: level.isUnlocked ? "pointer" : "not-allowed",
                        opacity: level.isUnlocked ? 1 : 0.6,
                      }}
                      disabled={!level.isUnlocked}
                    >
                      <div className={`relative ${selectedLevel === level.id ? "z-10" : "z-0"}`}>
                        {/* Level node */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            level.isCompleted
                              ? "bg-green-500 text-white"
                              : level.isUnlocked
                                ? "bg-primary text-white"
                                : "bg-gray-300 text-gray-600"
                          } shadow-lg border-4 border-white dark:border-gray-800`}
                        >
                          {level.isCompleted ? (
                            <Trophy className="h-8 w-8" />
                          ) : level.isUnlocked ? (
                            <Flag className="h-8 w-8" />
                          ) : (
                            <Lock className="h-8 w-8" />
                          )}
                        </div>

                        {/* Level indicator */}
                        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border-2 border-primary shadow-md">
                          <span className="text-xs font-bold">{level.id}</span>
                        </div>

                        {/* Level name */}
                        <div
                          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md border ${
                            selectedLevel === level.id ? "border-primary" : "border-transparent"
                          }`}
                        >
                          <span className="text-xs font-medium">{level.level}</span>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Finish flag */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: "95%", top: "60%", opacity: 0.7 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected level courses */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    selectedLevel === 1
                      ? "bg-green-100 text-green-600"
                      : selectedLevel === 2
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <span className="font-bold">{selectedLevel}</span>
                </div>
                <div>
                  <h4 className="font-medium">{courseLevels[selectedLevel - 1].level} Level</h4>
                  <p className="text-xs text-muted-foreground">{courseLevels[selectedLevel - 1].description}</p>
                </div>
              </div>

              {/* Course cards */}
              <div className="space-y-3">
                {courseLevels[selectedLevel - 1].courses.map((course) => (
                  <Card key={course.id} className={course.unlocked ? "" : "opacity-70"}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              course.completed
                                ? "bg-green-100 text-green-600"
                                : course.unlocked
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {course.completed ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : course.unlocked ? (
                              <BookOpen className="h-5 w-5" />
                            ) : (
                              <Lock className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-xs text-muted-foreground">{course.instructor}</p>
                          </div>
                        </div>
                        {course.reward && (
                          <Badge variant="outline" className="flex items-center bg-primary/5 text-primary">
                            <Gift className="h-3 w-3 mr-1" />
                            Reward
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            {course.completedModules} of {course.modules} modules
                          </span>
                          <span>{Math.round((course.completedModules / course.modules) * 100)}% complete</span>
                        </div>
                        <Progress
                          value={(course.completedModules / course.modules) * 100}
                          className="h-2"
                          indicatorClassName={course.completed ? "bg-green-500" : undefined}
                        />
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                          <Separator orientation="vertical" className="mx-2 h-3" />
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{course.rating}</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          disabled={!course.unlocked}
                          variant={course.completed ? "outline" : "default"}
                        >
                          {course.completed ? "Review" : course.unlocked ? "Continue" : "Locked"}
                        </Button>
                      </div>

                      {course.reward && course.completed && (
                        <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-md text-xs flex items-center text-green-600 dark:text-green-400">
                          <Sparkles className="h-3 w-3 mr-1" />
                          <span>You've earned: {course.reward}</span>
                        </div>
                      )}

                      {course.reward && !course.completed && course.unlocked && (
                        <div className="mt-3 p-2 bg-primary/5 rounded-md text-xs flex items-center">
                          <Gift className="h-3 w-3 mr-1 text-primary" />
                          <span>Complete to earn: {course.reward}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}

