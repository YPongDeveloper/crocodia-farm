import Pic from "@/components/Pic";
import Reveal from "@/components/Reveal";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { crocShowTimes, elephantShowTimes, feedingPrices, photoPrices } from "@/i18n/data";
import { feedingNames, photoNames, activityNames } from "@/i18n/names";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.services, description: d.services.sub };
}

function Times({ list }: { list: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((x) => (
        <span key={x} className="chip" style={{ padding: "5px 13px", fontSize: ".9rem" }}>
          🕐 {x}
        </span>
      ))}
    </div>
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);
  const t = (x: { th: string; en: string; zh: string }) => x[locale];

  const activities: { key: string; img: string; price: string; note?: string }[] = [
    { key: "miniTrain", img: "act-train", price: "฿40 / ฿30", note: locale === "zh" ? "约10分钟 · 学校团体10泰铢" : locale === "en" ? "~10 min · school groups THB 10" : "~10 นาที · คณะนักเรียน 10 บาท" },
    { key: "golfCart", img: "golfcart", price: "฿300", note: locale === "zh" ? "90分钟 · 可坐4-6人" : locale === "en" ? "90 min · 4–6 seats" : "90 นาที · นั่ง 4–6 คน" },
    { key: "elephRide", img: "eleph-ride", price: "฿200", note: d.common.weekendOnly },
    { key: "horseCart", img: "act-horse", price: "—", note: d.common.weekendOnly },
    { key: "airGun", img: "act-play", price: "฿50", note: locale === "zh" ? "15发子弹" : locale === "en" ? "15 shots" : "15 นัด" },
    { key: "framed", img: "act-macaw", price: "฿150" },
  ];

  const food: { th: string; en: string; zh: string; price: number }[] = [
    { th: "ข้าวผัด (หมู/ไก่/กุ้ง)", en: "Fried rice (pork/chicken/shrimp)", zh: "炒饭（猪/鸡/虾）", price: 60 },
    { th: "ผัดกะเพรา + ข้าว", en: "Stir-fried basil with rice", zh: "打抛饭", price: 60 },
    { th: "หมูทอดกระเทียม + ข้าว", en: "Garlic pepper pork with rice", zh: "蒜香猪肉饭", price: 60 },
    { th: "ข้าวไข่เจียวหมูสับ", en: "Minced pork omelette rice", zh: "猪肉煎蛋饭", price: 60 },
    { th: "ราดหน้า (หมู/ไก่/ทะเล)", en: "Rad Na noodles", zh: "浇汁粿条", price: 60 },
    { th: "ผัดซีอิ๊ว", en: "Pad See Ew", zh: "酱油炒粿条", price: 60 },
    { th: "สุกี้ (หมู/ไก่/ทะเล)", en: "Thai suki", zh: "泰式 Sukiyaki", price: 70 },
    { th: "กล่องอาหารกลุ่ม", en: "Meal box (groups)", zh: "团体餐盒", price: 55 },
    { th: "กล่องขนมกลุ่ม", en: "Snack box (groups)", zh: "团体点心盒", price: 30 },
  ];

  return (
    <>
      <section className="phero">
        <Pic src="act-pondview" alt="" w={1280} h={720} eager className="phero__bg" />
        <div className="phero__scrim" />
        <div className="phero__content">
          <span className="kicker">🎪 {d.services.kicker}</span>
          <h1>{d.services.title}</h1>
          <p>{d.services.sub}</p>
        </div>
      </section>

      {/* shows */}
      <section className="section">
        <div className="wrap">
          <Reveal className="center">
            <span className="kicker">⏰ {d.services.showsTitle}</span>
            <h2 className="h2">{d.services.showsSub}</h2>
          </Reveal>
          <div className="grid grid--2" style={{ marginTop: 30 }}>
            <Reveal>
              <article className="card" style={{ height: "100%" }}>
                <div className="card__media">
                  <Pic src="show-wrestling" alt={d.services.crocShow} w={560} h={373} />
                  <span className="card__tag">{d.common.free}</span>
                </div>
                <div className="card__body">
                  <h3>🐊 {d.services.crocShow}</h3>
                  <p style={{ fontWeight: 600, color: "var(--brand-deep)" }}>{d.services.weekday}</p>
                  <Times list={crocShowTimes.weekday} />
                  <p style={{ fontWeight: 600, color: "var(--brand-deep)", margin: "14px 0 6px" }}>{d.services.weekend}</p>
                  <Times list={crocShowTimes.weekend} />
                </div>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="card" style={{ height: "100%" }}>
                <div className="card__media">
                  <Pic src="family-eleph" alt={d.services.eleShow} w={560} h={373} />
                  <span className="card__tag">{d.common.free}</span>
                </div>
                <div className="card__body">
                  <h3>🐘 {d.services.eleShow}</h3>
                  <p style={{ fontWeight: 600, color: "var(--brand-deep)" }}>{d.services.weekday}</p>
                  <Times list={elephantShowTimes.weekday} />
                  <p style={{ fontWeight: 600, color: "var(--brand-deep)", margin: "14px 0 6px" }}>{d.services.weekend}</p>
                  <Times list={elephantShowTimes.weekend} />
                </div>
              </article>
            </Reveal>
          </div>
          <Reveal className="center" style={{ marginTop: 18 }}>
            <p className="note" style={{ display: "inline-block" }}>
              🦕 {d.services.dinoMuseum} — {d.services.dinoMuseumNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* feeding + photo */}
      <section className="section section--leaf">
        <div className="wrap">
          <div className="grid grid--2">
            <Reveal className="reveal--left">
              <span className="kicker">🥕 {d.services.feedingTitle}</span>
              <h2 className="h2">{d.services.feedingSub}</h2>
              <div className="tablewrap" style={{ marginTop: 18 }}>
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>{d.services.feedingTitle}</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {feedingPrices.map(([key, price, flag]) => (
                      <tr key={key}>
                        <td>{t(feedingNames[key])}</td>
                        <td>
                          {price > 0 ? <b>฿{price}</b> : <b>{t({ th: "สอบถาม", en: "Ask staff", zh: "咨询" })}</b>}
                          {flag === "weekend" && <span className="flag">{d.common.weekendOnly}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal className="reveal--right" delay={120}>
              <span className="kicker">📸 {d.services.photoTitle}</span>
              <h2 className="h2">{d.services.photoSub}</h2>
              <div className="tablewrap" style={{ marginTop: 18 }}>
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>{d.services.photoTitle}</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {photoPrices.map(([key, price]) => (
                      <tr key={key}>
                        <td>{t(photoNames[key])}</td>
                        <td>
                          <b>฿{price}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* activities */}
      <section className="section">
        <div className="wrap">
          <Reveal className="center">
            <span className="kicker">🚂 {d.services.actTitle}</span>
          </Reveal>
          <div className="grid grid--3" style={{ marginTop: 26 }}>
            {activities.map((a, i) => (
              <Reveal key={a.key} delay={(i % 3) * 90}>
                <article className="card" style={{ height: "100%" }}>
                  <div className="card__media">
                    <Pic src={a.img} alt={t(activityNames[a.key])} w={560} h={373} />
                    <span className="card__tag">{a.price}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t(activityNames[a.key])}</h3>
                    {a.note && <p>{a.note}</p>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* food + school */}
      <section className="section section--soft">
        <div className="wrap">
          <div className="grid grid--2">
            <Reveal>
              <span className="kicker">🍜 {d.services.foodTitle}</span>
              <h2 className="h2">{d.services.foodSub}</h2>
              <div className="tablewrap" style={{ marginTop: 18 }}>
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>{d.services.foodTitle}</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {food.map((f) => (
                      <tr key={f.en}>
                        <td>{t(f)}</td>
                        <td>
                          <b>฿{f.price}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <span className="kicker">🎒 {d.services.schoolTitle}</span>
              <h2 className="h2">{d.services.schoolSub}</h2>
              <div className="tablewrap" style={{ marginTop: 18 }}>
                <table className="price-table">
                  <tbody>
                    {d.services.schoolTiers.map((s) => (
                      <tr key={s.label}>
                        <td>{s.label}</td>
                        <td>
                          <b>฿{s.price}</b> / {d.common.perPerson}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="note" style={{ marginTop: 14 }}>
                🚂 {d.services.schoolExtra}
                <br />
                📦 {d.services.schoolBase}
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="ctaband" style={{ marginTop: 46 }}>
              <h2>{d.services.bookingTitle}</h2>
              <p>{d.services.bookingSub}</p>
              <div className="hero__cta">
                <a className="btn btn--ghost" href="https://line.me/R/ti/p/@crocodilefarmzoo" target="_blank" rel="noopener noreferrer nofollow">
                  💬 LINE @crocodilefarmzoo
                </a>
                <a className="btn btn--accent" href="tel:0625174464">
                  ☎️ 062-517-4464
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
