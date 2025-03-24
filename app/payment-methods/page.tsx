"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Trash2, Plus, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentMethod {
  id: string
  type: string
  name: string
  last4: string
  expiryDate: string
  isDefault: boolean
}

export default function PaymentMethodsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card1",
      type: "credit",
      name: "HDFC Credit Card",
      last4: "4242",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: "card2",
      type: "debit",
      name: "SBI Debit Card",
      last4: "8765",
      expiryDate: "09/24",
      isDefault: false,
    },
    {
      id: "upi1",
      type: "upi",
      name: "Google Pay",
      last4: "raj@upi",
      expiryDate: "",
      isDefault: false,
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)

  // New payment method form state
  const [newCardName, setNewCardName] = useState("")
  const [newCardNumber, setNewCardNumber] = useState("")
  const [newCardExpiry, setNewCardExpiry] = useState("")
  const [newCardCvv, setNewCardCvv] = useState("")
  const [newCardType, setNewCardType] = useState("credit")

  const handleAddPaymentMethod = () => {
    // Validate form
    if (!newCardName || !newCardNumber || !newCardExpiry || !newCardCvv) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the card details to a payment processor
    // and store a token rather than the actual card details
    const newPaymentMethod: PaymentMethod = {
      id: `card${Date.now()}`,
      type: newCardType,
      name: newCardName,
      last4: newCardNumber.slice(-4),
      expiryDate: newCardExpiry,
      isDefault: paymentMethods.length === 0, // Make default if it's the first card
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setIsAddDialogOpen(false)

    // Reset form
    setNewCardName("")
    setNewCardNumber("")
    setNewCardExpiry("")
    setNewCardCvv("")
    setNewCardType("credit")

    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully.",
    })
  }

  const handleDeletePaymentMethod = () => {
    if (!selectedPaymentMethod) return

    const updatedMethods = paymentMethods.filter((method) => method.id !== selectedPaymentMethod.id)

    // If we're deleting the default method, make the first remaining one the default
    if (selectedPaymentMethod.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }

    setPaymentMethods(updatedMethods)
    setIsDeleteDialogOpen(false)
    setSelectedPaymentMethod(null)

    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed successfully.",
    })
  }

  const handleSetDefault = (id: string) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    setPaymentMethods(updatedMethods)

    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    })
  }

  return (
    <MobileLayout title="Payment Methods" showBackButton>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Payment Methods</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        {paymentMethods.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">No Payment Methods</h3>
              <p className="text-sm text-muted-foreground mb-4">You haven't added any payment methods yet.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>Add Payment Method</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{method.name}</p>
                          {method.isDefault && (
                            <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {method.type === "upi" ? method.last4 : `•••• ${method.last4}`}
                          {method.expiryDate && ` • Expires ${method.expiryDate}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPaymentMethod(method)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Your payment information is encrypted and securely stored. We never store your full card details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Method Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new card or payment method to your account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-type">Payment Type</Label>
              <Select value={newCardType} onValueChange={setNewCardType}>
                <SelectTrigger id="card-type">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-name">Card Name</Label>
              <Input
                id="card-name"
                placeholder="Name on card"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
              />
            </div>

            {newCardType !== "upi" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={newCardNumber}
                    onChange={(e) => setNewCardNumber(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={newCardExpiry}
                      onChange={(e) => setNewCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={newCardCvv}
                      onChange={(e) => setNewCardCvv(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input
                  id="upi-id"
                  placeholder="yourname@upi"
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this payment method? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border rounded-md">
            <p className="font-medium">{selectedPaymentMethod?.name}</p>
            <p className="text-sm text-muted-foreground">
              {selectedPaymentMethod?.type === "upi"
                ? selectedPaymentMethod?.last4
                : `•••• ${selectedPaymentMethod?.last4}`}
              {selectedPaymentMethod?.expiryDate && ` • Expires ${selectedPaymentMethod?.expiryDate}`}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePaymentMethod}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  )
}

