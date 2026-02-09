import { motion } from 'framer-motion';
export const Button = ({
  children = "One-Sided Raised",
  onClick,
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{
      boxShadow: "8px 8px 0px rgba(236, 72, 153, 0.4), 0px 0px 20px rgba(236, 72, 153, 0.3)",
      x: -2,
      y: -2,
    }}
    whileTap={{
      boxShadow: "2px 2px 0px rgba(236, 72, 153, 0.4)",
      x: 6,
      y: 6,
    }}
    style={{
      background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      color: "white",
      padding: "12px 24px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      border: "2px solid #be185d",
      boxShadow: "6px 6px 0px rgba(236, 72, 153, 0.3)",
      transition: "all 0.2s ease",
    }}
  >
    {children}
  </motion.button>
)
