import { DashboardLayout } from "@/layouts/DashboardLayout"
import { MetricsGrid } from "@/components/MetricsGrid"
import { ChartsSection } from "@/components/ChartSection"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <MetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-3">
            <ChartsSection />
          </div>
          <div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
