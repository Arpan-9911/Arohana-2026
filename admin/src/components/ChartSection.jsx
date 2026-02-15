"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const topProductsData = [
  { name: "Product A", value: 6600, color: "hsl(var(--chart-1))" },
  { name: "Product B", value: 2400, color: "hsl(var(--chart-4))" },
  { name: "Product C", value: 2221, color: "hsl(var(--chart-3))" },
]

const worldMapData = [
  { region: "North America", value: 45 },
  { region: "Europe", value: 32 },
  { region: "Asia", value: 28 },
]

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Top Products */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Top Products</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={topProductsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {topProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full space-y-2">
            {topProductsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">${item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Global Distribution</CardTitle>
          <div className="text-3xl font-bold text-foreground mt-2">$450,00</div>
          <p className="text-sm text-muted-foreground">Total revenue</p>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-48 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
            {/* Simplified world map visualization */}
            <svg viewBox="0 0 960 600" className="w-full h-full opacity-40">
              <path
                d="M100,150 L200,100 L300,150 L350,200 L300,250 L200,200 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M400,100 L500,80 L550,120 L500,160 L400,150 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M600,200 L700,180 L750,220 L700,260 L600,250 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">Global</div>
                <div className="text-sm text-muted-foreground">Distribution Map</div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {worldMapData.map((item, index) => (
              <div key={index} className="bg-secondary rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">{item.region}</div>
                <div className="text-lg font-bold text-foreground">{item.value}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
