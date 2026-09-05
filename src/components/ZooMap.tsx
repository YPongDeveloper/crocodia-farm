"use client";

import { useRef, useState } from "react";
import { imgSrc } from "@/assets";
import Link from "next/link";
import { zones } from "@/i18n/data";
import { speciesNames, zoneTexts } from "@/i18n/names";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function ZooMap({ locale, d }: { locale: Locale; d: Dict }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const pick = (id: string | null) => {
    const z = zones.find((z) => z.id === id);
    return z ? zoneTexts[z.id] : null;
  };
  const activeZone = selected ?? hovered;
  const activeDef = zones.find((z) => z.id === activeZone);
  const texts = pick(activeZone);
  const hoverTexts = pick(hovered);

  const moveTip = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const pathFor = (polys: [number, number][]) =>
    "M" + polys.map(([x, y]) => `${x},${y}`).join(" L") + " Z";

  return (
    <>
      <div className="mapstage" data-nosave>
        <div
          className="mapstage__canvas"
          ref={canvasRef}
          onMouseMove={moveTip}
          onMouseLeave={() => {
            setHovered(null);
            setTip(null);
          }}
        >
          <img src={imgSrc("map-base")} alt={d.map.title} className="base" draggable={false} />

          {/* permanent zone labels */}
          {zones.map((z) => (
            <span
              key={`lb-${z.id}`}
              className={`zonelabel ${activeZone === z.id ? "zonelabel--hot" : ""}`}
              style={{ left: `${z.label[0] / 10}%`, top: `${z.label[1] / 10}%` }}
            >
              {zoneTexts[z.id].name[locale]}
            </span>
          ))}

          <svg className="zonesvg" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="false">
            {zones.map((z) => (
              <g key={z.id}>
                {z.polys.map((poly, i) => (
                  <path
                    key={i}
                    d={pathFor(poly)}
                    className={`zone ${activeZone === z.id ? "zone--on" : ""}`}
                    style={activeZone === z.id ? { fill: z.color, fillOpacity: 0.55 } : undefined}
                    onMouseEnter={() => setHovered(z.id)}
                    onClick={() => setSelected(z.id === selected ? null : z.id)}
                  >
                    <title>{zoneTexts[z.id].name[locale]}</title>
                  </path>
                ))}
              </g>
            ))}
          </svg>

          {hovered && tip && hoverTexts && (
            <div
              className="zonelabel zonelabel--hot"
              style={{ left: tip.x, top: tip.y - 14, transform: "translate(-50%,-110%)" }}
            >
              {hoverTexts.name[locale]}
            </div>
          )}
        </div>
      </div>

      {/* legend */}
      <div className="maplegend">
        {zones.map((z) => (
          <button
            key={`lg-${z.id}`}
            onMouseEnter={() => setHovered(z.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(z.id === selected ? null : z.id)}
            style={activeZone === z.id ? { borderColor: "var(--brand)", color: "var(--brand-deep)" } : undefined}
          >
            <i style={{ background: z.color }} />
            {zoneTexts[z.id].name[locale]}
          </button>
        ))}
      </div>

      {/* selected zone panel */}
      {selected && texts && (
        <div className="zpanel" style={{ marginTop: 22 }}>
          <div className="zpanel__head">
            <span style={{ fontSize: "1.3rem" }}>{activeDef?.animals.length ? "🐾" : "📍"}</span>
            <h3>{texts.name[locale]}</h3>
            <button className="zpanel__close" aria-label={d.map.close} onClick={() => setSelected(null)}>
              ✕
            </button>
          </div>
          <div className="zpanel__body">
            <p style={{ marginBottom: 10 }}>{texts.desc[locale]}</p>
            <h5>📌 {d.map.inThisZone}</h5>
            <div className="chips">
              {texts.items[locale].map((it) => (
                <span className="chip" key={it}>
                  <span className="chip__dot" />
                  {it}
                </span>
              ))}
            </div>
            {activeDef && activeDef.animals.length > 0 && (
              <>
                <h5>🐾 {d.map.animalsHere}</h5>
                <div className="chips">
                  {activeDef.animals.map((sp) => (
                    <span className="chip" key={sp}>
                      <span className="chip__dot" style={{ background: "var(--accent)" }} />
                      {speciesNames[sp][locale]}
                    </span>
                  ))}
                </div>
                <p style={{ marginTop: 14, marginBottom: 0 }}>
                  <Link href={`/${locale}/animals/`} className="btn btn--primary" style={{ padding: "9px 20px", fontSize: ".95rem" }}>
                    {d.map.viewAnimals} →
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
