import { useEffect, useState } from "react";
import CreateEventForm from "../components/CreateEventForm";
import EventCard from "../components/EventCard";

const SocietyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("societyEvents")) || [];
    setEvents(stored);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) return;

    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("societyEvents", JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-purple-400">
        Manage Events
      </h1>

      <CreateEventForm onCreate={setEvents} />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default SocietyEvents;
