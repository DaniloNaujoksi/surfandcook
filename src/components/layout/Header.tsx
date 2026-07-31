"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { href: "/courses", key: "courses" },
  { href: "/kitchen", key: "kitchen" },
  { href: "/stay", key: "stay" },
  { href: "/about", key: "about" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Only the home page puts the header over a photo; everywhere else it starts
  // on a light surface and must be dark from the first pixel.
  const overHero = pathname === "/";
  const solid = scrolled || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          solid ? "border-b border-sand-warm bg-shell/95 backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className={clsx(
              "font-display text-lg font-semibold tracking-tight transition-colors",
              solid ? "text-ink" : "text-white",
            )}
          >
            {tCommon("brand")}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "label transition-opacity hover:opacity-100",
                  solid ? "text-ink" : "text-white",
                  pathname === item.href ? "opacity-100" : "opacity-70",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <LanguageSwitcher onSurface={solid ? "light" : "dark"} />

            <Link
              href="/contact"
              className={clsx(
                "label hidden rounded-full px-5 py-2.5 transition-colors md:inline-flex",
                solid ? "bg-coral text-white hover:bg-sea" : "bg-white/90 text-ink hover:bg-white",
              )}
            >
              {t("contact")}
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className={clsx("md:hidden", solid ? "text-ink" : "text-white")}
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-50 bg-sea-deep text-white transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-18 items-center justify-between px-6">
          <span className="font-display text-lg font-semibold">{tCommon("brand")}</span>
          <button type="button" onClick={() => setOpen(false)} aria-label={t("close")}>
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-6">
          {[...navItems, { href: "/contact", key: "contact" } as const].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/15 py-5 font-display text-3xl font-semibold"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
