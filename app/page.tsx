"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Fingerprint } from "lucide-react"
import { motion } from "framer-motion"

export default function SplashScreen() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      router.push("/login")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary to-primary/80 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center mb-6">
          <Fingerprint className="h-14 w-14 text-primary" />
        </div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-bold"
        >
          FINNAVA
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl mt-2"
        >
          Your AI Financial Assistant
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12"
      >
        {isLoading && (
          <div className="flex space-x-2">
            <div className="h-3 w-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

