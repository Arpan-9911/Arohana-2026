import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.6]);

  return (
    <div className="bg-[#0a0118] w-full pt-1"> 
      <motion.footer
        ref={ref}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          relative
          bg-[#0a0118] 
          backdrop-blur-xl
          border-t border-white/5
          text-white
          overflow-hidden
          will-change-transform
        "
      >
        {/* ===== Animated Top Glow Line ===== */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute top-0 left-0 w-full h-[1px] 
          bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-pink-500/50"
        />

        {/* ===== Subtle Background Noise ===== */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
          <div className="w-full h-full animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

            {/* ================= CONTACT ================= */}
            <div className="flex flex-col items-center md:items-start order-2 md:order-1">
              <h3 className="text-pink-500/90 text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">
                Contact
              </h3>

              <div className="space-y-3 text-white/60 text-xs">
                {[
                  { num: "9911081263", label: "Tech", color: "text-pink-400" },
                  { num: "9XXXXXXXXX", label: "Coord", color: "text-purple-400" },
                  { num: "9XXXXXXXXX", label: "General", color: "text-yellow-400" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 group cursor-default">
                    <Phone size={14} className={item.color} />
                    <span>
                      <strong className="text-white/80">{item.num}</strong> — {item.label}
                    </span>
                  </div>
                ))}

                <motion.a
                  href="https://www.instagram.com/hyperion_pgdav"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center gap-2 mt-4 text-pink-400/80 hover:text-pink-400 transition"
                >
                  <Instagram size={16} />
                  @hyperion_pgdav
                </motion.a>
              </div>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div className="flex flex-col items-center text-center order-3 md:order-2">
              <h3 className="text-pink-500/90 text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">
                Quick Links
              </h3>

              <div className="flex flex-col gap-4 text-white/60 text-xs">
                {["Home", "Events", "Dashboard", "Sponsors", "FAQ"].map((label, i) => (
                  <Link 
                    key={i} 
                    to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                    className="relative group pb-1"
                  >
                    <span className="group-hover:text-white transition-colors duration-300">
                      {label}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ================= CREATOR ================= */}
            <div className="flex justify-center md:justify-end order-1 md:order-3">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="
                  relative group
                  bg-gradient-to-br from-white/[0.05] to-transparent
                  backdrop-blur-xl
                  border border-white/10
                  px-10 py-8 rounded-2xl
                  text-center w-full max-w-[280px]
                  shadow-[0_0_30px_rgba(219,39,119,0.15)]
                  overflow-hidden
                "
              >
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-purple-500/5 to-transparent" 
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={18} className="text-yellow-400" />
                    </motion.div>
                    <span className="text-[11px] uppercase tracking-[0.4em] text-white/50 font-medium">
                      Created By
                    </span>
                  </div>

                  <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                    TechWhiz
                  </h2>

                  <motion.a
                    href="https://www.instagram.com/techwhizpgdav"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center gap-2 text-white/40 hover:text-white transition-all text-sm mt-5 group/insta"
                  >
                    <Instagram size={16} className="group-hover/insta:text-pink-400" />
                    <span className="group-hover/insta:tracking-wider transition-all">@techwhizpgdav</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

          </div>

          <div className="border-t border-white/5 mt-10 pt-6 text-center text-white/30 text-[9px] tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} Hyperion — P.G.D.A.V.(M) College.
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Footer;