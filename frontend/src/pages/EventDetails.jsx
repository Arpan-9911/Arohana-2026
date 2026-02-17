import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getEventById, participateSolo, createTeam, joinTeam } from "../lib/event.service";
import { toast } from "sonner";
import { useUserStore } from "../store/user.store";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("create");
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await getEventById(id);

        if (response.success) {
          setEvent(response.event);
        } else {
          toast.error("Event not found");
          navigate("/events");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, navigate]);

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to register for events");
      navigate("/login");
      return;
    }

    if (event.type === "group") {
      setIsModalOpen(true);
    } else {
      handleSoloRegistration();
    }
  }

  const handleSoloRegistration = async () => {
    try {
      setIsSubmitting(true);
      const response = await participateSolo(event._id);

      if (response.success) {
        toast.success("Successfully registered for the event!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await createTeam(event._id, teamName.trim());

      if (response.success) {
        toast.success(`Team created! Share code: ${response.team.teamCode}`);
        setIsModalOpen(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Team creation error:", error);
      toast.error(error.response?.data?.message || "Failed to create team");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!teamCode.trim()) {
      toast.error("Please enter a team code");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await joinTeam(teamCode.trim());

      if (response.success) {
        toast.success("Successfully joined the team!");
        setIsModalOpen(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Join team error:", error);
      toast.error(error.response?.data?.message || "Failed to join team");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-12 h-12" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center text-white">
        <div>Event not found</div>
      </div>
    );
  }

  const societyName = event.society?.name || event.society || "Unknown";
  const eventImage = event.image || event.imageUrl || "/events-bg-top.png";
  const eventTime = event.time || new Date(event.eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const eventVenue = event.venue || event.location || "TBA";
  const eventAbout = event.about || event.description || "No description available";

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-y-auto py-10 px-4 flex justify-center md:items-center md:pt-30">
      {/* Background Layers */}
      <img src="/events-bg-top.png" alt="" className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-b from-black/60 via-black/80 to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl md:max-w-6xl flex flex-col animate-fade-in-up">

        <Link to="/events" className="text-pink-400 hover:text-pink-300 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2 w-fit">
          ← Back to Events
        </Link>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

          <div className="flex flex-col h-full bg-[#121212] md:border-r border-white/10">
            {/* Image Section */}
            <div className="w-full h-64 md:h-80 relative shrink-0">
              <img src={eventImage} alt={event.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-transparent" />
              <div className="absolute top-4 right-4 bg-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                {event.type}
              </div>
            </div>

            {/* Description Content */}
            <div className="p-6 md:p-8 flex flex-col grow">
              <div className="mb-6">
                <h4 className="text-pink-500 font-bold tracking-widest uppercase text-xs mb-1">{societyName}</h4>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{event.name}</h1>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300">🕒 {eventTime}</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300">📍 {eventVenue}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-2 border-l-2 border-pink-500 pl-3">About</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{eventAbout}</p>
              </div>

              <div className="mt-auto hidden md:block pt-6">
                <button
                  onClick={handleRegisterClick}
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:scale-[1.02] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all uppercase tracking-widest text-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Register Now"}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#121212] md:bg-white/5 flex flex-col h-full overflow-y-auto custom-scrollbar">

            {/* General Rules */}
            {event.generalRules && event.generalRules.length > 0 && (
              <div className="mb-8">
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-pink-500 pl-3">General Rules</h3>
                <ul className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  {event.generalRules.map((r, i) => (
                    <li key={i} className="text-sm text-gray-300 flex gap-3 items-start">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rounds & Timeline */}
            {event.rounds && event.rounds.length > 0 && (
              <div className="mb-4 grow">
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-pink-500 pl-3">
                  {event.rounds.length > 1 ? "Event Timeline & Rounds" : "Instructions"}
                </h3>

                <div className="space-y-8 relative">
                  {event.rounds.length > 1 && <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10 hidden md:block" />}

                  {event.rounds.map((round, idx) => (
                    <div key={idx} className={`relative ${event.rounds.length > 1 ? 'md:pl-12' : ''}`}>
                      {event.rounds.length > 1 && (
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-pink-600 border-4 border-[#121212] items-center justify-center text-[10px] font-bold hidden md:flex shadow-lg z-10">
                          {idx + 1}
                        </div>
                      )}

                      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:border-pink-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          {event.rounds.length > 1 && (
                            <span className="md:hidden bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Round {idx + 1}</span>
                          )}
                          <h4 className="text-white font-bold text-md">{round.name}</h4>
                        </div>

                        <p className="text-pink-400 text-xs mb-4 italic">{round.instruction}</p>

                        {/* Round Specific Rules */}
                        {round.rules && (
                          <div className="pt-3 border-t border-white/5">
                            <p className="text-[10px] uppercase text-gray-500 font-bold mb-2 tracking-wider">Round Details:</p>
                            <ul className="space-y-2">
                              {round.rules.map((rule, ridx) => (
                                <li key={ridx} className="text-xs text-gray-300 flex gap-2 items-start">
                                  <span className="text-pink-500 mt-0.5">›</span> {rule}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="md:hidden pt-6 mt-4 border-t border-white/10 sticky bottom-0 bg-[#121212] z-20 pb-2">
              <button
                onClick={handleRegisterClick}
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:scale-[1.02] text-white font-bold py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Register Now"}
              </button>
            </div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3
              }}
              className="relative bg-[#1a1a1a] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex border-b border-white/5">
                <button
                  onClick={() => setModalTab("create")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${modalTab === "create"
                    ? "text-pink-500 bg-white/5 border-b-2 border-pink-500"
                    : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  Create Team
                </button>
                <button
                  onClick={() => setModalTab("join")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${modalTab === "join"
                    ? "text-pink-500 bg-white/5 border-b-2 border-pink-500"
                    : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  Join Team
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  {modalTab === "create" ? "Start a New Team" : "Enter Team Code"}
                </h2>
                <p className="text-gray-400 text-xs mb-6">
                  {modalTab === "create"
                    ? "Create a unique team name and invite your friends to join."
                    : "Paste the unique code shared by your team captain."}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block tracking-widest">
                      {modalTab === "create" ? "Team Name" : "Team Code"}
                    </label>
                    <input
                      type="text"
                      value={modalTab === "create" ? teamName : teamCode}
                      onChange={(e) => modalTab === "create" ? setTeamName(e.target.value) : setTeamCode(e.target.value)}
                      placeholder={
                        modalTab === "create" ? "e.g. CyberKnights" : "e.g. CB-12345"
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    onClick={modalTab === "create" ? handleCreateTeam : handleJoinTeam}
                    disabled={isSubmitting}
                    className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3.5 rounded-xl mt-4 transition-all shadow-[0_10px_20px_rgba(219,39,119,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Processing..."
                      : modalTab === "create" ? "Create & Register" : "Join & Register"}
                  </button>

                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setTeamName("");
                      setTeamCode("");
                    }}
                    disabled={isSubmitting}
                    className="w-full text-gray-500 text-xs font-medium hover:text-gray-300 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}