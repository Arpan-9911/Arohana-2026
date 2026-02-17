import EventCard from "./EventCard";
import RegisterEventCard from "./RegisterEventCard";
import SubmissionModal from "./SubmissionModal";
import { useEffect, useState } from "react";
import { getUserParticipation } from "../../lib/user.service";
import { toast } from "sonner";
import { Loader2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OperationsSection() {
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        setLoading(true);
        const response = await getUserParticipation();

        if (response.success) {
          setParticipations(response.participations);
        } else {
          toast.error("Failed to load participations");
        }
      } catch (error) {
        console.error("Error fetching participations:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipations();
  }, []);

  const formattedEvents = participations.map((p) => {
    const { event, team, submission } = p;

    let submissionStatus = "not-required";

    if (event.isOnlineSubmission) {
      submissionStatus = submission ? "submitted" : "pending";
    }

    return {
      participationId: p.participationId,
      eventId: event._id,
      title: event.title,
      organizer: event.organizer || "Society",
      type: event.type === "group" ? "Team" : "Solo",
      teamCode: team?.teamCode || null,
      date: new Date(p.registeredAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      submissionStatus,
      team,
      submission,
      event,
      icon: Calendar, // ✅ Common icon added
    };
  });

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight">
            Operations
          </h2>
          <p className="text-white/40 text-sm mt-1">
            Manage your registered events
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : formattedEvents.length === 0 ? (
        <div className="text-center text-white/40 py-10">
          You have not registered for any events yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formattedEvents.map((event) => (
            <EventCard
              key={event.participationId}
              {...event}
              onSubmit={() => setSelectedEvent(event)}
            />
          ))}

          {/* ✅ Now links to /events */}
          <RegisterEventCard onClick={() => navigate("/events")} />

          <SubmissionModal
            isOpen={!!selectedEvent}
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </div>
      )}
    </section>
  );
}
