import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu, X, Languages, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageProvider";
import { useTheme } from "@/components/theme-provider";
import logoDark from "@/assets/logo.png";
import logoLight from "@/assets/logo-dark.png";
import { cn } from "@/lib/utils";
import { premiumEase } from "@/components/site/MotionReveal";

export function Navbar() {
  const { t, lang, toggle } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const logo = theme === "dark" ? logoDark : logoLight;

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },

    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/testimonials", label: t.nav.testimonials },
    { to: "/faq", label: t.nav.faq },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 16));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-500",
        scrolled
          ? "border-border/60 bg-background/70 shadow-[0_18px_60px_-38px_color-mix(in_oklab,var(--primary)_45%,transparent)] backdrop-blur-2xl"
          : "border-transparent bg-background/35 backdrop-blur-md",
      )}
      initial={reduce ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: premiumEase }}
    >
      <motion.div
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        animate={{ height: scrolled ? 58 : 68 }}
        transition={{ duration: 0.35, ease: premiumEase }}
      >
        <Link
          to="/"
          className="group flex items-center overflow-visible"
          aria-label="Pure Digital home"
        >
          <motion.img
            src={logo}
            alt="Pure Digital"
            className="my-[-30px] h-28 w-auto sm:my-[-40px] sm:h-32"
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.35, ease: premiumEase }}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              preload="intent"
              className={cn(
                "nav-link-premium relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(l.to) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              activeOptions={{ exact: l.to === "/" }}
            >
              {isActive(l.to) && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-md bg-accent/75"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="group"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.22, ease: premiumEase }}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </Button>
          <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5">
            <Languages className="h-4 w-4" />
            {lang === "en" ? "AR" : "EN"}
          </Button>
          <Link to="/contact" className="hidden sm:block">
            <Button size="sm" className="gradient-bg border-0 shine-btn">
              {t.nav.cta}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 20, scale: 0.85 }}
                transition={{ duration: 0.22, ease: premiumEase }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-border/50 bg-background/90 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: premiumEase }}
          >
            <motion.nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.045 } },
              }}
            >
              {links.map((l) => (
                <motion.div
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={l.to}
                    preload="intent"
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(l.to)
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                    )}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full gradient-bg border-0 shine-btn">{t.nav.cta}</Button>
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
