import Pic from "@/components/Pic";
import Reveal from "@/components/Reveal";
import ZooMap from "@/components/ZooMap";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.map, description: d.map.sub };
}

export default async function MapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);

  return (
    <>
      <section className="phero">
        <Pic src="hero-scenic" alt="" w={1280} h={720} eager className="phero__bg" />
        <div className="phero__scrim" />
        <div className="phero__content">
          <span className="kicker">🗺️ {d.map.kicker}</span>
          <h1>{d.map.title}</h1>
          <p>{d.map.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="center" style={{ color: "var(--muted)", marginBottom: 18 }}>
              👆 {d.map.hint}
            </p>
            <ZooMap locale={locale} d={d} />
            <p className="mapnote">🅿️ {d.map.entranceNote}</p>
          </Reveal>

          <Reveal style={{ marginTop: 44 }}>
            <h3 className="center" style={{ fontSize: "1.3rem" }}>
              💡 {d.map.tipsTitle}
            </h3>
            <div className="chips" style={{ marginTop: 16 }}>
              {d.map.tips.map((tip) => (
                <span className="chip" key={tip} style={{ maxWidth: "100%", whiteSpace: "normal", padding: "10px 18px" }}>
                  <span className="chip__dot" />
                  {tip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
