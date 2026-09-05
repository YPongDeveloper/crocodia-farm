/* Locale-independent structured data: zone polygons, gallery images, prices. */
/* Polygons live in a 0–1000 coordinate space matching the cleaned map image
   (x right, y down). Rendered in an SVG with viewBox="0 0 1000 1000"
   preserveAspectRatio="none" stretched over the image. */

export type ZoneId =
  | "elephant" | "reptile" | "predator" | "monkey" | "lake" | "kidsfarm"
  | "crocshow" | "crocjump" | "breeding" | "golden" | "dino" | "entrance" | "service";

export interface ZoneDef {
  id: ZoneId;
  /** one or more polygons per zone */
  polys: [number, number][][];
  /** pastel hover color */
  color: string;
  /** small centroid label position [x, y] */
  label: [number, number];
  /** species keys present in this zone */
  animals: string[];
}

export const zones: ZoneDef[] = [
  {
    id: "service",
    polys: [
      [[495, 52], [670, 42], [702, 92], [763, 122], [792, 188], [770, 268], [698, 292], [638, 274], [600, 232], [568, 168], [534, 95]],
    ],
    color: "#B7E4C7",
    label: [630, 150],
    animals: [],
  },
  {
    id: "reptile",
    polys: [[[332, 218], [402, 196], [522, 188], [556, 218], [562, 282], [532, 325], [448, 330], [382, 315], [337, 272]]],
    color: "#CDB4DB",
    label: [440, 255],
    animals: ["iguana", "turtle", "snake", "monitorLizard"],
  },
  {
    id: "predator",
    polys: [[[303, 223], [375, 230], [387, 305], [387, 425], [375, 495], [335, 500], [307, 425], [297, 315]]],
    color: "#FFD6A5",
    label: [340, 360],
    animals: ["lion", "tiger", "sunBear", "blackBear", "binturong", "hippo", "peacock", "turkey"],
  },
  {
    id: "monkey",
    polys: [[[383, 313], [457, 307], [487, 335], [480, 373], [440, 387], [393, 380], [377, 345]]],
    color: "#FFC9DE",
    label: [428, 345],
    animals: ["macaque", "gibbon", "wildBoar", "raccoon"],
  },
  {
    id: "elephant",
    polys: [[[470, 200], [560, 195], [600, 230], [640, 262], [650, 300], [600, 330], [560, 345], [540, 375], [490, 380], [470, 330], [455, 270]]],
    color: "#FFB4A2",
    label: [550, 285],
    animals: ["elephant"],
  },
  {
    id: "lake",
    polys: [
      [[362, 296], [442, 290], [458, 335], [462, 420], [520, 448], [522, 508], [488, 522], [450, 578], [382, 582], [356, 470]],
      [[548, 295], [610, 282], [655, 300], [668, 355], [700, 390], [655, 430], [600, 420], [560, 380], [545, 340]],
    ],
    color: "#A2D2FF",
    label: [430, 430],
    animals: ["swaiFish", "koiFish", "arapaima"],
  },
  {
    id: "kidsfarm",
    polys: [[[350, 540], [485, 530], [560, 540], [575, 580], [560, 620], [485, 645], [415, 637], [367, 613], [345, 573]]],
    color: "#FFF3B0",
    label: [455, 585],
    animals: ["capybara", "miniPig", "goat", "sheep", "alpaca", "rabbit", "turtle", "goose", "emu", "cassowary", "ostrich", "deer"],
  },
  {
    id: "crocshow",
    polys: [[[318, 672], [400, 662], [445, 672], [450, 718], [390, 752], [330, 748], [308, 712]]],
    color: "#F4978E",
    label: [378, 705],
    animals: ["crocodile"],
  },
  {
    id: "crocjump",
    polys: [[[330, 748], [407, 740], [465, 755], [467, 815], [435, 870], [380, 878], [335, 840], [317, 790]]],
    color: "#9BF6FF",
    label: [390, 805],
    animals: ["crocodile", "saltwaterCroc", "oldCroc"],
  },
  {
    id: "breeding",
    polys: [
      [[545, 455], [640, 452], [715, 545], [712, 650], [645, 758], [565, 730], [505, 640], [518, 520]],
      [[480, 455], [528, 450], [532, 640], [485, 645]],
      [[495, 722], [620, 720], [622, 792], [498, 795]],
    ],
    color: "#BDE0FE",
    label: [625, 585],
    animals: ["crocodile", "albinoCroc"],
  },
  {
    id: "dino",
    polys: [[[492, 655], [610, 652], [612, 724], [495, 726]]],
    color: "#C8B6FF",
    label: [552, 690],
    animals: [],
  },
  {
    id: "golden",
    polys: [[[538, 545], [610, 540], [615, 625], [568, 660], [536, 640], [522, 588]]],
    color: "#FFE066",
    label: [572, 598],
    animals: ["goldenCroc"],
  },
  {
    id: "entrance",
    polys: [
      [[418, 788], [668, 782], [672, 864], [424, 868]],
      [[430, 868], [585, 864], [588, 995], [434, 998]],
      [[332, 842], [428, 852], [428, 942], [335, 932]],
      [[588, 830], [712, 825], [718, 912], [592, 918]],
    ],
    color: "#CAFFBF",
    label: [540, 825],
    animals: [],
  },
];

