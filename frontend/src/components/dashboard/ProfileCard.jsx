import { motion } from "framer-motion";
import { QrCode, ShieldCheck } from "lucide-react";

export default function ProfileCard({onViewPass}) {
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative glass-card border border-white/5 rounded-[3rem] max-w-5xl md:p-8 px-2 py-8 mx-auto overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center gap-10">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary p-1 shadow-[0_0_40px_-10px_rgba(238,43,205,0.4)]">
            <img
              src="https://i.pravatar.cc/300"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Verified badge */}
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-black flex items-center justify-center">
            <ShieldCheck size={16} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Approved
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight">
            Aryan Sharma
          </h1>

          <p className="text-white/50 mt-2 mb-6">
            aryan.sharma2025@university.edu
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1">
            <StatBox label="Registered Events" value="04" />
            <StatBox label="Final Submissions" value="02" />
          </div>
        </div>

        {/* CTA */}
        <div className="w-full md:w-auto px-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewPass}
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-3xl flex items-center justify-center gap-2 shadow-lg"
          >
            <QrCode size={20} />
            View Entry Pass
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-white/5 rounded-xl px-6 py-3 border border-white/10">
      <p className="text-[10px] text-white/40 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
