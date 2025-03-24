"use client"

import MobileLayout from "@/components/mobile-layout"
import { BudgetChatbot } from "@/components/budget-chatbot"

export default function BudgetChatbotPage() {
  return (
    <MobileLayout title="Budget Assistant" showBackButton>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <BudgetChatbot />
      </div>
    </MobileLayout>
  )
}

