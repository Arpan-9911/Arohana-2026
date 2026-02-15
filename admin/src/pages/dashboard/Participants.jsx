import { DashboardLayout } from "@/layouts/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const participants = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", orders: 12 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", orders: 8 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Inactive", orders: 5 },
  { id: 4, name: "Alice Brown", email: "alice@example.com", status: "Active", orders: 15 },
]

export default function ParticipantsPage() {
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
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participants) => (
                    <tr key={participants.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-foreground">{participants.name}</td>
                      <td className="py-3 px-4 text-foreground">{participants.email}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            participants.status === "Active"
                              ? "bg-green-500/20 text-green-400 border-0"
                              : "bg-gray-500/20 text-gray-400 border-0"
                          }
                        >
                          {participants.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-foreground font-semibold">{participants.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
