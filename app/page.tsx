import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* all existing content goes here */}
        <h1 className="text-3xl font-bold">Hello world!</h1>
        <p>This is a basic page.</p>
      </div>
    </div>
  )
}
