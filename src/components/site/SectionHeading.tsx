import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, sub, center = true }: { eyebrow?: ReactNode; title: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary-glow">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}
