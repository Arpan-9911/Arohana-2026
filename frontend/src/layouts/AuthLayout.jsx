import { motion } from "framer-motion";

export default function AuthLayout({
  title,
  subtitle,
  children,
  reverse = false,
}) {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 overflow-hidden text-lemon-chiffon">
      <div className="bg-background-alt shadow-2xl p-15 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex w-full max-w-6xl items-center gap-25 ${
            reverse ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* FORM SIDE */}
          <div className=" w-full max-w-md">
            <h2 className="text-4xl font-bold uppercase mb-2">{title}</h2>

            <p className="mb-8 text-gray-400">{subtitle}</p>

            {children}
          </div>

          {/* IMAGE SIDE */}
          <div className="relative w-1/2 hidden md:flex items-center justify-center">
            <div className="relative w-90 h-90 bg-muted rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="./login.jpeg"
                alt="hyperion"
                className="z-10 w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
