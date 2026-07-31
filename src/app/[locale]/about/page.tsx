import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: t("title"), description: t("tagline") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero title={t("hero.title")} tagline={t("hero.tagline")} />

      <section className="py-16 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/surf/diego-lineup.jpg"
                alt={t("hero.title")}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="prose-body text-ink/75">{t("body1")}</p>
            <p className="prose-body mt-6 text-ink/75">{t("body2")}</p>

            {/* Deliberately visible: this copy is a stand-in until Diego sends his own. */}
            <p className="mt-8 rounded-2xl border border-dashed border-coral/50 bg-coral/5 px-6 py-5 text-sm leading-relaxed text-ink/70">
              {t("placeholder")}
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
