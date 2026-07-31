import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stay.hero" });
  return { title: t("title"), description: t("tagline") };
}

export default async function StayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("stay");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero title={t("hero.title")} tagline={t("hero.tagline")} />

      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-[2rem] md:text-4xl">{t("intro.heading")}</h2>
            <p className="prose-body mt-6 text-ink/70">{t("intro.body")}</p>
            <p className="mt-8 rounded-2xl bg-sand px-6 py-5 text-sm leading-relaxed text-ink/70">
              {t("note")}
            </p>
            <Button href="/contact" className="mt-8">
              {tCommon("bookNow")}
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/experience/sunset-table.jpg"
                alt={t("intro.heading")}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
