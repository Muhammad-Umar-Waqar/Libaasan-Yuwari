export const HEIGHTS = {
  3: 98, 4: 104, 5: 110, 6: 116, 7: 122, 8: 128, 9: 134,
  10: 140, 11: 146, 12: 152, 13: 156, 14: 160, 15: 164
};

export const SIZES = [
  [3, 3, "1"],
  [4, 4, "2"],
  [5, 5, "3"],
  [6, 6, "4"],
  [7, 7, "5"],
  [8, 8, "6"],
  [9, 10, "7"],
  [11, 12, "8"],
  [13, 15, "9"]
];

export const STAGES = [
  [3, 4, "Little and always moving", "Soft frocks she can twirl in and pull on herself, with full sleeves and room to play."],
  [5, 6, "Off to school", "Easy shalwar qameez and frocks for school runs, playdates and warm afternoons."],
  [7, 8, "Running, climbing, playing", "Longer lengths that stay in place, in breathable cotton that survives the playground."],
  [9, 10, "Taller every month", "Graceful lengths and calm colours as she starts choosing for herself."],
  [11, 12, "Older Girls begin here", "Her own grown-up designs, not bigger versions of little-girl frocks."],
  [13, 15, "Her style, still covered", "Long shalwar qameez, maxis and abayas she will be proud to wear anywhere."]
];

export const PRODUCTS = [
  { id: "k1", line: "k", name: "Cotton Frock", tag: "Frock", price: "1,700", c: "#E8BBAA", hj: "#6A9486", type: "frock", len: 0.72, flare: 1.75, bottom: "trouser", bc: "#F5ECDD" },
  { id: "k2", line: "k", name: "Tiered Frock", tag: "Frock", price: "1,700", c: "#A9CBB7", hj: "#D9A79A", type: "tiered", len: 0.74, flare: 1.95, bottom: "trouser", bc: "#FBF8F1" },
  { id: "k3", line: "k", name: "Printed Shalwar Qameez", tag: "Shalwar Qameez", price: "1,700", c: "url(#pt-mustard)", sl: "#D4A94E", hj: "#5E8B7E", type: "kurta", len: 0.62, flare: 1.12, bottom: "shalwar", bc: "#E3B95C" },
  { id: "k4", line: "k", name: "Qameez & Trouser", tag: "Shalwar Qameez", price: "1,700", c: "#C7B6D9", hj: "#8F7BA8", type: "kurta", len: 0.64, flare: 1.15, bottom: "trouser", bc: "#8F7BA8" },
  { id: "k5", line: "k", name: "Simple Abaya", tag: "Abaya", price: "3,200", c: "#9DB4C8", hj: "#5C7A93", type: "abaya", len: 0.95, flare: 1.4, buttons: true },
  { id: "k6", line: "k", name: "Angrakha Frock", tag: "Frock", price: "5,500", c: "#D98C8C", hj: "#6A9486", type: "frock", len: 0.76, flare: 1.85, wrap: true, trim: true, bottom: "trouser", bc: "#F7E3DD" },
  { id: "k7", line: "k", name: "Embroidered Maxi", tag: "Maxi", price: "3,200", c: "#F1E2C6", hj: "#C98F86", type: "frock", len: 0.95, flare: 1.9, trim: true },
  { id: "k8", line: "k", name: "Embroidered Abaya", tag: "Abaya", price: "5,500", c: "#7E4A63", hj: "#5E8B7E", type: "abaya", len: 0.95, flare: 1.45, trim: true },
  { id: "o1", line: "o", name: "Button-Front Abaya", tag: "Abaya", price: "2,100", c: "#8FA89A", hj: "#5E8B7E", type: "abaya", len: 0.95, flare: 1.35, buttons: true },
  { id: "o2", line: "o", name: "Long Qameez & Trouser", tag: "Shalwar Qameez", price: "2,100", c: "#6E8CA0", hj: "#B98A8F", type: "kurta", len: 0.76, flare: 1.2, bottom: "trouser", bc: "#2F4A5A" },
  { id: "o3", line: "o", name: "Printed Shalwar Qameez", tag: "Shalwar Qameez", price: "2,100", c: "url(#pt-terra)", sl: "#B9785B", hj: "#6A9486", type: "kurta", len: 0.72, flare: 1.15, bottom: "shalwar", bc: "#C98A6B" },
  { id: "o4", line: "o", name: "Flared Maxi", tag: "Maxi", price: "4,000", c: "#C99A9E", hj: "#7E5560", type: "frock", len: 0.95, flare: 2.05 },
  { id: "o5", line: "o", name: "Formal Qameez & Trouser", tag: "Shalwar Qameez", price: "7,000", c: "#EFE2C8", hj: "#5E8B7E", type: "kurta", len: 0.74, flare: 1.2, trim: true, bottom: "trouser", bc: "#B48A4A" }
];

