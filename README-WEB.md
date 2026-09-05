# เว็บไซต์ฟาร์มจระเข้และสวนสัตว์ สมุทรปราการ

เว็บไซต์ static (Next.js App Router →  export เป็น HTML ล้วน) 3 ภาษา: ไทย / English / 中文
ไม่มี backend — ทุกหน้าเป็น HTML สำเร็จรูป จึงโหลดเร็วและโจมตียาก

## โครงสร้าง

```
web/
├── public/
│   ├── img/               รูป WebP ที่ optimize แล้ว (สร้างโดย scripts/optimize-images.mjs)
│   ├── _headers           security headers สำหรับ Netlify / Cloudflare Pages
│   └── icon-96.png        favicon
├── scripts/
│   ├── optimize-images.mjs  แปลงรูปจาก ../information/_picked → public/img (WebP, คีพื้นดำ→โปร่งใส)
│   └── key-logo.py          ตัดพื้นหลังลายตารางออกจากโลโก้ (flood fill) → logo.webp + icon-96.png
├── src/
│   ├── app/
│   │   ├── layout.tsx     root layout + favicon
│   │   ├── page.tsx       redirect / → /th/
│   │   └── [locale]/      th | en | zh
│   │       ├── page.tsx            หน้าแรก (hero, ไฮไลต์, ราคาบัตร, แกลเลอรี)
│   │       ├── services/           โชว์ + เวลาแสดง + ราคาให้อาหาร/ถ่ายรูป + กิจกรรม + อาหาร + ทัศนศึกษา
│   │       ├── history/            ประวัติแบบ on-scroll timeline
│   │       ├── animals/            แท็บหมวดสัตว์ + lightbox
│   │       ├── dinosaurs/          parallax scrolling + นิทรรศการ
│   │       ├── map/                แผนที่อินเทอร์แอคทีฟ 13 โซน (SVG overlay)
│   │       └── contact/            ที่อยู่ โทร LINE โซเชียล การเดินทาง
│   ├── components/        Nav, Footer, Pic, Reveal, ParallaxLayer, ZooMap, AnimalGallery, AntiCopy
│   ├── i18n/
│   │   ├── config.ts      locales
│   │   ├── dictionaries.ts ข้อความ UI 3 ภาษา
│   │   ├── names.ts       ชื่อสัตว์/โซน/รายการ 3 ภาษา
│   │   └── data.ts        ราคา เวลาแสดง พิกัดโซน (ไม่ผูกภาษา)
│   └── assets.ts          ASSET_V (เปลี่ยนเลขนี้เมื่อรูปเปลี่ยน → bust cache)
└── out/                   ผลลัพธ์ static (deploy โฟลเดอร์นี้)
```

## คำสั่ง

```bash
npm install
npm run optimize   # แปลงรูปจาก information/_picked → public/img (รันครั้งเดียว หรือเมื่อรูปเปลี่ยน)
npm run dev        # dev server
npm run build      # build → out/
```

ทดสอบไฟล์ static ก่อน deploy: `cd out && python -m http.server 8000`

## การ deploy

อัปโหลดเนื้อหาใน `out/` ขึ้น static host ใดก็ได้:

- **Cloudflare Pages / Netlify** — ลากโฟลเดอร์ `out/` ทิ้งได้เลย (`_headers` ถูกอ่านอัตโนมัติ)
- **GitHub Pages** — push เนื้อหา `out/` ขึ้น branch `gh-pages`
- **nginx** — `root` ชี้ที่ `out/` และเพิ่ม headers ตามไฟล์ `public/_headers` เช่น
  `add_header X-Frame-Options SAMEORIGIN;` ฯลฯ

## ด้านประสิทธิภาพ (เป้าหมายใช้งานได้ที่เน็ต ~125kbps)

- Static export: 0 request ไป backend, HTML ต่อหน้า ~15–20 KB (gzip)
- รูปทั้งหมดเป็น WebP ขนาดพอดีการใช้งาน (hero 1440px, การ์ด 560px, thumb 420px) รวมทุกหน้า ~3MB
  แต่แต่ละหน้าโหลดเฉพาะรูปตัวเองแบบ `loading="lazy"` (หน้าแรกโหลดจริง ~400–500KB รวมรูป)
- ฟอนต์ Mitr (ไทย+ละติน) 2 น้ำหนัก โหลดแบบ `display: swap` — จีนใช้ฟอนต์ระบบ (PingFang/ YaHei) ไม่โหลดเพิ่ม
- ไม่มี CSS/JS framework หนัก ๆ — อนิเมชันทั้งหมดเขียนเองด้วย IntersectionObserver + rAF (~3KB)
- `prefers-reduced-motion` ปิดอนิเมชันให้ผู้ที่ตั้งค่าไว้

## ด้านความปลอดภัย

- ไม่มี backend/database → ไม่มีช่องโหวงฝั่งเซิร์ฟเวอร์แบบเว็บทั่วไป
- `public/_headers` ตั้ง CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS
- ลิงก์ภายนอกทุกตัวเป็น `rel="noopener noreferrer nofollow"`
- ปิด source maps ใน production (ค่า default ของ Next)
- การกันคัดลอก (`AntiCopy.tsx`): ปิดคลิกขวาที่รูป, ปิดลากรูป, บล็อก Ctrl+S/U, F12 — เป็นการ "เพิ่มกำแพง"
  ไม่ใช่การป้องกัน 100% (โค้ดฝั่งหน้าเว็บไม่สามารถซ่อนจากผู้ใช้ได้จริงตามหลักการของเว็บ)

## การแก้ไขเนื้อหา

- **ราคา/เวลาแสดง**: `src/i18n/data.ts` (feedingPrices, photoPrices, crocShowTimes, …)
- **ข้อความ 3 ภาษา**: `src/i18n/dictionaries.ts` + `src/i18n/names.ts`
- **โซนในแผนที่**: แก้ `polys` (พิกัด 0–1000 บนภาพแผนที่) และ `zoneTexts` ใน `names.ts`
- **เปลี่ยนรูป**: เพิ่มไฟล์ใน `information/_picked/` → แก้รายชื่อใน `scripts/optimize-images.mjs`
  → `npm run optimize` → เปลี่ยน `ASSET_V` ใน `src/assets.ts`
- **เครดิตผู้พัฒนา**: `src/i18n/dictionaries.ts` (key `footer.credit`) — ปรากฏท้ายทุกหน้า

---
Develop and design by mr.pongsakorn.y yimsukanan.p@gmail.com
