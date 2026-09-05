"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";

/** Compact language switcher: one button (current code) opening a dropdown. */
export default function LangMenu({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const swap = (next: Locale): string => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${next}/`;
    if ((locales as readonly string[]).includes(parts[0])) {
      parts[0] = next;
      return "/" + parts.join("/") + "/";
    }
    return `/${next}/`;
  };

  const code: Record<Locale, string> = { th: "TH", en: "EN", zh: "中文" };

  return (
    <div className="langmenu" ref={ref}>
      <button
        className="langbtn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="4.2" ry="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.6 9h16.8M3.6 15h16.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <span>{code[locale]}</span>
        <svg className={`langbtn__chev ${open ? "langbtn__chev--open" : ""}`} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="langmenu__pop" role="menu">
          {locales.map((lc) => (
            <Link
              key={lc}
              href={swap(lc)}
              role="menuitem"
              className={`langmenu__item ${lc === locale ? "langmenu__item--on" : ""}`}
              aria-current={lc === locale ? "true" : undefined}
            >
              {localeNames[lc]}
              <span className="langmenu__code">{code[lc]}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
