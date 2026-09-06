"use client";

import { useState, type ReactNode } from "react";

/** Collapsible panel: click the header to slide the content open/closed. */
export default function Accordion({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  count?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`acc ${open ? "acc--open" : ""}`}>
      <button className="acc__head" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="acc__title">{title}</span>
        {count && <span className="acc__count">{count}</span>}
        <svg className="acc__chev" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="acc__body">
        <div className="acc__inner">
          <div className="acc__content">{children}</div>
        </div>
      </div>
    </div>
  );
}
