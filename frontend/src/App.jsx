import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Pass from "./pages/Pass";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/events" element={<Events />} />

      {/* events/:id */}
      {/* <Route path="/event/:id" element={< />} /> */}

      <Route path="/pass/:qrToken" element={<Pass />} />

      {/* not found Route */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}
