import { useEffect } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { Eye, Check, X } from "lucide-react"
import { toast } from "sonner"
import { useParticipantsStore } from "@/store/participants.store"

export default function ParticipantsPage() {
  const {
    participants,
    loading,
    selectedParticipant,
    fetchParticipants,
    setSelectedParticipant,
    approveParticipant,
    rejectParticipant
  } = useParticipantsStore()

  useEffect(() => {
    fetchParticipants()
  }, [fetchParticipants])

  const handleApprove = async (id) => {
    const result = await approveParticipant(id)
    if (result.success) {
      toast.success("User Approved")
    }
  }

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:")
    if (!reason) return
    const result = await rejectParticipant(id, reason)
    if (result.success) {
      toast.success("User Rejected")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Participants</h1>
          <p className="text-muted-foreground mt-2">
            Manage and approve participants
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Participants</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    participants.map((participant) => (
                      <tr key={participant._id} className="border-b hover:bg-secondary/50">
                        <td className="py-3 px-4">{participant.name}</td>
                        <td className="py-3 px-4">{participant.email}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              participant.status === "approved"
                                ? "bg-green-500/20 text-green-400"
                                : participant.status === "rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {participant.status}
                          </Badge>
                        </td>

                        <td className="py-3 px-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedParticipant(participant)}
                          >
                            <Eye className="w-4 h-4 text-blue-400" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* DETAILS MODAL */}
        {selectedParticipant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setSelectedParticipant(null)}
            />

            <div className="relative bg-card rounded-xl max-w-2xl w-full p-6 space-y-4">
              <h2 className="text-xl font-bold">Participant Details</h2>

              <div>
                <p><strong>Name:</strong> {selectedParticipant.name}</p>
                <p><strong>Email:</strong> {selectedParticipant.email}</p>
                <p><strong>Status:</strong> {selectedParticipant.status}</p>
                <p><strong>Registered:</strong> {new Date(selectedParticipant.createdAt).toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img
                  src={selectedParticipant.aadharImage}
                  alt="Aadhar"
                  className="rounded-lg"
                />
                <img
                  src={selectedParticipant.idCardImage}
                  alt="ID Card"
                  className="rounded-lg"
                />
              </div>

              {selectedParticipant.status === "pending" && (
                <div className="flex gap-4 justify-end pt-4">
                  <Button
                    onClick={() => handleApprove(selectedParticipant._id)}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedParticipant._id)}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
