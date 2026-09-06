import type { Locale } from "./config";

type T = Record<Locale, string>;

export const speciesNames: Record<string, T> = {
  crocodile:     { th: "จระเข้ไทย", en: "Thai Crocodile", zh: "泰国鳄鱼" },
  saltwaterCroc: { th: "จระเข้น้ำเค็ม", en: "Saltwater Crocodile", zh: "湾鳄" },
  albinoCroc:    { th: "จระเข้เผือก", en: "Albino Crocodile", zh: "白化鳄鱼" },
  goldenCroc:    { th: "จระเข้ทอง-เผือก", en: "Golden & Albino Crocodile", zh: "黄金-白化鳄鱼" },
  oldCroc:       { th: "จระเข้อายุ 100 ปี", en: "100-Year-Old Crocodile", zh: "百岁鳄鱼" },
  iguana:        { th: "อีกัวน่า", en: "Iguana", zh: "鬣蜥" },
  snake:         { th: "งูหลามทอง", en: "Golden Python", zh: "黄金蟒" },
  monitorLizard: { th: "ตะกวด", en: "Water Monitor", zh: "圆鼻巨蜥" },
  turtle:        { th: "เต่า", en: "Turtle", zh: "龟" },
  tiger:         { th: "เสือโคร่ง", en: "Tiger", zh: "老虎" },
  tigerCub:      { th: "ลูกเสือโคร่ง", en: "Tiger Cub", zh: "小老虎" },
  lion:          { th: "สิงโต", en: "Lion", zh: "狮子" },
  hippo:         { th: "ฮิปโปโปเตมัส", en: "Hippopotamus", zh: "河马" },
  elephant:      { th: "ช้างเอเชีย", en: "Asian Elephant", zh: "亚洲象" },
  elephant2:     { th: "ช้างไทย", en: "Thai Elephant", zh: "泰国大象" },
  blackBear:     { th: "หมีควาย", en: "Asiatic Black Bear", zh: "亚洲黑熊" },
  sunBear:       { th: "หมีขอ", en: "Sun Bear", zh: "马来熊" },
  chimp:         { th: "ลิงชิมแพนซี", en: "Chimpanzee", zh: "黑猩猩" },
  gibbon:        { th: "ชะนี", en: "Gibbon", zh: "长臂猿" },
  macaque:       { th: "ลิงแสม ลิงกัง ลิงซีลีบัส", en: "Macaques & Celebes Ape", zh: "猕猴与黑冠猕猴" },
  raccoon:       { th: "แรคคูน", en: "Raccoon", zh: "浣熊" },
  wildBoar:      { th: "หมูป่า", en: "Wild Boar", zh: "野猪" },
  binturong:     { th: "หมีพู (บินเทอรอง)", en: "Binturong", zh: "熊狸" },
  capybara:      { th: "คาปิบาร่า", en: "Capybara", zh: "水豚" },
  miniPig:       { th: "หมูแคระ", en: "Miniature Pig", zh: "迷你猪" },
  alpaca:        { th: "อัลปาก้า", en: "Alpaca", zh: "羊驼" },
  goat:          { th: "แพะ", en: "Goat", zh: "山羊" },
  sheep:         { th: "แกะ", en: "Sheep", zh: "绵羊" },
  rabbit:        { th: "กระต่าย", en: "Rabbit", zh: "兔子" },
  deer:          { th: "กวาง", en: "Deer", zh: "鹿" },
  albinoBuffalo: { th: "ควายเผือก", en: "Albino Buffalo", zh: "白水牛" },
  peacock:       { th: "นกยูงอินเดีย", en: "India Peacock", zh: "印度孔雀" },
  turkey:        { th: "ไก่งวง", en: "Turkey", zh: "火鸡" },
  ostrich:       { th: "นกกระจอกเทศ", en: "Ostrich", zh: "鸵鸟" },
  emu:           { th: "นกอีมู", en: "Emu", zh: "鸸鹋" },
  cassowary:     { th: "นกคาสโซวารี", en: "Cassowary", zh: "鹤鸵" },
  goose:         { th: "ห่าน", en: "Goose", zh: "鹅" },
  macaw:         { th: "นกมาคอว์", en: "Macaw", zh: "金刚鹦鹉" },
  cockatoo:      { th: "นกค็อกคาทัว", en: "Cockatoo", zh: "凤头鹦鹉" },
  swaiFish:      { th: "ปลาสวาย", en: "Swai Fish", zh: "巴丁鱼" },
  koiFish:       { th: "ปลาคาร์ฟ", en: "Koi Fish", zh: "锦鲤" },
  arapaima:      { th: "ปลาช่อนอเมซอน", en: "Arapaima", zh: "巨骨舌鱼" },
};

