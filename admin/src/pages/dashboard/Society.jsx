import { useState,useEffect } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Building2, MoreVertical, Plus, User, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import api from "@/lib/api"

const initialSocieties = [
  {
    id: 1,
    name: "TECHWHIZ",
    description: "The premier coding and technology club for innovation and development.",
    members: 124,
    admin: "Admin",
    founded: "11/02/2023",
    color: "bg-blue-600"
  }
]

export default function SocietiesPage() {
  
  const [societies, setSocieties] = useState(initialSocieties)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "", adminName: "", adminEmail: "", password: "" });

  const handleCreate = async (e) => {
    e.preventDefault()
    const newSociety = {
      name: formData.name,
      description: formData.description,
      adminName: formData.adminName,
      adminEmail: formData.adminEmail,
      password: formData.password,
    }
    // try{
    //   await api.post('/create-society',newSociety);
    // } catch(err){
    //   console.error(err);      
    // }

    setSocieties([...societies, newSociety])
    setIsModalOpen(false)
    setFormData({ name: "", description: "", adminName: "", adminEmail: "", password: "" });
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Manage Societies</h1>
            <p className="text-muted-foreground mt-1">Add new or view all societies</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus className="w-5 h-5" /> Create New Society
          </Button>
        </div>

        {/* Societies Grid (Image 1 Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-border rounded-2xl p-6 relative group overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-secondary p-3 rounded-xl border border-border">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <Button className="text-[#f1f1f1] hover:text-white"><MoreVertical className="w-5 h-5" /></Button>
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">TechWhiz</h3>
            <p className="text-xs text-[#f1f1f1] mb-4">Founded 11/02/2023</p>
            <p className="text-[#f1f1f1] text-sm line-clamp-2 mb-6">
              The premier coding and technology club for innovation and development.
            </p>
            <div className="flex items-center gap-2 pt-4 border-t border-border/50 text-sm text-muted-foreground">
              <User className="w-4 h-4 text-blue-500" /> Managed by Admin
              <span className="ml-auto text-blue-500 hover:underline cursor-pointer font-medium">View Detail</span>
            </div>
          </div>
        </div>

        {/* Create Society Pop-up Modal (Image 2 Style) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-[#0f0f0f] border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between p-6 border-b border-border bg-#0101010 text-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  Add Society & Admin
                </h2>
                <Button onClick={() => setIsModalOpen(false)} className="text-foreground dark:bg-[#010101] hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleCreate} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Society Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-500 font-semibold mb-2">
                    <Building2 className="w-5 h-5" /> Society Info
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Name</label>
                    <input
                      className="w-full bg-[#1a1a1a] text-[#f1f1f1] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="e.g. TECHWHIZ"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Description</label>
                    <textarea
                      className="w-full bg-[#1a1a1a] text-[#f1f1f1] border border-border rounded-lg px-4 py-2.5 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="What is this society about?"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>

                {/* Right Side: Admin Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-500 font-semibold mb-2">
                    <User className="w-5 h-5" /> Admin Account
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Full Name</label>
                    <input
                      className="w-full bg-[#1a1a1a] text-[#f1f1f1] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="e.g. John Wick"
                      required
                      value={formData.adminName}
                      onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email Address</label>
                    <input
                      className="w-full text-[#f1f1f1] bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="admin@society.com"
                      type="email"
                      required
                      value={formData.adminEmail}
                      onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Temporary Password</label>
                    <input
                      className="w-full text-[#f1f1f1] bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="••••••••"
                      type="password"
                      required
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="col-span-1 md:col-span-2 flex items-center justify-between pt-4 border-t border-border mt-4">
                  <div className="flex gap-3">
                    <Button
                      type="Button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#010101] hover:text-white transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-900/20"
                    >
                      Create Society
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}