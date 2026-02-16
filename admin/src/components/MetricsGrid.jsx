"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, UserCheck, Clock } from "lucide-react"

export function MetricsGrid({ stats }) {
  if (!stats) {
    return <div className="text-white">Loading stats...</div>
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Users */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          <div className="text-2xl font-bold text-foreground mt-2">{stats.totalUsers}</div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-2 h-4 w-4" /> Registered
          </div>
        </CardContent>
      </Card>

      {/* Total Societies */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Societies</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-foreground">{stats.totalSocieties}</div>
            <Building2 className="text-chart-1" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-muted-foreground">
            Active Societies
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-foreground">{stats.pendingApprovals}</div>
            <Clock className="text-yellow-500" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-muted-foreground">
            Waiting for review
          </div>
        </CardContent>
      </Card>

      {/* Verified Users */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Verified Users</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-foreground">{stats.verifiedUsers}</div>
            <UserCheck className="text-green-500" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-muted-foreground">
            Approved accounts
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
