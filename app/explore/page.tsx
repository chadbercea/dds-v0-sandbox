"use client"

import { useState } from "react"
import { Search, Star, Download, Shield, Filter, Grid, List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NavigationProvider } from "@/components/layout/app-header"

export default function ExplorePage() {
  const [currentContext] = useState<"personal">("personal")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const popularImages = [
    {
      name: "nginx",
      tag: "latest",
      description: "Official build of Nginx",
      pulls: "1B+",
      stars: 15000,
      verified: true,
      size: "142MB",
      lastUpdated: "2 days ago",
    },
    {
      name: "node",
      tag: "18-alpine",
      description: "Node.js runtime built on Alpine Linux",
      pulls: "500M+",
      stars: 8500,
      verified: true,
      size: "165MB",
      lastUpdated: "1 week ago",
    },
    {
      name: "postgres",
      tag: "15",
      description: "PostgreSQL object-relational database",
      pulls: "100M+",
      stars: 9200,
      verified: true,
      size: "379MB",
      lastUpdated: "3 days ago",
    },
    {
      name: "redis",
      tag: "7-alpine",
      description: "Redis in-memory data structure store",
      pulls: "100M+",
      stars: 7800,
      verified: true,
      size: "29MB",
      lastUpdated: "1 week ago",
    },
    {
      name: "python",
      tag: "3.11-slim",
      description: "Python programming language",
      pulls: "500M+",
      stars: 6500,
      verified: true,
      size: "122MB",
      lastUpdated: "5 days ago",
    },
    {
      name: "ubuntu",
      tag: "22.04",
      description: "Ubuntu Linux distribution",
      pulls: "1B+",
      stars: 12000,
      verified: true,
      size: "77MB",
      lastUpdated: "1 week ago",
    },
  ]

  const categories = [
    "All",
    "Operating Systems",
    "Programming Languages",
    "Databases",
    "Web Servers",
    "Development Tools",
    "Machine Learning",
  ]

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={() => {}}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Explore Images</h1>
              <p className="text-muted-foreground">Discover and pull container images from Docker Hub</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for images..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Images Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {popularImages.map((image, index) => (
              <Card key={index} className="rounded-lg hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{image.name}</CardTitle>
                        {image.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <code className="text-sm text-muted-foreground">{image.tag}</code>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      {image.stars.toLocaleString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">{image.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{image.pulls} pulls</span>
                    <span>{image.size}</span>
                    <span>Updated {image.lastUpdated}</span>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Pull Image
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </NavigationProvider>
  )
}
