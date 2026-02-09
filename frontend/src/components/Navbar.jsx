import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        fixed top-0 w-full z-50
        bg-transparent
        backdrop-blur-lg
        border-b border-white/10
      "
    >
      <div className="max-w-8xl  px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.img
          src="/aarohana.svg"
          width={250}
          className="block h-25 object-contain"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href={link.href}
                className="
              text-white/80 hover:text-white
                px-4 py-2 rounded-xl relative transition
                before:absolute before:inset-0 before:rounded-xl
                before:bg-linear-to-r before:from-yellow-400/20 before:to-purple-400/20
                before:opacity-0 hover:before:opacity-100 before:transition
              "
              >
                {link.label}
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
              bg-[rgba(20,0,31,0.9)]
              backdrop-blur-lg
              border-t border-white/10
              px-6 py-3
            "
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                className="
                text-white/80 hover:text-white
                  py-3 rounded-lg transition
                hover:bg-yellow-300/10
                "
                whileHover={{ x: 5 }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
