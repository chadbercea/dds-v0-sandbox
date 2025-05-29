"use client"

import { Database, Container, Download, Shield, TrendingUp, AlertTriangle, Star, Users, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type Context = "personal" | "organization" | "team" | "billing"

interface DashboardContentProps {
  context: Context
}

export function DashboardContent({ context }: DashboardContentProps) {
  if (context === "personal") {
    return <PersonalDashboard />
  } else if (context === "organization") {
    return <OrganizationDashboard />
  } else if (context === "team") {
    return <TeamMemberDashboard />
  } else {
    return <BillingDashboard />
  }
}

function PersonalDashboard() {
  const metrics = [
    {
      title: "My Repositories",
      value: "12",
      subtitle: "2 new this month",
      icon: Database,
      trend: "up",
    },
    {
      title: "Active Containers",
      value: "3",
      subtitle: "Running locally",
      icon: Container,
      trend: "stable",
    },
    {
      title: "Images Pulled",
      value: "156",
      subtitle: "This month",
      icon: Download,
      trend: "up",
    },
    {
      title: "Security Status",
      value: "Secure",
      subtitle: "All scans passed",
      icon: Shield,
      trend: "secure",
    },
  ]

  const recentActivity = [
    {
      user: "JD",
      action: "Pulled",
      target: "nginx:latest",
      time: "2 minutes ago",
      status: "success",
    },
    {
      user: "JD",
      action: "Pushed",
      target: "myapp:v1.2.0",
      time: "1 hour ago",
      status: "success",
    },
    {
      user: "SY",
      action: "Security scan",
      target: "postgres:13",
      time: "3 hours ago",
      status: "warning",
    },
    {
      user: "CI",
      action: "Deployed",
      target: "frontend:latest",
      time: "5 hours ago",
      status: "success",
    },
  ]

  const popularImages = [
    {
      name: "nginx:latest",
      description: "Official build of Nginx",
      pulls: "15,000",
      stars: 15000,
    },
    {
      name: "node:18-alpine",
      description: "Node.js runtime",
      pulls: "8,500",
      stars: 8500,
    },
    {
      name: "postgres:15",
      description: "PostgreSQL database",
      pulls: "9,200",
      stars: 9200,
    },
    {
      name: "redis:7-alpine",
      description: "Redis in-memory store",
      pulls: "7,800",
      stars: 7800,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="rounded-lg">
              <CardContent className="p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-6 rounded-lg">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {activity.user}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{activity.action}</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{activity.target}</code>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === "success" ? "default" : "destructive"} className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Images */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Popular Images</CardTitle>
          </CardHeader>
          <CardContent className="p-6 rounded-lg">
            <div className="space-y-4">
              {popularImages.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-medium">{image.name}</code>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {image.pulls}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {image.description} • {image.pulls}+ pulls
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Pull
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-lg">
          <CardContent className="p-6 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
              <p className="text-2xl font-bold">2.1GB</p>
              <Progress value={42} className="mt-2 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-6 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Pulls This Month</p>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-xs text-muted-foreground mt-1">+23% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-6 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Team Members</p>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground mt-1">2 pending invites</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-6 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Security Scans</p>
              <p className="text-2xl font-bold">159</p>
              <p className="text-xs text-muted-foreground mt-1">All passed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function OrganizationDashboard() {
  const orgMetrics = [
    {
      title: "Active Seats",
      value: "24/30",
      subtitle: "6 seats available",
      icon: Users,
      trend: "up",
    },
    {
      title: "Team Repositories",
      value: "47",
      subtitle: "8 new this month",
      icon: Database,
      trend: "up",
    },
    {
      title: "Security Alerts",
      value: "3",
      subtitle: "2 high priority",
      icon: AlertTriangle,
      trend: "warning",
    },
    {
      title: "Monthly Usage",
      value: "89%",
      subtitle: "of plan limit",
      icon: TrendingUp,
      trend: "up",
    },
  ]

  const teamActivity = [
    {
      user: "AS",
      action: "Invited",
      target: "sarah.jones@acme.com",
      time: "1 hour ago",
      status: "success",
    },
    {
      user: "MK",
      action: "Security scan",
      target: "acme/backend:v2.1",
      time: "3 hours ago",
      status: "warning",
    },
    {
      user: "JD",
      action: "Created repository",
      target: "acme/mobile-app",
      time: "5 hours ago",
      status: "success",
    },
    {
      user: "LW",
      action: "Updated permissions",
      target: "Development Team",
      time: "1 day ago",
      status: "success",
    },
  ]

  const topRepositories = [
    {
      name: "acme/backend",
      description: "Main backend service",
      pulls: "2,340",
      contributors: 8,
    },
    {
      name: "acme/frontend",
      description: "React frontend application",
      pulls: "1,890",
      contributors: 5,
    },
    {
      name: "acme/mobile-app",
      description: "React Native mobile app",
      pulls: "1,245",
      contributors: 3,
    },
    {
      name: "acme/shared-libs",
      description: "Shared utility libraries",
      pulls: "987",
      contributors: 12,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orgMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="rounded-lg">
              <CardContent className="p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                  </div>
                  <Icon
                    className={`h-8 w-8 ${metric.trend === "warning" ? "text-destructive" : "text-muted-foreground"}`}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Team Activity */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>Team Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-3">
              {teamActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {activity.user}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{activity.action}</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded text-xs">{activity.target}</code>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant={activity.status === "success" ? "default" : "destructive"} className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Repositories */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>Top Repositories</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-3">
              {topRepositories.map((repo, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-medium">{repo.name}</code>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {repo.contributors}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {repo.description} • {repo.pulls} pulls
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
              <p className="text-2xl font-bold">47.2GB</p>
              <Progress value={78} className="mt-2 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Team Pulls</p>
              <p className="text-2xl font-bold">8,947</p>
              <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Active Members</p>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-muted-foreground mt-1">3 pending invites</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Vulnerabilities</p>
              <p className="text-2xl font-bold text-destructive">7</p>
              <p className="text-xs text-muted-foreground mt-1">3 critical, 4 medium</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TeamMemberDashboard() {
  const teamMetrics = [
    {
      title: "My Repositories",
      value: "8",
      subtitle: "3 team repositories",
      icon: Database,
      trend: "up",
    },
    {
      title: "Active Containers",
      value: "5",
      subtitle: "Running in team env",
      icon: Container,
      trend: "stable",
    },
    {
      title: "Images Pulled",
      value: "89",
      subtitle: "This month",
      icon: Download,
      trend: "up",
    },
    {
      title: "Team Access",
      value: "Member",
      subtitle: "Beta Corporation",
      icon: Users,
      trend: "stable",
    },
  ]

  const myActivity = [
    {
      user: "ME",
      action: "Pulled",
      target: "beta/api:latest",
      time: "30 minutes ago",
      status: "success",
    },
    {
      user: "ME",
      action: "Pushed",
      target: "beta/frontend:v1.4.2",
      time: "2 hours ago",
      status: "success",
    },
    {
      user: "TL",
      action: "Granted access",
      target: "beta/shared-utils",
      time: "1 day ago",
      status: "success",
    },
    {
      user: "ME",
      action: "Created branch",
      target: "beta/mobile:feature/auth",
      time: "2 days ago",
      status: "success",
    },
  ]

  const teamRepositories = [
    {
      name: "beta/api",
      description: "Main API service",
      pulls: "1,234",
      access: "Read/Write",
    },
    {
      name: "beta/frontend",
      description: "React frontend",
      pulls: "987",
      access: "Read/Write",
    },
    {
      name: "beta/mobile",
      description: "Mobile application",
      pulls: "654",
      access: "Read/Write",
    },
    {
      name: "beta/shared-utils",
      description: "Shared utilities",
      pulls: "432",
      access: "Read Only",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="rounded-lg">
              <CardContent className="p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* My Activity */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>My Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-3">
              {myActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {activity.user}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{activity.action}</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded text-xs">{activity.target}</code>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="default" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Repositories */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>Team Repositories</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-3">
              {teamRepositories.map((repo, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-medium">{repo.name}</code>
                      <Badge variant="outline" className="text-xs">
                        {repo.access}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {repo.description} • {repo.pulls} pulls
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Pull
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">My Storage</p>
              <p className="text-2xl font-bold">3.7GB</p>
              <Progress value={31} className="mt-2 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">My Pulls</p>
              <p className="text-2xl font-bold">1,847</p>
              <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Team Size</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground mt-1">Active members</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Access Level</p>
              <p className="text-2xl font-bold">Member</p>
              <p className="text-xs text-muted-foreground mt-1">Beta Corporation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BillingDashboard() {
  const billingMetrics = [
    {
      title: "Monthly Recurring Revenue",
      value: "$12,450",
      subtitle: "+8.2% from last month",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Current Month Charges",
      value: "$3,247",
      subtitle: "Across all services",
      icon: CreditCard,
      trend: "stable",
    },
    {
      title: "Outstanding Invoices",
      value: "2",
      subtitle: "$1,890 total due",
      icon: AlertTriangle,
      trend: "warning",
    },
    {
      title: "Active Subscriptions",
      value: "8",
      subtitle: "3 organizations",
      icon: Users,
      trend: "up",
    },
  ]

  const recentTransactions = [
    {
      id: "INV-2024-001",
      description: "Docker Pro - Acme Corp",
      amount: "$89.00",
      date: "Jan 15, 2024",
      status: "paid",
    },
    {
      id: "INV-2024-002",
      description: "Docker Team - Beta Corp",
      amount: "$150.00",
      date: "Jan 12, 2024",
      status: "paid",
    },
    {
      id: "INV-2024-003",
      description: "Storage Overage - Acme Corp",
      amount: "$45.00",
      date: "Jan 10, 2024",
      status: "pending",
    },
    {
      id: "INV-2024-004",
      description: "Docker Business - Sigma Co",
      amount: "$300.00",
      date: "Jan 8, 2024",
      status: "overdue",
    },
  ]

  const costBreakdown = [
    {
      service: "Docker Pro Subscriptions",
      cost: "$1,890",
      percentage: 58,
      organizations: 3,
    },
    {
      service: "Storage & Bandwidth",
      cost: "$847",
      percentage: 26,
      organizations: 3,
    },
    {
      service: "Security Scanning",
      cost: "$320",
      percentage: 10,
      organizations: 2,
    },
    {
      service: "Support & Training",
      cost: "$190",
      percentage: 6,
      organizations: 1,
    },
  ]

  const upcomingCharges = [
    {
      description: "Docker Pro - Acme Corp",
      amount: "$89.00",
      dueDate: "Feb 15, 2024",
      type: "subscription",
    },
    {
      description: "Docker Team - Beta Corp",
      amount: "$150.00",
      dueDate: "Feb 12, 2024",
      type: "subscription",
    },
    {
      description: "Storage Overage Estimate",
      amount: "$~35.00",
      dueDate: "Feb 1, 2024",
      type: "usage",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Billing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {billingMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="rounded-lg">
              <CardContent className="p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                  </div>
                  <Icon
                    className={`h-8 w-8 ${
                      metric.trend === "warning"
                        ? "text-destructive"
                        : metric.trend === "up"
                          ? "text-green-600"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{transaction.description}</span>
                      <Badge
                        variant={
                          transaction.status === "paid"
                            ? "default"
                            : transaction.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {transaction.id} • {transaction.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{transaction.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-3">
              {costBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.service}</p>
                      <p className="text-xs text-muted-foreground">{item.organizations} organizations</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.cost}</p>
                      <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2 rounded-lg" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Charges & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Charges */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Charges</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-3">
              {upcomingCharges.map((charge, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{charge.description}</span>
                      <Badge variant="outline" className="text-xs">
                        {charge.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Due {charge.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{charge.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Primary Payment Method</p>
                  <p className="text-xs text-muted-foreground">•••• •••• •••• 4242</p>
                </div>
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next billing date</span>
                  <span className="text-sm font-medium">Feb 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estimated amount</span>
                  <span className="text-sm font-medium">$274.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Payment status</span>
                  <Badge variant="default" className="text-xs">
                    Auto-pay enabled
                  </Badge>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Manage Payment Methods
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Annual Spend</p>
              <p className="text-2xl font-bold">$38,940</p>
              <p className="text-xs text-muted-foreground mt-1">Projected for 2024</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Cost per Seat</p>
              <p className="text-2xl font-bold">$47.50</p>
              <p className="text-xs text-muted-foreground mt-1">Average monthly</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Usage Growth</p>
              <p className="text-2xl font-bold text-green-600">+23%</p>
              <p className="text-xs text-muted-foreground mt-1">vs last quarter</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardContent className="p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
              <p className="text-2xl font-bold text-green-600">$2,340</p>
              <p className="text-xs text-muted-foreground mt-1">vs individual plans</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
