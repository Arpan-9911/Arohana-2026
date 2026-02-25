"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { useUserStore } from "../store/user.store";
import { useEffect } from "react";

const HeroSection = () => {
  const { isAuthenticated, loading, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return null;

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="./images/japan-1.png"
          loading="lazy"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Glow Behind Logo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-125 h-125 bg-purple-600/30 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center min-h-screen">
        {/* Floating Logo */}
        <motion.img
          src="/aarohana.svg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1 },
            y: { duration: 6, repeat: Infinity }
          }}
          className="w-full max-w-3xl drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        />
        {/* Subtitle Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl bg-white/2 backdrop-blur border border-white/10 rounded-2xl px-8 py-6 mb-12"
        >
          <p className="text-white/80 md:text-xl md:leading-relaxed">
            Where culture meets creativity and talent takes center stage.  
            Experience electrifying performances, vibrant competitions, artistic showcases, and unforgettable celebrations that bring every passion to life.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          {isAuthenticated ? (
            <Button>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button>
              <Link to="/login">Get Started</Link>
            </Button>
          )}

          <Button variant="outline">
            <Link to="/events">Explore Events</Link>
          </Button>
        </motion.div>

        {/* Bottom Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-white/50 text-sm"
        >
          Scroll to explore ↓
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
