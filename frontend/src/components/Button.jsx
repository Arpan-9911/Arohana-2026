import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  variant = "primary",
}) => {
  const base =
    "relative px-8 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-pink-500/40",
    outline:
      "border border-white/30 text-white hover:bg-white/10 backdrop-blur-md",
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${variants[variant]}`}
    >
      <span className="relative z-10">{children}</span>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition duration-300 blur-xl" />
    </motion.button>
  );
};
