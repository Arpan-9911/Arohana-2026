import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";
import EntryPassModal from "../components/EntryPassModal";

// Mock Dashboard Data
const mockDashboardData = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "approved", // pending | approved | rejected
    totalEvents: 3,
  },
  participations: [
    {
      id: "p1",
      society: "Digital Frontier",
      eventName: "CodeBlitz",
      eventType: "team",
      teamCode: "YAKYFV",
      requiresSubmission: true,
      submitted: false,
    },
    {
      id: "p2",
      society: "TechWhiz",
      eventName: "UI/UX Challenge",
      eventType: "solo",
      teamCode: null,
      requiresSubmission: false,
      submitted: true,
    },
    {
      id: "p3",
      society: "Data Wizards",
      eventName: "Analytics Sprint",
      eventType: "team",
      teamCode: "DATAWIZ",
      requiresSubmission: true,
      submitted: true,
    },
  ],
};

//STATUS BADGE COMPONENT
const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      bg: "bg-green-500/20",
      border: "border-green-500/50",
      text: "text-green-400",
      label: "Approved",
    },
    pending: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/50",
      text: "text-yellow-400",
      label: "Pending",
    },
    rejected: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      text: "text-red-400",
      label: "Rejected",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div
      className={`inline-block px-3 py-1 rounded-full ${config.bg} border ${config.border} ${config.text} text-xs font-semibold`}
    >
      {config.label}
    </div>
  );
};

// EVENT TYPE BADGE
const EventTypeBadge = ({ type }) => {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-medium">
      {type === "team" ? <Users size={14} /> : <Users size={14} />}
      {type === "solo" ? "Solo" : "Team"}
    </div>
  );
};

// PROFILE CARD COMPONENT
const ProfileCard = ({ user, isLoading, onViewPass }) => {
  if (isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300">
        {/* Gradient glow background */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent -z-10"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
              <img
                src={user.avatar}
                alt={user.name}
                className="relative w-24 h-24 rounded-full border-2 border-purple-400/50 object-cover"
              />
            </div>
          </motion.div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {user.name}
            </h2>
            <p className="text-purple-200/70 mb-4">{user.email}</p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
              <StatusBadge status={user.status} />
              <div className="px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium">
                {user.totalEvents} Events Enrolled
              </div>
            </div>

            <motion.button
              onClick={() => onViewPass && onViewPass()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-linear-to-r cursor-pointer from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            >
              View Entry Pass
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

//  EVENT CARD COMPONENT
const EventCard = ({ participation }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setSelectedFile(file.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 backdrop-blur-lg p-6 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group">
        {/* Gradient glow on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 -z-10"></div>
        )}

        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-300/70 font-semibold mb-1">
                {participation.society}
              </p>
              <h3 className="text-xl font-bold text-white">
                {participation.eventName}
              </h3>
            </div>
            {participation.submitted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30"
              >
                <CheckCircle size={14} className="text-green-400" />
                <span className="text-xs text-green-300 font-semibold">
                  Submitted
                </span>
              </motion.div>
            )}
          </div>

          {/* Event Type */}
          <EventTypeBadge type={participation.eventType} />

          {/* Team Code Section */}
          {participation.eventType === "team" && (
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-400/20">
              <p className="text-xs text-purple-300/70 uppercase tracking-wide mb-1">
                Team Code
              </p>
              <p className="text-lg font-bold text-purple-300 font-mono tracking-widest">
                {participation.teamCode}
              </p>
            </div>
          )}

          {/* File Upload Section */}
          {participation.requiresSubmission && !participation.submitted && (
            <div className="pt-4 border-t border-purple-400/10">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-white mb-2 block">
                  Upload Your Submission
                </span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id={`file-${participation.id}`}
                />
                <label
                  htmlFor={`file-${participation.id}`}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border-2 border-dashed border-purple-400/30 cursor-pointer hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                >
                  <Upload size={16} className="text-purple-300" />
                  <span className="text-sm text-purple-300">
                    {selectedFile ? selectedFile : "Choose file"}
                  </span>
                </label>
              </label>
              {selectedFile && (
                <p className="text-xs text-green-400 mt-2">
                  ✓ File selected and logged to console
                </p>
              )}
            </div>
          )}

          {/* Already Submitted Message */}
          {participation.requiresSubmission && participation.submitted && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-400/20 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              <p className="text-sm text-green-300 font-medium">
                Submission already received
              </p>
            </div>
          )}

          {/* No Submission Required */}
          {!participation.requiresSubmission && (
            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-400/20 flex items-center gap-2">
              <Clock size={16} className="text-indigo-300" />
              <p className="text-sm text-indigo-300 font-medium">
                No submission required
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

//  LOADING SPINNER
const LoadingSpinner = () => {
  return (
    <div
      className="min-h-dvh
      bg-[radial-gradient(circle_at_top,#d624c7,#070313_0%)]
      flex items-center justify-center
      p-6 text-lemon-chiffon
      relative overflow-hidden"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-full border-4 border-purple-400/20 border-t-purple-400 shadow-xl shadow-purple-500/50"></div>
      </motion.div>
    </div>
  );
};

//  MAIN DASHBOARD COMPONENT
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPassOpen, setIsPassOpen] = useState(false);

  useEffect(() => {
    // Simulate API call with 1 second delay
    const timer = setTimeout(() => {
      setDashboardData(mockDashboardData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="min-h-dvh
      bg-[radial-gradient(circle_at_top,#d624c7,#070313_0%)]
      flex items-center justify-center
      p-6 text-lemon-chiffon
      relative overflow-hidden"
    >
      {/* Animate background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 md:py-28 max-w-7xl w-full md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-purple-200/60 text-lg">
            Manage your event registrations and submissions
          </p>
        </motion.div>

        {/* Profile Section */}
        <div className="mb-12 max-w-7xl">
          <ProfileCard
            user={dashboardData.user}
            isLoading={isLoading}
            onViewPass={() => setIsPassOpen(true)}
          />
        </div>

        {/* Operations Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">OPERATIONS</h2>
            <p className="text-purple-200/60">Events you've enrolled in</p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.participations.map((participation) => (
              <EventCard key={participation.id} participation={participation} />
            ))}
          </div>
        </motion.div>

        {/* Empty State (if no events) */}
        {dashboardData.participations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <AlertCircle
              size={48}
              className="mx-auto text-purple-400/50 mb-4"
            />
            <p className="text-purple-200/60 text-lg">No events enrolled yet</p>
          </motion.div>
        )}
      </div>

      {/* Entry Pass Modal */}
      <EntryPassModal
        isOpen={isPassOpen}
        onClose={() => setIsPassOpen(false)}
        name={dashboardData.user.name}
        uniqueId={"user1"}
        qrToken={dashboardData.user.qrToken}
      />
    </div>
  );
};

export default Dashboard;