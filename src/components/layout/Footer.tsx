import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

const navItems = [
  { href: "/courses", key: "courses" },
  { href: "/kitchen", key: "kitchen" },
  { href: "/stay", key: "stay" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <footer className="bg-sea-deep py-16 text-white/80 md:py-20">
      <Container className="grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-white">{tCommon("brand")}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{t("tagline")}</p>
          <p className="label mt-5 text-white/50">{tCommon("location")}</p>
        </div>

        <div>
          <p className="label text-white/50">{t("navigate")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-opacity hover:opacity-70">
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-white/50">{t("contact")}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={CONTACT.whatsappHref} className="transition-opacity hover:opacity-70">
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="transition-opacity hover:opacity-70">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                {CONTACT.place}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-14 border-t border-white/15 pt-8">
        <p className="text-xs text-white/45">{t("copyright", { year: new Date().getFullYear() })}</p>
      </Container>
    </footer>
  );
}
