import Pic from "@/components/Pic";
import Reveal from "@/components/Reveal";
import ParallaxLayer from "@/components/ParallaxLayer";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.dinosaurs, description: d.dinos.sub };
}

export default async function DinosaursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);

  const stations = [
    { img: "d-fossil", label: { th: "โครงกระดูกฟอสซิล", en: "Fossil skeletons", zh: "化石骨架" } },
    { img: "d-trike", label: { th: "ไทรเซอราทอปส์", en: "Triceratops", zh: "三角龙" } },
    { img: "d-eggs", label: { th: "ไข่จระเข้", en: "Crocodile eggs", zh: "鳄鱼蛋" } },
    { img: "d-skulls", label: { th: "กะโหลกยุคโบราณ", en: "Ancient skulls", zh: "远古头骨" } },
    { img: "d-apes", label: { th: "บรรพบุรุษมนุษย์", en: "Human ancestors", zh: "人类祖先" } },
    { img: "d-monkey", label: { th: "ยุคสัตว์เลี้ยงลูกด้วยนม", en: "Age of mammals", zh: "哺乳动物时代" } },
  ];

  return (
    <>
      {/* -------- parallax sky band -------- */}
      <section className="dsky">
        <div className="dsky__sun" />
        <ParallaxLayer speed={36} style={{ width: "16%", top: "16%", left: "6%" }}>
          <Pic src="d-brachio" alt="" w={640} h={640} />
        </ParallaxLayer>
        <ParallaxLayer speed={-30} style={{ width: "13%", top: "12%", right: "8%" }}>
          <Pic src="d-pterano" alt="" w={640} h={640} />
        </ParallaxLayer>
        <ParallaxLayer speed={64} style={{ width: "17%", top: "30%", left: "22%" }}>
          <Pic src="d-pair" alt="" w={640} h={347} />
        </ParallaxLayer>
        <ParallaxLayer speed={-66} style={{ width: "15%", bottom: "-6%", right: "20%" }} className="float">
          <Pic src="d-trex" alt="" w={640} h={626} />
        </ParallaxLayer>

        <div className="dsky__inner">
          <span className="kicker">🦕 {d.dinos.kicker}</span>
          <h1>{d.dinos.title}</h1>
          <p>{d.dinos.sub}</p>
          <p style={{ marginTop: 26 }}>
            <Link href={`/${locale}/map/`} className="btn btn--primary">
              🗺️ {d.home.ctaMapBtn}
            </Link>
          </p>
        </div>
        <div className="dground" />
      </section>

      {/* -------- story sections -------- */}
      <section className="dino-sec">
        <div className="wrap dgrid">
          <Reveal>
            <span className="kicker">🌋 {d.dinos.s1Title}</span>
            <h2 className="h2">{d.dinos.s1Title}</h2>
            <p style={{ color: "var(--ink-soft)" }}>{d.dinos.s1Text}</p>
          </Reveal>
          <Reveal className="reveal--right" delay={100}>
            <div className="dgrid__img">
              <Pic src="d-fossil" alt={d.dinos.s1Title} w={640} h={426} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="dino-sec dino-sec--alt">
        <div className="wrap dgrid">
          <Reveal className="reveal--left">
            <div className="dgrid__img">
              <Pic src="d-mascot" alt={d.dinos.s2Title} w={640} h={631} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="kicker">🐊 {d.dinos.s2Title}</span>
            <h2 className="h2">{d.dinos.s2Title}</h2>
            <p style={{ color: "var(--ink-soft)" }}>{d.dinos.s2Text}</p>
          </Reveal>
        </div>
      </section>

      <section className="dino-sec">
        <div className="wrap dgrid">
          <Reveal>
            <span className="kicker">🦣 {d.dinos.s3Title}</span>
            <h2 className="h2">{d.dinos.s3Title}</h2>
            <p style={{ color: "var(--ink-soft)" }}>{d.dinos.s3Text}</p>
          </Reveal>
          <Reveal className="reveal--right" delay={100}>
            <div className="dgrid__img">
              <Pic src="d-apes" alt={d.dinos.s3Title} w={420} h={313} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------- what's inside -------- */}
      <section className="dino-sec dino-sec--alt">
        <div className="wrap">
          <Reveal className="center">
            <span className="kicker">🏛️ {d.dinos.visitTitle}</span>
            <h2 className="h2">{d.dinos.visitSub}</h2>
          </Reveal>
          <div className="dstat-row" style={{ marginTop: 28 }}>
            {stations.map((s, i) => (
              <Reveal key={s.img} delay={(i % 3) * 90}>
                <figure className="dstat" style={{ margin: 0 }}>
                  <Pic src={s.img} alt={s.label[locale]} w={480} h={313} />
                  <div>{s.label[locale]}</div>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="center" style={{ marginTop: 40 }}>
            <div className="ctaband">
              <h2>{d.dinos.cta}</h2>
              <div className="hero__cta">
                <Link href={`/${locale}/map/`} className="btn btn--ghost">
                  🗺️ {d.home.ctaMapBtn}
                </Link>
                <Link href={`/${locale}/services/`} className="btn btn--accent">
                  ⏰ {d.services.showsTitle}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
