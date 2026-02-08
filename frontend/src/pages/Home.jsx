import Navigation from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Cards from "../components/Cards";
import Sponsors from "../components/Sponsors";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <div className="min-h-screen bg-background ">
      <Navigation />
      <HeroSection />
      <Cards />
      <Sponsors />
      <FAQ />
    </div>
  );
};

export default Home;
