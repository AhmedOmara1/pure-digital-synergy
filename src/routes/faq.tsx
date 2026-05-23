import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/faq")({
  head: ({}) => ({
    meta: [
      { title: "FAQ — Pure Digital" },
      { name: "description", content: "Answers to common questions about timelines, revisions, payment, and our satisfaction guarantee." },
      { property: "og:title", content: "FAQ — Pure Digital" },
      { property: "og:description", content: "Common questions answered." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How long does a website take?", acceptedAnswer: { "@type": "Answer", text: "7 days for basic, 14–21 days for advanced." } },
          { "@type": "Question", name: "Are revisions included after delivery?", acceptedAnswer: { "@type": "Answer", text: "Unlimited during the project and 30 days of free support after launch." } },
        ],
      }),
    }],
  }),
  component: FAQ,
});

function FAQ() {
  const { t } = useI18n();
  return (
    <>
      <section className="hero-radial py-20 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.h1
            className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.faq.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.faq.sub}
          </motion.p>
        </div>
      </section>

      <section className="py-20 overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.items.map((item, i) => {
              const dir = i % 2 === 0 ? "left" : "right";
              return (
                <MotionReveal key={i} variant={dir} delay={i * 0.05} duration={0.6}>
                  <AccordionItem value={`item-${i}`} className="glow-border-card rounded-xl border border-border/60 bg-card px-5 transition-colors hover:border-primary/40">
                    <AccordionTrigger className="text-start font-display text-base font-semibold hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                </MotionReveal>
              );
            })}
          </Accordion>
        </div>
      </section>
    </>
  );
}
