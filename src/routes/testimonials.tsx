import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";
import { Star, User } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Pure Digital" },
      { name: "description", content: "Real words from real clients across the UAE and beyond." },
      { property: "og:title", content: "Testimonials — Pure Digital" },
      { property: "og:description", content: "What our clients say about working with Pure Digital." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: Testimonials,
});

function Testimonials() {
  const { t } = useI18n();
  return (
    <>
      <section className="hero-radial py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">{t.testimonials.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.testimonials.sub}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Carousel className="w-full">
            <CarouselContent>
              {t.testimonials.items.map((item) => (
                <CarouselItem key={item.name}>
                  <Card className="border-border/60 bg-card p-8 sm:p-12 text-center">
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary-glow text-primary-glow" />
                      ))}
                    </div>
                    <p className="mt-6 font-display text-xl leading-relaxed sm:text-2xl">"{item.text}"</p>
                    <div className="mt-8 flex flex-col items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-bg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.testimonials.trusted}</p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {["Bloom", "Mansouri", "Shamsi", "Nakheel", "Atlas", "Noor"].map((b) => (
              <div key={b} className="flex h-16 items-center justify-center rounded-lg border border-border/60 bg-card font-display text-lg font-bold text-muted-foreground">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
