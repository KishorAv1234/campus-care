"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, QrCode, Wallet, Landmark, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PaymentMethodsProps {
  total: number
  onPaymentComplete: () => void
  onCancel: () => void
  isProcessing: boolean
}

export function PaymentMethods({ total, onPaymentComplete, onCancel, isProcessing }: PaymentMethodsProps) {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateUpi = () => {
    setIsValidating(true)
    setErrors({})

    if (!upiId) {
      setErrors({ upiId: "UPI ID is required" })
      setIsValidating(false)
      return false
    }

    if (!upiId.includes("@")) {
      setErrors({ upiId: "Invalid UPI ID format" })
      setIsValidating(false)
      return false
    }

    setIsValidating(false)
    return true
  }

  const validateCard = () => {
    setIsValidating(true)
    setErrors({})

    const newErrors: Record<string, string> = {}

    if (!cardNumber || cardNumber.length < 16) {
      newErrors.cardNumber = "Valid card number is required"
    }

    if (!cardName) {
      newErrors.cardName = "Name on card is required"
    }

    if (!cardExpiry || !cardExpiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.cardExpiry = "Valid expiry date (MM/YY) is required"
    }

    if (!cardCvv || cardCvv.length < 3) {
      newErrors.cardCvv = "Valid CVV is required"
    }

    setErrors(newErrors)
    setIsValidating(false)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = () => {
    let isValid = false

    if (paymentMethod === "upi") {
      isValid = validateUpi()
    } else if (paymentMethod === "card") {
      isValid = validateCard()
    } else {
      isValid = true // For COD and other methods
    }

    if (isValid) {
      onPaymentComplete()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setPaymentMethod("upi")}>
              UPI
            </TabsTrigger>
            <TabsTrigger value="cards" onClick={() => setPaymentMethod("card")}>
              Cards
            </TabsTrigger>
            <TabsTrigger value="wallet" onClick={() => setPaymentMethod("wallet")}>
              Wallets
            </TabsTrigger>
            <TabsTrigger value="cod" onClick={() => setPaymentMethod("cod")}>
              COD
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            <RadioGroup defaultValue="upi" className="space-y-4">
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="upi" id="upi" checked={paymentMethod === "upi"} />
                <Label htmlFor="upi" className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2" />
                  UPI Payment
                </Label>
              </div>

              <AnimatePresence>
                {paymentMethod === "upi" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 space-y-4"
                  >
                    <div className="flex justify-center">
                      <div className="h-48 w-48 bg-muted rounded-md flex items-center justify-center">
                        <QrCode className="h-24 w-24 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Scan with any UPI app</p>
                      <p className="text-xs text-muted-foreground">campus.care@ybl</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">Or enter your UPI ID</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="upi-id"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className={errors.upiId ? "border-red-500" : ""}
                        />
                        <Button variant="outline" size="sm">
                          Verify
                        </Button>
                      </div>
                      {errors.upiId && (
                        <p className="text-xs text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.upiId}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </RadioGroup>
          </TabsContent>

          <TabsContent value="cards" className="space-y-4 mt-4">
            <RadioGroup defaultValue="card" className="space-y-4">
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="card" id="card" checked={paymentMethod === "card"} />
                <Label htmlFor="card" className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Credit/Debit Card
                </Label>
              </div>

              <AnimatePresence>
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && (
                        <p className="text-xs text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className={errors.cardName ? "border-red-500" : ""}
                      />
                      {errors.cardName && (
                        <p className="text-xs text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.cardName}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className={errors.cardExpiry ? "border-red-500" : ""}
                        />
                        {errors.cardExpiry && (
                          <p className="text-xs text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.cardExpiry}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className={errors.cardCvv ? "border-red-500" : ""}
                        />
                        {errors.cardCvv && (
                          <p className="text-xs text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.cardCvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </RadioGroup>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4 mt-4">
            <RadioGroup defaultValue="wallet" className="space-y-4">
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="wallet" id="wallet" checked={paymentMethod === "wallet"} />
                <Label htmlFor="wallet" className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  Digital Wallet
                </Label>
              </div>

              <AnimatePresence>
                {paymentMethod === "wallet" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                        <img src="/placeholder.svg?height=30&width=30&text=P" alt="PayTM" className="mb-2" />
                        <span className="text-xs">PayTM</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                        <img src="/placeholder.svg?height=30&width=30&text=G" alt="GPay" className="mb-2" />
                        <span className="text-xs">Google Pay</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                        <img src="/placeholder.svg?height=30&width=30&text=P" alt="PhonePe" className="mb-2" />
                        <span className="text-xs">PhonePe</span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </RadioGroup>
          </TabsContent>

          <TabsContent value="cod" className="space-y-4 mt-4">
            <RadioGroup defaultValue="cod" className="space-y-4">
              <div className="flex items-center space-x-2 border rounded-md p-4">
                <RadioGroupItem value="cod" id="cod" checked={paymentMethod === "cod"} />
                <Label htmlFor="cod" className="flex items-center">
                  <Landmark className="h-5 w-5 mr-2" />
                  Cash on Delivery
                </Label>
              </div>

              <AnimatePresence>
                {paymentMethod === "cod" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 space-y-4"
                  >
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        Note: Cash on Delivery is available for physical books only. Digital books require online
                        payment.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </RadioGroup>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
          Cancel
        </Button>
        <Button onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay ₹${total}`
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
