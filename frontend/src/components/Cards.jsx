import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react"

const GANGS = [
  { id: 1, title: "TECHWHIZ", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
  { id: 2, title: "CHANSKYA", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
  { id: 3, title: "CONUNDRUM", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
  { id: 4, title: "DIVERSITY", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
  { id: 5, title: "IRIS", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
  { id: 6, title: "NAVRANG", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
  { id: 7, title: "RAAGA", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
  { id: 8, title: "RUDRA", frontImg: "images/blue.jpg", bgImg: "images/society.jpg" },
];

const Cards = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    // Calculate the drag limit: total width minus the visible container width
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div className="bg-[#050505] py-20 overflow-hidden">
      <div className="px-10 mb-10">
        <h2 className="text-pink-500 font-mono text-sm tracking-[0.5em]">Societies</h2>
      </div>

      <motion.div
        ref={carousel}
        className="cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 px-10"
        >
          {GANGS.map((gang) => (
            <Card key={gang.id} gang={gang} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Card = ({ gang }) => {
  return (
    <motion.div
      className="relative h-120 sm:h-147.5 w-75 sm:w-98 shrink-0 overflow-hidden rounded-[40px] bg-[#111] border border-white/5 group select-none"
    >
      {/* Background Image - Hidden by default, reveals on hover */}
      <div
        className="
          absolute inset-0 z-0 bg-cover bg-center transition-all duration-700
          /* mobile */
          opacity-100 grayscale-0 scale-100

          /* desktops */
          md:opacity-20 md:grayscale md:scale-125

          /* desktops hover */
          md:group-hover:opacity-100 
          md:group-hover:grayscale-0 
          md:group-hover:scale-100
        "
        style={{ backgroundImage: `url(${gang.bgImg})` }}
      />

      {/* Front Image - Slides up on hover */}
      <div className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none">
        <img
          src={gang.frontImg}
          alt=""
          className="
            w-[85%] transition-all duration-500 ease-out

            /*mobile  */
            translate-y-0 opacity-100

            /* desktop */
            md:translate-y-32 md:opacity-0

            /* desktop hover */
            md:group-hover:translate-y-0 
            md:group-hover:opacity-100
          "
          draggable="false"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-30 p-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-black text-white tracking-tighter italic drop-shadow-lg">
            {gang.title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-0.5 grow bg-white/10 overflow-hidden">
            <div className="h-full bg-pink-600 w-full sm:w-0 group-hover:w-full transition-all duration-1000" />
          </div>
          <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center bg-cyan-500 sm:bg-gray-700  sm:group-hover:bg-cyan-500 sm:group-hover:border-cyan-500 transition-all group-hover:rotate-45">
            <ArrowUpRight />
          </div>
        </div>
      </div>

      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
    </motion.div>
  );
};

export default Cards;