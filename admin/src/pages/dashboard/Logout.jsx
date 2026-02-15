"use client"

import { useEffect } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      // In a real app, you would clear auth tokens here
      navigate.push("/")
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-card border-border max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                  <LogOut size={32} className="text-sidebar-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Logging Out</h2>
                <p className="text-muted-foreground mt-2">You are being logged out. Redirecting...</p>
              </div>
              <div className="pt-4">
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-sidebar-primary animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
