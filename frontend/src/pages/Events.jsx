import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllEvents } from "../lib/event.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Timeline item animation
const TimelineItem = ({ children, side }) => {
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
    return side === "left" ? "opacity-0 -translate-x-8 md:translate-x-8" : "opacity-0 translate-x-8";
  };

  return <div ref={ref} className={`transition-all duration-500 transform ${getTransformClass()}`}>{children}</div>;
};

export default function Events() {
  const [eventsByDay, setEventsByDay] = useState({});
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const societyParam = searchParams.get("society") || "All";
  const typeParam = searchParams.get("type") || "All";

  const [society, setSociety] = useState(societyParam);
  const [type, setType] = useState(typeParam);
  const [selectedDate, setSelectedDate] = useState("");

  // Animate Hero & initialize
  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await getAllEvents();
        if (!res.success) throw new Error("Failed to fetch events");

        const allEvents = res.events || [];

        // Unique societies
        const uniqueSocieties = [...new Set(allEvents.map(e => e.society?.name || e.society).filter(Boolean))];
        setSocieties(uniqueSocieties);

        // Group by date YYYY-MM-DD
        const grouped = allEvents.reduce((acc, event) => {
          const dateKey = new Date(event.eventDate).toISOString().split("T")[0];
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(event);
          return acc;
        }, {});
        setEventsByDay(grouped);

        // Select first date by default
        const firstDate = Object.keys(grouped).sort()[0];
        if (firstDate) setSelectedDate(firstDate);

      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Update URL when filters change
  const handleSocietyChange = (e) => {
    const value = e.target.value;
    setSociety(value);
    const params = new URLSearchParams(searchParams);
    value === "All" ? params.delete("society") : params.set("society", value);
    setSearchParams(params);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
    const params = new URLSearchParams(searchParams);
    value === "All" ? params.delete("type") : params.set("type", value);
    setSearchParams(params);
  };

  if (loading) {
    return (
      <section className="relative w-full bg-foreground text-background min-h-dvh flex items-center justify-center px-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  // Sorted list of dates
  const days = Object.keys(eventsByDay).sort();

  // Events for the selected date
  const filteredEvents = (eventsByDay[selectedDate] || []).filter((e) => {
    const societyName = e.society?.name || e.society || "";
    const societyMatch = society === "All" || societyName === society;
    const typeMatch = type === "All" || e.type === type;
    return societyMatch && typeMatch;
  });

  return (
    <section className="relative w-full bg-foreground text-background min-h-dvh px-4">
      {/* Background */}
      <img src="/events-bg-top.png" alt="Events" className="fixed inset-0 w-full h-full object-cover" />
      <div className="fixed inset-0 bg-black/20 backdrop-brightness-75" />
      <div className="fixed bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-foreground" />

      {/* Hero */}
      <div className="z-10 w-full flex justify-center items-center mt-10">
        <img
          src="/Events-new.svg"
          alt="Events Title"
          className={`w-[60%] md:w-[30%] lg:w-[20%] transition-all duration-1000 ease-out md:mt-20 mt-10 mb-5 ${heroLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
        />
      </div>

      <div className="max-w-6xl mx-auto animate-rise">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex flex-col gap-1 min-w-40">
            <label className="text-xs uppercase tracking-wider opacity-70">Society</label>
            <select value={society} onChange={handleSocietyChange} className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 hover:bg-white/20 transition-all">
              <option value="All" className="text-foreground">All</option>
              {societies.map(s => <option key={s} value={s} className="text-foreground">{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1 sm:min-w-40">
            <label className="text-xs uppercase tracking-wider opacity-70">Type</label>
            <select value={type} onChange={handleTypeChange} className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 hover:bg-white/20 transition-all">
              <option value="All" className="text-foreground">All</option>
              <option value="solo" className="text-foreground">Solo</option>
              <option value="group" className="text-foreground">Group</option>
            </select>
          </div>
        </div>

        {/* Day buttons */}
        <div className="flex md:gap-8 gap-4 mb-8 justify-center">
          {days.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-6 py-2 rounded-md text-sm font-semibold tracking-widest text-white border transition-all duration-200 cursor-pointer ${selectedDate === d ? "bg-linear-to-r from-pink-500 to-pink-600" : "bg-white/10 border-white/20 hover:bg-white/20"}`}
            >
              {new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute top-0 w-0.5 bg-foreground h-full md:left-1/2 md:-translate-x-1/2" />
          <div className="flex flex-col space-y-6 py-4">
            {filteredEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={event._id} className="relative w-full flex flex-col md:flex-row items-center">
                  <div className={`w-full md:w-1/2 ${isLeft ? "flex justify-end" : "hidden md:flex invisible"} md:pr-8`}>
                    {isLeft && (
                      <div className="relative w-full pl-4 md:pl-0">
                        <TimelineItem side="left">
                          <EventCard event={event} isLeft={isLeft} />
                        </TimelineItem>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 items-center justify-center z-10">
                    <div className="w-4 h-4 bg-foreground rounded-full shadow-[0_0_10px_rgba(158,114,195,0.8)]" />
                  </div>

                  <div className={`w-full md:w-1/2 ${!isLeft ? "flex justify-start" : "hidden md:flex invisible"} md:pl-8`}>
                    {!isLeft && (
                      <div className="relative w-full pl-4 md:pl-0">
                        <TimelineItem side="right">
                          <EventCard event={event} isLeft={isLeft} />
                        </TimelineItem>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Event Card
function EventCard({ event, isLeft }) {
  const eventDate = new Date(event.eventDate);
  const formattedTime = eventDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const formattedDate = eventDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className={`flex items-start md:gap-4 gap-2 max-md:flex-col ${isLeft ? "md:flex-row-reverse md:text-right md:ml-auto" : "md:text-left"}`}>
      <img src={event.bannerImage || "/events-bg-top.png"} alt={event.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
      <div className="bg-white/60 backdrop-blur-lg border border-pink-200/40 w-full px-4 py-3 rounded-xl">
        <h3 className="text-lg font-bold tracking-wide text-gray-800">{event.title}</h3>
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-wider">{event.society?.name || event.society || "Unknown"}</p>
        <div className={`flex gap-3 text-xs text-gray-700 mt-1 ${isLeft ? "md:justify-end" : ""}`}>
          <span>🕒 {formattedTime}</span>
          <span>📍 {event.location || "TBA"}</span>
          <span>📅 {formattedDate}</span>
        </div>
        <p className="text-sm text-gray-900 leading-relaxed mt-2">{event.description}</p>
        <Link to={`/events/${event._id}`} className="inline-block mt-3 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest text-white bg-linear-to-r from-pink-500 to-pink-600 shadow-[0_0_10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200">
          View Details →
        </Link>
      </div>
    </div>
  );
}