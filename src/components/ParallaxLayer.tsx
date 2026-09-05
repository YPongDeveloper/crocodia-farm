"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Parallax layer: children translateY based on scroll progress.
 *  speed > 0 moves slower (background), speed < 0 moves faster (foreground). */
export default function ParallaxLayer({
  speed,
  className = "",
  style,
  children,
}: {
  speed: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (r.top + r.height / 2 - vh / 2) / vh; // -~1..1
      el.style.transform = `translate3d(0, ${(progress * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`dlayer ${className}`} style={style} aria-hidden={speed !== 0 ? true : undefined}>
      {children}
    </div>
  );
}
