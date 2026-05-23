import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, Mail, Instagram, Linkedin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MotionReveal } from "@/components/site/MotionReveal";
import { useI18n } from "@/i18n/LanguageProvider";
import { socialLinks } from "@/lib/social-links";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pure Digital" },
      {
        name: "description",
        content:
          "Start your project with Pure Digital. Free consultation, no commitment. We reply within one business day.",
      },
      { property: "og:title", content: "Contact — Pure Digital" },
      {
        property: "og:description",
        content: "Tell us about your project. Free consultation, no commitment.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().min(1, "Required"),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

type FormValues = z.infer<typeof schema>;

function Contact() {
  const { t } = useI18n();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", service: "", budget: "", message: "" },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Contact form submission:", values);
    toast.success(t.contact.form.success);
    form.reset();
  };

  const info = [
    { icon: MessageCircle, label: t.contact.whatsapp, value: "—", href: null },
    { icon: Mail, label: t.contact.email, value: "—", href: null },
    {
      icon: Instagram,
      label: t.contact.instagram,
      value: "@pure.digital.company",
      href: socialLinks.instagram,
    },
    { icon: Linkedin, label: t.contact.linkedin, value: "—", href: null },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue, href: null },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero-radial py-20 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.h1
            className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.contact.sub}
          </motion.p>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────── */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr,1.4fr]">
          {/* Info cards — slide in from left, staggered */}
          <div className="space-y-3">
            {info.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <MotionReveal key={item.label} variant="left" delay={i * 0.07}>
                  <motion.div
                    whileHover={{ x: 6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <Card className="glow-border-card flex items-start gap-4 border-border/60 bg-card p-5 transition-colors hover:border-primary/50">
                      <motion.div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-glow"
                        initial={{ scale: 0, rotate: -15 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                          delay: 0.1 + i * 0.06,
                        }}
                        whileHover={{ scale: 1.25, rotate: 10 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-medium">{item.value}</p>
                      </div>
                    </Card>
                  </motion.div>
                </MotionReveal>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          {/* Form — slides in from right */}
          <MotionReveal variant="right" delay={0.1} duration={0.8}>
            <Card className="border-border/60 bg-card p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.contact.form.name} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.email} *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.phone}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.service} *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t.contact.form.servicePlaceholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {t.contact.form.services.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.budget}</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t.contact.form.budgetPlaceholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {t.contact.form.budgets.map((b) => (
                                <SelectItem key={b} value={b}>
                                  {b}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.contact.form.message} *</FormLabel>
                        <FormControl>
                          <Textarea rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-bg border-0 glow-shadow shine-btn"
                    >
                      {t.contact.form.submit}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </Card>
          </MotionReveal>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────── */}
      <section className="border-t border-border/50 bg-navy-deep py-16 overflow-hidden">
        <MotionReveal variant="scale" className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h3 className="animate-hue-shift font-display text-2xl font-bold sm:text-3xl gradient-text">
            {t.contact.ctaBanner}
          </h3>
          <p className="mt-2 text-muted-foreground">{t.contact.ctaBannerSub}</p>
        </MotionReveal>
      </section>
    </>
  );
}
