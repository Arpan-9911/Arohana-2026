import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

/* ------------------ DATA ------------------ */
const EVENTS = {
  day1: [
    {
      id: "codeblitz",
      name: "CodeBlitz",
      society: "TechWhiz",
      type: "group",
      time: "10:00 AM",
      venue: "Main Lab",
      about: "24-hour competitive coding marathon",
      image: "/events-bg-top.png",
    },
    {
      id: "designathon",
      name: "Designathon",
      society: "Abhivyakti",
      type: "solo",
      time: "11:30 AM",
      venue: "Design Studio",
      about: "UI/UX challenge with real briefs",
      image: "/events-bg-top.png",
    },
    {
      id: "debate",
      name: "Parliamentary Debate",
      society: "DebSoc",
      type: "group",
      time: "1:00 PM",
      venue: "Auditorium",
      about: "High-stakes structured debate",
      image: "/events-bg-top.png",
    },
    {
      id: "photowalk",
      name: "PhotoWalk",
      society: "TechWhiz",
      type: "solo",
      time: "3:00 PM",
      venue: "Campus",
      about: "Capture stories around campus",
      image: "/events-bg-top.png",
    },
  ],
  day2: [
    {
      id: "openmic",
      name: "Open Mic",
      society: "Literary",
      type: "solo",
      time: "11:00 AM",
      venue: "Open Stage",
      about: "Poetry, storytelling & standup",
      image: "/events-bg-top.png",
    },
    {
      id: "concert",
      name: "Arohana Night Concert",
      society: "Cultural Council",
      type: "group",
      time: "6:30 PM",
      venue: "Main Ground",
      about: "Live performances, lights & crowd energy",
      image: "/events-bg-top.png",
    },
  ],
};

