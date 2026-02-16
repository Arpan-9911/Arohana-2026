import { useState, useEffect } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { MetricsGrid } from "@/components/MetricsGrid"
import { ChartsSection } from "@/components/ChartSection"
import { getDashboardStats } from "@/lib/admin.service"

export default function Home() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    }
    fetchStats();
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <MetricsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-3">
            <ChartsSection stats={stats} />
          </div>
          <div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
