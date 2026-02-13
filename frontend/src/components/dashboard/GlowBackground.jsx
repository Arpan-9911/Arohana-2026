import { motion } from "framer-motion";

export default function GlowBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2d132c_0%,#1a0b18_0%,#0f050f_0%)]" />

      {/* Top Glow Blob */}
      <motion.div
        className="absolute top-32 left-1/2 -translate-x-1/2 w-150 h-100 bg-fuchsia-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Glow Blob */}
      <motion.div
        className="absolute bottom-0 right-0 w-125 h-125 bg-pink-500/20 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
