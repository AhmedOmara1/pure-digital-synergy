import { useI18n } from "@/i18n/LanguageProvider";

export function MarqueeBar() {
  const { t } = useI18n();
  const items = [
    ...t.home.servicesShort.map((s) => s.title),
    "Logo in 48 Hours",
    "Website in 7 Days",
    "Unlimited Revisions",
    "Bilingual EN / AR",
  ];

  // duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <div
      aria-hidden
      className="marquee-bar relative overflow-hidden border-y border-primary/30 bg-gradient-to-r from-primary via-purple-accent to-primary text-primary-foreground shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.6)]"
    >
      <div className="marquee-track flex w-max gap-10 py-3 px-6 font-display text-sm font-bold uppercase tracking-[0.18em] sm:text-base">
        {loop.map((label, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="whitespace-nowrap">{label}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
