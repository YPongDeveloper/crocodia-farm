import Pic from "@/components/Pic";
import Reveal from "@/components/Reveal";
import AnimalGallery from "@/components/AnimalGallery";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.animals, description: d.animals.sub };
}

export default async function AnimalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);

  return (
    <>
      <section className="phero">
        <Pic src="a-tiger" alt="" w={1280} h={720} eager className="phero__bg" />
        <div className="phero__scrim" />
        <div className="phero__content">
          <span className="kicker">🦎 {d.animals.kicker}</span>
          <h1>{d.animals.title}</h1>
          <p>{d.animals.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <AnimalGallery locale={locale} d={d} />
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          <Reveal>
            <div className="ctaband">
              <h2>{d.home.ctaBandTitle}</h2>
              <p>{d.home.ctaBandSub}</p>
              <div className="hero__cta">
                <Link href={`/${locale}/map/`} className="btn btn--ghost">
                  🗺️ {d.home.ctaMapBtn}
                </Link>
                <Link href={`/${locale}/services/`} className="btn btn--accent">
                  🎪 {d.nav.services}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
