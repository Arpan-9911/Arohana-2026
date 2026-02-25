import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getEventById,
  participateSolo,
  createTeam,
  joinTeam,
} from "../lib/event.service";
import {
  getUserParticipation,
} from "../lib/user.service";
import { toast } from "sonner";
import { useUserStore } from "../store/user.store";
// Whatsapp icon
import { MessageCircle } from "lucide-react";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useUserStore();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [participationLoading, setParticipationLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("create");
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAlreadyParticipating, setIsAlreadyParticipating] = useState(false);
  const userStatus = user?.status;

  /* ---------------- FETCH EVENT ---------------- */
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
        toast.error(error.response?.data?.message || "Failed to load event");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id, navigate]);

  /* ---------------- CHECK PARTICIPATION ---------------- */
  useEffect(() => {
    const fetchParticipation = async () => {
      if (!isAuthenticated || !id) {
        setParticipationLoading(false);
        return;
      }

      try {
        const res = await getUserParticipation();

        if (res.success) {
          const already = res.participations.find(
            (p) => p.event?._id === id
          );
          setIsAlreadyParticipating(!!already);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setParticipationLoading(false);
      }
    };

    fetchParticipation();
  }, [isAuthenticated, id]);

  /* ---------------- VALIDATION ---------------- */
  const validateUser = () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return false;
    }

    if (userStatus !== "approved") {
      toast.error("Wait for admin approval");
      return false;
    }

    if (isAlreadyParticipating) {
      toast.error("You are already registered for this event");
      return false;
    }

    return true;
  };

  /* ---------------- REGISTER CLICK ---------------- */
  const handleRegisterClick = () => {
    if (!validateUser()) return;

    if (event.type === "group") {
      setIsModalOpen(true);
    } else {
      handleSoloRegistration();
    }
  };

  /* ---------------- SOLO ---------------- */
  const handleSoloRegistration = async () => {
    if (!validateUser()) return;

    try {
      setIsSubmitting(true);
      const response = await participateSolo(event._id);

      if (response.success) {
        toast.success("Successfully registered!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- CREATE TEAM ---------------- */
  const handleCreateTeam = async () => {
    if (!validateUser()) return;

    if (!teamName.trim()) {
      toast.error("Enter team name");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await createTeam(event._id, teamName.trim());

      if (response.success) {
        toast.success(`Team created! Code: ${response.team.teamCode}`);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Team creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- JOIN TEAM ---------------- */
  const handleJoinTeam = async () => {
    if (!validateUser()) return;

    if (!teamCode.trim()) {
      toast.error("Enter team code");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await joinTeam(teamCode.trim());

      if (response.success) {
        toast.success("Joined team successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Join failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading || participationLoading) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-12 h-12" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center text-white">
        Event not found
      </div>
    );
  }

  const societyName = event.society?.name || "Unknown";
  const eventImage = event.bannerImage || "/events-bg-top.png";
  const eventTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const submissionDeadline = event.onlineSubmissionDeadline
  ? new Date(event.onlineSubmissionDeadline).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  : null;

 const isRegistrationClosed = event.registrationOpen === false;

  const finalRegisterDisabled =
    isSubmitting ||
    isRegistrationClosed ||
    userStatus !== "approved" ||
    isAlreadyParticipating;

  /* ---------------- UI (UNCHANGED DESIGN) ---------------- */

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-y-auto py-10 px-4 flex justify-center md:items-center md:pt-30">
      <img src="/events-bg-top.png" alt="" className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-b from-black/60 via-black/80 to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl md:max-w-6xl flex flex-col">

        <Link to="/events" className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2 w-fit">
          ← Back to Events
        </Link>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col h-full bg-[#121212] md:border-r border-white/10">
            <div className="w-full h-64 md:h-100 relative shrink-0">
              <img src={eventImage} alt={event.title} className="w-full h-full object-fill" />
              <div className="absolute top-4 right-4 bg-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {event.type}
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col grow">
              <h4 className="text-pink-500 font-bold uppercase text-xs mb-1">{societyName}</h4>
              <h1 className="text-3xl md:text-5xl font-black mb-4">{event.title}</h1>

              <div className="mb-6 text-gray-400 text-sm">
                🕒 {eventTime} <br />
                📍 {event.location}
              </div>

              <p className="text-gray-400 text-sm mb-8">{event.description}</p>

              {/* Online Submission Info */}
              {event.isOnlineSubmission && submissionDeadline && (
                <div className="mb-4">
                  <h3 className="text-md font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-3">
                    Online Submission Details
                  </h3>

                  <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-2xl">
                    <p className="text-sm text-gray-300 mb-2">
                      📅 <span className="text-purple-400 font-semibold">Submission Deadline:</span>
                    </p>

                    <p className="text-white font-bold text-lg">
                      {submissionDeadline}
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                      Make sure to submit your work before the deadline. Late submissions will not be accepted.
                    </p>
                  </div>
                </div>
              )}

              {/* ---------------- WHATSAPP LINK ---------------- */}
              {event.whatsappGroupLink && (
                <div>
                  <a
                    href={event.whatsappGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 text-white bg-green-600 hover:bg-green-500 font-bold py-3 rounded-xl transition-all"
                  >
                    <MessageCircle color="#25D366" size={24} />
                    Join WhatsApp Group
                  </a>
                </div>
              )}


              <div className="mt-auto hidden md:block pt-6">
                <button
                  onClick={handleRegisterClick}
                  disabled={finalRegisterDisabled}
                  className="w-full bg-linear-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {
                    isRegistrationClosed
                      ? "Registration Closed"
                      : !isAuthenticated
                      ? "Login to Register"
                      : isAlreadyParticipating
                      ? "Already Registered"
                      : isSubmitting
                      ? "Processing..."
                      : userStatus !== "approved"
                      ? "Waiting for Approval"
                      : "Register Now"
                  }
                </button>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 bg-[#121212] md:bg-white/5 flex flex-col h-full overflow-y-auto custom-scrollbar">

            {/* General Rules */}
            {event.generalInstructions && event.generalInstructions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-pink-500 pl-3">General Instructions</h3>
                <ul className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  {event.generalInstructions.map((r, i) => (
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
                          <h4 className="text-white font-bold text-md">{round.title}</h4>
                        </div>

                        <p className="text-pink-400 text-xs mb-4 italic">{round.description}</p>

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
  );
}