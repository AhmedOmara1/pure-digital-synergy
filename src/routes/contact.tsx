import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, Mail, Instagram, Linkedin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pure Digital" },
      { name: "description", content: "Start your project with Pure Digital. Free consultation, no commitment. We reply within one business day." },
      { property: "og:title", content: "Contact — Pure Digital" },
      { property: "og:description", content: "Tell us about your project. Free consultation, no commitment." },
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
    { icon: Instagram, label: t.contact.instagram, value: "—", href: null },
    { icon: Linkedin, label: t.contact.linkedin, value: "—", href: null },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue, href: null },
  ];

  return (
    <>
      <section className="hero-radial py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">{t.contact.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.contact.sub}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr,1.4fr]">
          <div className="space-y-3">
            {info.map((i) => {
              const Icon = i.icon;
              const content = (
                <Card className="flex items-start gap-4 border-border/60 bg-card p-5 transition-colors hover:border-primary/50">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.label}</p>
                    <p className="mt-1 text-sm font-medium">{i.value}</p>
                  </div>
                </Card>
              );
              return i.href ? <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer">{content}</a> : <div key={i.label}>{content}</div>;
            })}
          </div>

          <Card className="border-border/60 bg-card p-6 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.form.name} *</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.contact.form.email} *</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.contact.form.phone}</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.contact.form.service} *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder={t.contact.form.servicePlaceholder} /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {t.contact.form.services.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="budget" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.contact.form.budget}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder={t.contact.form.budgetPlaceholder} /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {t.contact.form.budgets.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.form.message} *</FormLabel>
                    <FormControl><Textarea rows={5} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" size="lg" className="w-full gradient-bg border-0 glow-shadow">
                  {t.contact.form.submit}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>

      <section className="border-t border-border/50 bg-navy-deep py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{t.contact.ctaBanner}</h3>
          <p className="mt-2 text-muted-foreground">{t.contact.ctaBannerSub}</p>
        </div>
      </section>
    </>
  );
}
