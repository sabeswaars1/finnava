"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DollarSign, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CurrencySettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedCurrency, setSelectedCurrency] = useState("inr")

  const currencies = [
    { value: "inr", label: "Indian Rupee (₹)", symbol: "₹" },
    { value: "usd", label: "US Dollar ($)", symbol: "$" },
    { value: "eur", label: "Euro (€)", symbol: "€" },
    { value: "gbp", label: "British Pound (£)", symbol: "£" },
    { value: "jpy", label: "Japanese Yen (¥)", symbol: "¥" },
    { value: "cad", label: "Canadian Dollar (C$)", symbol: "C$" },
    { value: "aud", label: "Australian Dollar (A$)", symbol: "A$" },
    { value: "sgd", label: "Singapore Dollar (S$)", symbol: "S$" },
    { value: "aed", label: "UAE Dirham (AED)", symbol: "AED" },
  ]

  const handleSaveCurrency = () => {
    // In a real app, this would save the currency preference to the user's profile
    toast({
      title: "Currency Updated",
      description: `Your currency has been set to ${currencies.find((c) => c.value === selectedCurrency)?.label}`,
    })
    router.back()
  }

  return (
    <MobileLayout title="Currency Settings" showBackButton>
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Currency Preference</CardTitle>
            <CardDescription>Choose your preferred currency for displaying financial information</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedCurrency} onValueChange={setSelectedCurrency} className="space-y-3">
              {currencies.map((currency) => (
                <div key={currency.value} className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={currency.value} id={`currency-${currency.value}`} />
                  <Label htmlFor={`currency-${currency.value}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{currency.label}</div>
                    <div className="text-sm text-muted-foreground">Example: {currency.symbol}1,000.00</div>
                  </Label>
                  {selectedCurrency === currency.value && <Check className="h-5 w-5 text-primary" />}
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSaveCurrency}>
              Save Currency Preference
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Currency Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  All financial data will be displayed in your preferred currency. Exchange rates are updated daily.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  )
}

