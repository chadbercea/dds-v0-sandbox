"use client"

import { useState } from "react"
import { TrendingUp, Download, Users, Clock, BarChart3, PieChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NavigationProvider } from "@/components/layout/app-header"

export default function AnalyticsPage() {
  const [currentContext] = useState<"organization">("organization")

  const usageMetrics = [
    {
      title: "Total Pulls",
      value: "45,892",
      change: "+23%",
      trend: "up",
      icon: Download,
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Storage Used",
      value: "2.4TB",
      change: "+15%",
      trend: "up",
      icon: BarChart3,
    },
    {
      title: "Avg Response Time",
      value: "245ms",
      change: "-12%",
      trend: "down",
      icon: Clock,
    },
  ]

  const topRepositories = [
    {
      name: "acme/backend",
      pulls: "12,456",
      bandwidth: "1.2TB",
      growth: "+34%",
    },
    {
      name: "acme/frontend",
      pulls: "8,923",
      bandwidth: "890GB",
      growth: "+18%",
    },
    {
      name: "acme/api",
      pulls: "6,789",
      bandwidth: "567GB",
      growth: "+25%",
    },
    {
      name: "acme/mobile",
      pulls: "4,321",
      bandwidth: "432GB",
      growth: "+12%",
    },
  ]

  const geographicData = [
    { region: "North America", percentage: 45, pulls: "20,651" },
    { region: "Europe", percentage: 32, pulls: "14,685" },
    { region: "Asia Pacific", percentage: 18, pulls: "8,261" },
    { region: "South America", percentage: 3, pulls: "1,377" },
    { region: "Africa", percentage: 2, pulls: "918" },
  ]

  const timeSeriesData = [
    { period: "Jan", pulls: 32000, users: 890 },
    { period: "Feb", pulls: 35000, users: 920 },
    { period: "Mar", pulls: 38000, users: 980 },
    { period: "Apr", pulls: 42000, users: 1050 },
    { period: "May", pulls: 45892, users: 1247 },
  ]

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={() => {}}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Monitor usage patterns and performance metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="30d">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Export Report</Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {usageMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <Card key={index} className="rounded-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className={`text-xs mt-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change} from last period
                        </p>
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
              <TabsTrigger value="repositories">Repositories</TabsTrigger>
              <TabsTrigger value="geographic">Geographic</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Usage Chart Placeholder */}
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>Pull Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Pull activity chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* User Activity Placeholder */}
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">User activity chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Average Pull Time</p>
                      <p className="text-2xl font-bold">2.3s</p>
                      <Progress value={77} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold">99.8%</p>
                      <Progress value={99.8} className="mt-2" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                      <p className="text-2xl font-bold">99.9%</p>
                      <Progress value={99.9} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="repositories" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Top Repositories by Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topRepositories.map((repo, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{repo.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {repo.pulls} pulls • {repo.bandwidth} bandwidth
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{repo.growth}</p>
                        <p className="text-xs text-muted-foreground">growth</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geographic" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Geographic distribution chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>Usage by Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {geographicData.map((region, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{region.region}</span>
                          <span className="text-sm text-muted-foreground">{region.pulls} pulls</span>
                        </div>
                        <Progress value={region.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">{region.percentage}% of total traffic</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Usage Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Trend analysis chart would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>Monthly Growth</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {timeSeriesData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.period}</span>
                        <div className="text-right">
                          <p className="text-sm font-medium">{data.pulls.toLocaleString()} pulls</p>
                          <p className="text-xs text-muted-foreground">{data.users.toLocaleString()} users</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Peak Usage Hours</p>
                      <p className="text-xs text-muted-foreground">9 AM - 11 AM UTC (Business hours)</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Most Active Day</p>
                      <p className="text-xs text-muted-foreground">Tuesday (23% of weekly traffic)</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Growth Rate</p>
                      <p className="text-xs text-muted-foreground">+23% month-over-month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </NavigationProvider>
  )
}
