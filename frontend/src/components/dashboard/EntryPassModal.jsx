import { useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import EntryPassTicket from "./EntryPassTicket";

export default function EntryPassModal({ isOpen, onClose, user }) {
  const ticketRef = useRef(null);

  if (!isOpen) return null;
  return (
    <div className="fixed h-dvh inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <div className="relative w-full max-w-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white flex items-center gap-2 text-sm uppercase cursor-pointer"
        >
          Close <X size={18} />
        </button>

        {/* Ticket */}
        <motion.div
          initial={{ y: 10, opacity: 0.5 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <EntryPassTicket ref={ticketRef} user={user} />
        </motion.div>
      </div>
    </div>
  );
}
