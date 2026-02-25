import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSocietyStore } from "../store/society.store";
import conundrum from "../socImages/conundrum.jpg";
import chanakya from "../socImages/chanakya.webp";
import diversity from "../socImages/diversity.webp";
import iris from "../socImages/iris.jpg";
import impressions from "../socImages/impressions.webp";
import navrang from "../socImages/navrang.jpg";
import raaga from "../socImages/raaga.webp";
import rudra from "../socImages/rudra.jpg";
import techwhiz from "../socImages/techwhiz.jpg";

const Cards = () => {
  const { societies, fetchSocieties, loading } = useSocietyStore();
  const [width, setWidth] = useState(0);
  const imagesArray = [conundrum, chanakya, diversity, iris, impressions, navrang, raaga, rudra, techwhiz];
  const carousel = useRef();

  // Fetch societies on mount
  useEffect(() => {
    fetchSocieties();
  }, [fetchSocieties]);

  // Update drag width when societies change
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [societies]);

  if (loading) return null;

  if (!societies.length)
    return <p className="text-white/70 text-center py-8">No societies found.</p>;

  return (
    <div className="bg-[#050505] py-20 overflow-hidden">
      <div className="px-10 mb-10">
        <h2 className="text-pink-500 font-mono text-sm tracking-[0.5em]">
          Societies
        </h2>
      </div>

      <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 px-10"
        >
          {societies.map((society, index) => (
            <Card key={society._id} society={society} frontImg={imagesArray[index]} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Card = ({ society, frontImg }) => {
  const bgImg = "images/society.jpg";

  return (
    <motion.div
      className="relative h-110 w-75 sm:w-98 shrink-0 overflow-hidden rounded-[40px] bg-[#111] border border-white/5 group select-none"
    >
      {/* Background Image */}
      <div
        className="
          absolute inset-0 z-0 bg-cover bg-center transition-all duration-700
          opacity-100 grayscale-0 scale-100
          md:opacity-20 md:grayscale md:scale-125
          md:group-hover:opacity-100 
          md:group-hover:grayscale-0 
          md:group-hover:scale-100
        "
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      {/* Front Image - slides up on hover */}
      <div className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none">
        <img
          src={frontImg}
          alt={society.name}
          className="
            w-[85%] h-[80%] object-fill
            transition-all duration-500 ease-out
            translate-y-0 opacity-100
            md:translate-y-32 md:opacity-0
            md:group-hover:translate-y-0 
            md:group-hover:opacity-100
          "
          draggable="false"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-30 p-10 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tighter italic drop-shadow-lg">
            {society.name}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-0.5 grow bg-white/10 overflow-hidden">
            <div className="h-full bg-pink-600 w-full sm:w-0 group-hover:w-full transition-all duration-1000" />
          </div>
          <Link
            to={`/events?society=${society.name}`}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center
                       bg-cyan-500 sm:bg-gray-700 sm:group-hover:bg-cyan-500 sm:group-hover:border-cyan-500
                       transition-all group-hover:rotate-45"
          >
            <ArrowUpRight />
          </Link>
        </div>
      </div>

      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
    </motion.div>
  );
};

export default Cards;
