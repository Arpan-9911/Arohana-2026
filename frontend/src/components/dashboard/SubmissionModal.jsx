import { motion } from "framer-motion";
import { X, Link as LinkIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { submitEvent } from "../../lib/event.service";

export default function SubmissionModal({ isOpen, onClose, event }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const isValidGoogleDriveLink = (link) => {
    return (
      link.includes("drive.google.com") &&
      (link.includes("/file/") || link.includes("open?id="))
    );
  };

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError("Please enter your Google Drive link.");
      return;
    }

    if (!isValidGoogleDriveLink(url)) {
      setError("Please enter a valid Google Drive public link.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await submitEvent(event.id, url);

      if (response.data.success) {
        toast.success("Submission successful 🎉");

        setUrl("");
        onClose();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Submission failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setUrl("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl 
        bg-linear-to-br from-[#2a0f2a] via-[#1a0b18] to-[#120811]
        border border-white/10 shadow-[0_0_60px_rgba(238,43,205,0.15)]
        backdrop-blur-2xl overflow-hidden relative text-white"
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Submit Your Project
              </h2>
              <p className="text-white/40 text-sm mt-1">
                Paste Google Drive link for {event?.title}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={18} className="text-white/50" />
            </button>
          </div>

          {/* Input Field */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">
              Google Drive Public Link
            </label>

            <div className="relative">
              <LinkIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://drive.google.com/file/..."
                className="w-full pl-12 pr-4 py-4 rounded-xl 
                bg-white/5 border border-white/10 
                focus:outline-none focus:border-primary/50
                text-white placeholder-white/30 transition-all"
                disabled={submitting}
              />
            </div>

            <p className="text-xs text-white/40">
              Make sure the file access is set to <b>"Anyone with the link can view"</b>
            </p>

            {error && (
              <p className="text-red-400 text-xs mt-2">{error}</p>
            )}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`w-full py-4 rounded-full font-bold text-white
            bg-linear-to-r from-pink-500 to-primary
            shadow-[0_10px_40px_rgba(238,43,205,0.4)]
            transition-all duration-300
            ${submitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-[1.02]"
              }`}
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </div>
            ) : (
              "Confirm Submission"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}