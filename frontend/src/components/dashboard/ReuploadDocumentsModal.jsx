import { useState } from "react";
import { useUserStore } from "../../store/user.store";
import { toast } from "sonner";

export default function ReuploadDocumentsModal({ isOpen, onClose }) {
  const { reuploadUserDocuments, loading } = useUserStore();

  const [aadhar, setAadhar] = useState(null);
  const [idCard, setIdCard] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aadhar || !idCard) {
      return toast.error("Both documents are required");
    }

    const formData = new FormData();
    formData.append("aadhar_image", aadhar);
    formData.append("idcard_image", idCard);

    try {
      const res = await reuploadUserDocuments(formData);
      toast.success(res.message);
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to reupload documents"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a002b] p-6 rounded-xl w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold mb-5 text-white">
          Re-upload Documents
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Aadhar Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">
              Aadhar Card Image <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAadhar(e.target.files[0])}
              className="w-full text-white file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-semibold
                         file:bg-pink-600 file:text-white
                         hover:file:bg-pink-700"
            />
          </div>
          {/* ID Card Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">
              College / ID Card Image <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIdCard(e.target.files[0])}
              className="w-full text-white file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-semibold
                         file:bg-pink-600 file:text-white
                         hover:file:bg-pink-700"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}