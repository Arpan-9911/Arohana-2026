// src/pages/Events.jsx
import { useState } from "react";

// ✅ Image imports (ONLY for events page)
import hackathonImg from "../assets/events/hackathon.jpg";
import uiuxImg from "../assets/events/uiux.jpg";
import codingImg from "../assets/events/coding.jpg";

const dummyEvents = [
  {
    id: 1,
    name: "Hackathon 24H",
    image: hackathonImg,
    details: [
      "Team size: 2–4",
      "Duration: 24 hours",
      "Offline event",
      "Problem statements released on spot",
    ],
  },
  {
    id: 2,
    name: "UI/UX Design Challenge",
    image: uiuxImg,
    details: [
      "Solo participation",
      "Online submission",
      "Figma / Adobe XD allowed",
      "Theme revealed on event day",
    ],
  },
  {
    id: 3,
    name: "Competitive Coding",
    image: codingImg,
    details: [
      "Solo event",
      "Algorithmic challenges",
      "Timed rounds",
      "Offline participation",
    ],
  },
];

export default function Events() {
  const [flippedId, setFlippedId] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--foreground)] px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-widest text-[var(--background)]">
          {"EVENTS".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-type"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="text-[var(--background)]/70 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          Dive into competitions crafted for creativity, logic, and innovation.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto animate-rise">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {dummyEvents.map((event) => {
            const isFlipped = flippedId === event.id;

            return (
              <div
                key={event.id}
                className="relative h-[420px] perspective"
                onClick={() =>
                  setFlippedId(isFlipped ? null : event.id)
                }
              >
                <div
                  className={`relative h-full w-full transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="h-full w-full object-cover opacity-70"
                    />

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[var(--background)] px-6">
                      <h2 className="text-xl sm:text-2xl font-bold mb-4">
                        {event.name}
                      </h2>

                      {!isFlipped && (
                        <span className="inline-block animate-view-bounce text-xs sm:text-sm uppercase tracking-widest px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                          View Details
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl p-6 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--background)] mb-4">
                      {event.name}
                    </h3>

                    <ul className="text-[var(--background)]/80 text-sm space-y-2 flex-1">
                      {event.details.map((point, i) => (
                        <li key={i} className="list-disc ml-5">
                          {point}
                        </li>
                      ))}
                    </ul>

                    <button
                      className="
                        mt-6
                        w-full
                        py-3
                        rounded-xl
                        bg-white/20
                        backdrop-blur-md
                        border border-white/30
                        text-[var(--background)]
                        font-semibold
                        transition-all
                        duration-300
                        hover:bg-white/30
                        hover:shadow-[0_0_30px_rgba(158,114,195,0.6)]
                      "
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
