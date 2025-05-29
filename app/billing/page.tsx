"use client"

import { useState } from "react"
import { CreditCard, Download, AlertTriangle, CheckCircle, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NavigationProvider } from "@/components/layout/app-header"

export default function BillingPage() {
  const [currentContext] = useState<"personal">("personal")

  const billingOverview = [
    {
      title: "Current Balance",
      value: "$0.00",
      subtitle: "No outstanding charges",
      icon: DollarSign,
      status: "good",
    },
    {
      title: "This Month",
      value: "$89.00",
      subtitle: "Docker Pro subscription",
      icon: Calendar,
      status: "normal",
    },
    {
      title: "Next Billing",
      value: "Feb 15",
      subtitle: "$89.00 due",
      icon: Calendar,
      status: "normal",
    },
    {
      title: "Payment Method",
      value: "•••• 4242",
      subtitle: "Visa ending in 4242",
      icon: CreditCard,
      status: "good",
    },
  ]

  const invoices = [
    {
      id: "INV-2024-001",
      date: "Jan 15, 2024",
      description: "Docker Pro - Monthly",
      amount: "$89.00",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-012",
      date: "Dec 15, 2023",
      description: "Docker Pro - Monthly",
      amount: "$89.00",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-011",
      date: "Nov 15, 2023",
      description: "Docker Pro - Monthly",
      amount: "$89.00",
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-010",
      date: "Oct 15, 2023",
      description: "Docker Pro - Monthly + Storage",
      amount: "$94.50",
      status: "paid",
      downloadUrl: "#",
    },
  ]

  const usageBreakdown = [
    {
      service: "Docker Pro Subscription",
      usage: "1 seat",
      cost: "$89.00",
      percentage: 94,
    },
    {
      service: "Additional Storage",
      usage: "2.5 GB",
      cost: "$5.00",
      percentage: 5,
    },
    {
      service: "Bandwidth Overage",
      usage: "150 GB",
      cost: "$1.00",
      percentage: 1,
    },
  ]

  const paymentMethods = [
    {
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      type: "Mastercard",
      last4: "8888",
      expiry: "08/26",
      isDefault: false,
    },
  ]

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={() => {}}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Billing & Usage</h1>
              <p className="text-muted-foreground">Manage your subscription and payment information</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
          </div>

          {/* Billing Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {billingOverview.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="rounded-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                      </div>
                      <Icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Docker Pro</h3>
                        <p className="text-sm text-muted-foreground">Perfect for individual developers</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Monthly cost</span>
                        <span className="font-medium">$89.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Next billing date</span>
                        <span className="font-medium">Feb 15, 2024</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Billing cycle</span>
                        <span className="font-medium">Monthly</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Change Plan
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>Usage Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Used</span>
                          <span>2.1 GB / 5 GB</span>
                        </div>
                        <Progress value={42} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Bandwidth</span>
                          <span>150 GB / 100 GB</span>
                        </div>
                        <Progress value={150} className="[&>div]:bg-destructive" />
                        <p className="text-xs text-destructive mt-1">50 GB overage this month</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Container Pulls</span>
                          <span>1,247 / Unlimited</span>
                        </div>
                        <Progress value={25} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Billing Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Bandwidth Overage</p>
                      <p className="text-xs text-muted-foreground">
                        You've exceeded your monthly bandwidth limit by 50 GB. Additional charges may apply.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Payment Successful</p>
                      <p className="text-xs text-muted-foreground">
                        Your payment of $89.00 was processed successfully on Jan 15, 2024.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {invoices.map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{invoice.id}</h3>
                              <Badge variant="default" className="text-xs">
                                {invoice.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{invoice.description}</p>
                            <p className="text-xs text-muted-foreground">{invoice.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Usage Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {usageBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.service}</p>
                          <p className="text-xs text-muted-foreground">{item.usage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.cost}</p>
                          <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                        </div>
                      </div>
                      <Progress value={item.percentage} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Usage Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Notification Preferences</h4>
                    <p className="text-sm text-muted-foreground">Get notified when you approach usage limits</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        80% threshold
                      </Button>
                      <Button variant="outline" size="sm">
                        90% threshold
                      </Button>
                      <Button variant="outline" size="sm">
                        100% threshold
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                <Button>Add Payment Method</Button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <Card key={index} className="rounded-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">
                                {method.type} •••• {method.last4}
                              </p>
                              {method.isDefault && (
                                <Badge variant="default" className="text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">123 Main Street</p>
                      <p className="text-sm text-muted-foreground">San Francisco, CA 94105</p>
                      <p className="text-sm text-muted-foreground">United States</p>
                    </div>
                  </div>
                  <Button variant="outline">Update Address</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </NavigationProvider>
  )
}
