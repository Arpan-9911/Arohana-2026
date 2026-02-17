"use client"

import { BarChart3, Home, TrendingUp, Users, LogOut, X, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

export default function Sidebar({ open, onToggle }) {
  const { location } = useLocation()

  const menuItems = [
    { icon: BarChart3, label: "Society", href: "/society" },
    { icon: Users, label: "Participants", href: "/participants" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-sm">AS</span>
              </div>
              <span className="font-bold text-sidebar-foreground hidden sm:inline">Dashboard</span>
            </div>
            <button onClick={onToggle} className="lg:hidden text-sidebar-foreground hover:text-sidebar-primary">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-sidebar-foreground/60 font-medium">Theme</span>
              <ThemeToggle />
            </div>

            {/* Logout Button */}
            <button
              onClick={async () => {
                try {
                  await import("@/lib/admin.service").then(async (module) => {
                    await module.logoutAdmin();
                    window.location.href = "/login";
                  })
                } catch (e) {
                  console.error("Logout failed", e)
                  window.location.href = "/login";
                }
              }}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-left"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