export const zoneTexts: Record<string, { name: T; desc: T; items: Record<Locale, string[]> }> = {
  elephant: {
    name: { th: "เขตช้าง", en: "Elephant Village", zh: "大象园" },
    desc: {
      th: "บ้านของช้างไทยแสนรู้ มีโรงนอนช้าง บ่ออาบน้ำ และลานแสดงช้าง",
      en: "Home of Thailand's clever elephants — stables, bathing pond and the show ground",
      zh: "聪明大象的家——象舍、洗象池与大象表演场",
    },
    items: {
      th: ["โรงนอนช้าง", "บริเวณอาบน้ำช้าง", "ลานแสดงช้าง", "จุดให้อาหารและถ่ายรูปช้าง", "จุดจำหน่ายอาหารช้าง"],
      en: ["Elephant stables", "Elephant bathing pond", "Elephant show ground", "Feeding & photo point", "Elephant food stand"],
      zh: ["象舍", "大象洗浴区", "大象表演场", "喂食与拍照点", "大象饲料摊"],
    },
  },
  reptile: {
    name: { th: "โซนสัตว์เลื้อยคลาน", en: "Exotic Reptile Zone", zh: "珍奇爬行动物区" },
    desc: {
      th: "โลกของสัตว์เลื้อยคลานหาชมยาก พร้อมศูนย์เพาะเลี้ยงสัตว์ป่าและคอกสัตว์เลี้ยง",
      en: "A world of rare reptiles, plus the wildlife breeding centre and small paddocks",
      zh: "珍稀爬行动物的世界，另有野生动物繁育中心与小牧场",
    },
    items: {
      th: ["โซนสัตว์เลื้อยคลาน", "เต่า งู ตะกวด", "ศูนย์เพาะเลี้ยงสัตว์ป่า", "คอกม้า", "คอกแพะ", "ควายเผือก"],
      en: ["Exotic reptile house", "Turtles, snakes & monitors", "Wildlife breeding centre", "Horse stable", "Goat pen", "Albino buffalo"],
      zh: ["爬行动物馆", "龟、蛇、巨蜥", "野生动物繁育中心", "马厩", "山羊圈", "白水牛"],
    },
  },
  predator: {
    name: { th: "เส้นทางสัตว์นักล่า", en: "Predator Trail", zh: "猛兽步道" },
    desc: {
      th: "เดินตามทางเท้าสัมผัสฝูงนักล่า สิงโต เสือโคร่ง หมี ฮิปโป และนกสวยงามระหว่างทาง",
      en: "Walk the shaded path past lions, tigers, bears, a hippo and beautiful birds",
      zh: "沿林荫小径近距离观看狮子、老虎、熊、河马及沿途的美丽鸟类",
    },
    items: {
      th: ["อุทยานสิงโต (Lion Pit)", "อุทยานเสือโคร่ง", "บ่อฮิปโปโปเตมัส", "กรงหมีขอและหมีควาย", "กรงหมีพู", "นกยูงอินเดีย", "ไก่งวง"],
      en: ["Lion Pit", "Tiger Pit", "Hippopotamus pond", "Sun bear & black bear cages", "Binturong cage", "India peafowl", "Turkeys"],
      zh: ["狮子园", "虎园", "河马池", "马来熊与亚洲黑熊", "熊狸笼", "印度孔雀", "火鸡"],
    },
  },
  monkey: {
    name: { th: "เกาะลิง", en: "Monkey Hill", zh: "猴山" },
    desc: {
      th: "เกาะเล็กกลางสระน้ำ บ้านของฝูงลิงหลายชนิดที่ชอบเล่นน้ำ",
      en: "A small island in the pond, home to playful troops of monkeys",
      zh: "池塘中的小岛，是多群猴子的乐园",
    },
    items: {
      th: ["เกาะลิงกลางสระ", "ลิงแสม ลิงซีลีบัส ลิงกัง", "ชะนี", "หมูป่า", "แรคคูน"],
      en: ["Monkey island", "Macaques & Celebes ape", "Gibbons", "Wild boar", "Raccoons"],
      zh: ["猴岛", "猕猴与黑冠猕猴", "长臂猿", "野猪", "浣熊"],
    },
  },
  lake: {
    name: { th: "สวนสระกลางฟาร์ม", en: "Lake Park", zh: "园区湖畔" },
    desc: {
      th: "สระน้ำใหญ่กลางฟาร์ม ปล่อยปลาให้อาหาร พักลมริมสระ และชมจุดชมวิวปราสาท",
      en: "The farm's big central pond — feed the fish, relax by the water, see the castle viewpoint",
      zh: "园区中央大湖——喂鱼、湖畔小憩、登上城堡观景台",
    },
    items: {
      th: ["บ่อปลาสวาย", "บ่อปลาคาร์ฟ", "ท่าเรือ/เรือพาย", "จุดชมวิว (ปราสาท)", "ศาลาพักผ่อน", "สวนหย่อม"],
      en: ["Swai fish pond", "Koi pond", "Pier & rowboats", "Castle viewpoint", "Rest pavilions", "Gardens"],
      zh: ["巴丁鱼池", "锦鲤池", "码头/划艇", "观景台（城堡）", "凉亭", "花园"],
    },
  },
  kidsfarm: {
    name: { th: "ฟาร์มเด็กและสวนนก", en: "Kids Farm & Bird Garden", zh: "儿童农场与鸟园" },
    desc: {
      th: "โซนโปรดของเด็ก ๆ อุ้มกระต่าย ให้อาหารคาปิบาร่า และขึ้นรถไฟรางชมฟาร์ม",
      en: "Kids' favourite — hold rabbits, feed capybaras and hop on the mini train",
      zh: "孩子们的最爱——抱兔子、喂水豚、乘坐观光小火车",
    },
    items: {
      th: ["สนามเด็กเล่น", "สถานีรถไฟ", "กรงนกและกรงไก่", "คอกแพะแกะ", "คอกม้า", "ลานกิจกรรม"],
      en: ["Playground", "Mini-train station", "Bird & chicken cages", "Goat & sheep pen", "Horse stable", "Activity lawn"],
      zh: ["儿童乐园", "小火车站", "鸟笼与鸡舍", "羊圈", "马厩", "活动草坪"],
    },
  },
  crocshow: {
    name: { th: "สนามแสดงจับจระเข้", en: "Crocodile Show Arena", zh: "捕鳄表演场" },
    desc: {
      th: "เวทีโชว์การต่อสู้และจับจระเข้ด้วยมือเปล่า ที่โด่งดังระดับโลก",
      en: "The world-famous bare-hand crocodile wrestling stage",
      zh: "世界闻名的徒手捕鳄表演舞台",
    },
    items: {
      th: ["บ่อแสดงจับจระเข้", "อัฒจันทร์ผู้ชม", "จุดถ่ายรูปกับจระเข้"],
      en: ["Wrestling pool", "Spectator stands", "Photo-with-croc point"],
      zh: ["捕鳄表演池", "观众看台", "与鳄鱼拍照点"],
    },
  },
  crocjump: {
    name: { th: "บ่อจระเข้กระโดดและบ่อตก", en: "Croc Jumping & Fishing", zh: "跳鳄池与垂钓池" },
    desc: {
      th: "ชมจระเข้กระโดดกินอาหาร ลองตกจระเข้ และพบจระเข้เก่าแก่กว่าร้อยปี",
      en: "Watch crocodiles leap for food, try crocodile fishing, and meet century-old crocs",
      zh: "观看鳄鱼跃起进食、体验鳄鱼垂钓，并见到上百岁的老鳄鱼",
    },
    items: {
      th: ["บ่อจระเข้กระโดด", "บ่อตกจระเข้", "บ่อจระเข้น้ำเค็ม", "บ่อจระเข้อายุ 100 ปี"],
      en: ["Jumping crocodile pool", "Crocodile fishing pool", "Saltwater crocodile ponds", "100-year-old crocodile pond"],
      zh: ["跳鳄池", "鳄鱼垂钓池", "湾鳄池", "百岁鳄鱼池"],
    },
  },
  breeding: {
    name: { th: "โลกจระเข้เพาะพันธุ์", en: "Crocodile Breeding World", zh: "鳄鱼繁育世界" },
    desc: {
      th: "หัวใจของฟาร์ม บ่อเพาะพันธุ์จระเข้ขนาดใหญ่นับร้อย พร้อมห้องฟักไข่และนิทรรศการ",
      en: "The heart of the farm — hundreds of breeding ponds, a hatching room and exhibitions",
      zh: "农场的心脏——数百个大型繁育池，还有孵蛋室与展览",
    },
    items: {
      th: ["บ่อเพาะพันธุ์จระเข้ขนาดใหญ่", "นิทรรศการการเพาะพันธุ์จระเข้", "ห้องฟักไข่จระเข้", "บ่อจระเข้เผือก", "บ่อปลา"],
      en: ["Large breeding ponds", "Crocodile breeding exhibition", "Crocodile egg hatching room", "Albino crocodile pond", "Fish pond"],
      zh: ["大型鳄鱼繁育池", "鳄鱼繁育展览", "鳄鱼孵蛋室", "白化鳄鱼池", "鱼池"],
    },
  },
  golden: {
    name: { th: "บ่อจระเข้ทอง-เผือก", en: "Golden Crocodile Pond", zh: "黄金白鳄池" },
    desc: {
      th: "จระเข้สีทองและสีเผือกหาชมยาก พร้อมจุดถ่ายรูปสุดพิเศษ",
      en: "Rare golden and albino crocodiles at a special photo spot",
      zh: "罕见的黄金鳄与白化鳄，另有特别拍照点",
    },
    items: {
      th: ["บ่อจระเข้ทอง-เผือก", "สะพานชมจระเข้", "จุดถ่ายรูป"],
      en: ["Golden & albino croc pond", "Viewing bridge", "Photo point"],
      zh: ["黄金-白化鳄鱼池", "观鳄桥", "拍照点"],
    },
  },
  dino: {
    name: { th: "พิพิธภัณฑ์ไดโนเสาร์", en: "Dinosaur Museum", zh: "恐龙博物馆" },
    desc: {
      th: "อาคารยาวตกแต่งยุคไดโนเสาร์ เข้าชมฟรีทุกวัน ปิด 16:00 น.",
      en: "A long dinosaur-themed hall — free every day, closes at 16:00",
      zh: "恐龙主题长馆——每日免费参观，16:00 关闭",
    },
    items: {
      th: ["นิทรรศการไดโนเสาร์", "โครงกระดูกและฟอสซิล", "ไข่จระเข้", "ปิด 16:00 น."],
      en: ["Dinosaur exhibits", "Skeletons & fossils", "Crocodile eggs", "Closes 16:00"],
      zh: ["恐龙展览", "骨架与化石", "鳄鱼蛋", "16:00 关闭"],
    },
  },
  entrance: {
    name: { th: "ลานทางเข้าและบริการ", en: "Entrance Plaza & Services", zh: "入口广场与服务区" },
    desc: {
      th: "ประตูทางเข้า-ออก จุดจำหน่ายบัตร ร้านอาหาร คาเฟ่ ร้านของฝาก และลานจอดรถ",
      en: "Main gate, ticket office, restaurant, café, souvenir shops and parking",
      zh: "主入口、售票处、餐厅、咖啡厅、纪念品店与停车场",
    },
    items: {
      th: ["ทางเข้า-ทางออก", "ห้องจำหน่ายบัตร", "ประชาสัมพันธ์", "ร้านอาหาร", "Croc Café", "ร้านค้า/ของฝาก", "ห้องสุขา", "ลานจอดรถยนต์-รถมอเตอร์ไซค์", "ศาลเจ้าแม่อุมาเทวี"],
      en: ["Entrance & exit", "Ticket office", "Information desk", "Restaurant", "Croc Café", "Souvenir shops", "Toilets", "Car & motorcycle parking", "Uma Devi shrine"],
      zh: ["出入口", "售票处", "咨询台", "餐厅", "Croc 咖啡厅", "纪念品店", "洗手间", "汽车/摩托车停车场", "乌玛天女神庙"],
    },
  },
  service: {
    name: { th: "สวนน้ำและพื้นที่ส่วนหลัง", en: "Reservoir & Green Belt", zh: "蓄水池与绿化区" },
    desc: {
      th: "อ่างเก็บสำรองน้ำขนาดใหญ่ สวนริมน้ำ ศาลาท่าเรือ และพื้นที่ป่าเขียวของฟาร์ม",
      en: "The large reservoir, lakeside garden, pavilion pier and the farm's green belt",
      zh: "大型蓄水池、湖畔花园、亭台码头与园区绿地",
    },
    items: {
      th: ["อ่างเก็บสำรองน้ำ", "ศาลา-ท่าเรือ", "สวนริมน้ำ", "บ่อปลาช่อนอเมซอน", "เรือนเพาะชำต้นไม้", "พื้นที่แยกขยะและปุ๋ยหมัก", "ลานกิจกรรมในอนาคต"],
      en: ["Water storage reservoir", "Pavilion & pier", "Lakeside garden", "Arapaima pond", "Tree nursery", "Waste & compost area", "Future activity ground"],
      zh: ["蓄水池", "亭台码头", "湖畔花园", "巨骨舌鱼池", "苗圃", "垃圾分类与堆肥区", "未来活动区"],
    },
  },
};

