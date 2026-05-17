import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import logo from "@/assets/logo.png";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/50 bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center">
              <img src={logo} alt="Pure Digital" className="h-32 w-auto" loading="lazy" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.quickLinks}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">{t.nav.home}</Link></li>
              <li><Link to="/about" className="hover:text-foreground">{t.nav.about}</Link></li>
              <li><Link to="/services" className="hover:text-foreground">{t.nav.services}</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground">{t.nav.portfolio}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.services}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {t.servicesPage.list.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.follow}</h4>
            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com/puredigital.ae" aria-label="Instagram" className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/puredigital" aria-label="LinkedIn" className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://wa.me/971000000000" aria-label="WhatsApp" className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">info@puredigital.ae</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Pure Digital. {t.footer.rights}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">{t.footer.privacy}</a>
            <a href="#" className="hover:text-foreground">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
