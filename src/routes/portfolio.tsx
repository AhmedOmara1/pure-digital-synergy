import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MotionReveal } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { ExternalLink, Instagram, TrendingUp } from "lucide-react";
import { socialLinks } from "@/lib/social-links";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Pure Digital" },
      {
        name: "description",
        content: "A selection of websites, brands, videos, and ad campaigns we've shipped.",
      },
      { property: "og:title", content: "Portfolio — Pure Digital" },
      {
        property: "og:description",
        content: "Websites, brands, videos, and campaigns built by Pure Digital.",
      },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

type Category = "websites" | "branding" | "video" | "ads" | "content";

interface Project {
  id: string;
  category: Category;
  name: { en: string; ar: string };
  desc: { en: string; ar: string };
  tags: string[];
  result: { en: string; ar: string };
  gradient: string;
}

const projects: Project[] = [
  {
    id: "bloom",
    category: "branding",
    name: { en: "Bloom Restaurant", ar: "مطعم بلوم" },
    desc: {
      en: "Full visual identity, menu, and storefront refresh.",
      ar: "هوية بصرية كاملة، قائمة طعام، وتجديد الواجهة.",
    },
    tags: ["Branding", "Print"],
    result: { en: "+40% reservations in 30 days", ar: "+40% حجوزات خلال 30 يومًا" },
    gradient: "from-pink-500 to-orange-500",
  },
  {
    id: "mansouri",
    category: "websites",
    name: { en: "Mansouri Boutique", ar: "بوتيك المنصوري" },
    desc: {
      en: "Shopify e-commerce build with bilingual checkout.",
      ar: "متجر Shopify مع دفع ثنائي اللغة.",
    },
    tags: ["E-commerce", "Shopify"],
    result: { en: "Paid back in 6 weeks", ar: "غطّى تكلفته خلال 6 أسابيع" },
    gradient: "from-purple-500 to-blue-500",
  },
  {
    id: "shamsi-ads",
    category: "ads",
    name: { en: "Shamsi Group Campaign", ar: "حملة مجموعة الشامسي" },
    desc: {
      en: "Meta + Google Ads campaign for lead generation.",
      ar: "حملة ميتا وجوجل لتوليد العملاء المحتملين.",
    },
    tags: ["Meta Ads", "Google Ads"],
    result: { en: "−38% cost per lead", ar: "−38% تكلفة العميل المحتمل" },
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "nakheel",
    category: "video",
    name: { en: "Nakheel Promo Reel", ar: "ريل ترويجي نخيل" },
    desc: {
      en: "60-second cinematic reel with motion graphics.",
      ar: "ريل سينمائي 60 ثانية مع موشن جرافيك.",
    },
    tags: ["Video", "Motion"],
    result: { en: "1.2M views in 2 weeks", ar: "1.2 مليون مشاهدة خلال أسبوعين" },
    gradient: "from-amber-500 to-red-500",
  },
  {
    id: "atlas-web",
    category: "websites",
    name: { en: "Atlas Consultancy", ar: "أطلس للاستشارات" },
    desc: {
      en: "Corporate website with bilingual blog and CMS.",
      ar: "موقع مؤسسي مع مدونة ثنائية اللغة.",
    },
    tags: ["Website", "SEO"],
    result: { en: "PageSpeed 98/100", ar: "سرعة 98/100" },
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "noor-social",
    category: "content",
    name: { en: "Noor Beauty", ar: "نور بيوتي" },
    desc: { en: "Monthly content & community management.", ar: "محتوى شهري وإدارة مجتمع." },
    tags: ["Social", "Content"],
    result: { en: "+12K followers in 90 days", ar: "+12 ألف متابع خلال 90 يومًا" },
    gradient: "from-rose-500 to-fuchsia-500",
  },
];

function Portfolio() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const filters = [
    { value: "all", label: t.portfolio.filters.all },
    { value: "websites", label: t.portfolio.filters.websites },
    { value: "branding", label: t.portfolio.filters.branding },
    { value: "video", label: t.portfolio.filters.video },
    { value: "ads", label: t.portfolio.filters.ads },
    { value: "content", label: t.portfolio.filters.content },
  ] as const;

  const activeProject = projects.find((p) => p.id === activeId) ?? null;

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
            {t.portfolio.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.portfolio.sub}
          </motion.p>
          <motion.a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button className="gradient-bg border-0 shine-btn">
              <Instagram className="h-4 w-4" />
              {lang === "ar" ? "شاهد أعمالنا على إنستغرام" : "View Instagram Portfolio"}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </motion.a>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <LayoutGroup>
            <MotionReveal>
              <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-1.5 rounded-full border border-border/60 bg-card/60 p-1.5 backdrop-blur">
                {filters.map((f) => {
                  const active = filter === f.value;
                  return (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value as Category | "all")}
                      className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {active && (
                        <motion.span
                          layoutId="portfolio-filter-pill"
                          className="absolute inset-0 rounded-full gradient-bg"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${active ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {f.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </MotionReveal>

            <motion.div
              layout
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => {
                  const dir = i % 3 === 0 ? -24 : i % 3 === 1 ? 0 : 24;
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 24, x: dir, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.96 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -6 }}
                      onClick={() => setActiveId(p.id)}
                      className="cursor-pointer"
                    >
                      <Card className="glow-border-card group overflow-hidden border-border/60 bg-card transition-colors hover:border-primary/50 hover:glow-shadow">
                        <div
                          className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${p.gradient}`}
                        >
                          <motion.div
                            aria-hidden
                            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.38),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_45%)]"
                            whileHover={{ scale: 1.08, x: dir * -0.15 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/12" />
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            whileHover={{ y: -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 260, damping: 24 }}
                          >
                            <p className="px-6 text-center font-display text-2xl font-bold text-white drop-shadow-lg">
                              {p.name[lang]}
                            </p>
                          </motion.div>
                          <div className="absolute inset-x-5 bottom-5 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-center text-xs font-medium text-white backdrop-blur-md">
                              {p.result[lang]}
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex flex-wrap gap-2">
                            {p.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="mt-3 font-display text-lg font-semibold">
                            {p.name[lang]}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {p.desc[lang]}
                          </p>
                          <div className="mt-3 flex items-center gap-2 text-sm text-primary-glow">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-medium">{p.result[lang]}</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      <Dialog open={!!activeProject} onOpenChange={(o) => !o && setActiveId(null)}>
        <DialogContent className="max-w-2xl overflow-hidden p-0">
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 p-6"
              >
                <motion.div
                  initial={{ scale: 1.04, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`aspect-video rounded-lg bg-gradient-to-br ${activeProject.gradient} flex items-center justify-center`}
                >
                  <p className="px-6 text-center font-display text-3xl font-bold text-white drop-shadow-lg">
                    {activeProject.name[lang]}
                  </p>
                </motion.div>
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">
                    {activeProject.name[lang]}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {activeProject.desc[lang]}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="rounded-lg border border-border/60 bg-navy-deep p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t.portfolio.result}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold gradient-text">
                    {activeProject.result[lang]}
                  </p>
                </div>
                <Link to="/contact" onClick={() => setActiveId(null)}>
                  <Button className="w-full gradient-bg border-0">{t.portfolio.cta}</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
