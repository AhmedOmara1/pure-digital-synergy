import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Pure Digital" },
      { name: "description", content: "Websites, branding, video, paid ads, and social — end-to-end digital execution under one roof." },
      { property: "og:title", content: "Services — Pure Digital" },
      { property: "og:description", content: "End-to-end digital execution: websites, branding, video, ads, and content." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  const { t } = useI18n();
  return (
    <>
      {/* ── Hero ─────────────────────────── */}
      <section className="hero-radial py-20 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.h1
            className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.servicesPage.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.servicesPage.sub}
          </motion.p>
        </div>
      </section>

      {/* ── Services list ────────────────── */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto max-w-5xl space-y-8 px-4 sm:space-y-12 sm:px-6">
          {t.servicesPage.list.map((s, i) => {
            // Odd cards from left, even from right — visually exciting alternation
            const dir = i % 2 === 0 ? "left" : "right";
            return (
              <MotionReveal key={s.title} variant={dir} delay={0.05} duration={0.75}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.008 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <Card className="glow-border-card overflow-hidden border-border/60 bg-card transition-colors hover:border-primary/40">
                    <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1fr,1.2fr] lg:gap-10">
                      {/* Left col — number + title + desc + CTA */}
                      <div>
                        <motion.p
                          className="font-display text-5xl font-bold gradient-text"
                          initial={{ opacity: 0, x: dir === "left" ? -24 : 24 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          0{i + 1}
                        </motion.p>
                        <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
                        <p className="mt-2 font-display text-base font-medium text-primary-glow sm:text-lg">{s.tagline}</p>
                        <p className="mt-4 text-muted-foreground">{s.desc}</p>
                        <Link to="/contact" className="mt-6 inline-block">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <Button className="gradient-bg border-0 shine-btn">{t.nav.cta}</Button>
                          </motion.div>
                        </Link>
                      </div>

                      {/* Right col — includes list, items drop in from top */}
                      <div className="rounded-xl border border-border/60 bg-navy-deep p-6">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Includes</p>
                        <MotionStagger className="mt-4 space-y-3" stagger={0.05}>
                          {s.includes.map((item) => (
                            <MotionItem key={item} variant="up">
                              <div className="flex items-start gap-3 text-sm">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ type: "spring", stiffness: 300, damping: 16 }}
                                >
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-glow" />
                                </motion.div>
                                <span>{item}</span>
                              </div>
                            </MotionItem>
                          ))}
                        </MotionStagger>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </MotionReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
