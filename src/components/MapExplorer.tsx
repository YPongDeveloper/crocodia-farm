"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { animalCategories, animalSpots, mapPoints } from "@/i18n/data";
import { speciesNames, pointTexts } from "@/i18n/names";
import { imgSrc } from "@/assets";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** species key -> photo shown as its circular map marker */
const SPECIES_FALLBACK: Record<string, string> = {
  goldenCroc: "a-crocs",
  saltwaterCroc: "a-crocs",
  oldCroc: "a-crocs",
  albinoCroc: "a-crocs",
  swaiFish: "act-pondview",
  koiFish: "act-pondview",
  arapaima: "act-pondview",
};

function speciesImg(sp: string): string {
  if (SPECIES_FALLBACK[sp]) return SPECIES_FALLBACK[sp];
  for (const cat of animalCategories) {
    const hit = cat.animals.find((a) => a.species === sp);
    if (hit) return hit.img;
  }
  return "a-crocs";
}

/* island crop of map-base: grid (259,2)-(779,601) */
const CX0 = 259, CY0 = 2, CW = 520, CH = 599;
const posStyle = (pos: [number, number]) => ({
  left: `${(((pos[0] - CX0) / CW) * 100).toFixed(2)}%`,
  top: `${(((pos[1] - CY0) / CH) * 100).toFixed(2)}%`,
});

export default function MapExplorer({ locale, d }: { locale: Locale; d: Dict }) {
  const [showAnimals, setShowAnimals] = useState(false);
  const [popupId, setPopupId] = useState<string | null>(null);
  const t = (x: { th: string; en: string; zh: string }) => x[locale];

  const popup = popupId ? mapPoints.find((p) => p.id === popupId) ?? null : null;

  // keep the opened popup within view (the stage pans)
  useEffect(() => {
    if (popupId) {
      document.querySelector(".mapx__popup")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [popupId]);
  const pointName = (id: string): string => {
    const pt = mapPoints.find((p) => p.id === id)!;
    return pt.nameKey ? pointTexts[pt.nameKey].name[locale] : speciesNames[pt.sp[0]][locale];
  };

  return (
    <div className="mapx">
      <div className="mapx__stage" onClick={() => setPopupId(null)}>
        <div className="mapx__canvas" data-nosave>
          <img src={imgSrc("map-island")} alt={d.map.title} className="base" draggable={false} />

          {mapPoints.map((pt) => (
            <button
              key={pt.id}
              className={`mapx__place ${popupId === pt.id ? "mapx__place--on" : ""}`}
              style={posStyle(pt.pos)}
              aria-label={pt.nameKey ? pointTexts[pt.nameKey].name[locale] : speciesNames[pt.sp[0]][locale]}
              title={pt.nameKey ? pointTexts[pt.nameKey].name[locale] : speciesNames[pt.sp[0]][locale]}
              onClick={(e) => {
                e.stopPropagation();
                setPopupId(pt.id === popupId ? null : pt.id);
              }}
            >
              <span className="mapx__placedot" />
            </button>
          ))}

          {showAnimals &&
            animalSpots.map((a) => (
              <button
                key={a.sp}
                className="mapx__ani"
                style={posStyle(a.pos)}
                title={speciesNames[a.sp][locale]}
                aria-label={speciesNames[a.sp][locale]}
                onClick={(e) => {
                  e.stopPropagation();
                  const pt = mapPoints.find((p) => p.sp.includes(a.sp));
                  if (pt) setPopupId(pt.id);
                }}
              >
                <img src={imgSrc(speciesImg(a.sp))} alt={speciesNames[a.sp][locale]} loading="lazy" />
              </button>
            ))}

          {popup && (
            <div
              className={`mapx__popup ${popup.pos[1] < 42 ? "mapx__popup--below" : ""} ${
                popup.pos[0] < 38 ? "mapx__popup--right" : ""
              } ${popup.pos[0] > 62 ? "mapx__popup--left" : ""}`}
              style={posStyle(popup.pos)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mapx__popuphead">
                <h3>{pointName(popup.id)}</h3>
                <button className="mapx__popupx" aria-label={d.map.close} onClick={() => setPopupId(null)}>
                  ✕
                </button>
              </div>
              <div className="mapx__popuplist">
                {[...new Set(popup.sp)].map((sp) => (
                  <div className="mapx__popupani" key={sp}>
                    <img src={imgSrc(speciesImg(sp))} alt={speciesNames[sp][locale]} loading="lazy" />
                    <span>{speciesNames[sp][locale]}</span>
                  </div>
                ))}
              </div>
              <Link href={`/${locale}/animals/`} className="mapx__morelink">
                {d.map.viewAnimals} →
              </Link>
            </div>
          )}
        </div>
      </div>

      <button
        className={`mapx__paw ${showAnimals ? "mapx__paw--on" : ""}`}
        aria-pressed={showAnimals}
        aria-label={t({ th: "แสดงตำแหน่งสัตว์", en: "Show animal locations", zh: "显示动物位置" })}
        title={t({ th: "แสดงตำแหน่งสัตว์", en: "Show animal locations", zh: "显示动物位置" })}
        onClick={(e) => {
          e.stopPropagation();
          setShowAnimals((v) => !v);
        }}
      >
        <img src={imgSrc("paw-pin")} alt="" />
      </button>

      <p className="mapx__hint">📍 {d.map.hint}</p>
    </div>
  );
}
