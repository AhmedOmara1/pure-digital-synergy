import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      <section className="hero-radial py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">{t.faq.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.faq.sub}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border/60 bg-card px-5">
                <AccordionTrigger className="text-start font-display text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
