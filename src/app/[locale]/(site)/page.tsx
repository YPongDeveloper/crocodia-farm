import Link from "next/link";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { feedingPrices, photoPrices } from "@/i18n/data";
import { speciesNames, feedingNames, photoNames } from "@/i18n/names";
import Pic from "@/components/Pic";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.home, description: d.meta.description };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);
  const t = (x: { th: string; en: string; zh: string }) => x[locale];

  const highlights = [
    { img: "show-wrestling", tag: d.common.free, ...d.home.h1 },
    { img: "family-eleph", tag: d.common.free, ...d.home.h2 },
    { img: "d-statue", tag: d.common.free, ...d.home.h3 },
    { img: "act-feed", tag: `฿20`, ...d.home.h4 },
  ];

  const extras = [
    { name: feedingNames[feedingPrices[0][0]], price: feedingPrices[0][1], href: "/services" },
    { name: photoNames.bigCroc, price: photoPrices[5][1], href: "/services" },
    { name: { th: "รถไฟรางชมฟาร์ม", en: "Mini train tour", zh: "观光小火车" }, price: 40, href: "/services" },
    { name: { th: "กอล์ฟคาร์ทขับเอง", en: "Self-drive golf cart", zh: "自驾高尔夫球车" }, price: 300, href: "/services" },
  ];

  const gallery: { img: string; caption: string }[] = [
    { img: "act-train", caption: t({ th: "รถไฟรางชมฟาร์ม", en: "Mini train tour", zh: "观光小火车" }) },
    { img: "show-wrestling", caption: t({ th: "โชว์จับจระเข้", en: "Crocodile wrestling show", zh: "捕鳄表演" }) },
    { img: "a-hippo", caption: t(speciesNames.hippo) },
    { img: "act-boat", caption: t({ th: "เรือพายชมฟาร์ม", en: "Rowboats on the lake", zh: "湖上划船" }) },
    { img: "a-tiger", caption: t(speciesNames.tiger) },
    { img: "hero-scenic", caption: t({ th: "ศาลาริมน้ำ", en: "Lakeside pavilion", zh: "湖畔凉亭" }) },
    { img: "a-alpaca", caption: t(speciesNames.alpaca) },
    { img: "act-jump", caption: t({ th: "จระเข้กระโดด", en: "Jumping crocodile", zh: "跳鳄" }) },
  ];

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="hero__media">
          <Pic
            src="hero-croc"
            alt={d.meta.siteName}
            w={1440}
            h={960}
            eager
            fetchHigh
            className="hero__img"
          />
          <div className="hero__scrim" />
          <div className="hero__content">
            <span className="hero__kicker">🦎 {d.home.heroKicker}</span>
            <h1 className="hero__title">{d.home.heroTitle}</h1>
            <p className="hero__sub">{d.home.heroSub}</p>
            <div className="hero__cta">
              <a href="#prices" className="btn btn--accent">
                {d.home.ctaPrices} · ฿400
              </a>
              <Link href={`/${locale}/map/`} className="btn btn--ghost">
                {d.home.ctaMap}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- info strip ---------------- */}
      <div className="wrap infostrip">
        <Reveal className="infostrip__inner">
          {d.home.infoStrip.map((s) => (
            <div className="infostrip__item" key={s}>
              {s}
            </div>
          ))}
        </Reveal>
      </div>

      {/* ---------------- highlights ---------------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="center" >
            <span className="kicker">✨ {d.home.highlightsTitle}</span>
            <h2 className="h2">{d.home.highlightsSub}</h2>
          </Reveal>
          <div className="grid grid--4" style={{ marginTop: 30 }}>
            {highlights.map((h, i) => (
              <Reveal key={h.t} delay={i * 90}>
                <article className="card" style={{ height: "100%" }}>
                  <div className="card__media">
                    <Pic src={h.img} alt={h.t} w={560} h={373} />
                    <span className="card__tag">{h.tag}</span>
                  </div>
                  <div className="card__body">
                    <h3>{h.t}</h3>
                    <p>{h.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- prices ---------------- */}
      <section className="section section--leaf" id="prices">
        <div className="wrap">
          <Reveal className="center">
            <span className="kicker">🎫 {d.home.pricesTitle}</span>
            <h2 className="h2">{d.home.pricesSub}</h2>
          </Reveal>
          <div className="grid grid--2" style={{ maxWidth: 680, margin: "36px auto 26px" }}>
            <Reveal>
              <div className="price price--hot">
                <span className="price__badge">{d.common.adult}</span>
                <div className="price__label">{d.home.adultTicket}</div>
                <div className="price__value">
                  ฿400 <small>/ {d.common.perPerson}</small>
                </div>
                <div className="price__note">{d.common.openDaily}</div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="price">
                <span className="price__badge">{d.common.child}</span>
                <div className="price__label">{d.home.childTicket}</div>
                <div className="price__value">
                  ฿200 <small>/ {d.common.perPerson}</small>
                </div>
                <div className="price__note">{d.common.counterClose}</div>
              </div>
            </Reveal>
          </div>
          <Reveal className="center">
            <p className="note" style={{ display: "inline-block" }}>
              {d.home.ticketNote}
            </p>
          </Reveal>

          <Reveal className="center" style={{ marginTop: 44 }}>
            <h3 style={{ fontSize: "1.3rem" }}>✅ {d.home.freeTitle}</h3>
          </Reveal>
          <Reveal delay={100}>
            <div className="chips" style={{ marginTop: 16 }}>
              {d.home.freeItems.map((f) => (
                <span className="chip" key={f}>
                  <span className="chip__dot" />
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="tablewrap" style={{ marginTop: 40 }}>
              <table className="price-table">
                <thead>
                  <tr>
                    <th>{d.home.extraTitle}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {extras.map((e) => (
                    <tr key={e.name.en}>
                      <td>
                        <Link href={`/${locale}/services/`}>{t(e.name)}</Link>
                      </td>
                      <td>
                        <b>฿{e.price}</b> · <span style={{ fontSize: ".86rem" }}>{d.common.perPerson}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="center">
            <span className="kicker">📷 {d.home.galleryTitle}</span>
            <h2 className="h2">{d.home.gallerySub}</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="masonry" style={{ marginTop: 30 }}>
              {gallery.map((g) => (
                <figure key={g.img}>
                  <Pic src={g.img} alt={g.caption} w={560} h={373} />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- cta band ---------------- */}
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
                <Link href={`/${locale}/contact/`} className="btn btn--accent">
                  📞 {d.home.ctaContactBtn}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
