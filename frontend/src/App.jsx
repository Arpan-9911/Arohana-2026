import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Pass from "./pages/Pass";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";   


export default function App() {
  return (
    <> 
      <ScrollToTop />
      <Navigation /> 

      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/pass/:qrToken" element={<Pass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

      
        <Footer />
      </div>
    </>
  );
}