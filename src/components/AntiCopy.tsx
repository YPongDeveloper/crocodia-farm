"use client";

import { useEffect } from "react";

/** Light deterrence for content copying: blocks context menu on images,
 *  image drag-to-save and common save/source shortcut keys.
 *  (Front-end code can never be perfectly protected — this raises the bar
 *  while keeping normal UX intact: text stays selectable.) */
export default function AntiCopy() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "IMG" || t.closest("[data-nosave]")) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "IMG") e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const combo = e.ctrlKey || e.metaKey;
      if ((combo && (k === "s" || k === "u")) || k === "f12" || (combo && e.shiftKey && k === "i")) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
