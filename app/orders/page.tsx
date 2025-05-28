"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { getUserOrders } from "@/app/actions/books"
import { BookOpen, Package, Truck, CheckCircle, Clock, Download, ShoppingBag, Search } from "lucide-react"
import Link from "next/link"

type OrderItem = {
  id: string
  bookId: string
  title: string
  price: number
  quantity: number
}

type Order = {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  createdAt: Date
}

export default function OrdersPage() {
  const { user, isLoading: isUserLoading } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (!isUserLoading && !user) {
      toast({
        title: "Login Required",
        description: "Please login to view your orders",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [user, isUserLoading, router, toast])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersData = await getUserOrders()
          setOrders(ordersData)
        } catch (error) {
          console.error("Error fetching orders:", error)
          toast({
            title: "Error",
            description: "Failed to load your orders. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user, toast])

  const getFilteredOrders = () => {
    if (activeTab === "all") return orders
    return orders.filter((order) => order.status === activeTab)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <Clock className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isUserLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-6 pt-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>

            <Skeleton className="h-12 w-full max-w-md" />

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                  </CardFooter>
                </Card>
              ))}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
            <Button variant="outline" asChild>
              <Link href="/marketplace">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {getFilteredOrders().length > 0 ? (
                <div className="space-y-4">
                  {getFilteredOrders().map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                              <CardDescription>
                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(order.status)}
                              <Badge variant="outline">₹{order.total}</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span>{order.items.length} items</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>Payment Method:</span>
                                <span className="font-medium">{order.paymentMethod}</span>
                              </div>
                            </div>

                            <div className="border rounded-md divide-y">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3">
                                  <div className="flex items-center gap-3">
                                    <div className="h-12 w-10 bg-muted rounded flex items-center justify-center">
                                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <Link
                                        href={`/marketplace/${item.bookId}`}
                                        className="font-medium hover:underline"
                                      >
                                        {item.title}
                                      </Link>
                                      <p className="text-xs text-muted-foreground">
                                        Qty: {item.quantity} × ₹{item.price}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">₹{item.price * item.quantity}</p>
                                    {order.status === "delivered" && (
                                      <Button variant="ghost" size="sm" className="h-8 px-2">
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            {getStatusIcon(order.status)}
                            <span>
                              {order.status === "pending"
                                ? "Awaiting confirmation"
                                : order.status === "processing"
                                  ? "Order is being processed"
                                  : order.status === "shipped"
                                    ? "Order has been shipped"
                                    : order.status === "delivered"
                                      ? "Order has been delivered"
                                      : "Order has been cancelled"}
                            </span>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <Button variant="outline" className="flex-1 sm:flex-none" asChild>
                              <Link href={`/orders/${order.id}`}>
                                <Search className="h-4 w-4 mr-2" />
                                View Details
                              </Link>
                            </Button>
                            {order.status === "delivered" && (
                              <Button className="flex-1 sm:flex-none">
                                <Download className="h-4 w-4 mr-2" />
                                Download All
                              </Button>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Package className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">No orders found</h2>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    {activeTab === "all"
                      ? "You haven't placed any orders yet. Browse our marketplace to find books and study materials."
                      : `You don't have any ${activeTab} orders.`}
                  </p>
                  <Button asChild>
                    <Link href="/marketplace">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Browse Marketplace
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