/* ------------------------- animals gallery ------------------------- */

export interface AnimalEntry {
  species: string;
  img: string;
}

export const animalCategories: { id: string; animals: AnimalEntry[] }[] = [
  {
    id: "crocs",
    animals: [
      { species: "crocodile", img: "a-crocs" },
      { species: "iguana", img: "a-iguana" },
      { species: "snake", img: "a-python" },
      { species: "turtle", img: "a-turtle" },
    ],
  },
  {
    id: "bigcats",
    animals: [
      { species: "tiger", img: "a-tiger" },
      { species: "tigerCub", img: "a-tigercub" },
      { species: "lion", img: "lion-photo" },
    ],
  },
  {
    id: "giants",
    animals: [
      { species: "hippo", img: "a-hippo" },
      { species: "elephant", img: "a-elephant" },
      { species: "elephant2", img: "a-eleph2" },
      { species: "deer", img: "a-deer" },
      { species: "deer", img: "a-deer2" },
      { species: "albinoBuffalo", img: "a-cow" },
    ],
  },
  {
    id: "mammals",
    animals: [
      { species: "blackBear", img: "a-bear" },
      { species: "sunBear", img: "a-sunbear" },
      { species: "chimp", img: "a-chimp" },
      { species: "gibbon", img: "a-gibbon" },
      { species: "binturong", img: "a-binturong" },
      { species: "capybara", img: "a-capybara" },
      { species: "miniPig", img: "a-minipig" },
    ],
  },
  {
    id: "birds",
    animals: [
      { species: "peacock", img: "a-peacock" },
      { species: "peacock", img: "a-peacock2" },
      { species: "macaw", img: "a-macaw" },
      { species: "cockatoo", img: "a-cockatoo" },
    ],
  },
  {
    id: "farm",
    animals: [
      { species: "goat", img: "a-goat" },
      { species: "alpaca", img: "a-alpaca" },
    ],
  },
];

/* --------------------------- show times ---------------------------- */

export const crocShowTimes = {
  weekday: ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
  weekend: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
};

export const elephantShowTimes = {
  weekday: ["10:30", "11:30", "13:30", "14:30", "15:30", "16:30"],
  weekend: ["10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"],
};

/* --------------------------- price tables -------------------------- */
/* [nameKey, price, optional flag] */

export const feedingPrices: [string, number, "weekend" | null][] = [
  ["rabbit", 20, null],
  ["miniPigMilk", 20, null],
  ["lion", 20, "weekend"],
  ["fish", 40, null],
  ["hippo", 40, null],
  ["goat", 40, null],
  ["sheep", 40, null],
  ["horse", 40, null],
  ["elephant", 40, null],
  ["blackBear", 40, null],
  ["buffalo", 40, null],
  ["tiger", 50, "weekend"],
  ["crocodile", 50, null],
  ["crocFishing", 50, null],
  ["capybara", 50, null],
  ["giantCroc", 0, "weekend"],
];

export const photoPrices: [string, number][] = [
  ["elephant", 50],
  ["smallSnake", 50],
  ["horse", 50],
  ["binturong", 50],
  ["babyCroc", 50],
  ["bigCroc", 100],
  ["lion", 200],
  ["babyChimp", 200],
  ["bigPython", 200],
];

export const homeGallery = ["act-train", "show-wrestling", "a-hippo", "act-boat", "a-tiger", "hero-scenic", "a-alpaca", "act-jump"];
