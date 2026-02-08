import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function Input({
  label,
  type = "text",
  icon: Icon,
  ...props
}) {
  // 1. Create state to track visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 2. Determine if this is a password field
  const isPasswordType = type === "password";

  // 3. Define the actual type being passed to the HTML input
  const currentType = isPasswordType 
    ? (isPasswordVisible ? "text" : "password") 
    : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      {label && (
        <label className="block text-lg mb-2 text-background font-bold">
          {label}
        </label>
      )}

      <div className="relative">
        {/* If it's a password, show clickable Eye icons. Otherwise, show the passed Icon */}
        {isPasswordType ? (
          <button
            type="button" // Important: prevents form submission on click
            onClick={togglePasswordVisibility}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted hover:text-secondary-foreground transition-colors cursor-pointer z-10"
          >
            {isPasswordVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        ) : (
          Icon && (
            <Icon
              size={20}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none z-10"
            />
          )
        )}

        <input
          {...props}
          type={currentType}
          className={`
            w-full bg-[#120a2c] rounded-full
            py-3 pl-6 ${(Icon || isPasswordType) ? "pr-14" : "pr-6"}
            border border-white/10
            shadow-inner
            focus:border-primary
            focus:ring-2 focus:ring-primary/30
            backdrop-blur-xl
            focus:shadow-[0_0_20px_rgba(146,77,191,0.4)]
          `}
        />
      </div>
    </div>
  );
}