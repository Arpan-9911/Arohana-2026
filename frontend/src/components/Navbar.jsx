import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = ["Home", "About", "Services", "Contact"];

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        fixed top-0 w-full z-50 
        bg-[rgb(20,0,31)] 
        backdrop-blur-lg border-b border-white/10 
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#"
          className="flex items-center gap-2 text-white text-xl font-bold tracking-wide"
        >
          Aarohana
        </motion.a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href={`#${link.toLowerCase()}`}
                className="
                  text-white/80 hover:text-white 
                  px-4 py-2 rounded-xl relative transition
                  before:absolute before:inset-0 before:rounded-xl 
                  before:bg-linear-to-r before:from-yellow-400/20 before:to-purple-400/20 
                  before:opacity-0 hover:before:opacity-100 before:transition
                "
              >
                {link}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl hover:rotate-90 transition"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="
              md:hidden flex flex-col 
              bg-[rgba(20,20,40,0.95)] backdrop-blur-lg 
              border-t border-white/10 px-6 py-3
            "
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={`#${link.toLowerCase()}`}
                className="
                  text-white/80 hover:text-white 
                  py-3 rounded-lg transition hover:bg-yellow-300/10
                "
                whileHover={{ x: 5 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar2;
