import { useState, useEffect } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { Eye, Check, X } from "lucide-react"
import { getUsers, approveUser, rejectUser } from "@/lib/admin.service"
import { toast } from "sonner";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      if (data.success) {
        setParticipants(data.users)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleApprove = async (id) => {
    try {
      const result = await approveUser(id)
      if (result.success) {
        toast.success("User Approved")
        fetchUsers()
      }
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Failed to approve")
    }
  }

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:")
    if (!reason) return;
    try {
      const result = await rejectUser(id, reason)
      if (result.success) {
        toast.success("User Rejected")
        fetchUsers()
      }
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Failed to reject")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Participants</h1>
          <p className="text-muted-foreground mt-2">Manage and view all participants</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>All Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                  ) : participants.map((participant) => (
                    <tr key={participant._id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-foreground">{participant.name}</td>
                      <td className="py-3 px-4 text-foreground">{participant.email}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            participant.status === "approved"
                              ? "bg-green-500/20 text-green-400 border-0"
                              : participant.status === "rejected"
                                ? "bg-red-500/20 text-red-400 border-0"
                                : "bg-yellow-500/20 text-yellow-400 border-0"
                          }
                        >
                          {participant.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-foreground font-semibold flex gap-2">
                        {participant.aadharImage && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedImage(participant.aadharImage)
                              setIsViewModalOpen(true)
                            }}
                          >
                            <Eye className="w-4 h-4 text-blue-400" />
                          </Button>
                        )}
                        {participant.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(participant._id)}
                            >
                              <Check className="w-4 h-4 text-green-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(participant._id)}
                            >
                              <X className="w-4 h-4 text-red-400" />
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* View Image Modal */}
        {isViewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
            <div className="relative max-w-3xl max-h-[90vh] bg-black border border-border rounded-lg overflow-hidden p-1">
              <Button
                className="absolute top-2 right-2 rounded-full p-1 bg-black/50 hover:bg-black text-white z-10"
                onClick={() => setIsViewModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
              <img src={selectedImage} alt="User Document" className="w-full h-full object-contain" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
