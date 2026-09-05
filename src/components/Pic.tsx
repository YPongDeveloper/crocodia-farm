import type { CSSProperties } from "react";
import { imgSrc } from "@/assets";

interface PicProps {
  src: string; // e.g. "hero-croc" -> /img/hero-croc.webp
  alt: string;
  w: number; // intrinsic width for aspect-ratio reservation
  h: number;
  className?: string;
  eager?: boolean;
  sizes?: string;
  fetchHigh?: boolean;
  style?: CSSProperties;
}

/** Lightweight static image component: native lazy loading, WebP only,
 *  zero runtime JS. Reserves layout space to avoid CLS. */
export default function Pic({ src, alt, w, h, className, eager, fetchHigh, style }: PicProps) {
  return (
    <img
      src={imgSrc(src)}
      alt={alt}
      width={w}
      height={h}
      className={className}
      style={style}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchPriority={fetchHigh ? "high" : "auto"}
      draggable={false}
    />
  );
}
