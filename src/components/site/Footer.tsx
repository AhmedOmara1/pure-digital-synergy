import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useTheme } from "@/components/theme-provider";
import {
  MotionItem,
  MotionReveal,
  MotionStagger,
  premiumSpring,
} from "@/components/site/MotionReveal";
import { socialLinks } from "@/lib/social-links";
import logoDark from "@/assets/logo.png";
import logoLight from "@/assets/logo-dark.png";

export function Footer() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const logo = theme === "dark" ? logoDark : logoLight;

  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-navy-deep">
      <div aria-hidden className="footer-glow" />
      <MotionReveal
        variant="softScale"
        className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <MotionStagger className="grid gap-10 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          <MotionItem>
            <div className="flex items-center overflow-visible">
              <img
                src={logo}
                alt="Pure Digital"
                className="my-[-32px] h-32 w-auto"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{t.footer.tagline}</p>
          </MotionItem>

          <MotionItem>
            <h4 className="text-sm font-semibold">{t.footer.quickLinks}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" preload="intent" className="footer-link">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/about" preload="intent" className="footer-link">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/services" preload="intent" className="footer-link">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" preload="intent" className="footer-link">
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link to="/contact" preload="intent" className="footer-link">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </MotionItem>

          <MotionItem>
            <h4 className="text-sm font-semibold">{t.footer.services}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {t.servicesPage.list.map((s) => (
                <li key={s.title} className="transition-colors duration-300 hover:text-foreground">
                  {s.title}
                </li>
              ))}
            </ul>
          </MotionItem>

          <MotionItem>
            <h4 className="text-sm font-semibold">{t.footer.follow}</h4>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: socialLinks.instagram },
                { icon: Linkedin, label: "LinkedIn", href: null },
                { icon: MessageCircle, label: "WhatsApp", href: socialLinks.whatsapp },
              ].map(({ icon: Icon, label, href }) => {
                const Comp = href ? motion.a : motion.span;
                return (
                  <Comp
                    key={label}
                    href={href ?? undefined}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={premiumSpring}
                    className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary-glow"
                  >
                    <Icon className="h-4 w-4" />
                  </Comp>
                );
              })}
            </div>
          </MotionItem>
        </MotionStagger>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Pure Digital. {t.footer.rights}</p>
          <div className="flex gap-4">
            <a href="#" className="footer-link">
              {t.footer.privacy}
            </a>
            <a href="#" className="footer-link">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </MotionReveal>
    </footer>
  );
}
