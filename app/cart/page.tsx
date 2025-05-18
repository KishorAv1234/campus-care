"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Trash2, CreditCard, QrCode, ArrowRight, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { getUserCart, createOrder } from "@/app/actions/books"
import { useToast } from "@/hooks/use-toast"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type CartItem = {
  id: string
  bookId: string
  title: string
  price: number
  quantity: number
}

type Cart = {
  id: string
  userId: string
  items: CartItem[]
  total: number
}

export default function CartPage() {
  const { user, isLoading } = useUser()
  const { toast } = useToast()
  const [cart, setCart] = useState<Cart | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }
  }, [user, isLoading])

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const cartData = await getUserCart()
          setCart(cartData)
        } catch (error) {
          console.error("Error fetching cart:", error)
          toast({
            title: "Error",
            description: "Failed to load your cart. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsPageLoading(false)
        }
      }
    }

    if (user) {
      fetchCart()
    }
  }, [user, toast])

  const handleCheckout = async () => {
    setIsProcessing(true)

    try {
      const result = await createOrder(paymentMethod)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.success) {
        toast({
          title: "Success",
          description: "Your order has been placed!",
        })

        // Clear cart
        setCart(null)
        setIsDialogOpen(false)

        // Redirect to orders page
        redirect("/orders")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading || isPageLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-6 pt-20 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading your cart...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6 pt-20">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          </div>

          {cart && cart.items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Items</CardTitle>
                    <CardDescription>
                      You have {cart.items.length} item{cart.items.length !== 1 ? "s" : ""} in your cart
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{cart.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹0</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{cart.total}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          Proceed to Checkout
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Checkout</DialogTitle>
                          <DialogDescription>Choose your payment method to complete your purchase.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                            <div className="flex items-center space-x-2 border rounded-md p-4">
                              <RadioGroupItem value="upi" id="upi" />
                              <Label htmlFor="upi" className="flex items-center">
                                <QrCode className="h-5 w-5 mr-2" />
                                UPI Payment
                              </Label>
                            </div>
                            {paymentMethod === "upi" && (
                              <div className="ml-6 space-y-4">
                                <div className="flex justify-center">
                                  <div className="h-48 w-48 bg-muted rounded-md flex items-center justify-center">
                                    <QrCode className="h-24 w-24 text-muted-foreground" />
                                  </div>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium">Scan with any UPI app</p>
                                  <p className="text-xs text-muted-foreground">campus.care@ybl</p>
                                </div>
                              </div>
                            )}
                            <div className="flex items-center space-x-2 border rounded-md p-4">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex items-center">
                                <CreditCard className="h-5 w-5 mr-2" />
                                Credit/Debit Card
                              </Label>
                            </div>
                            {paymentMethod === "card" && (
                              <div className="ml-6 space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="card-number">Card Number</Label>
                                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" placeholder="123" />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="name">Name on Card</Label>
                                  <Input id="name" placeholder="John Doe" />
                                </div>
                              </div>
                            )}
                          </RadioGroup>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleCheckout} disabled={isProcessing}>
                            {isProcessing ? "Processing..." : `Pay ₹${cart.total}`}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Looks like you haven't added any items to your cart yet. Browse our marketplace to find books, notes,
                  and study materials.
                </p>
                <Link href="/marketplace">
                  <Button size="lg">
                    Browse Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
