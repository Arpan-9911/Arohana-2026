export default function Input({ label, type = "text" }) {
  return (
    <div>
      <label className="block text-lg mb-2 text-white">
        {label}
      </label>

      <input
        type={type}
        className="
          w-full bg-transparent
          border border-[#333]
          rounded-full
          py-3 px-6
          text-white
          outline-none
          focus:border-[#fcd34d]
        "
      />
    </div>
  );
}
