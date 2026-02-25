'use client';

import { motion } from "framer-motion";
import CBI from '../sponsors/Central Bank of India Logo SVG.svg';
import RG from '../sponsors/rg hospital.svg';
import IA from '../sponsors/infinity arcade.svg';
import TS from '../sponsors/UYGW.svg';
import DE from '../sponsors/UYGW(1).svg';
import DV from '../sponsors/UYGW(2).svg';

const SPONSORS = [
  { id: 1, name: "Central Bank of India", category: "Powered By", logo: CBI, color: "transparent" },
  { id: 2, name: "RG Hospitals", category: "Health Partner", logo: RG, color: "white" },
  { id: 3, name: "Infinity Arcade", category: "Gaming Partner", logo: IA, color: "white" },
  { id: 4, name: "Turning Stones", category: "Event Partner", logo: TS, color: "transparent" },
  { id: 5, name: "Diego Events", category: "Event Partner", logo: DE, color: "white" },
  { id: 6, name: "Denver", category: "Fragrance Partner", logo: DV, color: "from-[#FF6F00] to-[#FFD54F]" },
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
    <section id="sponsors" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#050505] via-[#0a0515] to-[#050505] overflow-hidden scroll-mt-24">
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
              <div className="relative h-40 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 bg-linear-to-br from-white/5 to-transparent p-6 flex flex-col items-center justify-center">
                
                {/* Background linear */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-linear-to-br ${sponsor.color}`} />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-px bg-linear-to-r from-[#C2185B] via-transparent to-[#D4AF37] pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center">
                  {/* Logo Circle */}
                  <div className={`max-w-30 max-h-20 flex justify-center mb-2 bg-${sponsor.color} p-1 rounded`}>
                    <img src={sponsor.logo} alt={sponsor.name} className="object-contain" /> 
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
      </div>
    </section>
  );
}
