'use client';

import {Link} from "react-router-dom"
import { motion } from "framer-motion";
import { Button}from "../components/Button"

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* image Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
        src="./images/japan-1.png"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col items-center justify-center text-center">
        {/* SVG Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mb-6 w-full max-w-3xl md:max-w-4xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2430 1012.5"
            className="w-full h-auto drop-shadow-2xl filter brightness-110"
            style={{
              filter: "drop-shadow(0 0 20px rgba(194, 24, 91, 0.6))"
            }}
          >
            <image href="/aarohana.svg" width="2430" height="1012.5" />
          </svg>
        </motion.div>

        {/* <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="text-lg md:text-xl text-foreground/90 mb-12 max-w-3xl font-light"
        >
          hello yaha par kuch likhna ho toh likh dena
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <Button
          >
           <Link to="/login"> Login</Link>
          </Button>
          <Button 
          >
            <Link to="/signup"> SignUp</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-foreground/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
