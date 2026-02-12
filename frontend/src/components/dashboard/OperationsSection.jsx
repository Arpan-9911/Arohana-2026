import EventCard from "./EventCard";
import { Code, Users, Shield, Palette, ArrowBigRight } from "lucide-react";
import RegisterEventCard from "./RegisterEventCard";
import { useState } from "react";
import SubmissionModal from "./SubmissionModal";

export default function OperationsSection() {
  const events = [
    {
      title: "Algorithmic Zen 2.0",
      organizer: "IEEE Computer Society",
      type: "Solo",
      teamCode: "SOLO-ZEN-042",
      date: "Mar 14, 2025",
      icon: Code,
      color: "primary",
      submissionStatus: "pending", // can submit
    },
    {
      title: "BattleBots Arena",
      organizer: "Robotics Club",
      type: "Team",
      teamCode: "BOT-TEAM-99",
      date: "Mar 15, 2025",
      icon: Users,
      color: "blue",
      submissionStatus: "submitted", // already submitted
    },
    {
      title: "Pixel Perfect UI",
      organizer: "Creative Arts Guild",
      type: "Team",
      teamCode: "UIX-DESIGN-12",
      date: "Mar 16, 2025",
      icon: Palette,
      color: "orange",
      submissionStatus: "pending", // needs submission
    },
    {
      title: "Capture The Flag",
      organizer: "Cyber Security Cell",
      type: "Solo",
      teamCode: "CTF-SOLO-215",
      date: "Mar 17, 2025",
      icon: Shield,
      color: "emerald",
      submissionStatus: "not-required", // no submission needed
    },
    {
      title: "Capture The Flag",
      organizer: "Cyber Security Cell",
      type: "Team",
      teamCode: "CTF-SOLO-215",
      date: "Mar 17, 2025",
      icon: Shield,
      color: "primary",
      submissionStatus: "pending", // no submission needed
    },
    {
      title: "Capture The Flag",
      organizer: "Cyber Security Cell",
      type: "Team",
      teamCode: "CTF-SOLO-215",
      date: "Mar 17, 2025",
      icon: Shield,
      color: "orange",
      submissionStatus: "pending", // no submission needed
    },
    {
      title: "Capture The Flag",
      organizer: "Cyber Security Cell",
      type: "Team",
      teamCode: "CTF-SOLO-215",
      date: "Mar 17, 2025",
      icon: Shield,
      color: "orange",
      submissionStatus: "pending", // no submission needed
    },
    {
      title: "Capture The Flag",
      organizer: "Cyber Security Cell",
      type: "Solo",
      teamCode: "CTF-SOLO-215",
      date: "Mar 17, 2025",
      icon: Shield,
      color: "blue",
      submissionStatus: "pending", // no submission needed
    },
  ];
  const [selectedEvent, setSelectedEvent] = useState(null);
  
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

        <button className="text-primary font-semibold hover:underline">
          Manage Registrations
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <EventCard
            key={index}
            {...event}
            onSubmit={() => setSelectedEvent(event)}
          />
        ))}
        <RegisterEventCard onClick={() => console.log("Open registration")} />
        <SubmissionModal
          isOpen={!!selectedEvent}
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </div>
    </section>
  );
}
