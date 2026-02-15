"use client"

import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Calendar, Edit2 } from "lucide-react"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        {/* Profile Header */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-sidebar-primary-foreground">AS</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">Aman Singh</h1>
                <p className="text-muted-foreground">Premium Member</p>
                <div className="flex gap-2 mt-4">
                  <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90">
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">Upload Photo</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">First Name</label>
                <p className="text-muted-foreground mt-1">Aman</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <p className="text-muted-foreground mt-1">Singh</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail size={16} className="text-muted-foreground" />
                  <p className="text-muted-foreground">aman.email@gmail.com</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone size={16} className="text-muted-foreground" />
                  <p className="text-muted-foreground">+91 xxxxxxxxxx</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Location</label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={16} className="text-muted-foreground" />
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Member Since</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={16} className="text-muted-foreground" />
                  <p className="text-muted-foreground">January 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-sidebar-primary">1,234</div>
                <p className="text-sm text-muted-foreground mt-2">Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-sidebar-primary">$45,678</div>
                <p className="text-sm text-muted-foreground mt-2">Total Spent</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-sidebar-primary">98%</div>
                <p className="text-sm text-muted-foreground mt-2">Satisfaction</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent account activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Logged in", time: "2 hours ago" },
                { action: "Updated profile", time: "1 day ago" },
                { action: "Changed password", time: "5 days ago" },
                { action: "Enabled 2FA", time: "2 weeks ago" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <p className="text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
