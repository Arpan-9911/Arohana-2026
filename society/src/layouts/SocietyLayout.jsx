import { Link, Outlet, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const SocietyLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItem = (path, label) => (
    <Link
      to={path}
      onClick={() => setOpen(false)}
      className={`block px-4 py-3 rounded-xl transition ${
        location.pathname === path
          ? "bg-purple-600 text-white shadow-lg"
          : "text-white/70 hover:bg-purple-500/20 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  const logout = async () => {
    try {
      const module = await import("../lib/admin.service");
      await module.logoutAdmin();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0d001a] via-[#160025] to-[#0b0015] text-white">

      {/* ===== Mobile Top Bar ===== */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <h2 className="text-lg font-bold text-purple-400">Society Admin</h2>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <div className="flex">

        {/* ===== Sidebar (Desktop) ===== */}
        <aside className="hidden md:block w-64 min-h-screen p-6 border-r border-white/10 backdrop-blur-xl bg-white/5">
          <h2 className="text-2xl font-bold text-purple-400 mb-10">
            Society Admin
          </h2>

          <nav className="space-y-4">
            {navItem("/", "Dashboard")}
            {navItem("/events", "Manage Events")}
            {navItem("/participants", "Participants")}
          </nav>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 mt-10 rounded-lg text-white/70 hover:bg-purple-500/20 hover:text-white transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </aside>

        {/* ===== Mobile Drawer ===== */}
        {open && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="flex-1 bg-black/60"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <div className="w-64 bg-[#160025] p-6 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-purple-400">
                  Society Admin
                </h2>
                <button onClick={() => setOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <nav className="space-y-4">
                {navItem("/", "Dashboard")}
                {navItem("/events", "Manage Events")}
                {navItem("/participants", "Participants")}
              </nav>

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-3 mt-10 rounded-lg text-white/70 hover:bg-purple-500/20 hover:text-white transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* ===== Main Content ===== */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SocietyLayout;