export const feedingNames: Record<string, T> = {
  rabbit:     { th: "กระต่าย", en: "Rabbit", zh: "兔子" },
  miniPigMilk:{ th: "หมูแคระ (จุดนม)", en: "Mini pig milk feeding", zh: "迷你猪喂奶" },
  lion:       { th: "สิงโต", en: "Lion", zh: "狮子" },
  fish:       { th: "ปลาสวาย / ปลาในบ่อ", en: "Fish (swai pond)", zh: "鱼（巴丁鱼池）" },
  hippo:      { th: "ฮิปโปโปเตมัส", en: "Hippopotamus", zh: "河马" },
  goat:       { th: "แพะ", en: "Goat", zh: "山羊" },
  sheep:      { th: "แกะ", en: "Sheep", zh: "绵羊" },
  horse:      { th: "ม้า", en: "Horse", zh: "马" },
  elephant:   { th: "ช้าง", en: "Elephant", zh: "大象" },
  blackBear:  { th: "หมีควาย", en: "Asiatic black bear", zh: "亚洲黑熊" },
  buffalo:    { th: "ควาย", en: "Buffalo", zh: "水牛" },
  tiger:      { th: "เสือโคร่ง", en: "Tiger", zh: "老虎" },
  crocodile:  { th: "จระเข้", en: "Crocodile", zh: "鳄鱼" },
  crocFishing:{ th: "ตกจระเข้", en: "Crocodile fishing", zh: "鳄鱼垂钓" },
  capybara:   { th: "คาปิบาร่า", en: "Capybara", zh: "水豚" },
  giantCroc:  { th: "จระเข้ยักษ์", en: "Giant crocodile", zh: "巨型鳄鱼" },
};

