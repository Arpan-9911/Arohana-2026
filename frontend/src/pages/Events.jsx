import { useState, useEffect, useRef } from "react";

/* ------------------ DATA ------------------ */
const EVENTS = {
  day1: [
    {
      id: "codeblitz",
      name: "CodeBlitz",
      society: "Technocrats",
      type: "group",
      time: "10:00 AM",
      venue: "Main Lab",
      about: "24-hour competitive coding marathon",
    },
    {
      id: "designathon",
      name: "Designathon",
      society: "Abhivyakti",
      type: "solo",
      time: "11:30 AM",
      venue: "Design Studio",
      about: "UI/UX challenge with real briefs",
    },
    {
      id: "debate",
      name: "Parliamentary Debate",
      society: "DebSoc",
      type: "group",
      time: "1:00 PM",
      venue: "Auditorium",
      about: "High-stakes structured debate",
    },
    {
      id: "photowalk",
      name: "PhotoWalk",
      society: "Pixels",
      type: "solo",
      time: "3:00 PM",
      venue: "Campus",
      about: "Capture stories around campus",
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
    },
    {
      id: "concert",
      name: "Arohana Night Concert",
      society: "Cultural Council",
      type: "group",
      time: "6:30 PM",
      venue: "Main Ground",
      about: "Live performances, lights & crowd energy",
      concert: true,
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransformClass = () => {
    if (isVisible) return "opacity-100 translate-x-0 translate-y-0";
    if (isConcert) return "opacity-0 translate-y-20";
    if (side === "left") {
      return "opacity-0 -translate-x-12 md:translate-x-12";
    } else {
      return "opacity-0 -translate-x-12";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${getTransformClass()} ${className}`}
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
  
  // State for the Hero SVG animation
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setHeroLoaded(true);
  }, []);

  const filteredEvents = EVENTS[day].filter((e) => {
    const s = society === "All" || e.society === society;
    const t = type === "All" || e.type === type;
    return s && t;
  });

  return (
    <div className="bg-foreground text-background overflow-hidden min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[55vh] md:min-h-[85vh] flex items-center justify-center">
        <img src="/events-bg-top.png" alt="Events" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-foreground" />
        
        {/* Animated SVG Container */}
        <div className="relative z-10 w-full px-4 flex justify-center items-center">
          <img 
            src="/Events.svg" 
            alt="Events Title" 
            className={`
              w-[85%] md:w-[80%] lg:w-[60%] h-auto object-contain 
              transition-all duration-1000 ease-out 
              ${heroLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
            `} 
          />
        </div>
      </section>

      <section className="relative hidden md:block w-full min-h-[70vh]">
        <img src="/events-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-t from-transparent to-foreground" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-foreground" />
      </section>

      {/* TIMELINE SECTION */}
      <section className="relative z-20 px-4 -mt-20 md:-mt-140 lg:-mt-150 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-white/20 shadow-[0_30px_120px_rgba(0,0,0,0.45)] animate-rise">
            
            <h2 className="text-center text-3xl md:text-5xl font-extrabold tracking-[0.3em] text-primary mb-6">TIMELINE</h2>

            {/* FILTERS */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-20 md:w-24 text-sm opacity-70">Societies</span>
                <select value={society} onChange={(e) => setSociety(e.target.value)} className="flex-1 bg-muted text-white px-4 py-2 rounded-lg text-sm md:text-base">
                  <option>All</option>
                  <option>Technocrats</option>
                  <option>Abhivyakti</option>
                  <option>DebSoc</option>
                  <option>Pixels</option>
                  <option>Literary</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 md:w-24 text-sm opacity-70">Type</span>
                <select value={type} onChange={(e) => setType(e.target.value)} className="flex-1 bg-muted text-white px-4 py-2 rounded-lg text-sm md:text-base">
                  <option>All</option>
                  <option value="solo">Solo</option>
                  <option value="group">Group</option>
                </select>
              </div>
            </div>

            {/* DAY TOGGLE */}
            <div className="flex gap-4 mb-12 md:mb-16">
              {["day1", "day2"].map((d) => (
                <button key={d} onClick={() => setDay(d)} className={`flex-1 py-3 rounded-xl font-bold tracking-widest transition-all duration-500 ${day === d ? "bg-primary shadow-[0_0_30px_rgba(158,114,195,0.8)]" : "bg-white/10 hover:bg-white/20"}`}>
                  {d === "day1" ? "DAY 1" : "DAY 2"}
                </button>
              ))}
            </div>

            <div className="relative min-h-[400px]">
              {/* VERTICAL LINE */}
              <div
                className="absolute top-0 w-[3px] bg-primary transition-all duration-500 left-6 md:left-1/2 md:-translate-x-1/2"
                style={{
                  bottom: day === "day2" ? (window.innerWidth < 768 ? "26rem" : "22rem") : "0",
                }}
              />

              <div className="flex flex-col space-y-8 md:space-y-12 pb-12">
                {filteredEvents.map((event, index) => {
                  const isLeft = index % 2 === 0;
                  
                  if (event.concert) {
                    return (
                      <div key={event.id} className="relative w-full flex justify-center pt-8 md:pt-16">
                          {/* Centered Concert Card */}
                          <TimelineItem isConcert={true} className="w-full relative z-10 px-0">
                            <div className="w-full md:w-3/4 mx-auto bg-gradient-to-br from-purple-900/40 to-black/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-primary/50 shadow-[0_0_60px_rgba(158,114,195,0.3)] text-center group hover:bg-black/50 transition-all">
                                <h3 className="text-2xl md:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">{event.name}</h3>
                                <p className="text-lg opacity-90 text-primary font-semibold">{event.society}</p>
                                <p className="text-sm opacity-70 mt-2 mb-4">🕒 {event.time} • 📍 {event.venue}</p>
                                <p className="text-base opacity-80 max-w-2xl mx-auto mb-6">{event.about}</p>
                                <button className="px-6 py-2 rounded-full bg-primary text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(158,114,195,0.6)] hover:bg-primary/90 transition-all">View Details</button>
                            </div>
                          </TimelineItem>
                      </div>
                    );
                  }

                  return (
                    <div key={event.id} className="relative w-full flex flex-col md:flex-row items-center">
                      {/* Left Container */}
                      <div className={`w-full md:w-1/2 ${isLeft ? 'flex justify-end' : 'hidden md:flex invisible'} md:pr-12`}>
                        {isLeft && (
                          <div className="relative w-full pl-14 md:pl-0">
                            <TimelineItem className="w-full" side="left"><EventCard event={event} /></TimelineItem>
                            <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-[2px] bg-primary/50" />
                            <div className="md:hidden absolute top-8 left-6 w-8 h-[2px] bg-primary/50" />
                            <div className="md:hidden absolute left-[22.5px] top-8 -translate-y-1/2 w-3 h-3 bg-primary rounded-full z-10" />
                          </div>
                        )}
                      </div>

                      {/* Desktop Center Dot */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-10">
                        <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(158,114,195,0.8)]" />
                      </div>

                      {/* Right Container */}
                      <div className={`w-full md:w-1/2 ${!isLeft ? 'flex justify-start' : 'hidden md:flex invisible'} md:pl-12`}>
                        {!isLeft && (
                          <div className="relative w-full pl-14 md:pl-0">
                            <TimelineItem className="w-full" side="right"><EventCard event={event} /></TimelineItem>
                            <div className="hidden md:block absolute top-1/2 -left-12 w-12 h-[2px] bg-primary/50" />
                            <div className="md:hidden absolute top-8 left-6 w-8 h-[2px] bg-primary/50" />
                            <div className="md:hidden absolute left-[22.5px] top-8 -translate-y-1/2 w-3 h-3 bg-primary rounded-full z-10" />
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
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-colors group relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-1 text-white group-hover:text-primary transition-colors">{event.name}</h3>
        <p className="text-sm opacity-80 text-primary font-medium">{event.society}</p>
        <p className="text-xs opacity-70 mt-2 flex items-center gap-2 flex-wrap">
          <span className="bg-black/30 px-2 py-1 rounded">🕒 {event.time}</span> 
          <span className="bg-black/30 px-2 py-1 rounded">📍 {event.venue}</span>
        </p>
        <p className="text-sm opacity-80 mt-3 leading-relaxed mb-4">{event.about}</p>
        <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all">View Details</button>
      </div>
    </div>
  );
}