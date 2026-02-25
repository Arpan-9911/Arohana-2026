import HeroSection from "../components/HeroSection";
import Cards from "../components/Cards";
import Sponsors from "../components/Sponsors";
import FAQ from "../components/FAQ";
import { useState, useEffect } from "react";
import BannerModal from "../components/BannerModal";

const Home = () => {
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-background ">
      <BannerModal
        isOpen={showBanner}
        onClose={() => setShowBanner(false)}
      />
      <HeroSection />
      <Cards />
      <Sponsors />
      <FAQ />
    </div>
  );
};

export default Home;
