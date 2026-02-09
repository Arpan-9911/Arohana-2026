'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";


//this needs to be completed
const FAQ_ITEMS = [
  {
    id: 1,
    question: "What is Aarohana'26?",
    answer: "Aarohana'26 is a celebration of  It's a premier cultural festival featuring performances, exhibitions, and immersive experiences.",
  },
  {
    id: 2,
    question: "When and where is the festival happening?",
    answer: "Aarohana'26 will take place at our main venue in the city center. For specific dates and location details, please check back soon as we finalize our schedule.",
  },
  {
    id: 3,
    question: "How can I purchase tickets?",
    answer: "Tickets will be available for purchase through our official website. Early bird discounts and group packages will be announced soon. Subscribe to our newsletter for updates.",
  },
  {
    id: 4,
    question: "Are there accommodations for out-of-town guests?",
    answer: "Yes! We've partnered with several premium hotels in the area to offer special rates for festival attendees. More details will be available on our partnerships page.",
  },
  {
    id: 5,
    question: "Can I volunteer at the festival?",
    answer: "We'd love your help! Volunteer applications will open in [Month]. Visit our volunteer page to learn about available roles and apply. All volunteers receive exclusive festival merchandise.",
  },
  {
    id: 6,
    question: "Is the festival accessible for people with disabilities?",
    answer: "Absolutely. Aarohana'26 is committed to being fully accessible. All venues are wheelchair accessible, and we provide assistive listening devices and other accommodations upon request.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#050505] via-[#0f0520] to-[#050505] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#F48FB1]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-[#F48FB1] via-[#C2185B] to-[#D4AF37] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-20 bg-linear-to-r from-[#F48FB1] to-[#D4AF37] mx-auto mb-4 rounded-full" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Everything you need to know about Aarohana'26
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {FAQ_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group"
            >
              {/* FAQ Item */}
              <div className="relative">
                {/* Animated background on open */}
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      layoutId={`background-${item.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-linear-to-r from-[#C2185B]/10 to-[#2A0E37]/10 rounded-xl"
                    />
                  )}
                </AnimatePresence>

                {/* Question Button */}
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="relative w-full text-left px-6 py-5 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 bg-linear-to-r from-white/5 to-transparent hover:from-white/10 backdrop-blur-xl group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white pr-8">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{
                        rotate: openId === item.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F48FB1] transition-colors" />
                    </motion.div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-[#C2185B]/20 via-transparent to-[#D4AF37]/20 pointer-events-none" />
                </button>

                {/* Answer Section */}
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 pt-0 text-white/70 leading-relaxed text-sm sm:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
