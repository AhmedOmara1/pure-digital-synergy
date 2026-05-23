import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { Star, User, Pause, Play } from "lucide-react";

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
  const { t, dir } = useI18n();
  const reduce = useReducedMotion();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Autoplay
  useEffect(() => {
    if (!api || !playing || reduce) return;
    const id = window.setInterval(() => {
      if (!api.canScrollNext()) api.scrollTo(0);
      else api.scrollNext();
    }, 5000);
    return () => window.clearInterval(id);
  }, [api, playing, reduce]);

  const goTo = useCallback((i: number) => api?.scrollTo(i), [api]);

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
            {t.testimonials.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.testimonials.sub}
          </motion.p>
        </div>
      </section>

      <section className="py-20 overflow-hidden">
        <MotionReveal variant="up" duration={0.8}>
          <div
            className="mx-auto max-w-4xl px-4 sm:px-6"
            onMouseEnter={() => setPlaying(false)}
            onMouseLeave={() => setPlaying(true)}
          >
            <Carousel
              className="w-full"
              opts={{ loop: true, direction: dir, dragFree: false, align: "center" }}
              setApi={setApi}
            >
            <CarouselContent>
              {t.testimonials.items.map((item, i) => (
                <CarouselItem key={item.name}>
                  <AnimatePresence mode="wait">
                    {current === i && (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Card className="border-border/60 bg-card p-8 sm:p-12 text-center">
                          <div className="flex justify-center gap-1">
                            {Array.from({ length: 5 }).map((_, k) => (
                              <Star key={k} className="h-5 w-5 fill-primary-glow text-primary-glow" />
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
                      </motion.div>
                    )}
                    {current !== i && (
                      // placeholder to preserve slide height so Embla can measure
                      <div className="invisible">
                        <Card className="p-8 sm:p-12">
                          <p className="font-display text-xl sm:text-2xl">"{item.text}"</p>
                        </Card>
                      </div>
                    )}
                  </AnimatePresence>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause autoplay" : "Play autoplay"}
              className="rounded-full"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="group relative h-2 w-6 overflow-hidden rounded-full bg-border/60"
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full gradient-bg"
                    animate={{ width: current === i ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        </MotionReveal>
      </section>

      <section className="border-t border-border/50 bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <MotionReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.testimonials.trusted}</p>
          </MotionReveal>
          <MotionStagger className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
            {["Bloom", "Mansouri", "Shamsi", "Nakheel", "Atlas", "Noor"].map((b) => (
              <MotionItem key={b}>
                <div className="flex h-16 items-center justify-center rounded-lg border border-border/60 bg-card font-display text-lg font-bold text-muted-foreground transition-colors hover:text-foreground">
                  {b}
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>
    </>
  );
}
