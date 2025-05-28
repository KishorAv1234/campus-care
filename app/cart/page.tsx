"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Trash2, ArrowRight, BookOpen, Minus, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getUserCart, createOrder, removeFromCart, updateCartItemQuantity } from "@/app/actions/books"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PaymentMethods } from "@/components/payment-methods"
import { Skeleton } from "@/components/ui/skeleton"

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
  const { user, isLoading: isUserLoading } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const [cart, setCart] = useState<Cart | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isUserLoading && !user) {
      toast({
        title: "Login Required",
        description: "Please login to view your cart",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [user, isUserLoading, router, toast])

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

  const handleRemoveItem = async (itemId: string) => {
    try {
      const result = await removeFromCart(itemId)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setCart(result.cart)
        toast({
          title: "Item Removed",
          description: "Item has been removed from your cart",
        })
      }
    } catch (error) {
      console.error("Error removing item:", error)
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      const result = await updateCartItemQuantity(itemId, quantity)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setCart(result.cart)
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
  }

  const handlePaymentComplete = async () => {
    setIsProcessing(true)

    try {
      const result = await createOrder("upi") // You can pass the actual payment method here

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
        setIsCheckingOut(false)

        // Redirect to orders page
        router.push("/orders")
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

  const handleCancelCheckout = () => {
    setIsCheckingOut(false)
  }

  if (isUserLoading || isPageLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-6 pt-20">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-12 rounded" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            </div>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            {cart?.items.length > 0 && !isCheckingOut && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/marketplace">Continue Shopping</Link>
              </Button>
            )}
          </div>

          {isCheckingOut && cart ? (
            <div className="max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <PaymentMethods
                  total={cart.total}
                  onPaymentComplete={handlePaymentComplete}
                  onCancel={handleCancelCheckout}
                  isProcessing={isProcessing}
                />
              </motion.div>
            </div>
          ) : cart && cart.items.length > 0 ? (
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
                    <AnimatePresence>
                      {cart.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <Link href={`/marketplace/${item.bookId}`} className="font-medium hover:underline">
                                {item.title}
                              </Link>
                              <div className="flex items-center mt-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 rounded-full"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="mx-2 text-sm">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 rounded-full"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="font-medium">₹{item.price * item.quantity}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-24">
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
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹0</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{cart.total}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleCheckout}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
