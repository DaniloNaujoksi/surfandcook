import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const dishes = [
  { key: "ceviche", image: "/images/dishes/ceviche.jpg" },
  { key: "lomo", image: "/images/dishes/lomo-saltado.jpg" },
  { key: "tiradito", image: "/images/dishes/tiradito.jpg" },
  { key: "causa", image: "/images/dishes/causa.jpg" },
  { key: "parrillada", image: "/images/dishes/parrillada.jpg" },
  { key: "conchas", image: "/images/dishes/conchas.jpg" },
  { key: "quinoa", image: "/images/dishes/quinoa.jpg" },
  { key: "pisco", image: "/images/dishes/pisco-sour.jpg" },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kitchen.hero" });
  return { title: t("title"), description: t("tagline") };
}

export default async function KitchenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("kitchen");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero title={t("hero.title")} tagline={t("hero.tagline")} />

      <section className="py-16 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/images/experience/cooking-hands.jpg"
                alt={t("intro.heading")}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-[2rem] md:text-4xl">{t("intro.heading")}</h2>
            <p className="prose-body mt-6 text-ink/70">{t("intro.body")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <h2 className="text-[2rem] md:text-4xl">{t("dishes.heading")}</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dishes.map((dish, index) => (
              <Reveal key={dish.key} delay={(index % 4) * 0.06}>
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                  <Image
                    src={dish.image}
                    alt={t(`dishes.${dish.key}.name`)}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base">{t(`dishes.${dish.key}.name`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                  {t(`dishes.${dish.key}.note`)}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl rounded-2xl bg-sand px-6 py-5 text-sm leading-relaxed text-ink/70">
              {t("diet")}
            </p>
            <Button href="/contact" className="mt-8">
              {tCommon("bookNow")}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
