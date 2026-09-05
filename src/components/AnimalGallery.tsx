"use client";

import { useEffect, useRef, useState } from "react";
import { imgSrc } from "@/assets";
import Pic from "@/components/Pic";
import { animalCategories } from "@/i18n/data";
import { speciesNames } from "@/i18n/names";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const CAT_EMOJI: Record<string, string> = {
  crocs: "🐊",
  bigcats: "🦁",
  giants: "🐘",
  mammals: "🐵",
  birds: "🦜",
  farm: "🐇",
};

export default function AnimalGallery({ locale, d }: { locale: Locale; d: Dict }) {
  const [cat, setCat] = useState(animalCategories[0].id);
  const [zoom, setZoom] = useState<{ src: string; label: string } | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // keep the active chip in view when the row scrolls horizontally (mobile)
  useEffect(() => {
    btnRefs.current[cat]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [cat]);

  const active = animalCategories.find((c) => c.id === cat)!;

  return (
    <>
      <div className="cats" role="tablist">
        {animalCategories.map((c) => (
          <button
            key={c.id}
            ref={(el) => {
              btnRefs.current[c.id] = el;
            }}
            role="tab"
            aria-selected={c.id === cat}
            className={`cat-btn ${c.id === cat ? "cat-btn--on" : ""}`}
            onClick={() => setCat(c.id)}
          >
            <span className="cat-btn__ico" aria-hidden="true">
              {CAT_EMOJI[c.id] ?? "🐾"}
            </span>
            {d.animals.cats[c.id as keyof typeof d.animals.cats]}
          </button>
        ))}
      </div>

      <div className="agrid">
        {active.animals.map((a) => (
          <figure className="ashot" key={a.img} onClick={() => setZoom({ src: a.img, label: speciesNames[a.species][locale] })}>
            <Pic src={a.img} alt={speciesNames[a.species][locale]} w={420} h={313} />
            <span>{speciesNames[a.species][locale]}</span>
          </figure>
        ))}
      </div>

      <p className="center" style={{ color: "var(--muted)", marginTop: 18, fontSize: ".9rem" }}>
        👆 {d.animals.hint}
      </p>

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setZoom(null)}>
          <img src={imgSrc(zoom.src)} alt={zoom.label} />
          <div className="lightbox__cap">{zoom.label}</div>
          <button className="lightbox__x" aria-label={d.animals.lightboxClose} onClick={() => setZoom(null)}>
            ✕
          </button>
        </div>
      )}
    </>
  );
}