export const photoNames: Record<string, T> = {
  elephant:  { th: "กับช้าง", en: "With elephant", zh: "与大象" },
  smallSnake:{ th: "กับงูเล็ก", en: "With small snake", zh: "与小蛇" },
  horse:     { th: "กับม้า", en: "With horse", zh: "与马" },
  binturong: { th: "กับหมีพู", en: "With binturong", zh: "与熊狸" },
  babyCroc:  { th: "กับลูกจระเข้", en: "With baby crocodile", zh: "与小鳄鱼" },
  bigCroc:   { th: "กับจระเข้ตัวใหญ่", en: "With large crocodile", zh: "与大鳄鱼" },
  lion:      { th: "กับสิงโต", en: "With lion", zh: "与狮子" },
  babyChimp: { th: "กับลูกลิงชิมแพนซี", en: "With baby chimpanzee", zh: "与小黑猩猩" },
  bigPython: { th: "กับงูหลามตัวใหญ่", en: "With large python", zh: "与大蟒蛇" },
};

export const activityNames: Record<string, T> = {
  miniTrain: { th: "รถไฟรางชมฟาร์ม", en: "Mini train tour", zh: "观光小火车" },
  golfCart:  { th: "เช่ากอล์ฟคาร์ทขับเอง", en: "Self-drive golf cart", zh: "自驾高尔夫球车" },
  elephRide: { th: "ขี่ช้าง", en: "Elephant ride", zh: "骑象" },
  horseCart: { th: "รถม้า", en: "Horse carriage", zh: "马车" },
  airGun:    { th: "ยิงปืนอัดลม", en: "Air gun shooting", zh: "气枪射击" },
  framed:    { th: "รูปถ่ายใส่กรอบ", en: "Framed souvenir photo", zh: "相框纪念照" },
};

