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
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/pass/:qrToken" element={<Pass />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />


        <Route element={<ProtectedRoute />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


        {/* not found Route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}
