import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function RegisterEventCard({ onClick }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={onClick}
      className="border-2 border-dashed border-white/10 
      rounded-[3rem] p-8 
      flex flex-col items-center justify-center gap-4 
      cursor-pointer group
      hover:bg-white/3 
      hover:border-primary/50
      transition-all duration-300"
    >
      <div
        className="w-12 h-12 rounded-full bg-white/5 
        flex items-center justify-center 
        text-white/30 
        group-hover:text-primary 
        transition-colors duration-300"
      >
        <Plus size={28} />
      </div>

      <div className="text-center">
        <p className="font-bold text-white/60 group-hover:text-white transition-colors">
          Register for Event
        </p>
        <p className="text-xs text-white/30">More spots available</p>
      </div>
    </motion.div>
  );
}
