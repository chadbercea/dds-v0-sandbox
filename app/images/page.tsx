"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Search, Trash2, Play, MoreHorizontal } from "lucide-react"

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
    tag: "alpine",
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

  const handleSelectImage = (imageId: string) => {
    setSelectedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const handleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((img) => img.id))
    }
  }

  const handleDeleteSelected = () => {
    setImages((prev) => prev.filter((img) => !selectedImages.includes(img.id)))
    setSelectedImages([])
  }

  const handleRunImage = (imageId: string) => {
    console.log("Running image:", imageId)
    // Implement run logic
  }

  const handleDeleteImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
    setSelectedImages((prev) => prev.filter((id) => id !== imageId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Images</h1>
          <p className="mt-2 text-gray-600">Manage your Docker images</p>
        </div>

        {/* Search and Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {selectedImages.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedImages.length} selected</span>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Images Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repository
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredImages.map((image) => (
                <tr key={image.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => handleSelectImage(image.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{image.repository}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {image.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-mono">{image.imageId.substring(0, 12)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{image.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{image.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        image.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {image.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleRunImage(image.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Run image"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm ? "No images found matching your search." : "No images available."}
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{images.length}</div>
            <div className="text-sm text-gray-500">Total Images</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {images.filter((img) => img.status === "active").length}
            </div>
            <div className="text-sm text-gray-500">Active Images</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-600">
              {images.filter((img) => img.status === "unused").length}
            </div>
            <div className="text-sm text-gray-500">Unused Images</div>
          </div>
        </div>
      </div>
    </div>
  )
}
