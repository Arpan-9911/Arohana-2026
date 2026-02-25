import { Routes, Route } from "react-router-dom";

import SocietyLayout from "./layouts/SocietyLayout";
import SocietyDashboard from "./pages/SocietyDashboard";
import SocietyEvents from "./pages/SocietyEvents";
import SocietyParticipants from "./pages/SocietyParticipants";
import ProtectedSocietyRoute from "./components/ProtectedSocietyRoute";
import Login from "./pages/login";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path= "/login" element={<Login />} />

        {/* Society Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedSocietyRoute>
              <SocietyLayout />
            </ProtectedSocietyRoute>
          }
        >
          <Route index element={<SocietyDashboard />} />
          <Route path="events" element={<SocietyEvents />} />
          <Route path="participants" element={<SocietyParticipants />} />
          <Route path="*" element={<SocietyDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
