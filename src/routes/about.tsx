import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { User } from "lucide-react";

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

function About() {
  const { t } = useI18n();
  return (
    <>
      <section className="hero-radial py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">{t.about.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.about.sub}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <MotionReveal variant="left">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-glow">{t.about.storyTitle}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.about.storyTitle}</h2>
            <MotionStagger className="mt-6 space-y-4" stagger={0.07}>
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
          <MotionReveal variant="right" delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card">
              <div className="hero-radial absolute inset-0 opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 text-center">
                  <p className="font-display text-3xl font-bold leading-tight gradient-text sm:text-4xl md:text-5xl">{t.about.sub}</p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <MotionReveal>
            <SectionHeading title={t.about.valuesTitle} />
          </MotionReveal>
          <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {t.about.values.map((v) => (
              <MotionItem key={v.title}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                  <Card className="h-full border-border/60 bg-card p-6 hover:border-primary/40">
                    <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                  </Card>
                </motion.div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <MotionReveal>
            <SectionHeading title={t.about.teamTitle} />
          </MotionReveal>
          <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {t.about.team.map((m) => (
              <MotionItem key={m.role} variant="scale">
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
                  <Card className="border-border/60 bg-card p-6 text-center hover:border-primary/40">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full gradient-bg">
                      <User className="h-10 w-10 text-white" />
                    </div>
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
