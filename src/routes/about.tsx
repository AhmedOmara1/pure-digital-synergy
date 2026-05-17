import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";
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
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary-glow">{t.about.storyTitle}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.about.storyTitle}</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.about.story1}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.about.story2}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card">
            <div className="hero-radial absolute inset-0 opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-6xl font-bold gradient-text">2026</p>
                <p className="mt-2 text-muted-foreground">Built in the UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title={t.about.valuesTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v) => (
              <Card key={v.title} className="border-border/60 bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title={t.about.teamTitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.team.map((m) => (
              <Card key={m.name} className="border-border/60 bg-card p-6 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full gradient-bg">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-primary-glow">{m.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
