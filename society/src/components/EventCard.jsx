import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EventCard = ({ event, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg transition">
      
      {/* Delete Button */}
      <button
        onClick={() => onDelete(event.id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-400"
      >
        <Trash2 size={18} />
      </button>

      {/* Header */}
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold text-purple-300 mb-1">
          {event.title}
        </h3>

        <p className="text-white/70 text-sm">
          <strong>Type:</strong> {event.type}
        </p>

        <p className="text-white/70 text-sm">
          <strong>Date:</strong>{" "}
          {event.eventDate
            ? new Date(event.eventDate).toLocaleString()
            : "Not set"}
        </p>

        <div className="mt-2 text-purple-400">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Expandable Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 space-y-3 text-white/80 text-sm"
          >
            {event.description && (
              <p>
                <strong>Description:</strong> {event.description}
              </p>
            )}

            {event.generalInstructions && (
              <p>
                <strong>Instructions:</strong> {event.generalInstructions}
              </p>
            )}

            {event.type === "group" && (
              <p>
                <strong>Team Size:</strong>{" "}
                {event.minTeamSize} - {event.maxTeamSize}
              </p>
            )}

            {event.isOnlineSubmission && (
              <p>
                <strong>Submission Deadline:</strong>{" "}
                {event.onlineSubmissionDeadline
                  ? new Date(
                      event.onlineSubmissionDeadline
                    ).toLocaleString()
                  : "Not set"}
              </p>
            )}

            {/* Rounds */}
            {event.rounds && event.rounds.length > 0 && (
              <div>
                <strong>Rounds:</strong>
                <div className="mt-2 space-y-3">
                  {event.rounds.map((round, index) => (
                    <div
                      key={index}
                      className="bg-black/30 p-3 rounded-xl"
                    >
                      <p className="font-semibold text-purple-300">
                        {round.title}
                      </p>

                      {round.description && (
                        <p className="text-white/70 text-sm">
                          {round.description}
                        </p>
                      )}

                      {round.rules && round.rules.length > 0 && (
                        <ul className="list-disc list-inside text-white/60 text-sm mt-1">
                          {round.rules.map((rule, i) => (
                            <li key={i}>{rule}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventCard;
