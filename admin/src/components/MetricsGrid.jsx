"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const barData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 60 },
  { name: "Wed", value: 45 },
  { name: "Thu", value: 75 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 80 },
  { name: "Sun", value: 55 },
]

const lineData = [
  { name: "Week 1", value: 200 },
  { name: "Week 2", value: 215 },
  { name: "Week 3", value: 223 },
  { name: "Week 4", value: 220 },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Bar Chart Card */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          <div className="text-2xl font-bold text-foreground mt-2">250</div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={barData}>
              <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Metric Card with Trend */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Orders</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-foreground">223</div>
            <TrendingUp className="text-chart-1" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Large Metric Card */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Sales</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-foreground">4500</div>
            <TrendingUp className="text-chart-2" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Metric Card with Down Trend */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Returns</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-foreground">523</div>
            <TrendingDown className="text-red-500" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="value" stroke="#ef4444" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