/* ------------------ ANIMATED ITEM COMPONENT ------------------ */
const TimelineItem = ({ children, className, side, isConcert }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransformClass = () => {
    if (isVisible) return "opacity-100 translate-x-0 translate-y-0";
    if (isConcert) return "opacity-0 translate-y-20";
    if (side === "left") {
      return "opacity-0 -translate-x-8 md:translate-x-8";
    } else {
      return "opacity-0 -translate-x-8";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 transform ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */
export default function Events() {
  const [day, setDay] = useState("day1");
  const [society, setSociety] = useState("All");
  const [type, setType] = useState("All");

  const societies = ["TechWhiz", "Abhivyakti", "DebSoc", "Pixels", "Literary"];

  const [searchParams] = useSearchParams();
  const societyFromURL = searchParams.get("society");

  // State for the Hero SVG animation
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setHeroLoaded(true);
    if (societyFromURL) {
      setSociety(societyFromURL);
    }
  }, [societyFromURL]);

  const filteredEvents = EVENTS[day].filter((e) => {
    const s = society === "All" || e.society === society;
    const t = type === "All" || e.type === type;
    return s && t;
  });

  return (
    <section className="relative w-full bg-foreground text-background min-h-dvh overflow-hidden px-4">
      <img
        src="/events-bg-top.png"
        alt="Events"
        className="fixed inset-0 w-full h-full object-cover"
      />
      <div className="fixed inset-0 bg-black/20 backdrop-brightness-75" />
      <div className="fixed bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-foreground" />
      <div className="z-10 w-full flex justify-center items-center mt-10">
        <img
          src="/Events.svg"
          alt="Events Title"
          className={`
            w-[50%] md:w-[30%] lg:w-[20%]
            transition-all duration-1000 ease-out md:mt-20 mt-10 mb-5
            ${heroLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"}
          `}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="animate-rise">
          {/* FILTERS */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {/* Society Filter */}
            <div className="flex flex-col gap-1 min-w-40">
              <label className="text-xs uppercase tracking-wider opacity-70">
                Society
              </label>
              <select
                value={society}
                onChange={(e) => setSociety(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20
                 px-3 py-2 rounded-lg text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary/40
                 hover:bg-white/20 transition-all"
              >
                <option className="bg-foreground">All</option>
                {societies.map((s) => (
                  <option className="bg-foreground" key={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex flex-col gap-1 sm:min-w-40">
              <label className="text-xs uppercase tracking-wider opacity-70">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20
                 px-3 py-2 rounded-lg text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary/40
                 hover:bg-white/20 transition-all"
              >
                <option className="bg-foreground">All</option>
                <option className="bg-foreground" value="solo">
                  Solo
                </option>
                <option className="bg-foreground" value="group">
                  Group
                </option>
              </select>
            </div>
          </div>

          {/* DAY TOGGLE */}
          <div className="flex md:gap-8 gap-4 mb-8 justify-center">
            {["day1", "day2"].map((d) => {
              const active = day === d;
              return (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`
                    px-6 py-2 rounded-md text-sm font-semibold tracking-widest text-white
                    border transition-all duration-200 cursor-pointer
                    ${
                      active
                        ? "bg-linear-to-r from-pink-500 to-pink-600"
                        : "bg-white/10 border-white/20 hover:bg-white/20"
                    }
                  `}
                >
                  {d === "day1" ? "DAY 1" : "DAY 2"}
                </button>
              );
            })}
          </div>
          <div className="relative">
            <div className="absolute top-0 w-0.5 bg-foreground transition-all h-full duration-500 md:left-1/2 md:-translate-x-1/2" />
            <div className="flex flex-col space-y-6 py-4">
              {filteredEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={event.id}
                    className="relative w-full flex flex-col md:flex-row items-center"
                  >
                    {/* Left Container */}
                    <div
                      className={`w-full md:w-1/2 ${isLeft ? "flex justify-end" : "hidden md:flex invisible"} md:pr-8`}
                    >
                      {isLeft && (
                        <div className="relative w-full pl-4 md:pl-0">
                          <TimelineItem className="w-full" side="left">
                            <EventCard event={event} isLeft={isLeft} />
                          </TimelineItem>
                          <div className="hidden md:block absolute top-8 -right-8 w-8 h-0.5 bg-foreground" />
                          <div className="md:hidden absolute top-8 left-0 w-4 h-0.5 bg-foreground" />
                          <div className="md:hidden absolute md:left-5 -left-1 top-8 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full z-10" />
                        </div>
                      )}
                    </div>

                    {/* Desktop Center Dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 items-center justify-center z-10">
                      <div className="w-4 h-4 bg-foreground rounded-full shadow-[0_0_10px_rgba(158,114,195,0.8)]" />
                    </div>

                    {/* Right Container */}
                    <div
                      className={`w-full md:w-1/2 ${!isLeft ? "flex justify-start" : "hidden md:flex invisible"} md:pl-8`}
                    >
                      {!isLeft && (
                        <div className="relative w-full pl-4 md:pl-0">
                          <TimelineItem className="w-full" side="right">
                            <EventCard event={event} />
                          </TimelineItem>
                          <div className="hidden md:block absolute top-8 -left-8 w-8 h-0.5 bg-foreground" />
                          <div className="md:hidden absolute top-8 left-0 w-4 h-0.5 bg-foreground" />
                          <div className="md:hidden absolute md:left-5 -left-1 top-8 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full z-10" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, isLeft }) {
  return (
    <div
      className={`flex items-start md:gap-4 gap-2 max-md:flex-col ${
        isLeft ? "md:flex-row-reverse md:text-right md:ml-auto" : "md:text-left"
      }`}
    >
      {/* Small Image */}
      <img
        src={event.image}
        alt={event.name}
        className="w-20 h-20 rounded-lg object-cover shrink-0"
      />

      {/* Content */}
      <div className="bg-white/60 backdrop-blur-lg border border-pink-200/40 w-full px-4 py-3 rounded-xl">
        <h3 className="text-lg font-bold tracking-wide text-gray-800">
          {event.name}
        </h3>
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
          {event.society}
        </p>
        <div
          className={`flex gap-3 text-xs text-gray-700 mt-1 ${
            isLeft ? "md:justify-end" : ""
          }`}
        >
          <span>🕒 {event.time}</span>
          <span>📍 {event.venue}</span>
        </div>
        <p className="text-sm text-gray-900 leading-relaxed mt-2">
          {event.about}
        </p>

        <button
          className="
            mt-3 px-4 py-2 rounded-md
            text-xs font-bold uppercase tracking-widest
            text-white
            bg-linear-to-r from-pink-500 to-pink-600
            shadow-[0_0_10px_rgba(236,72,153,0.5)]
            hover:shadow-[0_0_20px_rgba(236,72,153,0.8)]
            hover:-translate-y-0.5
            active:translate-y-0.5
            transition-all duration-200
          "
        >
          View Details →
        </button>
      </div>
    </div>
  );
}
