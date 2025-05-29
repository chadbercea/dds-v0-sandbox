"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Trash2,
  Play,
  Grid3X3,
  List,
  ImageIcon,
  Calendar,
  HardDrive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DockerImage {
  id: string
  name: string
  tag: string
  size: string
  created: string
  repository: string
  imageId: string
  inUse: boolean
  vulnerabilities?: number
}

const mockImages: DockerImage[] = [
  {
    id: "1",
    name: "nginx",
    tag: "latest",
    size: "142MB",
    created: "2 days ago",
    repository: "docker.io/library/nginx",
    imageId: "sha256:abc123...",
    inUse: true,
    vulnerabilities: 0,
  },
  {
    id: "2",
    name: "node",
    tag: "18-alpine",
    size: "174MB",
    created: "1 week ago",
    repository: "docker.io/library/node",
    imageId: "sha256:def456...",
    inUse: true,
    vulnerabilities: 2,
  },
  {
    id: "3",
    name: "postgres",
    tag: "15",
    size: "379MB",
    created: "3 days ago",
    repository: "docker.io/library/postgres",
    imageId: "sha256:ghi789...",
    inUse: false,
    vulnerabilities: 1,
  },
  {
    id: "4",
    name: "redis",
    tag: "7-alpine",
    size: "32MB",
    created: "5 days ago",
    repository: "docker.io/library/redis",
    imageId: "sha256:jkl012...",
    inUse: false,
    vulnerabilities: 0,
  },
  {
    id: "5",
    name: "ubuntu",
    tag: "22.04",
    size: "77MB",
    created: "1 week ago",
    repository: "docker.io/library/ubuntu",
    imageId: "sha256:mno345...",
    inUse: false,
    vulnerabilities: 5,
  },
]

export function ImagesDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredImages = mockImages.filter(
    (image) =>
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.repository.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getVulnerabilityBadge = (count?: number) => {
    if (!count || count === 0)
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Secure
        </Badge>
      )
    if (count <= 2)
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          {count} Low
        </Badge>
      )
    return <Badge variant="destructive">{count} High</Badge>
  }

  const ImageCard = ({ image }: { image: DockerImage }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{image.name}</h3>
              <p className="text-xs text-muted-foreground">{image.tag}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Play className="w-4 h-4 mr-2" />
                Run Container
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Size</span>
            <span className="font-medium">{image.size}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Created</span>
            <span>{image.created}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={image.inUse ? "default" : "secondary"}>{image.inUse ? "In Use" : "Unused"}</Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Security</span>
            {getVulnerabilityBadge(image.vulnerabilities)}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ImageListItem = ({ image }: { image: DockerImage }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm truncate">{image.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {image.tag}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{image.repository}</p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs">
              <div className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                <span>{image.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{image.created}</span>
              </div>
              <Badge variant={image.inUse ? "default" : "secondary"}>{image.inUse ? "In Use" : "Unused"}</Badge>
              {getVulnerabilityBadge(image.vulnerabilities)}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Play className="w-4 h-4 mr-2" />
                Run Container
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Images</h1>
          <p className="text-muted-foreground">Manage your Docker images</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Pull Image
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Images</p>
                <p className="text-2xl font-bold">{mockImages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">In Use</p>
                <p className="text-2xl font-bold">{mockImages.filter((i) => i.inUse).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Total Size</p>
                <p className="text-2xl font-bold">804MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <div>
                <p className="text-sm font-medium">Vulnerabilities</p>
                <p className="text-2xl font-bold">
                  {mockImages.reduce((acc, img) => acc + (img.vulnerabilities || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="vulnerabilities">Security</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Images Grid/List */}
      <div className="mt-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredImages.map((image) => (
              <ImageListItem key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
