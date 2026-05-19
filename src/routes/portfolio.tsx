import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MotionReveal } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Pure Digital" },
      { name: "description", content: "A selection of websites, brands, videos, and ad campaigns we've shipped." },
      { property: "og:title", content: "Portfolio — Pure Digital" },
      { property: "og:description", content: "Websites, brands, videos, and campaigns built by Pure Digital." },
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
    desc: { en: "Full visual identity, menu, and storefront refresh.", ar: "هوية بصرية كاملة، قائمة طعام، وتجديد الواجهة." },
    tags: ["Branding", "Print"],
    result: { en: "+40% reservations in 30 days", ar: "+40% حجوزات خلال 30 يومًا" },
    gradient: "from-pink-500 to-orange-500",
  },
  {
    id: "mansouri",
    category: "websites",
    name: { en: "Mansouri Boutique", ar: "بوتيك المنصوري" },
    desc: { en: "Shopify e-commerce build with bilingual checkout.", ar: "متجر Shopify مع دفع ثنائي اللغة." },
    tags: ["E-commerce", "Shopify"],
    result: { en: "Paid back in 6 weeks", ar: "غطّى تكلفته خلال 6 أسابيع" },
    gradient: "from-purple-500 to-blue-500",
  },
  {
    id: "shamsi-ads",
    category: "ads",
    name: { en: "Shamsi Group Campaign", ar: "حملة مجموعة الشامسي" },
    desc: { en: "Meta + Google Ads campaign for lead generation.", ar: "حملة ميتا وجوجل لتوليد العملاء المحتملين." },
    tags: ["Meta Ads", "Google Ads"],
    result: { en: "−38% cost per lead", ar: "−38% تكلفة العميل المحتمل" },
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "nakheel",
    category: "video",
    name: { en: "Nakheel Promo Reel", ar: "ريل ترويجي نخيل" },
    desc: { en: "60-second cinematic reel with motion graphics.", ar: "ريل سينمائي 60 ثانية مع موشن جرافيك." },
    tags: ["Video", "Motion"],
    result: { en: "1.2M views in 2 weeks", ar: "1.2 مليون مشاهدة خلال أسبوعين" },
    gradient: "from-amber-500 to-red-500",
  },
  {
    id: "atlas-web",
    category: "websites",
    name: { en: "Atlas Consultancy", ar: "أطلس للاستشارات" },
    desc: { en: "Corporate website with bilingual blog and CMS.", ar: "موقع مؤسسي مع مدونة ثنائية اللغة." },
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

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const filters = [
    { value: "all", label: t.portfolio.filters.all },
    { value: "websites", label: t.portfolio.filters.websites },
    { value: "branding", label: t.portfolio.filters.branding },
    { value: "video", label: t.portfolio.filters.video },
    { value: "ads", label: t.portfolio.filters.ads },
    { value: "content", label: t.portfolio.filters.content },
  ] as const;

  return (
    <>
      <section className="hero-radial py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">{t.portfolio.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.portfolio.sub}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Category | "all")}>
            <TabsList className="mx-auto flex h-auto flex-wrap justify-center gap-1 bg-card/60">
              {filters.map((f) => (
                <TabsTrigger key={f.value} value={f.value} className="data-[state=active]:gradient-bg data-[state=active]:text-white">
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Dialog key={p.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer overflow-hidden border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:glow-shadow">
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="px-6 text-center font-display text-2xl font-bold text-white drop-shadow-lg">
                          {p.name[lang]}
                        </p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold">{p.name[lang]}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.desc[lang]}</p>
                      <div className="mt-3 flex items-center gap-2 text-sm text-primary-glow">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">{p.result[lang]}</span>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <div className={`aspect-video rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                    <p className="px-6 text-center font-display text-3xl font-bold text-white drop-shadow-lg">{p.name[lang]}</p>
                  </div>
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl">{p.name[lang]}</DialogTitle>
                    <DialogDescription className="text-base">{p.desc[lang]}</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="rounded-lg border border-border/60 bg-navy-deep p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{t.portfolio.result}</p>
                    <p className="mt-1 font-display text-lg font-bold gradient-text">{p.result[lang]}</p>
                  </div>
                  <Link to="/contact">
                    <Button className="w-full gradient-bg border-0">{t.portfolio.cta}</Button>
                  </Link>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
