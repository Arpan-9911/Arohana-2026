import { motion } from "framer-motion";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

const colorStyles = {
  primary: {
    border: "border-b-primary/50",
    bg: "bg-primary/10",
    text: "text-primary",
    groupHoverText: "group-hover:text-primary",
    badge: "bg-primary/20 text-primary",
  },
  blue: {
    border: "border-b-blue-400/50",
    bg: "bg-blue-400/10",
    text: "text-blue-400",
    groupHoverText: "group-hover:text-blue-400",
    badge: "bg-blue-400/20 text-blue-400",
  },
  orange: {
    border: "border-b-orange-400/50",
    bg: "bg-orange-400/10",
    text: "text-orange-400",
    groupHoverText: "group-hover:text-orange-400",
    badge: "bg-orange-400/20 text-orange-400",
  },
  emerald: {
    border: "border-b-emerald-400/50",
    bg: "bg-emerald-400/10",
    text: "text-emerald-400",
    groupHoverText: "group-hover:text-emerald-400",
    badge: "bg-emerald-400/20 text-emerald-400",
  },
};

export default function EventCard({
  title,
  organizer,
  type,
  teamCode,
  date,
  icon: Icon,
  color = "primary",
  submissionStatus,
  onSubmit,
}) {
  const styles = colorStyles[color] || colorStyles.primary;

  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`glass-card p-8 rounded-[3rem] border-t border-l border-r border-white/5 border-b-4 ${styles.border} group overflow-hidden`}
    >
      <div className={`absolute inset-0 rounded-[3rem] pointer-events-none`}>
        <div
          className={`absolute -top-1/2 -right-1/2 w-96 h-96 ${styles.bg} rounded-full blur-3xl opacity-40`}
        />
      </div>
      <div className="flex justify-between items-start mb-6">
        <div
          className={`w-12 h-12 rounded-full ${styles.bg} ${styles.text} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          {Icon && <Icon size={22} />}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            type === "Team" ? styles.badge : "bg-white/10 text-white/70"
          }`}
        >
          {type}
        </span>
      </div>

      <p
        className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${styles.text}`}
      >
        {organizer}
      </p>

      <h3
        className={`text-xl font-extrabold mb-4 
        ${styles.groupHoverText}
        `}
      >
        {title}
      </h3>

      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Team Code</span>
          <span className="font-mono bg-white/5 px-2 py-0.5 rounded">
            {teamCode}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-white/40">Date</span>
          <span className="text-white/80 font-medium">{date}</span>
        </div>
        {submissionStatus === "pending" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSubmit && onSubmit();
            }}
            className={`mt-6 ${styles.bg} border-b-4 ${styles.border} w-full py-4 rounded-full font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer`}
          >
            <ArrowBigUpDash size={20} />
            Submit Entry
          </button>
        )}
        {submissionStatus === "submitted" && (
          <div
            className="mt-6 w-full py-4 rounded-full
    bg-emerald-500/20 text-emerald-400
    border border-emerald-400/30
    font-bold flex items-center justify-center gap-2 cursor-not-allowed"
          >
            ✔ Submission Complete
          </div>
        )}
        {submissionStatus === "not-required" && (
          <div
            className="mt-6 w-full py-4 rounded-full 
    bg-white/5 text-white/30 
    text-xs uppercase tracking-widest 
    flex items-center justify-center gap-2 cursor-not-allowed"
          >
            ✔ No Submission Required
          </div>
        )}
      </div>
    </motion.div>
  );
}
