import { useEffect } from "react";
import { useEventStore } from "../store/event.store";

export default function SocietyParticipants() {
  const {
    events,
    fetchEvents,
    selectedEvent,
    selectEvent,
    participants,
    loading,
  } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-purple-400">
        Society Dashboard
      </h1>
      {/* Event Selector */}
      <div className="flex items-center gap-4">
        <label className="text-white/80 font-semibold">Select Event:</label>
        <select
          value={selectedEvent || ""}
          onChange={(e) => selectEvent(e.target.value)}
          className="bg-white/5 text-white p-2 rounded-xl border border-white/10"
        >
          <option value="" disabled className="text-black">-- Choose an event --</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev._id} className="text-black">{ev.title}</option>
          ))}
        </select>
      </div>
      {loading && <p className="text-white/70 mt-4">Loading...</p>}

      {!loading && selectedEvent && participants.length === 0 && (
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white/70 mt-4">
          No participants registered yet.
        </div>
      )}

      {/* Participants List */}
      {!loading && participants.length > 0 && (
        <div className="space-y-4 mt-4">
          {participants.map((p, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col gap-2"
            >
              {/* Solo User */}
              {p.user && (
                <>
                  <p className="text-lg font-semibold text-white">{p.user.name}</p>
                  {p.submission ? (
                    <a
                      href={p.submission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      View Submission
                    </a>
                  ) : (
                    <p className="text-white/60">No submission yet</p>
                  )}
                </>
              )}

              {/* Group Team */}
              {p.team && (
                <>
                  <p className="text-lg font-semibold text-white">{p.team.name} (Team)</p>
                  <p className="text-white/60">
                    Members: {p.team.members.map((m) => m.name).join(", ")}
                  </p>
                  {p.submission ? (
                    <a
                      href={p.submission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      View Submission
                    </a>
                  ) : (
                    <p className="text-white/60">No submission yet</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}