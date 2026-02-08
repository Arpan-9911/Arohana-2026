import { motion } from "framer-motion";

export default function AuthLayout({
  title,
  subtitle,
  children,
  reverse = false,
}) {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 text-lemon-chiffon">
      {/* Fixed width container: max-w-6xl ensures it doesn't get too wide.
        grid-cols-1 for mobile, grid-cols-2 for desktop.
      */}
      <div className="bg-background-alt shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl">
        <motion.div
          // The 'key' forces the animation to restart when 'reverse' changes
          key={reverse ? "signup" : "login"}
          initial={{
            opacity: 0,
            x: reverse ? -40 : 40, // If signup, slide from right. If login, slide from left.
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]"
        >
          {/* FORM SIDE */}
          <div
            className={`
            flex flex-col justify-center p-8 md:p-16 
            ${reverse ? "md:order-2" : "md:order-1"}
          `}
          >
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-4xl font-bold uppercase mb-2">{title}</h2>
              <p className="mb-8 text-gray-400">{subtitle}</p>
              {children}
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div
            className={`
            hidden md:flex items-center justify-center bg-muted p-8
            ${reverse ? "md:order-1" : "md:order-2"}
          `}
          >
            <div className="relative w-full aspect-square max-w-87.5">
              <div className="absolute inset-0 bg-secondary-foreground/10 rounded-full blur-3xl" />
              <img
                src="./login.jpeg"
                alt="hyperion"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-secondary-foreground/20"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