export const ANNOUNCEMENTS = [
  "Free delivery on orders over Rs 5,000",
  "New this week: winter abayas for Older Girls",
  "10% off your first order with code SALAM10",
  "Cash on Delivery across Pakistan · easy size exchange"
];

export const SIZE_CHART = [
  ["1", "3", "3", [95, 98], 18, 10, 10, 13],
  ["2", "4", "4", [101, 104], 20, 11, 12, 13],
  ["3", "5", "5", [107, 110], 22, 12, 13, 14],
  ["4", "6", "6", [113, 116], 24, 13, 14, 16],
  ["5", "7", "7", [119, 122], 26, 14, 14, 17],
  ["6", "8", "8", [125, 128], 28, 15, 14, 18],
  ["7", "9–10", "9 تا 10", [134, 140], 30, 16, 15, 18],
  ["8", "11–12", "11 تا 12", [146, 152], 32, 17, 15, 19],
  ["9", "13–15", "13 تا 15", [156, 164], 34, 18, 17, 19]
];

export const SIZE_CHART_TEXT = {
  en: {
    t: "Size chart",
    sub: "Shalwar qameez and trouser. Garment measurements.",
    size: "Size",
    age: "Age",
    len: "Length",
    lenS: "qameez & trouser",
    sl: "Sleeve",
    w: "Waist",
    wS: "laid flat",
    h: "Hem",
    yrs: "yrs",
    her: "Her size",
    tips: [
      "<b>Length</b> is the same for the qameez and the trouser.",
      "<b>Waist and hem</b> are measured with the qameez laid flat. Double them for all round.",
      "<b>Between two sizes?</b> Choose the bigger one. Children grow quickly."
    ],
    ask: "Still not sure? Send us her height on WhatsApp and we'll tell you her size."
  },
  ur: {
    t: "سائز چارٹ",
    sub: "شلوار قمیض اور ٹراؤزر · کپڑے کی پیمائش",
    size: "سائز",
    age: "عمر",
    len: "لمبائی",
    lenS: "قمیض اور ٹراؤزر",
    sl: "بازو",
    w: "کمر",
    wS: "آدھا (فلیٹ)",
    h: "دامن",
    yrs: "سال",
    her: "اس کا سائز",
    tips: [
      "<b>لمبائی</b> قمیض اور ٹراؤزر دونوں کی ایک ہی ہے۔",
      "<b>کمر اور دامن</b> قمیض کو فلیٹ رکھ کر ناپیں۔ پورے گھیرے کے لیے دگنا کریں۔",
      "<b>دو سائز کے درمیان؟</b> بڑا سائز لیں۔ بچے جلدی بڑے ہوتے ہیں۔"
    ],
    ask: "پھر بھی یقین نہیں؟ واٹس ایپ پر اس کا قد بھیجیں، ہم سائز بتا دیں گے۔"
  }
};

export const STUDIO_COLORS = [
  ["Blush", "#E8BBAA"],
  ["Mint", "#A9CBB7"],
  ["Lilac", "#C7B6D9"],
  ["Sky", "#9DB4C8"],
  ["Rose", "#C99A9E"],
  ["Ivory", "#F1E2C6"],
  ["Plum", "#7E4A63"]
];

export const STUDIO_BOTTOMS = [
  ["Cream", "#F5ECDD"],
  ["White", "#FBF8F1"],
  ["Sage", "#8FA89A"],
  ["Navy", "#2F4A5A"],
  ["Gold", "#D9BC86"]
];

export const STUDIO_KHIMARS = [
  ["Sage", "#6A9486"],
  ["Blush", "#D9A79A"],
  ["Cream", "#EFE4D2"],
  ["Lilac", "#8F7BA8"],
  ["Navy", "#3E5568"],
  ["Plum", "#7E5560"]
];

export const STUDIO_STYLES = {
  "Shalwar Qameez": { type: "kurta", len: { k: 0.64, o: 0.76 }, flare: 1.15, bottom: "shalwar", price: { k: 1700, o: 2100 } },
  "Frock": { type: "frock", len: { k: 0.72, o: 0.8 }, flare: 1.8, bottom: "trouser", price: { k: 1700, o: 2100 } },
  "Maxi": { type: "frock", len: { k: 0.95, o: 0.95 }, flare: 1.95, trim: true, price: { k: 3200, o: 4000 } },
  "Abaya": { type: "abaya", len: { k: 0.95, o: 0.95 }, flare: 1.4, buttons: true, price: { k: 3200, o: 2100 } }
};
