import { useEffect } from "react";
import { useEventStore } from "../store/event.store";

const SocietyDashboard = () => {
  const { events, fetchEvents, deleteEvent } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        Society Dashboard
      </h1>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black/40 p-6 rounded-xl">
          <h3 className="text-white/70 mb-2">Total Events</h3>
          <p className="text-2xl font-bold">{events.length}</p>
        </div>
      </div>

      {/* Events List */}
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-black/40 p-4 rounded-xl border border-white/10 flex flex-col">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />
            <div className="flex-1">
              <h3 className="text-purple-300 font-semibold text-lg mb-2">
                {event.title}
              </h3>
              <p className="text-white/70 text-sm mb-2">{event.description}</p>
              
              <p className="text-white/60 text-sm">
                <strong>Type:</strong> {event.type}
              </p>
              {event.type === "group" && (
                <p className="text-white/60 text-sm">
                  <strong>Team Size:</strong> {event.minTeamSize} - {event.maxTeamSize}
                </p>
              )}
              <p className="text-white/60 text-sm">
                <strong>Event Date:</strong> {new Date(event.eventDate).toLocaleString()}
              </p>
              <p className="text-white/60 text-sm">
                <strong>Online Submission:</strong> {event.isOnlineSubmission ? "Yes" : "No"}
              </p>
              {event.isOnlineSubmission && event.onlineSubmissionDeadline && (
                <p className="text-white/60 text-sm">
                  <strong>Deadline:</strong> {new Date(event.onlineSubmissionDeadline).toLocaleString()}
                </p>
              )}

              {event.generalInstructions.length > 0 && (
                <div className="mt-2">
                  <strong className="text-white/80 text-sm">Instructions:</strong>
                  <ul className="list-disc list-inside text-white/60 text-sm">
                    {event.generalInstructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ul>
                </div>
              )}

              {event.rounds.length > 0 && (
                <div className="mt-2">
                  <strong className="text-white/80 text-sm">Rounds:</strong>
                  {event.rounds.map((round, i) => (
                    <div key={i} className="bg-black/30 p-2 rounded mt-1 text-white/60 text-sm">
                      <p><strong>{i + 1}. {round.title}</strong></p>
                      <p>{round.description}</p>
                      {round.rules && round.rules.length > 0 && (
                        <ul className="list-disc list-inside">
                          {round.rules.map((rule, j) => (
                            <li key={j}>{rule}</li>
                          ))}
                        </ul>
                      )}
                      {round.roundDate && (
                        <p><strong>Date:</strong> {new Date(round.roundDate).toLocaleString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleDelete(event._id)}
              className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
            >
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocietyDashboard;
