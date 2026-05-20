import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useLocation, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

const routeVariants: Record<string, Variants> = {
  default: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -32 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
};

function variantFor(pathname: string): Variants {
  if (pathname === "/") return routeVariants.scale;
  if (pathname.startsWith("/portfolio")) return routeVariants.slide;
  if (pathname.startsWith("/contact") || pathname.startsWith("/faq")) return routeVariants.fade;
  return routeVariants.default;
}

function RouteProgress() {
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-primary-glow to-purple-accent"
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 0.85, opacity: 1, transition: { duration: 1.6, ease: "easeOut" } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.3 } }}
        />
      )}
    </AnimatePresence>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const location = useLocation();
  const variants = variantFor(location.pathname);

  if (reduce) {
    return (
      <>
        <RouteProgress />
        {children}
      </>
    );
  }

  return (
    <>
      <RouteProgress />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
