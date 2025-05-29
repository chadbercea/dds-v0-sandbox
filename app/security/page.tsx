"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NavigationProvider } from "@/components/layout/app-header"

export default function SecurityPage() {
  const [currentContext] = useState<"organization">("organization")

  const vulnerabilities = [
    {
      id: "CVE-2024-0001",
      severity: "critical",
      package: "openssl",
      version: "1.1.1k",
      fixedIn: "1.1.1l",
      repository: "acme/backend",
      description: "Buffer overflow vulnerability in OpenSSL",
      publishedDate: "2024-01-15",
    },
    {
      id: "CVE-2024-0002",
      severity: "high",
      package: "nginx",
      version: "1.20.1",
      fixedIn: "1.20.2",
      repository: "acme/frontend",
      description: "HTTP request smuggling vulnerability",
      publishedDate: "2024-01-12",
    },
    {
      id: "CVE-2024-0003",
      severity: "medium",
      package: "node",
      version: "16.14.0",
      fixedIn: "16.14.2",
      repository: "acme/api",
      description: "Prototype pollution vulnerability",
      publishedDate: "2024-01-10",
    },
    {
      id: "CVE-2024-0004",
      severity: "low",
      package: "lodash",
      version: "4.17.20",
      fixedIn: "4.17.21",
      repository: "acme/utils",
      description: "Regular expression denial of service",
      publishedDate: "2024-01-08",
    },
  ]

  const scanResults = [
    {
      repository: "acme/backend",
      lastScan: "2 hours ago",
      status: "completed",
      critical: 1,
      high: 2,
      medium: 5,
      low: 8,
      total: 16,
    },
    {
      repository: "acme/frontend",
      lastScan: "4 hours ago",
      status: "completed",
      critical: 0,
      high: 1,
      medium: 3,
      low: 4,
      total: 8,
    },
    {
      repository: "acme/api",
      lastScan: "1 day ago",
      status: "completed",
      critical: 0,
      high: 0,
      medium: 2,
      low: 1,
      total: 3,
    },
    {
      repository: "acme/mobile",
      lastScan: "3 days ago",
      status: "scanning",
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      total: 0,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-3 w-3" />
      case "high":
        return <AlertTriangle className="h-3 w-3" />
      case "medium":
        return <AlertTriangle className="h-3 w-3" />
      case "low":
        return <CheckCircle className="h-3 w-3" />
      default:
        return <CheckCircle className="h-3 w-3" />
    }
  }

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={() => {}}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Security Scans</h1>
              <p className="text-muted-foreground">Monitor and manage security vulnerabilities</p>
            </div>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Run Full Scan
            </Button>
          </div>

          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                  <p className="text-2xl font-bold text-destructive">1</p>
                  <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-destructive">3</p>
                  <p className="text-xs text-muted-foreground mt-1">Should be fixed soon</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Vulnerabilities</p>
                  <p className="text-2xl font-bold">27</p>
                  <p className="text-xs text-muted-foreground mt-1">Across all repositories</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                  <p className="text-2xl font-bold">72%</p>
                  <Progress value={72} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="vulnerabilities" className="space-y-4">
            <TabsList>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              <TabsTrigger value="scans">Scan Results</TabsTrigger>
              <TabsTrigger value="policies">Security Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="vulnerabilities" className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search vulnerabilities..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter by Severity
                </Button>
              </div>

              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Security Vulnerabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vulnerabilities.map((vuln, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Badge variant={getSeverityColor(vuln.severity)} className="text-xs">
                            {getSeverityIcon(vuln.severity)}
                            {vuln.severity.toUpperCase()}
                          </Badge>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{vuln.id}</h3>
                              <code className="text-sm bg-muted px-2 py-1 rounded">{vuln.repository}</code>
                            </div>
                            <p className="text-sm text-muted-foreground">{vuln.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {vuln.package} {vuln.version} → {vuln.fixedIn} • Published {vuln.publishedDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Fix Now</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scans" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Repository Scan Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scanResults.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{scan.repository}</h3>
                              <Badge
                                variant={scan.status === "completed" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {scan.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Last scan: {scan.lastScan}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Critical</p>
                          <p className="font-medium text-destructive">{scan.critical}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">High</p>
                          <p className="font-medium text-destructive">{scan.high}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Medium</p>
                          <p className="font-medium">{scan.medium}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Low</p>
                          <p className="font-medium">{scan.low}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="font-medium">{scan.total}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                        <Button size="sm">Rescan</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policies" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Security Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Vulnerability Threshold</h4>
                    <p className="text-sm text-muted-foreground">
                      Block deployments when vulnerabilities exceed threshold
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Critical Only
                      </Button>
                      <Button variant="outline" size="sm">
                        High & Critical
                      </Button>
                      <Button variant="outline" size="sm">
                        Medium & Above
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Scan Frequency</h4>
                    <p className="text-sm text-muted-foreground">How often to automatically scan repositories</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Daily
                      </Button>
                      <Button variant="outline" size="sm">
                        Weekly
                      </Button>
                      <Button variant="outline" size="sm">
                        On Push
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified when new vulnerabilities are found</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        Slack
                      </Button>
                      <Button variant="outline" size="sm">
                        Webhook
                      </Button>
                    </div>
                  </div>
                  <Button>Save Policies</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </NavigationProvider>
  )
}
