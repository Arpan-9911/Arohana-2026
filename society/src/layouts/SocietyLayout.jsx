import { Link, Outlet, useLocation } from "react-router-dom";

const SocietyLayout = () => {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`block px-4 py-3 rounded-xl transition ${
        location.pathname === path
          ? "bg-purple-600 text-white shadow-lg"
          : "text-white/70 hover:bg-purple-500/20 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0d001a] via-[#160025] to-[#0b0015] text-white">
      
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-white/10 backdrop-blur-xl bg-white/5">
        <h2 className="text-2xl font-bold text-purple-400 mb-10">
          Society Admin
        </h2>

        <nav className="space-y-4">
          {navItem("/", "Dashboard")}
          {navItem("/events", "Manage Events")}
          {navItem("/participants", "Participants")}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SocietyLayout;
