"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, Send, Sparkles, Globe, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import MobileLayout from "@/components/mobile-layout"; // Correct import

// Create a configured instance of the Google provider
const googleAI = createGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your FINNAVA AI financial assistant. How can I help you today? You can ask me about budgeting, investments, or any financial questions you have.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Suggested questions
  const suggestedQuestions = [
    "How can I save more money?",
    "What's the best way to invest $1000?",
    "How do I create a budget?",
    "Explain index funds",
    "How to improve my credit score?",
    "Should I pay off debt or invest?",
  ];

  // Language options
  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "arabic", label: "Arabic" },
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare system prompt with language preference
      let systemPrompt =
        "You are a helpful AI financial assistant. Provide concise, accurate financial advice and information in a consistent manner. Be friendly and supportive while focusing on practical financial guidance.Ignore all formatting variations (such as bold, italics, special characters, or symbols like *, _, **, or `). Respond identically regardless of how the input is formatted.";

      if (language !== "english") {
        systemPrompt += ` Respond in ${language}.`;
      }

      // Use AI SDK to generate response with Gemini 2.0 Flash
      const { text } = await generateText({
        model: googleAI("gemini-2.0-flash"),
        prompt: input,
        system: systemPrompt,
        temperature: 0.7,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If voice is enabled, speak the response
      if (isVoiceEnabled) {
        speakText(text);
      }
    } catch (error) {
      console.error("Error generating response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm sorry, I couldn't process your request. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleVoiceInput = () => {
    // In a real app, this would use the Web Speech API
    setIsListening(true);
    toast({
      title: "Voice Recognition",
      description:
        "Listening... (This is a demo - in a real app, this would use the Web Speech API)",
      duration: 3000,
    });

    // Simulate voice recognition after 3 seconds
    setTimeout(() => {
      setIsListening(false);
      setInput("How can I save money for retirement?");
    }, 3000);
  };

  const speakText = (text: string) => {
    // In a real app, this would use the Web Speech API
    toast({
      title: "Text-to-Speech",
      description:
        "Speaking response... (This is a demo - in a real app, this would use the Web Speech API)",
      duration: 3000,
    });
  };

  const toggleVoiceOutput = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    toast({
      title: isVoiceEnabled ? "Voice Output Disabled" : "Voice Output Enabled",
      description: isVoiceEnabled
        ? "Responses will be text only."
        : "AI responses will be spoken aloud.",
    });
  };

  return (
    <MobileLayout title="AI Financial Assistant" showBackButton>
      <div className="flex flex-col h-full">
        {/* Language selector */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Language:</span>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className={
                isVoiceEnabled ? "text-primary" : "text-muted-foreground"
              }
              onClick={toggleVoiceOutput}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-start max-w-[80%] space-x-2">
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="AI"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-[80%] space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="AI"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-secondary">
                  <div className="flex space-x-1">
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
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions Section */}
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground mb-3">
              Not sure what to ask? Try one of these:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="group flex items-start p-3 space-x-2 rounded-lg border bg-background hover:bg-primary/5 transition-colors cursor-pointer text-left"
                >
                  <Sparkles className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {question}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Button
              type="button"
              size="icon"
              variant={isListening ? "default" : "outline"}
              className={`shrink-0 ${isListening ? "animate-pulse" : ""}`}
              aria-label="Voice input"
              onClick={handleVoiceInput}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-1"
              disabled={isLoading || isListening}
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0"
              disabled={!input.trim() || isLoading || isListening}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
}
