import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Palette, Film, Megaphone, PenLine, Zap, Target, MessageSquare, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/LanguageProvider";
import { Particles } from "@/components/site/Particles";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/site/MotionReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Digital — We Build Your Digital Presence" },
      { name: "description", content: "Websites, branding, video, and paid ads engineered to grow and sell. UAE-based bilingual digital agency." },
      { property: "og:title", content: "Pure Digital — We Build Your Digital Presence" },
      { property: "og:description", content: "Websites, branding, video, and paid ads engineered to grow and sell." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const serviceIcons = [Globe, Palette, Film, Megaphone, PenLine];
const whyIcons = [Zap, Target, MessageSquare, ShieldCheck];

function Home() {
  const { t } = useI18n();
  const serviceShort = t.home.servicesShort;
  const reduce = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="hero-aurora relative overflow-hidden">
        <div aria-hidden className="aurora-blob aurora-blob-1" />
        <div aria-hidden className="aurora-blob aurora-blob-2" />
        <div aria-hidden className="aurora-blob aurora-blob-3" />
        <Particles color="rgba(140, 170, 255, 0.85)" />
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
            <motion.h1
              className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="gradient-text">{t.home.heroTitle}</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.home.heroSub}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/contact" preload="intent">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gradient-bg border-0 glow-shadow animate-glow-pulse">
                    {t.home.ctaPrimary}
                    <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/portfolio" preload="intent">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline">{t.home.ctaSecondary}</Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <MotionStagger className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.1} delayChildren={0.2}>
            {t.home.stats.map((s) => (
              <MotionItem key={s.label} variant="up">
                <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                  <Card className="border-border/60 bg-card/40 p-5 text-center backdrop-blur">
                    <p className="font-display text-2xl font-bold gradient-text sm:text-3xl">{s.num}</p>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                  </Card>
                </motion.div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-y border-border/50 bg-card/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionReveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.servicesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.servicesSub}</p>
          </MotionReveal>
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.09}>
            {serviceShort.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <MotionItem key={s.title} variant="up">
                  <Link to="/services" className="group block h-full">
                    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
                      <Card className="flex h-full flex-col items-center border-border/60 bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:glow-shadow">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg transition-transform group-hover:scale-110">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="mt-4 font-display text-base font-semibold leading-snug">{s.title}</p>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.tag}</p>
                      </Card>
                    </motion.div>
                  </Link>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionReveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.whyTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.whySub}</p>
          </MotionReveal>
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {t.home.why.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <MotionItem key={w.title} variant="up">
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                    <Card className="h-full border-border/60 bg-card p-6 hover:border-primary/40">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold">{w.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                    </Card>
                  </motion.div>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden border-t border-border/50 bg-navy-deep py-16">
        <Particles color="rgba(160, 130, 255, 0.7)" density={0.00008} linkDistance={110} />
        <MotionReveal variant="scale" className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{t.contact.ctaBanner}</h3>
          <p className="mt-2 text-muted-foreground">{t.contact.ctaBannerSub}</p>
          <Link to="/contact" className="mt-6 inline-block">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="gradient-bg border-0">{t.home.ctaPrimary}</Button>
            </motion.div>
          </Link>
        </MotionReveal>
      </section>
    </>
  );
}
