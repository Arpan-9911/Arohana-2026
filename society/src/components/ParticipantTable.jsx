import { Trash2 } from "lucide-react";

const EventCard = ({ event, onDelete }) => {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">
      {/* Delete Icon */}
      <button
        onClick={() => onDelete(event.id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-400"
      >
        <Trash2 size={18} />
      </button>

      <h3 className="text-xl font-bold text-purple-300 mb-2">
        {event.title}
      </h3>

      <p className="text-white/70">
        <strong>Type:</strong> {event.type}
      </p>

      <p className="text-white/70">
        <strong>Date:</strong>{" "}
        {event.eventDate
          ? new Date(event.eventDate).toLocaleString()
          : "Not set"}
      </p>
    </div>
  );
};

export default EventCard;
