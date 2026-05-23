import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-primary via-primary-glow to-purple-accent"
      style={{ scaleX }}
    />
  );
}

export function AmbientStage() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const driftA = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  if (reduce) return <div aria-hidden className="ambient-stage" />;

  return (
    <div aria-hidden className="ambient-stage">
      <motion.div className="ambient-light ambient-light-a" style={{ y: driftA }} />
      <motion.div className="ambient-light ambient-light-b" style={{ y: driftB }} />
      <div className="ambient-grid" />
    </div>
  );
}
