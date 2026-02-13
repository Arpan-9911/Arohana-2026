import { useEffect, useState } from "react";

/**
 * EntryPassModal
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - name: string
 * - uniqueId: string
 * - qrToken?: string (optional placeholder)
 */
export default function EntryPassModal({
  isOpen,
  onClose,
  name = "John Doe",
  uniqueId = "user1",
  qrToken,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setMounted(true), 10);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
        setMounted(false);
      };
    }
    return () => {
      document.body.style.overflow = "";
      setMounted(false);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) onClose && onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_top,#d624c7,#070313_0% backdrop-blur-sm transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-md mx-4 transform rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 sm:p-8 transition-all duration-300 ease-out ${mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"}`}
        style={{
          boxShadow: "0 12px 40px rgba(99,102,241,0.14)",
          borderImageSlice: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 h-8 w-8 rounded-md flex items-center justify-center text-purple-200/80 hover:bg-white/5 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Top Section */}
        <div className="text-center mb-6">
          <h3 className="text-sm tracking-widest text-purple-300/80">
            ENTRY PASS
          </h3>
          <p className="mt-1 text-xs text-purple-200/70 uppercase tracking-wide">
            AROHANA 2026 • OFFICIAL TICKET
          </p>
        </div>

        {/* Middle: QR Placeholder */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="w-40 h-40 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center shadow-inner"
            style={{ boxShadow: "inset 0 6px 18px rgba(0,0,0,0.45)" }}
          >
            {/* If qrToken provided, show short token, else placeholder graphic */}
            {qrToken ? (
              <div className="text-center text-xs text-purple-100/90 px-3 break-all">
                <div className="text-sm font-medium mb-2">QR TOKEN</div>
                <div className="text-[10px] font-mono">{qrToken}</div>
              </div>
            ) : (
              <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-white/8 to-white/4 flex items-center justify-center text-white/60 text-xs font-semibold tracking-wider">
                QR
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Participant Details */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-purple-200/70 uppercase tracking-wide">
              PARTICIPANT NAME
            </p>
            <div className="mt-1 text-lg font-bold text-white">{name}</div>
          </div>

          <div>
            <p className="text-xs text-purple-200/70 uppercase tracking-wide">
              UNIQUE ID
            </p>
            <div className="mt-1 text-sm text-purple-100 font-medium">
              {uniqueId}
            </div>
          </div>

          <p className="text-[12px] text-purple-200/60 mt-2">
            Scan this at the main entrance to gain access. ID might be required
            at the gate.
          </p>
        </div>
      </div>
    </div>
  );
}

/*
Example usage (in Dashboard):

const [isPassOpen, setIsPassOpen] = useState(false);

<button onClick={() => setIsPassOpen(true)}>View Entry Pass</button>

<EntryPassModal
  isOpen={isPassOpen}
  onClose={() => setIsPassOpen(false)}
  name={user.name}
  uniqueId="user1"
  qrToken={user.qrToken}
/

*/
