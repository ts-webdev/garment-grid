
import { motion } from "framer-motion";

const variantsMap = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function AnimationContainer({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  once = true,
  className,
}) {
  return (
    <motion.div
      className={className}
      variants={variantsMap[variant]}
      initial="hidden"
      whileInView="visible"
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}
