import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Globe,
  Palette,
  Film,
  Megaphone,
  PenLine,
  Zap,
  Target,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/LanguageProvider";
import { Particles } from "@/components/site/Particles";
import {
  MotionReveal,
  MotionStagger,
  MotionItem,
  SplitTextReveal,
  premiumEase,
} from "@/components/site/MotionReveal";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { cn } from "@/lib/utils";
import { MarqueeBar } from "@/components/site/MarqueeBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Digital — We Build Your Digital Presence" },
      {
        name: "description",
        content:
          "Websites, branding, video, and paid ads engineered to grow and sell. UAE-based bilingual digital agency.",
      },
      { property: "og:title", content: "Pure Digital — We Build Your Digital Presence" },
      {
        property: "og:description",
        content: "Websites, branding, video, and paid ads engineered to grow and sell.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const serviceIcons = [Globe, Palette, Film, Megaphone, PenLine];
const whyIcons = [Zap, Target, MessageSquare, ShieldCheck];

/** 3-D tilt card — rotates on mouse move */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const [rot, setRot] = useState({ x: 0, y: 0 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn("h-full", className)}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientY - r.top) / r.height - 0.5) * -12;
        const y = ((e.clientX - r.left) / r.width - 0.5) * 12;
        setRot({ x, y });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const { t, lang } = useI18n();
  const serviceShort = t.home.servicesShort;
  const reduce = useReducedMotion();
  const isAr = lang === "ar";
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.5 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.5 });
  const heroX = useTransform(springX, [-1, 1], reduce ? ["0px", "0px"] : ["10px", "-10px"]);
  const heroY = useTransform(springY, [-1, 1], reduce ? ["0px", "0px"] : ["8px", "-8px"]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="hero-aurora relative overflow-hidden"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
          pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <motion.div
          aria-hidden
          className="aurora-blob aurora-blob-1"
          style={{ x: heroX, y: heroY }}
        />
        <motion.div
          aria-hidden
          className="aurora-blob aurora-blob-2"
          style={{ x: heroY, y: heroX }}
        />
        <motion.div aria-hidden className="aurora-blob aurora-blob-3" style={{ x: heroX }} />
        <Particles color="rgba(79, 70, 229, 0.55)" density={0.00018} linkDistance={140} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
          >
            {/* Floating badge */}
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-glow backdrop-blur animate-badge-entrance animate-float-bob"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: premiumEase }}
            >
              <span className="animate-lightning">
                <Zap className="h-3.5 w-3.5 text-yellow-400" />
              </span>
              {isAr ? "لوغو خلال 48 ساعة · موقع خلال 7 أيام" : "Logo in 48h · Website in 7 days"}
            </motion.div>

            {/* Hero title with shimmer */}
            <motion.h1
              className={cn(
                "hero-title mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
              )}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <SplitTextReveal text={t.home.heroTitle} className="gradient-text" />
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: premiumEase }}
            >
              {t.home.heroSub}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: premiumEase }}
            >
              <Link to="/contact" preload="intent">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="gradient-bg border-0 glow-shadow animate-glow-pulse shine-btn"
                  >
                    {t.home.ctaPrimary}
                    <motion.span
                      animate={{ x: isAr ? [-1, 1, -1] : [1, -1, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
              <Link to="/portfolio" preload="intent">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="shine-btn">
                    {t.home.ctaSecondary}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats — alternating directional entrance + count-up + glow border */}
          {(() => {
            return (
              <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
                {t.home.stats.map((s, i) => (
                  <MotionReveal key={s.label} variant="softScale" delay={i * 0.08} once={false}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="h-full"
                    >
                      <Card className="glow-border-card border-border/60 bg-card/40 p-5 text-center backdrop-blur h-full">
                        <p className="font-display text-2xl font-bold gradient-text sm:text-3xl tabular-nums">
                          <AnimatedCounter value={s.num} />
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                      </Card>
                    </motion.div>
                  </MotionReveal>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Marquee strip ────────────────────────────────── */}
      <MarqueeBar />

      {/* ── Services strip ───────────────────────────────── */}
      <section className="border-y border-border/50 bg-card/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionReveal className="mx-auto max-w-2xl text-center" once={false}>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.servicesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.servicesSub}</p>
          </MotionReveal>
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.09} once={false}>
            {serviceShort.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <MotionItem key={s.title} variant="softScale" delay={i * 0.1}>
                  <Link to="/services" className="group block h-full">
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="h-full"
                    >
                      <Card className="glow-border-card flex h-full flex-col items-center border-border/60 bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:glow-shadow">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg"
                          whileHover={{ rotate: 360, scale: 1.15 }}
                          transition={{ duration: 0.55, ease: "easeInOut" }}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <p className="mt-4 font-display text-base font-semibold leading-snug">
                          {s.title}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {s.tag}
                        </p>
                      </Card>
                    </motion.div>
                  </Link>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionReveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.whyTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.whySub}</p>
          </MotionReveal>
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1} once={false}>
            {t.home.why.map((w, i) => {
              const Icon = whyIcons[i];
              const isZap = i === 0;
              return (
                <MotionItem key={w.title} variant="softScale" delay={i * 0.1}>
                  <TiltCard>
                    <Card className="glow-border-card h-full border-border/60 bg-card p-6 hover:border-primary/40">
                      {/* Animated icon entrance */}
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary-glow"
                        initial={reduce ? false : { scale: 0, rotate: -12, opacity: 0 }}
                        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                          delay: 0.1 + i * 0.08,
                        }}
                        whileHover={{ scale: 1.2, rotate: isZap ? 15 : 5 }}
                      >
                        <Icon className={cn("h-6 w-6", isZap && "animate-lightning")} />
                      </motion.div>
                      <h3 className="mt-5 font-display text-lg font-semibold">{w.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                    </Card>
                  </TiltCard>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border/50 bg-navy-deep py-16">
        <Particles color="rgba(160, 130, 255, 0.7)" density={0.00008} linkDistance={110} />
        <MotionReveal
          variant="scale"
          className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        >
          <h3 className="animate-hue-shift font-display text-2xl font-bold sm:text-3xl gradient-text">
            {t.contact.ctaBanner}
          </h3>
          <p className="mt-2 text-muted-foreground">{t.contact.ctaBannerSub}</p>
          <Link to="/contact" className="mt-6 inline-block">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="gradient-bg border-0 shine-btn">
                {t.home.ctaPrimary}
              </Button>
            </motion.div>
          </Link>
        </MotionReveal>
      </section>
    </>
  );
}
