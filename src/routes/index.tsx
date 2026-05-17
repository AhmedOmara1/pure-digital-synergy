import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Palette, Film, Megaphone, PenLine, Zap, Target, MessageSquare, ShieldCheck, Search, Layers, Code2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/LanguageProvider";
import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

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
const processIcons = [Search, Layers, Code2, Rocket];

function Reveal({
  children,
  className,
  delay,
  as: As = "div",
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 100 | 200 | 300 | 400 | 500;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3";
  variant?: "up" | "scale";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const base = variant === "scale" ? "reveal-scale" : "reveal";
  const delayCls = delay ? `delay-${delay}` : "";
  const Tag = As as any;
  return (
    <Tag ref={ref} className={cn(base, delayCls, inView && "is-in", className)}>
      {children}
    </Tag>
  );
}

// Parses "55+", "+32", "90%", "5" → { prefix, number, suffix }
function parseStat(raw: string): { prefix: string; number: number | null; suffix: string } {
  const m = raw.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!m) return { prefix: raw, number: null, suffix: "" };
  return { prefix: m[1], number: Number(m[2]), suffix: m[3] };
}

function StatNumber({ raw }: { raw: string }) {
  const { ref, inView } = useInView<HTMLParagraphElement>();
  const { prefix, number, suffix } = parseStat(raw);
  const value = useCountUp(number ?? 0, inView);
  return (
    <p ref={ref} className="font-display text-2xl font-bold gradient-text sm:text-3xl">
      {number === null ? raw : `${prefix}${value}${suffix}`}
    </p>
  );
}

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
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
              <span className="gradient-text">{t.home.heroTitle}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              {t.home.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Link to="/contact">
                <Button size="lg" className="gradient-bg border-0 glow-shadow animate-glow-pulse">
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
            {t.home.stats.map((s, i) => (
              <Reveal key={s.label} delay={((i + 1) * 100) as 100 | 200 | 300 | 400}>
                <Card className="border-border/60 bg-card/40 p-5 text-center backdrop-blur transition-transform hover:-translate-y-1">
                  <StatNumber raw={s.num} />
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-y border-border/50 bg-card/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.servicesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.servicesSub}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serviceLabels.map((label, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={label} delay={((i + 1) * 100) as 100 | 200 | 300 | 400 | 500}>
                  <Link to="/services" className="group block">
                    <Card className="h-full border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:glow-shadow">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-bg transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="mt-4 text-sm font-semibold leading-snug">{label}</p>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.whyTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.whySub}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.why.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <Reveal key={w.title} delay={((i + 1) * 100) as 100 | 200 | 300 | 400}>
                  <Card className="h-full border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">{w.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process / Timeline */}
      <section className="border-t border-border/50 bg-card/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.processTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.processSub}</p>
          </Reveal>

          <div className="relative mt-14">
            {/* connecting line — desktop */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block"
              style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 45%, transparent), transparent)" }}
            />
            <div className="grid gap-10 md:grid-cols-4 md:gap-6">
              {t.home.process.map((step, i) => {
                const Icon = processIcons[i];
                return (
                  <Reveal key={step.title} delay={((i + 1) * 100) as 100 | 200 | 300 | 400} className="relative text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-bg glow-shadow ring-4 ring-background">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="mt-3 text-xs font-semibold tracking-widest text-primary-glow">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{step.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.featuredTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.home.featuredSub}</p>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-glow hover:underline">
              {t.home.featuredViewAll}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.home.featured.map((item, i) => (
              <Reveal key={item.title} delay={((i + 1) * 100) as 100 | 200 | 300}>
                <Link to="/portfolio" className="group block">
                  <Card className="overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:glow-shadow">
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 gradient-bg opacity-90 transition-transform duration-500 group-hover:scale-110" />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(ellipse at top right, color-mix(in oklab, var(--purple-accent) 60%, transparent), transparent 70%)" }}
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur rtl:left-auto rtl:right-3">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold leading-snug">{item.title}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-xs font-medium text-primary-glow">
                          {item.tag}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-t border-border/50 bg-navy-deep py-16">
        <Reveal variant="scale" className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{t.contact.ctaBanner}</h3>
          <p className="mt-2 text-muted-foreground">{t.contact.ctaBannerSub}</p>
          <Link to="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gradient-bg border-0">{t.home.ctaPrimary}</Button>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
