import Link from "next/link";
import { imgSrc } from "@/assets";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Footer({ locale, d }: { locale: Locale; d: Dict }) {
  const base = `/${locale}`;
  const links: [string, string][] = [
    [base, d.nav.home],
    [`${base}/services`, d.nav.services],
    [`${base}/history`, d.nav.history],
    [`${base}/animals`, d.nav.animals],
    [`${base}/dinosaurs`, d.nav.dinosaurs],
    [`${base}/map`, d.nav.map],
    [`${base}/contact`, d.nav.contact],
  ];
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__brand">
          <img src={imgSrc("logo")} alt="" width={54} height={54} loading="lazy" />
          <div>
            <strong>{d.meta.siteName}</strong>
            <p className="footer__tagline">{d.footer.tagline}</p>
            <p className="footer__hours">{d.footer.openHours}</p>
          </div>
        </div>
        <div className="footer__col">
          <h4>{d.footer.quickLinks}</h4>
          <ul>
            {links.map(([href, label]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4>{d.footer.contactUs}</h4>
          <ul>
            <li>555 หมู่ 7 ถ.ท้ายบ้าน สมุทรปราการ 10280</li>
            <li>
              <a href="tel:0625174464">062-517-4464</a> · <a href="tel:0825394295">082-539-4295</a>
            </li>
            <li>
              <a
                href="https://line.me/R/ti/p/@crocodilefarmzoo"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                LINE: @crocodilefarmzoo
              </a>
            </li>
            <li>
              <a href="mailto:crocodilefarmsamutprakan@gmail.com">crocodilefarmsamutprakan@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>{d.footer.rights}</span>
        <span className="footer__credit">{d.footer.credit}</span>
      </div>
    </footer>
  );
}
