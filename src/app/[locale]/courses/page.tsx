import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const levels = ["beginner", "intermediate", "advanced"] as const;
const practical = ["season", "water", "safety"] as const;

const gallery = [
  { src: "/images/surf/lesson-beginner.jpg", alt: "beginner" },
  { src: "/images/surf/diego-lineup.jpg", alt: "lineup" },
  { src: "/images/surf/wave-ride.jpg", alt: "wave" },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses.hero" });
  return { title: t("title"), description: t("tagline") };
}

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("courses");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero title={t("hero.title")} tagline={t("hero.tagline")} />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {gallery.map((image, index) => (
              <Reveal key={image.src} delay={index * 0.08}>
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                  <Image
                    src={image.src}
                    alt={t(`imageAlts.${image.alt}`)}
                    fill
                    sizes="(min-width: 768px) 32vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <h2 className="text-[2rem] md:text-4xl">{t("levels.heading")}</h2>
          </Reveal>

          <div className="mt-10 divide-y divide-sand-warm border-y border-sand-warm">
            {levels.map((level, index) => (
              <Reveal key={level} delay={index * 0.06}>
                <div className="grid gap-3 py-8 md:grid-cols-[16rem_1fr] md:gap-10">
                  <h3 className="text-xl">{t(`levels.${level}.title`)}</h3>
                  <p className="prose-body text-ink/70">{t(`levels.${level}.body`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <Container>
          <Reveal>
            <h2 className="text-[2rem] md:text-4xl">{t("practical.heading")}</h2>
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {practical.map((item, index) => (
              <Reveal key={item} delay={index * 0.06}>
                <div className="h-px w-10 bg-coral" />
                <h3 className="mt-5 text-lg">{t(`practical.${item}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{t(`practical.${item}.body`)}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Button href="/contact" className="mt-12">
              {tCommon("bookNow")}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
