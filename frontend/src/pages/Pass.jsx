// pages/Pass.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validateQrToken } from "../lib/qr.service";

import GlowBackground from "../components/dashboard/GlowBackground";

const renderDocument = (url, label) => {
  if (!url) return null

  const secureUrl = url.replace("http://", "https://")
  const isPDF = secureUrl.toLowerCase().endsWith(".pdf")

  if (isPDF) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border border-white/20 rounded-lg">
        <p className="text-sm text-white/60 mb-2">{label} (PDF)</p>
        <a
          href={secureUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline font-medium"
        >
          Open PDF in new tab
        </a>
      </div>
    )
  }

  return (
    <img
      src={secureUrl}
      alt={label}
      className="w-full object-contain rounded-lg border border-white/20"
    />
  )
}


export default function Pass() {
  const { qrToken } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await validateQrToken(qrToken);
        if (data.valid) {
          setUserData(data.user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch QR code data");
      } finally {
        setLoading(false);
      }
    };

    if (qrToken) fetchUser();
  }, [qrToken]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <GlowBackground />

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        {loading && <div className="text-center text-xl">Loading...</div>}
        {error && <div className="text-center text-red-500 text-lg">{error}</div>}

        {userData && (
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-center">Entry Pass</h1>

            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Status:</strong> {userData.status}
              </p>
              <p>
                <strong>Approved At:</strong>{" "}
                {new Date(userData.approvedAt).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {renderDocument(userData.aadharImage, "Aadhar")}
              {renderDocument(userData.idCardImage, "ID Card")}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}