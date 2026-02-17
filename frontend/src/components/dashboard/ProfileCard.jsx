import { motion } from "framer-motion";
import { QrCode, ShieldCheck, LogOut, User } from "lucide-react";
import { useUserStore } from "../../store/user.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProfileCard({ onViewPass, user }) {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  // 🔥 Generate initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative glass-card border border-white/5 rounded-[3rem] max-w-5xl md:p-8 px-4 py-10 mx-auto overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center gap-12">

        {/* 🔥 Avatar Section (Initials Based) */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-linear-to-br from-primary via-pink-500 to-purple-600 shadow-[0_0_40px_-10px_rgba(238,43,205,0.5)]">
            <div className="w-full h-full rounded-full bg-[#120811] flex items-center justify-center text-white text-4xl md:text-5xl font-extrabold tracking-wide">
              {initials}
            </div>
          </div>

          {/* Verified badge */}
          {user?.status === "approved" && (
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-9 h-9 rounded-full border-4 border-black flex items-center justify-center shadow-md">
              <ShieldCheck size={16} />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4
              ${
                user?.status === "approved"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : user?.status === "rejected"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse
                ${
                  user?.status === "approved"
                    ? "bg-emerald-400"
                    : user?.status === "rejected"
                    ? "bg-red-400"
                    : "bg-yellow-400"
                }`}
            />
            {user?.status || "Pending"}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight">
            {user?.name || "User"}
          </h1>

          <p className="text-white/50 mt-2 mb-8">
            {user?.email || "user@email.com"}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="w-full md:w-auto px-6 flex flex-col gap-4">
          {user?.status === "approved" && user?.qrToken && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onViewPass}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-3xl flex items-center justify-center gap-2 shadow-lg"
            >
              <QrCode size={20} />
              View Entry Pass
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-3xl flex items-center justify-center gap-2 shadow-lg"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
