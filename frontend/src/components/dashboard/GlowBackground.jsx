import { motion } from "framer-motion";

export default function GlowBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2d132c_0%,#1a0b18_0%,#0f050f_0%)]" />
    </div>
  );
}
