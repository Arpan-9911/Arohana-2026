import { useEffect, useState } from "react";

const SocietyParticipants = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("societyParticipants")) || [];

    setParticipants(stored);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        Participants
      </h1>

      {participants.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white/70">
          No participants registered yet.
        </div>
      ) : (
        <div className="space-y-4">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10"
            >
              <p className="text-lg font-semibold text-white">
                {participant.name || participant.teamName}
              </p>
              <p className="text-white/60 text-sm">
                Event: {participant.eventTitle}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocietyParticipants;
