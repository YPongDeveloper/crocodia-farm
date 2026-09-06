import Pic from "@/components/Pic";
import Reveal from "@/components/Reveal";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.history, description: d.history.sub };
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);

  return (
    <>
      <section className="phero">
        <Pic src="h-old1" alt="" w={1280} h={720} eager className="phero__bg" />
        <div className="phero__scrim" />
        <div className="phero__content">
          <span className="kicker">🕰️ {d.history.kicker}</span>
          <h1>{d.history.title}</h1>
          <p>{d.history.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="center">
            <p className="lead" style={{ fontSize: "1.08rem" }}>
              {d.history.intro}
            </p>
          </Reveal>

          <div className="timeline" style={{ marginTop: 44 }}>
            {d.history.timeline.map((item, i) => (
              <Reveal key={item.year} className={`tl-item reveal--${i % 2 ? "right" : "left"}`} delay={80}>
                <span className="tl-item__dot" />
                <article className="tl-card">
                  <Pic src={item.img} alt={item.title} w={560} h={373} />
                  <div className="tl-card__body">
                    <span className="tl-card__year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mission">
              <h3>{d.history.missionTitle}</h3>
              <p style={{ color: "var(--ink-soft)", marginBottom: 0 }}>{d.history.missionText}</p>
            </div>
          </Reveal>

          <Reveal className="center" style={{ marginTop: 46 }}>
            <h3 style={{ fontSize: "1.35rem" }}>{d.history.cta}</h3>
            <div className="hero__cta" style={{ marginTop: 12 }}>
              <Link href={`/${locale}/map/`} className="btn btn--primary">
                🗺️ {d.home.ctaMapBtn}
              </Link>
              <Link href={`/${locale}/animals/`} className="btn btn--ghost">
                🦎 {d.nav.animals}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
