# Libaasan Yuwaari - React Frontend

This project is a React 18 + Vite migration of the **Grow With Her** web application, maintaining the original UI styling, responsiveness, and interactive animations while setting up a modern, scalable architecture for future pages and components.

---

## 🛠️ Tech Stack

- **React 18** (`react`, `react-dom`)
- **JavaScript (JSX)** (No TypeScript)
- **Vite** (Blazing fast bundling & HMR)
- **Tailwind CSS** (Configured with `preflight: false` so current styling & responsiveness remain 100% identical; ready with brand color/font tokens for upcoming pages)
- **Aceternity UI Ready** (`framer-motion`, `clsx`, `tailwind-merge`, `src/lib/utils.js`)
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux` for global state management)
- **React Router DOM** (`react-router-dom` with routes for `/` and `/checkout` plus backward-compatible hash link handling)
- **Axios** (`src/api/axios.js` configured with interceptors for future backend APIs)

---

## 📁 Project Structure

```
├── Grow With Her.html           # Original reference HTML file (preserved)
├── index.html                   # Vite HTML entry point with preconnected Google fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration with '@' alias
├── tailwind.config.js           # Tailwind theme configuration
├── postcss.config.js            # PostCSS configuration
└── src/
    ├── api/
    │   └── axios.js             # Central Axios instance with interceptors
    ├── components/
    │   ├── aceternity/
    │   │   └── AceternityCard.jsx # Example Aceternity UI component for upcoming pages
    │   ├── BagDrawer.jsx        # Slide-out bag drawer with free-delivery progress & qty controls
    │   ├── BrandFeatures.jsx    # Four brand feature cards (Modest by design, etc.)
    │   ├── Footer.jsx           # Site footer
    │   ├── GlobalSymbols.jsx    # Brand logo SVG definitions and pattern definitions
    │   ├── Header.jsx           # Announcement marquee, prototype bar & navigation header
    │   ├── HeroSection.jsx      # Animated SVG arch stage, readout, age slider & product rail
    │   ├── JoinSection.jsx      # WhatsApp community card with quick-copy phone number
    │   ├── NotesSection.jsx     # Team notes collapsible section
    │   ├── OpeningScreen.jsx    # Brand entrance animation with skip trigger
    │   ├── SizeChartModal.jsx   # Interactive modal with English & Urdu translation & height highlighter
    │   ├── StorySection.jsx     # Brand story & Qur'anic ayah
    │   ├── StyleHerStudio.jsx   # Interactive dress/khimar look builder
    │   ├── Toast.jsx            # Dynamic bottom toast notification
    │   └── WhatsNewSection.jsx  # New arrivals, promotional code SALAM10 & teasers
    ├── data/
    │   └── catalog.js           # Sizing charts, garment catalog, and announcements
    ├── lib/
    │   └── utils.js             # Aceternity UI `cn` helper (clsx + tailwind-merge)
    ├── pages/
    │   ├── HomePage.jsx         # Main storefront view
    │   └── CheckoutPage.jsx     # Multi-step checkout view with COD / Card / Bank transfer
    ├── store/
    │   ├── appSlice.js          # Redux slice for age, garment selection, filter & modals
    │   ├── bagSlice.js          # Redux slice for shopping bag, quantities & discounts
    │   └── index.js             # Redux store configuration
    ├── utils/
    │   └── figureGenerator.js   # Procedural SVG girl figure generation engine & math helpers
    ├── App.jsx                  # Main application router and overlay manager
    ├── index.css                # Base & utility styles with exact original CSS rules
    └── main.jsx                 # Application entry point with Redux Provider & BrowserRouter
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 How to Build Upcoming Pages with Tailwind & Aceternity UI

For any new pages or components:
1. You can freely use standard Tailwind CSS classes (e.g. `flex`, `grid`, `rounded-2xl`, `bg-teal`, `text-gold`, `p-6`).
2. You can use Aceternity UI components with Framer Motion and `cn(...)` from `src/lib/utils.js`.
3. An example spotlight card is available at `src/components/aceternity/AceternityCard.jsx`.
4. Existing styles and responsiveness from `Grow With Her.html` will remain completely unaffected because Tailwind Preflight reset is disabled.
