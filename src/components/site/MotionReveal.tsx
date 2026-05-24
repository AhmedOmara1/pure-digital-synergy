import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Variant =
  | "up"
  | "fade"
  | "scale"
  | "left"
  | "right"
  | "blur"
  | "softScale"
  | "slideRight"
  | "slideDown"
  | "slideLeft"
  | "slideUp";

export const premiumEase = [0.22, 1, 0.36, 1] as const;
export const premiumSpring: Transition = { type: "spring", stiffness: 260, damping: 28, mass: 0.8 };

export const containerReveal: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const buildVariants = (variant: Variant): Variants => {
  const base: Record<Variant, Variants> = {
    up: {
      hidden: { opacity: 0, y: 26 },
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
    blur: {
      hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    softScale: {
      hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" },
      show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    },
    slideRight: {
      hidden: { opacity: 0, x: -48 },
      show: { opacity: 1, x: 0 },
    },
    slideDown: {
      hidden: { opacity: 0, y: -48 },
      show: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 48 },
      show: { opacity: 1, x: 0 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 48 },
      show: { opacity: 1, y: 0 },
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
      transition={{ duration, delay, ease: premiumEase }}
      variants={buildVariants(variant)}
      style={{ willChange: reduce ? undefined : "transform, opacity" }}
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
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, amount: 0.1, margin: "0px 0px 150px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
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
  delay = 0,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  duration?: number;
  delay?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, amount: 0.15, margin: "0px 0px 120px 0px" }}
      variants={buildVariants(variant)}
      transition={{ duration, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}


export function HeroKicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={wordReveal}
      transition={{ duration: 0.65, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}

export function SplitTextReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className="inline"
      variants={containerReveal}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          aria-hidden
          className={`inline-block ${className ?? ""}`}
          key={`${word}-${index}`}
          variants={wordReveal}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
