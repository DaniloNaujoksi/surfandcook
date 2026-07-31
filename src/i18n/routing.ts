import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // English leads: most guests travelling to Peru to surf arrive on it. Spanish
  // is the language on the ground, German the home market.
  locales: ["en", "de", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": { en: "/", de: "/start", es: "/inicio" },
    "/courses": { en: "/courses", de: "/kurse", es: "/cursos" },
    "/kitchen": { en: "/kitchen", de: "/kueche", es: "/cocina" },
    "/stay": { en: "/stay", de: "/unterkunft", es: "/alojamiento" },
    "/about": { en: "/about", de: "/ueber-uns", es: "/nosotros" },
    "/contact": { en: "/contact", de: "/kontakt", es: "/contacto" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
