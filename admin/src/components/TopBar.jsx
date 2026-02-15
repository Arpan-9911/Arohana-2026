"use client"

import { Menu, Bell, Settings, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export default function TopBar({ onMenuClick }) {
  return (
    <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-foreground hover:text-primary">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-4 py-2 flex-1 max-w-md">
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-foreground placeholder-muted-foreground w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
          <Settings size={20} />
        </button>
        <Link to='/profile'>
          <Button>
            AS
          </Button>
        </Link>
      </div>
    </div>
  )
}
