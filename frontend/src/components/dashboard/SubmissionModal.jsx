import { motion } from "framer-motion";
import { UploadCloud, UploadCloudIcon, X } from "lucide-react";
import { useState, useRef } from "react";

export default function SubmissionModal({ isOpen, onClose, event }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const MAX_SIZE = 200 * 1024 * 1024; // 200MB

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    const newTotalSize = [...files, ...fileArray].reduce(
      (acc, file) => acc + file.size,
      0,
    );

    if (newTotalSize > MAX_SIZE) {
      setError("Total file size exceeds 200MB limit.");
      return;
    }

    setError("");
    setFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleClose = () => {
    setFiles([]);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

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
                Upload files for {event?.title}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={18} className="text-white/50" />
            </button>
          </div>

          {/* Upload Box */}
          <div
            onClick={() => inputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-white/20 
      rounded-2xl p-8 flex flex-col items-center justify-center 
      gap-4 bg-white/2 
      hover:border-primary/50 hover:bg-primary/4 
      transition-all cursor-pointer group"
          >
            <div
              className="w-14 h-14 rounded-full 
      bg-primary/20 flex items-center justify-center 
      text-primary text-2xl"
            >
              <UploadCloud size={28} />
            </div>

            <div className="text-center">
              <p className="font-bold text-white/80">
                Click or drag files to upload
              </p>
              <p className="text-xs text-white/40 mt-1">
                PDF, DOCX or ZIP (Max. 200MB)
              </p>
            </div>

            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-xs">{error}</p>}

          {/* Files Selected */}
          {files.length > 0 && (
            <div
              className="bg-white/5 border border-white/10 
      rounded-2xl p-4 space-y-3"
            >
              <p className="text-xs uppercase tracking-widest text-white/40">
                Files Selected
              </p>

              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm text-white/80"
                >
                  <span className="truncate max-w-[70%]">
                    {index + 1}. {file.name}
                  </span>

                  <span className="text-white/40 text-xs">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Confirm Button */}
          <button
            disabled={files.length === 0}
            className={`w-full py-4 rounded-full font-bold text-white
      bg-linear-to-r from-pink-500 to-primary
      shadow-[0_10px_40px_rgba(238,43,205,0.4)]
      transition-all duration-300
      ${files.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"}`}
          >
            Confirm Submission
          </button>
        </div>
      </motion.div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
