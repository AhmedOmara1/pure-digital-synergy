import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Pure Digital" },
      { name: "description", content: "Transparent packages for websites, branding, ads and social media. UAE-based digital agency. All prices in AED." },
      { property: "og:title", content: "Pricing — Pure Digital" },
      { property: "og:description", content: "Transparent packages with no hidden fees. Starter, Growth, and Premium plans." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

function Pricing() {
  const { t } = useI18n();
  return (
    <>
      <section className="hero-radial py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">{t.pricing.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.pricing.sub}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {t.pricing.packages.map((p) => {
              const highlight = "highlight" in p && p.highlight;
              return (
                <Card
                  key={p.name}
                  className={`relative flex flex-col border-border/60 bg-card p-8 transition-all ${
                    highlight ? "border-primary/60 glow-shadow lg:-translate-y-4 lg:scale-105" : "hover:border-primary/40"
                  }`}
                >
                  {highlight && (
                    <Badge className="absolute -top-3 start-1/2 -translate-x-1/2 gradient-bg border-0 text-white">
                      <Sparkles className="me-1 h-3 w-3" />
                      {t.pricing.popular}
                    </Badge>
                  )}
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold gradient-text">{p.price}</span>
                    <span className="text-sm text-muted-foreground">AED</span>
                  </div>
                  <ul className="mt-8 space-y-3 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-glow" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="mt-8 block">
                    <Button
                      size="lg"
                      className={`w-full border-0 ${highlight ? "gradient-bg glow-shadow" : ""}`}
                      variant={highlight ? "default" : "outline"}
                    >
                      {t.pricing.ctaLabel}
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
          <p className="mt-10 text-center text-xs text-muted-foreground">{t.pricing.note}</p>
        </div>
      </section>

      <section className="border-t border-border/50 bg-navy-deep py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{t.contact.ctaBanner}</h3>
          <p className="mt-2 text-muted-foreground">{t.contact.ctaBannerSub}</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gradient-bg border-0">{t.nav.cta}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
