import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { User, Star, Zap, ShieldCheck, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pure Digital" },
      { name: "description", content: "A UAE-based team combining design, technology, and marketing under one accountable partner." },
      { property: "og:title", content: "About — Pure Digital" },
      { property: "og:description", content: "A UAE-based team combining design, technology, and marketing under one accountable partner." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const valueIcons = [Star, Zap, Eye, ShieldCheck];

function About() {
  const { t } = useI18n();

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero-radial py-20 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.h1
            className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.about.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.about.sub}
          </motion.p>
        </div>
      </section>

      {/* ── Story + Visual ───────────────────────── */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          {/* Text slides in from left */}
          <MotionReveal variant="left" duration={0.8}>
            <p className="text-sm font-medium uppercase tracking-wider text-primary-glow">{t.about.storyTitle}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.about.storyTitle}</h2>
            <MotionStagger className="mt-6 space-y-4" stagger={0.1}>
              {t.about.storyPoints.map((p, i) => (
                <MotionItem key={i} variant="left">
                  <div className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full gradient-bg" />
                    <span>{p}</span>
                  </div>
                </MotionItem>
              ))}
            </MotionStagger>
          </MotionReveal>

          {/* Visual card slides in from right */}
          <MotionReveal variant="right" delay={0.15} duration={0.8}>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="hero-radial absolute inset-0 opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="px-6 text-center"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-3xl font-bold leading-tight gradient-text sm:text-4xl md:text-5xl">
                    {t.about.sub}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </MotionReveal>
        </div>
      </section>

      {/* ── Values ───────────────────────────────── */}
      <section className="border-t border-border/50 bg-card/30 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <MotionReveal variant="up">
            <SectionHeading title={t.about.valuesTitle} />
          </MotionReveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => {
              // alternate: 0=left, 1=right, 2=left, 3=right
              const dir = i % 2 === 0 ? "left" : "right";
              const Icon = valueIcons[i];
              return (
                <MotionReveal key={v.title} variant={dir} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <Card className="glow-border-card h-full border-border/60 bg-card p-6 hover:border-primary/40">
                      <motion.div
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow"
                        initial={{ scale: 0, rotate: -15 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + i * 0.06 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                    </Card>
                  </motion.div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────── */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <MotionReveal variant="up">
            <SectionHeading title={t.about.teamTitle} />
          </MotionReveal>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {t.about.team.map((m, i) => (
              <MotionItem key={m.role} variant={i === 1 ? "up" : i === 0 ? "left" : "right"}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <Card className="glow-border-card border-border/60 bg-card p-6 text-center hover:border-primary/40">
                    <motion.div
                      className="mx-auto flex h-24 w-24 items-center justify-center rounded-full gradient-bg"
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <User className="h-10 w-10 text-white" />
                    </motion.div>
                    <p className="mt-5 font-display text-lg font-semibold text-primary-glow">{m.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                  </Card>
                </motion.div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>
    </>
  );
}
