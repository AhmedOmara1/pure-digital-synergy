import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "up" | "fade" | "scale" | "left" | "right";

const buildVariants = (variant: Variant): Variants => {
  const base: Record<Variant, Variants> = {
    up: {
      hidden: { opacity: 0, y: 28 },
      show: { opacity: 1, y: 0 },
    },
    fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
    scale: {
      hidden: { opacity: 0, scale: 0.92 },
      show: { opacity: 1, scale: 1 },
    },
    left: {
      hidden: { opacity: 0, x: -32 },
      show: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 32 },
      show: { opacity: 1, x: 0 },
    },
  };
  return base[variant];
};

export function MotionReveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 0.7,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={buildVariants(variant)}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  variant = "up",
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={buildVariants(variant)}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
