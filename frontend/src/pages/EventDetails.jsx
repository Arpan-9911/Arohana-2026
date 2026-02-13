import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { motion,AnimatePresence } from "framer-motion"

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("create");

  // backend se replace kar dena
  const EVENTS = {
    day1: [
      {
        id: "codeblitz",
        name: "CodeBlitz",
        society: "TechWhiz",
        type: "group",
        time: "10:00 AM",
        venue: "Main Lab",
        about: "24-hour competitive coding marathon designed to test your algorithmic thinking and endurance.",
        image: "/events-bg-top.png",
        generalRules: [
          "Teams must consist of exactly 3 members.",
          "Bring your own laptops and charging cables.",
        ],
        rounds: [
          {
            name: "Round 1: Logic & Debugging",
            instruction: "A 45-minute sprint focusing on identifying bugs in legacy code.",
            rules: ["No internet access allowed.", "Each hint taken reduces 10 points."]
          },
          {
            name: "Round 2: System Design",
            instruction: "Design a scalable architecture for a real-world problem.",
            rules: ["Use of whiteboards is mandatory.", "Teams must present their design to the judges."]
          }
        ],
      },
      {
        id: "designathon",
        name: "Designathon",
        society: "TechWhiz",
        type: "group",
        time: "10:00 AM",
        venue: "Main Lab",
        about: "24-hour competitive coding marathon designed to test your algorithmic thinking and endurance.",
        image: "/events-bg-top.png",
        generalRules: [
          "Teams must consist of exactly 3 members.",
          "Bring your own laptops and charging cables.",
        ],
        rounds: [
          {
            name: "Round 1: Logic & Debugging",
            instruction: "A 45-minute sprint focusing on identifying bugs in legacy code.",
            rules: ["No internet access allowed.", "Each hint taken reduces 10 points."]
          },
          {
            name: "Round 2: System Design",
            instruction: "Design a scalable architecture for a real-world problem.",
            rules: ["Use of whiteboards is mandatory.", "Teams must present their design to the judges."]
          }
        ],
      },
      {
        id: "debate",
        name: "Parliamentary Debate",
        society: "TechWhiz",
        type: "solo",
        time: "3:00 PM",
        venue: "Campus",
        about: "Capture stories around campus. A guided walk to find the hidden aesthetics.",
        image: "/events-bg-top.png",
        generalRules: [
          "Photos must be clicked on the day of the event.",
          "Editing is restricted to basic color correction."
        ],
        rounds: [
          {
            name: "Final Submission",
            instruction: "Submit your best 3 shots before 6:00 PM.",
            rules: ["Original RAW files must be provided upon request."]
          }
        ],
      },
    ],
    day2: [
      {
        id: "openmic",
        name: "Open Mic",
        society: "TechWhiz",
        type: "group",
        time: "10:00 AM",
        venue: "Main Lab",
        about: "24-hour competitive coding marathon designed to test your algorithmic thinking and endurance.",
        image: "/events-bg-top.png",
        generalRules: [
          "Teams must consist of exactly 3 members.",
          "Bring your own laptops and charging cables.",
        ],
        rounds: [
          {
            name: "Round 1: Logic & Debugging",
            instruction: "A 45-minute sprint focusing on identifying bugs in legacy code.",
            rules: ["No internet access allowed.", "Each hint taken reduces 10 points."]
          },
          {
            name: "Round 2: System Design",
            instruction: "Design a scalable architecture for a real-world problem.",
            rules: ["Use of whiteboards is mandatory.", "Teams must present their design to the judges."]
          }
        ],
      },
      {
        id: "concert",
        name: "Arohana Night Concert",
        society: "TechWhiz",
        type: "solo",
        time: "3:00 PM",
        venue: "Campus",
        about: "Capture stories around campus. A guided walk to find the hidden aesthetics.",
        image: "/events-bg-top.png",
        generalRules: [
          "Photos must be clicked on the day of the event.",
          "Editing is restricted to basic color correction."
        ],
        rounds: [
          {
            name: "Final Submission",
            instruction: "Submit your best 3 shots before 6:00 PM.",
            rules: ["Original RAW files must be provided upon request."]
          }
        ],
      },
    ],
  };

  useEffect(() => {
    const allEvents = [...EVENTS.day1, ...EVENTS.day2];
    const foundEvent = allEvents.find((e) => e.id === id);

    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate("*")
    }
  }, [id, navigate]);

  // handler
  const handleRegisterClick = () => {
    if (event.type === "group") {
      setIsModalOpen(true);
    } else {
      alert("Proceeding to Solo Registration...");
    }
  }

  if (!event) {
    return (<div className="min-h-screen bg-foreground flex items-center justify-center text-white">
      <Loader2 />
    </div>);
  }

  const isMultiRound = event.rounds && event.rounds.length > 1;

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-y-auto py-10 px-4 flex justify-center md:mt-20">
      {/* Background Layers */}
      <img src="/events-bg-top.png" alt="" className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-b from-black/60 via-black/80 to-[#0a0a0a] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col animate-fade-in-up">

        <Link to="/events" className="text-pink-400 hover:text-pink-300 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
          ← Back to Events
        </Link>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">

          <div className="w-full h-64 md:h-80 relative">
            <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-[#121212] to-transparent" />
            <div className="absolute top-4 right-4 bg-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
              {event.type}
            </div>
          </div>

          <div className="p-6 md:p-10 bg-[#121212]">

            <div className="mb-8">
              <h4 className="text-pink-500 font-bold tracking-widest uppercase text-xs mb-1">{event.society}</h4>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{event.name}</h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300">🕒 {event.time}</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300">📍 {event.venue}</span>
              </div>
            </div>

            {/* About */}
            <div className="mb-8">
              <h3 className="text-md font-bold text-white uppercase tracking-wider mb-2 border-l-2 border-pink-500 pl-3">About</h3>
              <p className="text-gray-400 text-md leading-relaxed">{event.about}</p>
            </div>

            {/* General Rules  */}
            {event.generalRules && (
              <div className="mb-8">
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-pink-500 pl-3">General Rules</h3>
                <ul className="space-y-2">
                  {event.generalRules.map((r, i) => (
                    <li key={i} className="text-md text-gray-400 flex gap-2">
                      <span className="text-pink-500">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-md font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-pink-500 pl-3">
                {isMultiRound ? "Event Timeline & Round Rules" : "Instructions & Rules"}
              </h3>

              <div className="space-y-8 relative">
                {isMultiRound && <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10 hidden md:block" />}

                {event.rounds.map((round, idx) => (
                  <div key={idx} className={`relative ${isMultiRound ? 'md:pl-12' : ''}`}>
                    {/* Round Bubble */}
                    {isMultiRound && (
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-pink-600 border-4 border-[#121212] items-center justify-center text-[10px] font-bold hidden md:flex">
                        {idx + 1}
                      </div>
                    )}

                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                      <h4 className="text-white font-bold text-md mb-1">{round.name}</h4>
                      <p className="text-pink-400 text-xs mb-4 italic">{round.instruction}</p>

                      {/* Round Specific Rules */}
                      {round.rules && (
                        <div className="pt-3 border-t border-white/5">
                          <p className="text-[15px] uppercase text-gray-500 font-bold mb-2">Round Rules:</p>
                          <ul className="space-y-1.5">
                            {round.rules.map((rule, ridx) => (
                              <li key={ridx} className="text-sm text-gray-300 flex gap-2 items-start">
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

            {/* Action Button */}
            <button onClick={handleRegisterClick} className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:scale-[1.02] text-white font-bold py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-md">
              Register Now
            </button>
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
              {/* Tabs */}
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

              {/* Form Content */}
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
                      placeholder={
                        modalTab === "create" ? "e.g. CyberKnights" : "e.g. CB-12345"
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                    />
                  </div>

                  <button className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3.5 rounded-xl mt-4 transition-all shadow-[0_10px_20px_rgba(219,39,119,0.2)]">
                    {modalTab === "create" ? "Create & Register" : "Join & Register"}
                  </button>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full text-gray-500 text-xs font-medium hover:text-gray-300 transition-colors"
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
