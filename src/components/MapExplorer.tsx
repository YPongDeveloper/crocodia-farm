"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { animalCategories, mapPoints } from "@/i18n/data";
import { speciesNames, pointTexts } from "@/i18n/names";
import { imgSrc } from "@/assets";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** species key -> image used in the photo panel */
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

export default function MapExplorer({ locale, d }: { locale: Locale; d: Dict }) {
  const [pointId, setPointId] = useState<string | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);

  const points = mapPoints;

  const t = (x: { th: string; en: string; zh: string }) => x[locale];

  const pointName = (id: string): string => {
    const pt = points.find((p) => p.id === id)!;
    return pt.nameKey ? pointTexts[pt.nameKey].name[locale] : speciesNames[pt.sp[0]][locale];
  };

  const selected = pointId ? points.find((p) => p.id === pointId)! : null;

  // all species that appear on the map, in point order
  const allSpecies = useMemo(() => {
    const seen: string[] = [];
    for (const p of points) for (const sp of p.sp) if (!seen.includes(sp)) seen.push(sp);
    return seen;
  }, [points]);

  const selectSpecies = (sp: string) => {
    if (speciesFilter === sp) {
      setSpeciesFilter(null);
      return;
    }
    setSpeciesFilter(sp);
    const first = points.find((p) => p.sp.includes(sp));
    if (first) setPointId(first.id);
  };

  const selectPoint = (id: string) => {
    setPointId(id === pointId ? null : id);
    setSpeciesFilter(null);
  };

  return (
    <div className="mapx">
      <p className="mapx__hint">
        📍 {d.map.hint}
      </p>

      <div className="mapx__wrap">
      <div className="mapx__stage" data-nosave>
        <div className="mapx__canvas">
          <img src={imgSrc("map-base")} alt={d.map.title} className="base" draggable={false} />
          {points.map((pt) => {
            const hot = pointId === pt.id || (speciesFilter ? pt.sp.includes(speciesFilter) : false);
            const dim = (speciesFilter || pointId) && !hot;
            return (
              <button
                key={pt.id}
                className={`mapx__pt ${hot ? "mapx__pt--hot" : ""} ${dim ? "mapx__pt--dim" : ""}`}
                style={{ left: `${pt.pos[0] / 10}%`, top: `${pt.pos[1] / 10}%` }}
                onClick={() => selectPoint(pt.id)}
                aria-label={pointName(pt.id)}
              >
                <span className="mapx__dot" />
                <span className="mapx__lbl">{pointName(pt.id)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mapx__side">
        {selected ? (
          <div className="mapx__detail">
            <div className="mapx__detailhead">
              <h3>{pointName(selected.id)}</h3>
              <button className="mapx__close" aria-label={d.map.close} onClick={() => setPointId(null)}>
                ✕
              </button>
            </div>
            <div className="mapx__photos">
              {[...new Set(selected.sp)].map((sp) => (
                <figure key={sp}>
                  <img src={imgSrc(speciesImg(sp))} alt={speciesNames[sp][locale]} loading="lazy" />
                  <figcaption>{speciesNames[sp][locale]}</figcaption>
                </figure>
              ))}
            </div>
            <Link href={`/${locale}/animals/`} className="mapx__morelink">
              {d.map.viewAnimals} →
            </Link>
          </div>
        ) : (
          <div className="mapx__detail mapx__detail--empty">
            <p>👆 {t({ th: "กดจุดบนแผนที่ หรือเลือกสัตว์ด้านล่าง", en: "Tap a point on the map, or pick an animal below", zh: "点击地图上的点，或在下方选择动物" })}</p>
          </div>
        )}

        <div className="mapx__selwrap">
          <h4>🐾 {d.map.animalsHere}</h4>
          <div className="mapx__sel">
            {allSpecies.map((sp) => (
              <button
                key={sp}
                className={`mapx__chip ${speciesFilter === sp ? "mapx__chip--on" : ""}`}
                onClick={() => selectSpecies(sp)}
              >
                <img src={imgSrc(speciesImg(sp))} alt="" loading="lazy" />
                <span>{speciesNames[sp][locale]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
