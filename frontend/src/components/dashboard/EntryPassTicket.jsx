import { ArrowBigDownDash } from "lucide-react";
import { forwardRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const EntryPassTicket = forwardRef(({ user }, ref) => {
  const qrValue = `${window.location.origin}/pass/${user?.qrToken}`;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-sm mx-auto rounded-4xl overflow-hidden
      bg-linear-to-br from-[#2a0f2a] via-[#1a0b18] to-[#120811]
      border border-white/10 shadow-[0_0_40px_rgba(238,43,205,0.12)]
      backdrop-blur-2xl text-white"
    >
      {/* Watermark */}
      <div className="absolute top-5 right-6 text-4xl font-extrabold tracking-tight opacity-5 select-none">
        AROHANA
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-primary text-xs tracking-[0.35em] uppercase mb-3">
            Arohana 2026 • Official Ticket
          </p>

          <h1 className="text-4xl font-medium tracking-tight">ENTRY PASS</h1>

          <p className="text-white/40 text-[11px] uppercase tracking-widest mt-2">
            Non-Transferable Security Document
          </p>
        </div>

        {/* QR Section */}
        <div className="relative flex flex-col items-center mb-8">
          <div className="relative bg-white p-3 rounded-xl shadow-[0_16px_32px_rgba(0,0,0,0.45)]">
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-3 border-l-3 border-primary rounded-tl-3xl"></div>
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-3 border-r-3 border-primary rounded-tr-3xl"></div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-3 border-l-3 border-primary rounded-bl-3xl"></div>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-3 border-r-3 border-primary rounded-br-3xl"></div>

            {/* ✅ REAL QR CODE */}
            <QRCodeCanvas
              value={qrValue}
              size={112}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
          </div>

          <p className="mt-6 text-xs uppercase tracking-widest text-white/50">
            Scan at Gate
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="text-white/20 text-xs">✦</div>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-4 mb-8">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">
              Participant
            </p>
            <p className="font-bold text-base mt-1 uppercase">
              {user?.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[10px] uppercase tracking-widest">
              Validity
            </p>
            <p className="font-bold text-sm mt-1">FEB 23-24</p>
          </div>
        </div>
      </div>

      {/* Bottom Security Strip */}
      <div className="h-1 bg-linear-to-r from-pink-500 via-primary to-pink-500"></div>
    </div>
  );
});

export default EntryPassTicket;