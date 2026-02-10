import { motion } from "framer-motion";

export default function AuthLayout({
  title,
  subtitle,
  children,
  reverse = false,
}) {
  return (
    <div className="
      min-h-dvh
      bg-[radial-gradient(circle_at_top,#d624c7,#070313_60%)]
      flex items-center justify-center
      p-6 text-lemon-chiffon
      relative overflow-hidden
    ">
      <div className="absolute top-100 -left-20 w-96 h-96 bg-pink-400 blur-[140px] rounded-full"/>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400 blur-[120px] rounded-full"/>
      <div className="absolute bottom-40 w-96 h-96 bg-pink-400 blur-[120px] rounded-full"/>

      <div className="
          backdrop-blur-2xl
          border border-white/20
          shadow-[0_30px_80px_rgba(0,0,0,0.7)]
          rounded-4xl overflow-hidden w-full max-w-5xl">
        <motion.div
          // The 'key' forces the animation to restart when 'reverse' changes
          key={reverse ? "signup" : "login"}
          initial={{
            opacity: 0,
            x: reverse ? -40 : 40, // If signup, slide from right. If login, slide from left.
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* FORM SIDE */}
          <div
            className={`
            flex flex-col justify-center p-6 md:p-16 py-10 backdrop-blur-xl 
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
              <div className="absolute inset-0 bg-secondary-foreground/50 rounded-full blur-3xl" />
              <img
                src="login.jpeg"
                alt="hyperion"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-secondary-foreground"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
