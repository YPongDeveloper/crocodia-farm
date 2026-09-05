"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Adds .in to .reveal elements when they enter the viewport.
 *  Respects prefers-reduced-motion (CSS handles the rest). */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }}
    >
      {children}
    </Tag>
  );
}
