"use client"

import { useState } from "react"
import { Plus, Search, GitBranch, Clock, Lock, Globe, Star, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NavigationProvider } from "@/components/layout/app-header"

export default function RepositoriesPage() {
  const [currentContext] = useState<"personal">("personal")

  const repositories = [
    {
      name: "my-web-app",
      description: "A modern web application built with React and Node.js",
      visibility: "private",
      tags: ["latest", "v1.2.0", "v1.1.0"],
      pulls: "1,234",
      stars: 45,
      lastPush: "2 hours ago",
      size: "245MB",
    },
    {
      name: "api-service",
      description: "RESTful API service for microservices architecture",
      visibility: "private",
      tags: ["latest", "v2.1.0", "staging"],
      pulls: "856",
      stars: 23,
      lastPush: "1 day ago",
      size: "189MB",
    },
    {
      name: "data-processor",
      description: "Python-based data processing pipeline",
      visibility: "public",
      tags: ["latest", "v1.0.0"],
      pulls: "2,891",
      stars: 78,
      lastPush: "3 days ago",
      size: "567MB",
    },
    {
      name: "mobile-backend",
      description: "Backend service for mobile applications",
      visibility: "private",
      tags: ["latest", "v1.5.2", "beta"],
      pulls: "445",
      stars: 12,
      lastPush: "5 days ago",
      size: "198MB",
    },
  ]

  const collaborators = [
    {
      name: "sarah-dev",
      role: "Admin",
      repositories: 8,
    },
    {
      name: "mike-ops",
      role: "Write",
      repositories: 3,
    },
    {
      name: "team-ci",
      role: "Read",
      repositories: 12,
    },
  ]

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={() => {}}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Repositories</h1>
              <p className="text-muted-foreground">Manage your container repositories and images</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Repository
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search repositories..." className="pl-10" />
          </div>

          <Tabs defaultValue="repositories" className="space-y-4">
            <TabsList>
              <TabsTrigger value="repositories">Repositories</TabsTrigger>
              <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="repositories" className="space-y-4">
              {repositories.map((repo, index) => (
                <Card key={index} className="rounded-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{repo.name}</CardTitle>
                          <Badge variant={repo.visibility === "private" ? "secondary" : "default"} className="text-xs">
                            {repo.visibility === "private" ? (
                              <Lock className="h-3 w-3 mr-1" />
                            ) : (
                              <Globe className="h-3 w-3 mr-1" />
                            )}
                            {repo.visibility}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {repo.pulls}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4" />
                          {repo.tags.length} tags
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {repo.lastPush}
                        </div>
                        <span>{repo.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Tags
                        </Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="collaborators" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Repository Collaborators</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Collaborator
                </Button>
              </div>
              {collaborators.map((collaborator, index) => (
                <Card key={index} className="rounded-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                          {collaborator.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{collaborator.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Access to {collaborator.repositories} repositories
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{collaborator.role}</Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Repository Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Default Visibility</h4>
                    <p className="text-sm text-muted-foreground">Choose the default visibility for new repositories</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Private
                      </Button>
                      <Button variant="outline" size="sm">
                        Public
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Auto-delete Tags</h4>
                    <p className="text-sm text-muted-foreground">Automatically delete old tags to save storage space</p>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </NavigationProvider>
  )
}
