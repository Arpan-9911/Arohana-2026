import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SocietyDashboard = () => {
  const location = useLocation();

  const [stats, setStats] = useState({
    events: 0,
    participants: 0,
    submissions: 0,
  });

  const loadStats = () => {
    const events =
      JSON.parse(localStorage.getItem("societyEvents")) || [];
    const participants =
      JSON.parse(localStorage.getItem("societyParticipants")) || [];

    setStats({
      events: events.length,
      participants: participants.length,
      submissions: participants.length, // can change later if separate submissions
    });
  };

  // Load stats whenever route changes
  useEffect(() => {
    loadStats();
  }, [location]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        Society Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Events Card */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-purple-500/20 transition">
          <h3 className="text-white/70">Total Events</h3>
          <p className="text-3xl font-bold mt-2 text-purple-400">
            {stats.events}
          </p>
        </div>

        {/* Participants Card */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-purple-500/20 transition">
          <h3 className="text-white/70">Total Participants</h3>
          <p className="text-3xl font-bold mt-2 text-purple-400">
            {stats.participants}
          </p>
        </div>

        {/* Submissions Card */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-purple-500/20 transition">
          <h3 className="text-white/70">Total Submissions</h3>
          <p className="text-3xl font-bold mt-2 text-purple-400">
            {stats.submissions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocietyDashboard;
