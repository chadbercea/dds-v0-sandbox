"use client"

import { useState } from "react"
import { Users, UserPlus, Settings, Shield, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NavigationProvider } from "@/components/layout/app-header"

export default function OrganizationPage() {
  const [currentContext] = useState<"organization">("organization")

  const members = [
    {
      name: "Alice Smith",
      email: "alice.smith@acme.com",
      role: "Owner",
      status: "active",
      joinDate: "Jan 2023",
      lastActive: "2 hours ago",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@acme.com",
      role: "Admin",
      status: "active",
      joinDate: "Mar 2023",
      lastActive: "1 day ago",
    },
    {
      name: "Carol Davis",
      email: "carol.davis@acme.com",
      role: "Member",
      status: "active",
      joinDate: "Jun 2023",
      lastActive: "3 hours ago",
    },
    {
      name: "David Wilson",
      email: "david.wilson@acme.com",
      role: "Member",
      status: "pending",
      joinDate: "Invited",
      lastActive: "Never",
    },
  ]

  const teams = [
    {
      name: "Frontend Team",
      description: "React and UI development",
      members: 5,
      repositories: 8,
      lead: "Alice Smith",
    },
    {
      name: "Backend Team",
      description: "API and infrastructure",
      members: 4,
      repositories: 12,
      lead: "Bob Johnson",
    },
    {
      name: "DevOps Team",
      description: "CI/CD and deployment",
      members: 3,
      repositories: 6,
      lead: "Carol Davis",
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Owner":
        return <Crown className="h-3 w-3" />
      case "Admin":
        return <Shield className="h-3 w-3" />
      default:
        return <Users className="h-3 w-3" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "default"
      case "Admin":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <NavigationProvider>
      <DashboardLayout currentContext={currentContext} onContextChange={() => {}}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Organization</h1>
              <p className="text-muted-foreground">Manage your organization members and teams</p>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground mt-1">3 pending invites</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Active Teams</p>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground mt-1">Across departments</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Repositories</p>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-xs text-muted-foreground mt-1">Organization-wide</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Seat Utilization</p>
                  <p className="text-2xl font-bold">80%</p>
                  <p className="text-xs text-muted-foreground mt-1">24 of 30 seats</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="members" className="space-y-4">
            <TabsList>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-4">
              <div className="flex items-center gap-4">
                <Input placeholder="Search members..." className="max-w-sm" />
                <Button variant="outline">Filter by Role</Button>
              </div>

              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Organization Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{member.name}</p>
                            <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs">
                              {member.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {member.joinDate} • Last active {member.lastActive}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getRoleColor(member.role)} className="text-xs">
                          {getRoleIcon(member.role)}
                          {member.role}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teams" className="space-y-4">
              <div className="flex items-center justify-between">
                <Input placeholder="Search teams..." className="max-w-sm" />
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Team
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team, index) => (
                  <Card key={index} className="rounded-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{team.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Team Lead</span>
                        <span className="font-medium">{team.lead}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Members</span>
                        <span className="font-medium">{team.members}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Repositories</span>
                        <span className="font-medium">{team.repositories}</span>
                      </div>
                      <Button className="w-full" variant="outline">
                        Manage Team
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>Organization Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Organization Name</h4>
                    <Input defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Default Member Role</h4>
                    <p className="text-sm text-muted-foreground">
                      The default role assigned to new organization members
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Member
                      </Button>
                      <Button variant="outline" size="sm">
                        Admin
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Repository Creation</h4>
                    <p className="text-sm text-muted-foreground">
                      Control who can create repositories in this organization
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        All Members
                      </Button>
                      <Button variant="outline" size="sm">
                        Admins Only
                      </Button>
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </NavigationProvider>
  )
}
