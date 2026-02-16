"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

export function ChartsSection({ stats }) {
  if (!stats) return <div>Loading charts...</div>;

  const registrationData = stats.registrationStats.map((item, index) => ({
    name: item._id,
    value: item.count,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Registration Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Registration Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={registrationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {registrationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full space-y-2">
            {registrationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground capitalize">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 text-center items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">
              Total Registrations vs Approved
            </p>
            <div className="text-4xl font-bold">
              {Math.round((stats.verifiedUsers / (stats.totalUsers || 1)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Approval Rate</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
