"use client"

import { useState, useEffect } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Zap,
  Shield,
  Globe,
  Users,
  Rocket,
  Brain,
  Container,
  ArrowRight,
  CheckCircle,
  Search,
  Github,
  MessageSquare,
  Sparkles,
} from "lucide-react"

export default function DockerHubHDIPage() {
  const [activeDemo, setActiveDemo] = useState("search")
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const fullText = "docker run -it --rm ubuntu:latest bash"

  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timer)
    } else if (typedText.length === fullText.length) {
      setTimeout(() => {
        setIsTyping(false)
        setTimeout(() => {
          setTypedText("")
          setIsTyping(true)
        }, 2000)
      }, 1000)
    }
  }, [typedText, isTyping, fullText])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Discovery",
      description: "Find the perfect container with natural language search powered by HDI intelligence.",
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Deploy containers with a single click. HDI handles configuration and optimization automatically.",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Built-in vulnerability scanning and compliance checks for every image in the registry.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share, review, and manage container images with your team using advanced workflow tools.",
    },
    {
      icon: Rocket,
      title: "Performance Optimized",
      description: "HDI automatically optimizes container performance based on usage patterns and requirements.",
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Access your containers from anywhere with our worldwide content delivery network.",
    },
  ]

  const stats = [
    { value: "50M+", label: "Container Pulls Daily" },
    { value: "2M+", label: "Developers" },
    { value: "100K+", label: "Organizations" },
    { value: "99.9%", label: "Uptime SLA" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="absolute inset-0 bg-[url('/illustrations/Product Illustration/Lg/Mock Panels.png')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Introducing HDI (Human Docker Interface)
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold font-heading leading-tight">
                  The Future of
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                    Container Management
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                  Experience Docker Hub reimagined with HDI - where artificial intelligence meets container
                  orchestration to deliver the most intuitive development experience ever created.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium">
                  <Play className="w-5 h-5 mr-2" />
                  Watch HDI Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Explore Features
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-black/20 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-white/70 text-sm ml-2">HDI Terminal</span>
                  </div>
                  <div className="font-mono text-sm">
                    <div className="text-green-400">$ hdi search "web server with ssl"</div>
                    <div className="text-white/70 mt-2">🤖 HDI found 3 optimized matches:</div>
                    <div className="text-blue-300 mt-1"> → nginx:alpine-ssl (recommended)</div>
                    <div className="text-blue-300"> → apache:secure-latest</div>
                    <div className="text-blue-300"> → caddy:auto-https</div>
                    <div className="text-green-400 mt-3">
                      $ {typedText}
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Powered by HDI Intelligence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Human Docker Interface revolutionizes how developers interact with containers, making complex operations
              feel natural and intuitive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">See HDI in Action</h2>
            <p className="text-xl text-muted-foreground">
              Experience the future of container management with interactive demos
            </p>
          </div>

          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
              <TabsTrigger value="search">AI Search</TabsTrigger>
              <TabsTrigger value="deploy">Auto Deploy</TabsTrigger>
              <TabsTrigger value="monitor">Smart Monitor</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-8">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <Search className="w-5 h-5 text-muted-foreground" />
                      <input
                        className="flex-1 bg-transparent border-0 outline-0 text-lg"
                        placeholder="Search for 'Python web app with Redis caching'"
                        defaultValue="Python web app with Redis caching"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/30 cursor-pointer">
                        <img src="/logo/LogoPrimary.svg" alt="Docker" className="w-8 h-8" />
                        <div className="flex-1">
                          <div className="font-medium">python:3.11-alpine + redis:7-alpine</div>
                          <div className="text-sm text-muted-foreground">
                            HDI Optimized Stack • 45MB • Security Verified
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                        <Button size="sm">Deploy</Button>
                      </div>

                      <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/30 cursor-pointer">
                        <Container className="w-8 h-8 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium">django:4.2 + redis:latest</div>
                          <div className="text-sm text-muted-foreground">
                            Community Choice • 120MB • Last updated 2 days ago
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deploy" className="space-y-8">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="font-medium text-green-800">Image Pulled</div>
                        <div className="text-sm text-green-600">2.3s</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-medium text-blue-800">Auto-Configured</div>
                        <div className="text-sm text-blue-600">0.8s</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <Rocket className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="font-medium text-purple-800">Deployed</div>
                        <div className="text-sm text-purple-600">1.2s</div>
                      </div>
                    </div>

                    <div className="bg-black rounded-lg p-6 font-mono text-sm">
                      <div className="text-green-400">✓ Container nginx:alpine-hdi deployed successfully</div>
                      <div className="text-white mt-2">🌐 https://your-app-hdi-xyz.docker.io</div>
                      <div className="text-blue-300 mt-1">📊 Performance: 99.9% uptime predicted</div>
                      <div className="text-yellow-300 mt-1">🔒 Security: All vulnerabilities patched</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitor" className="space-y-8">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Real-time Insights</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                          <span>CPU Usage</span>
                          <span className="text-green-600 font-medium">23%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                          <span>Memory</span>
                          <span className="text-blue-600 font-medium">1.2GB</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                          <span>Network I/O</span>
                          <span className="text-purple-600 font-medium">45 MB/s</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">HDI Recommendations</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                          <div className="text-sm font-medium text-blue-800">Scale Suggestion</div>
                          <div className="text-xs text-blue-600">Add 2 replicas for peak hours</div>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                          <div className="text-sm font-medium text-green-800">Optimization</div>
                          <div className="text-xs text-green-600">Switch to alpine variant (-40% size)</div>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <div className="text-sm font-medium text-yellow-800">Security Update</div>
                          <div className="text-xs text-yellow-600">New patch available</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold font-heading mb-6">Ready to Experience HDI?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers already using HDI to build, ship, and run containers with unprecedented ease
            and intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-white/70 mt-6">
            No credit card required • 30-day free trial • Enterprise support available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <img src="/logo/LogoPrimary.svg" alt="Docker" className="h-8" />
              <p className="text-sm text-muted-foreground">
                Empowering developers to build the future with HDI-powered container technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Docker Hub
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  HDI Features
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Enterprise
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Documentation
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  API Reference
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Community
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Support
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  About
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Blog
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Careers
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Docker, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-xs">
                HDI Beta
              </Badge>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
