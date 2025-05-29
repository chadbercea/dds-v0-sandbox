"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Play, Trash2, Download, MoreHorizontal } from "lucide-react"

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

  const handleSelectAll = () => {
    if (selectedImages.length === filteredImages.length && filteredImages.length > 0) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((image) => image.id))
    }
  }

  const handleSelectImage = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId))
    } else {
      setSelectedImages([...selectedImages, imageId])
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="mr-6">
              <Image src="/sub-marks/subMarkPrimary.svg" alt="Docker" width={32} height={32} />
            </Link>
            <nav className="flex space-x-4">
              <Link href="/" className="rounded px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Containers
              </Link>
              <Link href="/images" className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                Images
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Images</h1>
          <p className="mt-2 text-muted-foreground">Manage your Docker images</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded bg-card p-4 shadow">
            <div className="text-2xl font-bold text-card-foreground">{images.length}</div>
            <div className="text-sm text-muted-foreground">Total Images</div>
          </div>
          <div className="rounded bg-card p-4 shadow">
            <div className="text-2xl font-bold text-primary">{activeImages}</div>
            <div className="text-sm text-muted-foreground">Active Images</div>
          </div>
          <div className="rounded bg-card p-4 shadow">
            <div className="text-2xl font-bold text-card-foreground">{totalSize.toFixed(1)}MB</div>
            <div className="text-sm text-muted-foreground">Total Size</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border-input bg-background px-9 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex gap-2">
            {selectedImages.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="inline-flex items-center justify-center rounded bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedImages.length})
              </button>
            )}
            <button className="inline-flex items-center justify-center rounded border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
              <Download className="mr-2 h-4 w-4" />
              Pull Image
            </button>
          </div>
        </div>

        {/* Images Table */}
        <div className="overflow-hidden rounded bg-card shadow">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Repository
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Image ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {filteredImages.map((image) => (
                <tr key={image.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => handleSelectImage(image.id)}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-card-foreground">{image.repository}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {image.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-muted-foreground">
                    {image.imageId.substring(0, 12)}...
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{image.created}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{image.size}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        image.status === "active"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {image.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleRunImage(image.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                        title="Run image"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        title="Delete image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        title="More options"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredImages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No images found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
