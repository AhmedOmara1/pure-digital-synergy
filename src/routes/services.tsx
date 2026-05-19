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
      <section className="hero-radial py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">{t.servicesPage.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.servicesPage.sub}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl space-y-8 px-4 sm:space-y-12 sm:px-6">
          {t.servicesPage.list.map((s, i) => (
            <MotionReveal key={s.title} variant={i % 2 === 0 ? "left" : "right"} delay={0.05}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                <Card className="overflow-hidden border-border/60 bg-card transition-colors hover:border-primary/40">
                  <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1fr,1.2fr] lg:gap-10">
                    <div>
                      <p className="font-display text-5xl font-bold gradient-text">0{i + 1}</p>
                      <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
                      <p className="mt-2 font-display text-base font-medium text-primary-glow sm:text-lg">{s.tagline}</p>
                      <p className="mt-4 text-muted-foreground">{s.desc}</p>
                      <Link to="/contact" className="mt-6 inline-block">
                        <Button className="gradient-bg border-0">{t.nav.cta}</Button>
                      </Link>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-navy-deep p-6">
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Includes</p>
                      <MotionStagger className="mt-4 space-y-3" stagger={0.05}>
                        {s.includes.map((item) => (
                          <MotionItem key={item} variant="up">
                            <div className="flex items-start gap-3 text-sm">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-glow" />
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
          ))}
        </div>
      </section>
    </>
  );
}
