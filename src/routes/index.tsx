import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Palette, Film, Megaphone, PenLine, Zap, Target, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/LanguageProvider";

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
  const serviceLabels = [
    t.servicesPage.list[0].title,
    t.servicesPage.list[1].title,
    t.servicesPage.list[2].title,
    t.servicesPage.list[3].title,
    t.servicesPage.list[4].title,
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-radial relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
              UAE · Bilingual AR / EN
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="gradient-text">{t.home.heroTitle}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{t.home.heroSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact">
                <Button size="lg" className="gradient-bg border-0 glow-shadow">
                  {t.home.ctaPrimary}
                  <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline">{t.home.ctaSecondary}</Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {t.home.stats.map((s) => (
              <Card key={s.label} className="border-border/60 bg-card/40 p-5 text-center backdrop-blur">
                <p className="font-display text-2xl font-bold gradient-text sm:text-3xl">{s.num}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-y border-border/50 bg-card/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.servicesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.servicesSub}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serviceLabels.map((label, i) => {
              const Icon = serviceIcons[i];
              return (
                <Link key={label} to="/services" className="group">
                  <Card className="h-full border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:glow-shadow">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-bg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-snug">{label}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.whyTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.whySub}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.why.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <Card key={w.title} className="border-border/60 bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-t border-border/50 bg-navy-deep py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{t.contact.ctaBanner}</h3>
          <p className="mt-2 text-muted-foreground">{t.contact.ctaBannerSub}</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gradient-bg border-0">{t.home.ctaPrimary}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
