"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { en: "EN", de: "DE", es: "ES" };

export function LanguageSwitcher({ className, onSurface = "light" }: { className?: string; onSurface?: "light" | "dark" }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const switchTo = (next: string) => {
    router.replace(
      // @ts-expect-error dynamic route params passthrough
      { pathname, params },
      { locale: next },
    );
    setOpen(false);
  };

  return (
    <div ref={wrapper} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "label flex items-center gap-1.5 transition-opacity hover:opacity-70",
          onSurface === "dark" ? "text-white" : "text-ink",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
      >
        {labels[locale]}
        <ChevronDown size={13} strokeWidth={2} className={clsx("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        // Own colours: the header sits on a photo at the top of the page and on
        // shell once scrolled, so inheriting either would break in the other.
        <div
          role="listbox"
          className="absolute right-0 top-full z-20 mt-3 min-w-20 overflow-hidden rounded-xl border border-sand-warm bg-white py-1 shadow-lg"
        >
          {routing.locales.map((code) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={code === locale}
              onClick={() => switchTo(code)}
              className={clsx(
                "label block w-full px-4 py-2.5 text-left transition-colors",
                code === locale ? "bg-sand text-ink" : "text-ink/55 hover:text-ink",
              )}
            >
              {labels[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
