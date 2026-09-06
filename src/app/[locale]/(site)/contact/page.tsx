import Pic from "@/components/Pic";
import Reveal from "@/components/Reveal";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.contact, description: d.contact.sub };
}

const FbIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"
    />
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
  </svg>
);
const TtIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.8 3c.4 2.1 1.9 3.8 4 4.1v3.1c-1.6 0-3-.5-4.3-1.4v6.2c0 3.4-2.7 6-6 6a5.9 5.9 0 0 1-5.9-5.9c0-3.3 2.7-6 6-6 .4 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.5 0-2.8 1.3-2.8 2.8s1.3 2.9 2.8 2.9 2.9-1.3 2.9-2.9V3h3.3z"
    />
  </svg>
);
const LineIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 3C7 3 3 6.4 3 10.6c0 3.7 3.3 6.8 7.7 7.5.3.1.7.2.8.5.1.3.1.7 0 1l-.1.8c0 .2-.2.9.8.5 1-.4 5.5-3.2 7.5-5.6.8-1 1.3-2.2 1.3-3.7C21 6.4 17 3 12 3zM7.5 12.6H6.2a.4.4 0 0 1-.4-.4V8.8a.4.4 0 0 1 .8 0v3h.9a.4.4 0 1 1 0 .8zm1.9-.4a.4.4 0 0 1-.8 0V8.8a.4.4 0 0 1 .8 0v3.4zm4.2 0a.4.4 0 0 1-.7.2l-1.6-2.2v2a.4.4 0 0 1-.8 0V8.8a.4.4 0 0 1 .7-.3l1.6 2.2v-1.9a.4.4 0 0 1 .8 0v3.4zm3-1.7a.4.4 0 1 1 0 .8h-1.2v.9h1.2a.4.4 0 1 1 0 .8h-1.6a.4.4 0 0 1-.4-.4V8.8a.4.4 0 0 1 .4-.4h1.6a.4.4 0 1 1 0 .8h-1.2v.9h1.2z"
    />
  </svg>
);
const GMapsIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
    <path
      fill="#fff"
      d="M12 2a7.3 7.3 0 0 0-7.3 7.3c0 5.5 6.5 11.7 6.8 12 .3.3.7.3 1 0 .3-.3 6.8-6.5 6.8-12A7.3 7.3 0 0 0 12 2z"
    />
    <circle cx="12" cy="9.2" r="2.9" fill="#1a73e8" />
  </svg>
);

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/Samutprakancrocodilefarm", cls: "fb", icon: <FbIcon /> },
  { label: "Instagram", href: "https://www.instagram.com/samutprakancrocodilefarm", cls: "ig", icon: <IgIcon /> },
  { label: "TikTok", href: "https://www.tiktok.com/@crocodilefarmsamutprakan", cls: "tt", icon: <TtIcon /> },
  { label: "LINE", href: "https://line.me/R/ti/p/@crocodilefarmzoo", cls: "line", icon: <LineIcon /> },
];

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);
  const t = (x: { th: string; en: string; zh: string }) => x[locale];

  const hl = locale === "zh" ? "zh-CN" : locale;
  const mapEmbed = `https://www.google.com/maps?q=Samutprakarn+Crocodile+Farm+%26+Zoo,+Taiban,+Samut+Prakan&z=15&hl=${hl}&output=embed`;

  return (
    <>
      <section className="phero">
        <Pic src="garden-statue" alt="" w={1280} h={720} eager className="phero__bg" />
        <div className="phero__scrim" />
        <div className="phero__content">
          <span className="kicker">📞 {d.contact.kicker}</span>
          <h1>{d.contact.title}</h1>
          <p>{d.contact.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <Reveal className="reveal--left">
              <div className="cbox">
                <h3>🏠 {d.contact.addressTitle}</h3>
                <p style={{ margin: "8px 0 4px" }}>{d.contact.address}</p>
                <p style={{ color: "var(--muted)", fontSize: ".92rem" }}>{d.contact.addressEn}</p>

                <ul style={{ marginTop: 18 }}>
                  <li>
                    <b>🕒 {d.contact.hoursTitle}</b>
                    <span>
                      {d.common.openDaily} ({d.common.counterClose})
                    </span>
                  </li>
                  <li>
                    <b>☎️ {d.contact.phoneTitle}</b>
                    <span>
                      <a href="tel:0625174464">062-517-4464</a> · <a href="tel:0825394295">082-539-4295</a>
                      <br />
                      <small style={{ color: "var(--muted)" }}>09:00 – 17:00</small>
                    </span>
                  </li>
                  <li>
                    <b>{d.contact.lineTitle}</b>
                    <a href="https://line.me/R/ti/p/@crocodilefarmzoo" target="_blank" rel="noopener noreferrer nofollow">
                      @crocodilefarmzoo
                    </a>
                  </li>
                  <li>
                    <b>✉️ {d.contact.emailTitle}</b>
                    <a href="mailto:crocodilefarmsamutprakan@gmail.com">crocodilefarmsamutprakan@gmail.com</a>
                  </li>
                </ul>

                <h3 style={{ marginTop: 20 }}>🌐 {d.contact.socialTitle}</h3>
                <div className="socials" style={{ marginTop: 10 }}>
                  {socials.map((s) => (
                    <a key={s.label} className={s.cls} href={s.href} target="_blank" rel="noopener noreferrer nofollow" aria-label={s.label} title={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="cbox" style={{ marginTop: 22 }}>
                <h3>🚇 {d.contact.travelTitle}</h3>
                <ul style={{ marginTop: 10 }}>
                  <li>
                    <b>BTS</b>
                    <span>{d.contact.travelBts}</span>
                  </li>
                  <li>
                    <b>🚌</b>
                    <span>{d.contact.travelBus}</span>
                  </li>
                </ul>
              </div>

              <div className="cbox" style={{ marginTop: 22 }}>
                <h3>🎒 {d.contact.groupTitle}</h3>
                <p style={{ margin: "10px 0 0", color: "var(--ink-soft)" }}>{d.contact.groupText}</p>
              </div>
            </Reveal>

            <Reveal className="reveal--right" delay={120}>
              <div className="cmap">
                <div className="cmap__frame">
                  <iframe
                    src={mapEmbed}
                    title={d.contact.mapBtn}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="cmap__bar">
                  <strong>
                    {t({ th: "ฟาร์มจระเข้และสวนสัตว์ สมุทรปราการ", en: "Samutprakarn Crocodile Farm & Zoo", zh: "北榄鳄鱼湖动物园" })}
                  </strong>
                  <a
                    className="gmap-btn"
                    href="https://www.google.com/maps/search/?api=1&query=Samutprakarn+Crocodile+Farm+%26+Zoo"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <GMapsIcon />
                    {d.contact.mapBtn}
                  </a>
                </div>
              </div>
              <p className="note" style={{ marginTop: 16 }}>
                🚫 {t({
                  th: "ห้ามให้อาหารสัตว์นอกเหนือจากจุดที่กำหนด และไม่ควรป้อนอาหารของตัวเองให้สัตว์",
                  en: "Please feed animals only at designated feeding points, and never share your own food with the animals.",
                  zh: "请仅在指定喂食点喂食动物，请勿投喂自己的食物。",
                })}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
