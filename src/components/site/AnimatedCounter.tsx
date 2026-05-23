import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Parses a stat string like "55+", "90%", "32+" or "5"
 * into { value: number, suffix: string }
 */
function parseStat(str: string): { value: number; suffix: string } {
  const match = str.match(/^(\d+)([+%]?)$/);
  if (match) return { value: parseInt(match[1], 10), suffix: match[2] };
  return { value: 0, suffix: "" };
}

export function AnimatedCounter({ value: rawValue }: { value: string }) {
  const { value, suffix } = parseStat(rawValue);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18, mass: 1 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    // dir="ltr" forces number+suffix to always render visually as "55+" in both LTR and RTL layouts
    <span ref={ref} dir="ltr" className="inline-block tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
