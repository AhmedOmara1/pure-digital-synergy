import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageProvider";
import logo from "@/assets/logo.png";

export function Navbar() {
  const { t, lang, toggle } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/pricing", label: t.nav.pricing },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/testimonials", label: t.nav.testimonials },
    { to: "/faq", label: t.nav.faq },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center overflow-visible">
          <img src={logo} alt="Pure Digital" className="my-[-30px] h-28 w-auto sm:my-[-40px] sm:h-32" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-foreground bg-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5">
            <Languages className="h-4 w-4" />
            {lang === "en" ? "AR" : "EN"}
          </Button>
          <Link to="/contact" className="hidden sm:block">
            <Button size="sm" className="gradient-bg border-0">{t.nav.cta}</Button>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2.5 text-sm font-medium text-foreground bg-accent" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full gradient-bg border-0">{t.nav.cta}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
