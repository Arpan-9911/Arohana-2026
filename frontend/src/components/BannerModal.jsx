"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const BannerModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  
  // Auto close the modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-999 flex items-center justify-center 
                     bg-black/50 backdrop-blur-sm"
        >

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white/5 backdrop-blur-xl 
                       border border-white/10 
                       rounded-3xl shadow-2xl 
                       p-6 w-[95%] max-w-4xl"
          >

            {/* Premium Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 
                         w-10 h-10 flex items-center justify-center
                         rounded-full 
                         bg-white/10 backdrop-blur-md
                         border border-white/20
                         hover:bg-red-500/80
                         hover:scale-110
                         transition-all duration-300"
            >
              <X className="text-white w-5 h-5" />
            </button>

            {/* Subtle Glow */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-60 h-60 bg-pink-500/20 blur-[120px] rounded-full animate-pulse" />
            </div>

            {/* Banner Image */}
            <img
              src="/images/banner.jpeg"
              className="relative z-10 w-full max-h-[75vh] object-contain rounded-2xl"
            />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BannerModal;