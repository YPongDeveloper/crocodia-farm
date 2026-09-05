"use client";

import Link from "next/link";
import { imgSrc } from "@/assets";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import LangMenu from "@/components/LangMenu";

export default function Nav({ locale, d }: { locale: Locale; d: Dict }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on navigation
  useEffect(() => setOpen(false), [pathname]);

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

  const isActive = (href: string) =>
    href === base ? pathname === `${base}/` || pathname === base || pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <Link href={base} className="nav__brand" aria-label={d.meta.siteName}>
          <img src={imgSrc("logo")} alt="" width={40} height={40} className="nav__logo" />
          <span className="nav__brandText">
            {locale === "zh" ? "北榄鳄鱼湖" : locale === "en" ? "Samutprakarn Farm & Zoo" : "ฟาร์มจระเข้สมุทรปราการ"}
          </span>
        </Link>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`} aria-label="Main">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={`nav__link ${isActive(href) ? "nav__link--active" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav__right">
          <LangMenu locale={locale} />
          <button
            className={`nav__burger ${open ? "nav__burger--open" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
