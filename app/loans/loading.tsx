import { Skeleton } from "@/components/ui/skeleton"
import MobileLayout from "@/components/mobile-layout"

export default function LoadingLoans() {
  return (
    <MobileLayout title="Loan Management" showBackButton>
      <div className="p-4 space-y-6">
        {/* Loan Summary Skeleton */}
        <Skeleton className="h-[140px] w-full rounded-lg" />

        {/* Loan Alerts Skeleton */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-[100px] w-full rounded-lg" />
          <Skeleton className="h-[100px] w-full rounded-lg" />
        </div>

        {/* Tabs Skeleton */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Loans List Skeleton */}
        <div className="space-y-4 mt-4">
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-[180px] w-full rounded-lg" />
        </div>
      </div>
    </MobileLayout>
  )
}

