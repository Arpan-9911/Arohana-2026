'use client';

import { motion } from "framer-motion";

const SPONSORS = [
  {
    id: 1,
    name: "Sakura Tech",
    category: "Platinum",
    logo: "ST",
    color: "from-[#C2185B] to-[#F48FB1]"
  },
  {
    id: 2,
    name: "Nebula Studios",
    category: "Gold",
    logo: "NS",
    color: "from-[#D4AF37] to-[#F4E4A6]"
  },
  {
    id: 3,
    name: "Zen Innovations",
    category: "Gold",
    logo: "ZI",
    color: "from-[#2A0E37] to-[#6B3AA0]"
  },
  {
    id: 4,
    name: "Aurora Labs",
    category: "Silver",
    logo: "AL",
    color: "from-[#F48FB1] to-[#C2185B]"
  },
  {
    id: 5,
    name: "Void Digital",
    category: "Silver",
    logo: "VD",
    color: "from-[#2A0E37] to-[#C2185B]"
  },
  {
    id: 6,
    name: "Ethereal Arts",
    category: "Silver",
    logo: "EA",
    color: "from-[#D4AF37] to-[#2A0E37]"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#050505] via-[#0a0515] to-[#050505] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#C2185B]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#2A0E37]/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-[#C2185B] via-[#F48FB1] to-[#D4AF37] bg-clip-text text-transparent">
            Our Sponsors
          </h2>
          <div className="h-1 w-20 bg-linear-to-r from-[#C2185B] to-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Empowered by visionary partners who believe in celebrating culture and innovation
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {SPONSORS.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 bg-linear-to-br from-white/5 to-transparent p-6 flex flex-col items-center justify-center">
                
                {/* Background linear */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-linear-to-br ${sponsor.color}`} />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-px bg-linear-to-r from-[#C2185B] via-transparent to-[#D4AF37] pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Logo Circle */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br ${sponsor.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-lg">{sponsor.logo}</span>
                  </div>
                  
                  {/* Text */}
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 truncate">
                    {sponsor.name}
                  </h3>
                  <p className="text-[#D4AF37] text-xs font-mono tracking-wider">
                    {sponsor.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/50 mb-6">
            Interested in sponsoring Aarohana'26?
          </p>
          <button className="px-8 py-3 rounded-xl bg-linear-to-r from-[#C2185B] to-[#F48FB1] text-white font-semibold hover:shadow-lg hover:shadow-[#C2185B]/50 transition-all duration-300 hover:scale-105">
            Become a Sponsor
          </button>
        </motion.div>
      </div>
    </section>
  );
}
