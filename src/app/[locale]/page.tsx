import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";

const steps = [
  { key: "surf", image: "/images/experience/surf-lesson.jpg" },
  { key: "cook", image: "/images/experience/cooking-hands.jpg" },
  { key: "eat", image: "/images/experience/sunset-table.jpg" },
] as const;

const included = ["groups", "gear", "photos", "food"] as const;

const dishTeasers = [
  "/images/dishes/ceviche.jpg",
  "/images/dishes/tiradito.jpg",
  "/images/dishes/causa.jpg",
  "/images/dishes/pisco-sour.jpg",
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  return (
    <>
      <section className="relative flex min-h-[88svh] items-end overflow-hidden">
        <Image
          src="/images/hero/diego-cooking.png"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          // The source is 2:1 with Diego about 62% across. On phones the crop
          // eats the width, so hold his side; on desktop it eats the height
          // instead and centring horizontally is fine.
          className="object-cover object-[62%_50%] md:object-[50%_38%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/85 via-sea-deep/35 to-sea-deep/45" />

        <Container className="relative pb-20 pt-32 md:pb-28">
          <p className="label text-white/75">{t("hero.eyebrow")}</p>
          <h1 className="mt-5 max-w-3xl text-[2.75rem] text-white md:text-7xl">{t("hero.title")}</h1>
          <p className="prose-body mt-6 max-w-xl text-white/85">{t("hero.tagline")}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact">{tCommon("bookNow")}</Button>
            <Button href="/courses" variant="light">
              {tCommon("seeCourses")}
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="label text-coral">{t("intro.eyebrow")}</p>
            <h2 className="mt-5 text-[2rem] md:text-5xl">{t("intro.heading")}</h2>
            <p className="prose-body mt-6 text-ink/70">{t("intro.body")}</p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.key} delay={index * 0.08}>
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                  <Image
                    src={step.image}
                    alt={t(`steps.${step.key}.imageAlt`)}
                    fill
                    sizes="(min-width: 768px) 32vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl">{t(`steps.${step.key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{t(`steps.${step.key}.body`)}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 className="text-[2rem] md:text-4xl">{t("included.heading")}</h2>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item, index) => (
              <Reveal key={item} delay={index * 0.06}>
                <div className="h-px w-10 bg-coral" />
                <h3 className="mt-5 text-lg">{t(`included.items.${item}.title`)}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                  {t(`included.items.${item}.body`)}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/surf/wave-ride.jpg"
                alt={t("steps.surf.imageAlt")}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="label text-coral">{t("place.eyebrow")}</p>
            <h2 className="mt-5 text-[2rem] md:text-5xl">{t("place.heading")}</h2>
            <p className="prose-body mt-6 text-ink/70">{t("place.body")}</p>
            <Button href="/stay" variant="outline" className="mt-8">
              {t("place.cta")}
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sea-deep py-20 text-white md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="label text-coral-soft">{t("kitchenTeaser.eyebrow")}</p>
            <h2 className="mt-5 text-[2rem] md:text-5xl">{t("kitchenTeaser.heading")}</h2>
            <p className="prose-body mt-6 text-white/75">{t("kitchenTeaser.body")}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {dishTeasers.map((src, index) => (
              <Reveal key={src} delay={index * 0.06}>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={src}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link href="/kitchen" className="label mt-10 inline-flex items-center gap-2 text-coral-soft">
              {t("kitchenTeaser.cta")} →
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <h2 className="text-[2rem] md:text-5xl">{t("closing.heading")}</h2>
            <p className="prose-body mt-6 text-ink/70">{t("closing.body")}</p>
            <Button href="/contact" className="mt-9">
              {tCommon("bookNow")}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
