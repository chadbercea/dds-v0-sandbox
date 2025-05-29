"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Search,
  Star,
  Download,
  Clock,
  Users,
  Brain,
  Bot,
  Database,
  Globe,
  Filter,
  Heart,
  MessageSquare,
  Share,
  BookOpen,
  Cpu,
  Network,
  Layers,
  Moon,
  Sun,
  Bell,
  Settings,
  Plus,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  Rocket,
  Eye,
  CheckCircle,
} from "lucide-react"

export default function DockerHubAI() {
  const { toast } = useToast()
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("trending")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const featuredImages = [
    {
      id: 1,
      name: "llama-3.2-vision-hdi",
      description: "Advanced vision-language model with Human-Docker Interface for seamless AI integration",
      author: "meta-ai",
      downloads: "2.3M",
      stars: 15420,
      tags: ["HDI", "Vision", "LLM", "Meta"],
      category: "hdi",
      verified: true,
      trending: true,
      lastUpdated: "2 hours ago",
      size: "4.2GB",
      architecture: ["amd64", "arm64"],
      aiCapabilities: ["vision", "text-generation", "multimodal"],
      communityScore: 98,
    },
    {
      id: 2,
      name: "claude-3.5-mcp-server",
      description: "Anthropic's Claude 3.5 with Model Context Protocol for enhanced AI agent communication",
      author: "anthropic",
      downloads: "1.8M",
      stars: 12890,
      tags: ["MCP", "Claude", "Agent", "Protocol"],
      category: "mcp",
      verified: true,
      trending: true,
      lastUpdated: "4 hours ago",
      size: "6.1GB",
      architecture: ["amd64"],
      aiCapabilities: ["reasoning", "code-generation", "analysis"],
      communityScore: 96,
    },
    {
      id: 3,
      name: "openai-gpt4-hdi-toolkit",
      description: "Complete GPT-4 toolkit with HDI bindings for rapid AI application development",
      author: "openai",
      downloads: "3.1M",
      stars: 18750,
      tags: ["HDI", "GPT-4", "Toolkit", "OpenAI"],
      category: "hdi",
      verified: true,
      trending: false,
      lastUpdated: "1 day ago",
      size: "5.8GB",
      architecture: ["amd64", "arm64"],
      aiCapabilities: ["text-generation", "code-completion", "reasoning"],
      communityScore: 99,
    },
    {
      id: 4,
      name: "mistral-7b-mcp-bridge",
      description: "Mistral 7B with MCP bridge for distributed AI model orchestration",
      author: "mistralai",
      downloads: "890K",
      stars: 8420,
      tags: ["MCP", "Mistral", "Bridge", "Orchestration"],
      category: "mcp",
      verified: true,
      trending: true,
      lastUpdated: "6 hours ago",
      size: "3.9GB",
      architecture: ["amd64", "arm64"],
      aiCapabilities: ["text-generation", "fine-tuning", "inference"],
      communityScore: 94,
    },
    {
      id: 5,
      name: "stable-diffusion-hdi-xl",
      description: "Stable Diffusion XL with HDI for seamless image generation workflows",
      author: "stability-ai",
      downloads: "1.2M",
      stars: 9650,
      tags: ["HDI", "Diffusion", "Image-Gen", "XL"],
      category: "hdi",
      verified: true,
      trending: false,
      lastUpdated: "12 hours ago",
      size: "7.3GB",
      architecture: ["amd64"],
      aiCapabilities: ["image-generation", "style-transfer", "inpainting"],
      communityScore: 92,
    },
    {
      id: 6,
      name: "gemini-pro-mcp-connector",
      description: "Google's Gemini Pro with MCP connector for multi-agent AI systems",
      author: "google-ai",
      downloads: "756K",
      stars: 7230,
      tags: ["MCP", "Gemini", "Connector", "Multi-Agent"],
      category: "mcp",
      verified: true,
      trending: true,
      lastUpdated: "3 hours ago",
      size: "4.7GB",
      architecture: ["amd64"],
      aiCapabilities: ["multimodal", "reasoning", "code-generation"],
      communityScore: 95,
    },
  ]

  const trendingSearches = [
    "HDI vision models",
    "MCP protocols",
    "LLM inference",
    "AI agents",
    "multimodal AI",
    "code generation",
  ]

  const categories = [
    { id: "all", name: "All Categories", icon: Globe, count: "12.4K" },
    { id: "hdi", name: "HDI Models", icon: Brain, count: "5.2K" },
    { id: "mcp", name: "MCP Protocols", icon: Network, count: "3.8K" },
    { id: "llm", name: "Language Models", icon: MessageSquare, count: "2.1K" },
    { id: "vision", name: "Computer Vision", icon: Eye, count: "1.9K" },
    { id: "agents", name: "AI Agents", icon: Bot, count: "1.4K" },
  ]

  const handleSearch = () => {
    toast({
      title: "Searching AI Registry",
      description: `Finding ${searchQuery || "all"} AI models and protocols...`,
    })
  }

  const handleImageAction = (action: string, imageName: string) => {
    toast({
      title: `${action} ${imageName}`,
      description: `${action} operation initiated for ${imageName}`,
    })
  }

  return (
    <div className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-32 h-8">
                <img src="/logo/LogoPrimary.svg" alt="Docker Hub" className="w-full h-full object-contain" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                AI Registry
              </Badge>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Button variant="ghost" size="sm">
                Explore
              </Button>
              <Button variant="ghost" size="sm">
                HDI Models
              </Button>
              <Button variant="ghost" size="sm">
                MCP Protocols
              </Button>
              <Button variant="ghost" size="sm">
                Community
              </Button>
              <Button variant="ghost" size="sm">
                Docs
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <Badge variant="outline" className="bg-white/50 border-blue-200">
              The AI Infrastructure Hub
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Discover, Deploy & Scale AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The world's largest registry of HDI-enabled models and MCP protocols. Hunt, gather, and deploy cutting-edge
            AI infrastructure with the Docker ecosystem.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search HDI models, MCP protocols, AI agents..."
                  className="pl-12 h-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-14">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="h-4 w-4" />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="lg" className="h-14 px-8" onClick={handleSearch}>
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Trending Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-sm text-muted-foreground mr-2">Trending:</span>
            {trendingSearches.map((search, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-white/50 hover:bg-white/80"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12.4K+</div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3.8K+</div>
              <div className="text-sm text-muted-foreground">MCP Protocols</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">890M+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">45K+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Categories & Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Explore AI Registry</h2>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <TrendingUp className="mr-1 h-3 w-3" />
              Hot
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
                <SelectItem value="stars">Most Starred</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
                <SelectItem value="community">Community Score</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="featured" className="mb-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="hdi" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              HDI Models
            </TabsTrigger>
            <TabsTrigger value="mcp" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              MCP Protocols
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              New Releases
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredImages.map((image) => (
                <Card
                  key={image.id}
                  className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${image.author.charAt(0).toUpperCase()}`}
                          />
                          <AvatarFallback>{image.author.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                              {image.name}
                            </CardTitle>
                            {image.verified && <CheckCircle className="h-4 w-4 text-blue-600" />}
                            {image.trending && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                                <TrendingUp className="mr-1 h-3 w-3" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">by {image.author}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed">{image.description}</CardDescription>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* AI Capabilities */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Cpu className="h-3 w-3" />
                        AI Capabilities:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {image.aiCapabilities.map((capability, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{image.downloads}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{image.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{image.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{image.lastUpdated}</span>
                      </div>
                    </div>

                    {/* Community Score */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Community Score</span>
                        <span className="font-medium">{image.communityScore}/100</span>
                      </div>
                      <Progress value={image.communityScore} className="h-2" />
                    </div>

                    {/* Architecture Support */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Layers className="h-3 w-3" />
                      {image.architecture.join(", ")}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" onClick={() => handleImageAction("Pull", image.name)}>
                        <Download className="mr-2 h-4 w-4" />
                        Pull
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleImageAction("Star", image.name)}>
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleImageAction("Share", image.name)}>
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hdi" className="mt-6">
            <div className="text-center py-12">
              <Brain className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">HDI Models</h3>
              <p className="text-muted-foreground mb-4">
                Human-Docker Interface enabled AI models for seamless integration
              </p>
              <Button>
                <ChevronRight className="mr-2 h-4 w-4" />
                Explore HDI Models
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="mcp" className="mt-6">
            <div className="text-center py-12">
              <Network className="h-16 w-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-2">MCP Protocols</h3>
              <p className="text-muted-foreground mb-4">
                Model Context Protocol implementations for AI agent communication
              </p>
              <Button>
                <ChevronRight className="mr-2 h-4 w-4" />
                Explore MCP Protocols
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-semibold mb-2">Trending Now</h3>
              <p className="text-muted-foreground mb-4">Most popular AI models and protocols this week</p>
              <Button>
                <ChevronRight className="mr-2 h-4 w-4" />
                View Trending
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-2">New Releases</h3>
              <p className="text-muted-foreground mb-4">Latest AI models and protocol updates</p>
              <Button>
                <ChevronRight className="mr-2 h-4 w-4" />
                View New Releases
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-xl font-semibold mb-2">Community Favorites</h3>
              <p className="text-muted-foreground mb-4">Top-rated models by the AI developer community</p>
              <Button>
                <ChevronRight className="mr-2 h-4 w-4" />
                Explore Community
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Rocket className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Deploy Instantly</h3>
            <p className="text-muted-foreground mb-4">One-click deployment of AI models to your infrastructure</p>
            <Button variant="outline">Learn More</Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <p className="text-muted-foreground mb-4">Comprehensive guides for HDI and MCP integration</p>
            <Button variant="outline">Read Docs</Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold mb-2">Join Community</h3>
            <p className="text-muted-foreground mb-4">Connect with AI developers and contributors worldwide</p>
            <Button variant="outline">Join Now</Button>
          </Card>
        </div>
      </main>

      <Toaster />
    </div>
  )
}
