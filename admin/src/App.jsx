import { Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import ProfilePage from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound";
import LogoutPage from "./pages/dashboard/Logout";
import Login from "./pages/login";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ParticipantsPage from "./pages/dashboard/Participants";
import SocietiesPage from "./pages/dashboard/Society";

export default function App() {
  return (
    <Routes>

      {/* public */}
      {/* <Route element={<PublicRoute />}> */}
        <Route path="/login" element={<Login />} />
      {/* </Route> */}

      {/* protected */}
      <Route element={<ProtectedRoute />}>

        <Route path="/" element={<Home />} />
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/society" element={<SocietiesPage />} />

      </Route>


      <Route path="/logout" element={<LogoutPage />} />

      {/* fallback */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}