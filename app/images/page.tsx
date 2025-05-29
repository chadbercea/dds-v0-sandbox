"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Play, Trash2, Download } from "lucide-react"

interface DockerImage {
  id: string
  repository: string
  tag: string
  imageId: string
  created: string
  size: string
  status: "active" | "unused"
}

const mockImages: DockerImage[] = [
  {
    id: "1",
    repository: "nginx",
    tag: "latest",
    imageId: "sha256:abc123...",
    created: "2 hours ago",
    size: "142MB",
    status: "active",
  },
  {
    id: "2",
    repository: "node",
    tag: "18-alpine",
    imageId: "sha256:def456...",
    created: "1 day ago",
    size: "174MB",
    status: "active",
  },
  {
    id: "3",
    repository: "postgres",
    tag: "15",
    imageId: "sha256:ghi789...",
    created: "3 days ago",
    size: "379MB",
    status: "unused",
  },
  {
    id: "4",
    repository: "redis",
    tag: "7-alpine",
    imageId: "sha256:jkl012...",
    created: "1 week ago",
    size: "32MB",
    status: "active",
  },
  {
    id: "5",
    repository: "ubuntu",
    tag: "22.04",
    imageId: "sha256:mno345...",
    created: "2 weeks ago",
    size: "77MB",
    status: "unused",
  },
]

export default function ImagesPage() {
  const [images, setImages] = useState<DockerImage[]>(mockImages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const filteredImages = images.filter(
    (image) =>
      image.repository.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedImages(filteredImages.map((image) => image.id))
    } else {
      setSelectedImages([])
    }
  }

  const handleSelectImage = (imageId: string, checked: boolean) => {
    if (checked) {
      setSelectedImages([...selectedImages, imageId])
    } else {
      setSelectedImages(selectedImages.filter((id) => id !== imageId))
    }
  }

  const handleDeleteSelected = () => {
    setImages(images.filter((image) => !selectedImages.includes(image.id)))
    setSelectedImages([])
  }

  const handleRunImage = (imageId: string) => {
    console.log(`Running image: ${imageId}`)
  }

  const handleDeleteImage = (imageId: string) => {
    setImages(images.filter((image) => image.id !== imageId))
    setSelectedImages(selectedImages.filter((id) => id !== imageId))
  }

  const activeImages = images.filter((img) => img.status === "active").length
  const unusedImages = images.filter((img) => img.status === "unused").length
  const totalSize = images.reduce((acc, img) => {
    const size = Number.parseFloat(img.size.replace(/[^\d.]/g, ""))
    return acc + size
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Images</h1>
          <p className="mt-2 text-gray-600">Manage your Docker images</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-2xl font-bold text-gray-900">{images.length}</div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-2xl font-bold text-green-600">{activeImages}</div>
            <div className="text-sm text-gray-600">Active Images</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-2xl font-bold text-gray-600">{totalSize.toFixed(1)}MB</div>
            <div className="text-sm text-gray-600">Total Size</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {selectedImages.length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedImages.length})
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Pull Image
            </Button>
          </div>
        </div>

        {/* Images Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Repository
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tag</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredImages.map((image) => (
                <tr key={image.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedImages.includes(image.id)}
                      onCheckedChange={(checked) => handleSelectImage(image.id, checked as boolean)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{image.repository}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{image.tag}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{image.imageId.substring(0, 12)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{image.created}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{image.size}</td>
                  <td className="px-6 py-4">
                    <Badge variant={image.status === "active" ? "default" : "secondary"}>{image.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleRunImage(image.id)}>
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteImage(image.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredImages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">No images found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
