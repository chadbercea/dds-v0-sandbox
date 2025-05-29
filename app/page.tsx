import ContainerManagement from "./container-management"
import { Navigation } from "@/components/navigation"

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ContainerManagement />
    </div>
  )
}
