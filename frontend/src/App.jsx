import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Pass from "./pages/Pass";
import NotFound from "./pages/NotFound";
import EventDetails from "./pages/EventDetails";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails/>}/>

      <Route path="/pass/:qrToken" element={<Pass />} />

      {/* not found Route */}
      <Route path="*" element={<NotFound />} />

    </Routes>
    </>
  )
}
