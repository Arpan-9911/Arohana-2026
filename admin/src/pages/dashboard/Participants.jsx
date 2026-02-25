import { useEffect, useState, useMemo } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { Eye } from "lucide-react"
import { toast } from "sonner"
import { useParticipantsStore } from "@/store/participants.store"

const renderDocument = (url, label) => {
  if (!url) return null

  const secureUrl = url.replace("http://", "https://")
  const isPDF = secureUrl.toLowerCase().endsWith(".pdf")

  if (isPDF) {
    return (
      <div className="flex items-center justify-center h-64 border border-border rounded-lg">
        <a
          href={secureUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline font-medium"
        >
          Open {label} (PDF)
        </a>
      </div>
    )
  }

  return (
    <img
      src={secureUrl}
      alt={label}
      className="w-full h-64 object-contain rounded-lg border border-border"
    />
  )
}

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

  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const usersPerPage = 100

  useEffect(() => {
    fetchParticipants()
  }, [fetchParticipants])

  // Reset page when participants or filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [participants, statusFilter])

  // Filtered data
  const filteredParticipants = useMemo(() => {
    if (statusFilter === "all") return participants
    return participants.filter(p => p.status === statusFilter)
  }, [participants, statusFilter])

  // Stats (based on all participants)
  const totalApproved = useMemo(() => {
    return participants.filter(p => p.status === "approved").length
  }, [participants])

  // Pagination based on filtered data
  const totalPages = Math.ceil(filteredParticipants.length / usersPerPage)

  const paginatedParticipants = useMemo(() => {
    const start = (currentPage - 1) * usersPerPage
    const end = start + usersPerPage
    return filteredParticipants.slice(start, end)
  }, [filteredParticipants, currentPage])

  const handleApprove = async (id) => {
    const result = await approveParticipant(id)
    if (result.success) toast.success("User Approved")
  }

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:")
    if (!reason) return
    const result = await rejectParticipant(id, reason)
    if (result.success) toast.success("User Rejected")
  }

  const FilterButton = ({ label, value }) => (
    <Button
      size="sm"
      variant={statusFilter === value ? "default" : "outline"}
      onClick={() => setStatusFilter(value)}
    >
      {label}
    </Button>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Participants</h1>
          <p className="text-muted-foreground mt-2">
            Manage and approve participants
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-2">
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">
                Total Participants
              </p>
              <p className="text-lg font-semibold">
                {participants.length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">
                Total Approved
              </p>
              <p className="text-lg font-semibold text-green-400">
                {totalApproved}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2 flex-wrap">
          <FilterButton label="All" value="all" />
          <FilterButton label="Pending" value="pending" />
          <FilterButton label="Approved" value="approved" />
          <FilterButton label="Rejected" value="rejected" />
        </div>

        {/* TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
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
                  ) : paginatedParticipants.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No participants found
                      </td>
                    </tr>
                  ) : (
                    paginatedParticipants.map((participant) => (
                      <tr
                        key={participant._id}
                        className="border-b hover:bg-secondary/50"
                      >
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
                        <td className="py-3 px-4">
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

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Prev
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* DETAILS MODAL */}
        {selectedParticipant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setSelectedParticipant(null)}
            />
            <div className="relative bg-card rounded-xl max-w-2xl w-full max-h-[90vh] p-6 space-y-4 overflow-y-auto">
              <h2 className="text-xl font-bold">Participant Details</h2>

              <div>
                <p><strong>Name:</strong> {selectedParticipant.name}</p>
                <p><strong>Email:</strong> {selectedParticipant.email}</p>
                <p><strong>Status:</strong> {selectedParticipant.status}</p>
                <p>
                  <strong>Registered:</strong>{" "}
                  {new Date(selectedParticipant.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {renderDocument(selectedParticipant.aadharImage, "Aadhar")}
                {renderDocument(selectedParticipant.idCardImage, "ID Card")}
              </div>

              {selectedParticipant.status === "pending" && (
                <div className="flex gap-4 justify-end pt-4">
                  <Button onClick={() => handleApprove(selectedParticipant._id)}>
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