export const pointTexts: Record<string, { name: T }> = {
  bears:    { name: { th: "หมีขอ · หมีควาย", en: "Sun & Black Bears", zh: "马来熊·亚洲黑熊" } },
  monkey:   { name: { th: "เกาะลิง · ชะนี", en: "Monkey Hill & Gibbon", zh: "猴山·长臂猿" } },
  reptile:  { name: { th: "โซนสัตว์เลื้อยคลาน", en: "Reptile Zone", zh: "爬行动物区" } },
  lake:     { name: { th: "สระกลาง · ปลาสวาย", en: "Central Lake & Fish", zh: "中央湖·鱼类" } },
  breed:    { name: { th: "บ่อเพาะพันธุ์จระเข้", en: "Crocodile Breeding Ponds", zh: "鳄鱼繁育池" } },
  crocshow: { name: { th: "สนามแสดงจับจระเข้", en: "Croc Show Arena", zh: "捕鳄表演场" } },
  jump:     { name: { th: "จระเข้กระโดด · ตกจระเข้", en: "Croc Jumping & Fishing", zh: "跳鳄·垂钓池" } },
  birds:    { name: { th: "สวนนก · นกกระจอกเทศ", en: "Bird Garden & Ostriches", zh: "鸟园·鸵鸟" } },
  farm:     { name: { th: "ฟาร์มเด็ก · คาปิบาร่า", en: "Kids' Farm & Capybara", zh: "儿童农场·水豚" } },
};
