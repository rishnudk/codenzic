# Wayfare — Route & Trip Planner Mobile App

A clean, responsive React Native mobile application built with **Expo** and **TypeScript**, closely adhering to the provided Figma design specifications.

---

## 📱 Overview & Screens

Wayfare is a trip and route planning application featuring four primary screens and user flows:

1. **Log In Screen (`/`)**
   - Brand header with the Wayfare logo.
   - Form fields with real-time validation (email regex and password length).
   - Password visibility toggle (show/hide).
   - Auth mode toggle (switching between *Log in* and *Create an account*).
   - Clean transition to location selection upon valid submission.

2. **Set Locations Screen (`/set-locations`)**
   - Dual-input card with distinct indicators: pickup (orange dot `●`) and drop-off (dark square `■`).
   - One-tap swap button (`⇅`) to invert pickup and destination.
   - Quick action pills: **Use current** location and **Pick on map**.
   - Live location suggestions matching Doha/Lusail mock destinations (Home, Marina Office, Corniche Ferry, Metro, Airport).
   - Clear buttons (`×`) to reset inputs.

3. **Trip Ready Screen (`/trip-ready`)**
   - Displays confirmed trip details.
   - Dynamic feedback state for custom addresses.
   - Active, prominent **Next** CTA navigating directly to the route overview.

4. **Route View Screen (`/route-view`)**
   - Floating header controls (back navigation and map layer switcher).
   - Stylized map canvas with vehicle origin marker, destination pin, polyline path, and live traffic badge (`⚠️ Heavy traffic near the marina`).
   - Bottom sheet panel:
     - ETA headline (**24 min · 9.6 km**).
     - Multi-modal transport switcher (**Drive**, **Ride**, **Walk**) with dynamic ETA updates.
     - Connected pickup-to-destination overview card.
     - Expandable turn-by-turn navigation steps.
     - Primary action: **Start navigation** with active guidance feedback.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Expo SDK 58](https://expo.dev) (React Native 0.88, React 19)
- **Language:** TypeScript (strict mode enabled)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (file-based navigation with `src/app/`)
- **State Management:** React Context API (`TripContext`) for global trip state, transport mode, and locations
- **Styling:** React Native `StyleSheet` with centralized design tokens (`src/theme/`) for maximum cross-platform performance and zero build fragility
- **Icons:** `@expo/vector-icons` (Ionicons)

---

## 📂 Project Structure

```text
codenzic/
├── src/
│   ├── app/                      # Expo Router screens & layouts
│   │   ├── _layout.tsx           # Root navigation stack & TripProvider
│   │   ├── index.tsx             # 1. Login screen
│   │   ├── set-locations.tsx     # 2. Set locations screen
│   │   ├── trip-ready.tsx        # 3. Trip ready screen
│   │   └── route-view.tsx        # 4. Route view & navigation screen
│   ├── components/               # Reusable UI components
│   │   ├── ActionPill.tsx        # Quick filter & action pills
│   │   ├── BrandLogo.tsx         # Wayfare brand logo
│   │   ├── Button.tsx            # Standardized primary/outline buttons
│   │   ├── InputField.tsx        # Text input with validation & accessories
│   │   ├── LocationCard.tsx      # Suggestion list item
│   │   ├── LocationInputGroup.tsx# Dual pickup/drop-off container
│   │   ├── MapViewCanvas.tsx     # Stylized route map canvas
│   │   └── TurnByTurnStep.tsx    # Direction rows
│   ├── context/
│   │   └── TripContext.tsx       # Global trip state & actions
│   ├── data/
│   │   └── mockData.ts           # Mock places, routes, and turn-by-turn steps
│   ├── theme/                    # Design tokens
│   │   ├── colors.ts             # Palette matching Figma (#E04B26, #F4F5F7, etc.)
│   │   ├── spacing.ts            # Spacing & borderRadius scales
│   │   └── typography.ts         # Typography scale & font weights
│   └── types/
│       └── trip.ts               # TypeScript models & interfaces
├── app.json                      # Expo app configuration
├── package.json                  # Dependencies & scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

### 3. Run on Device or Browser
- **Web:** Press `w` in the terminal to view in your web browser.
- **iOS / Android:** Open the **Expo Go** app on your phone and scan the QR code displayed in the terminal.

### 4. Type Check
Verify that all TypeScript types pass cleanly:
```bash
npx tsc --noEmit
```

---

## 🎨 Design Decisions

- **StyleSheet vs. NativeWind:** Uses standard `StyleSheet.create` paired with design tokens (`src/theme/`). This guarantees zero build-step overhead, 100% Expo SDK compatibility, and strict type safety across all native platforms.
- **Expo Router:** Screen files in `src/app/` automatically map to navigation routes, providing predictable mobile back-stack behavior and deep-linking support out of the box.
- **Safe Area Insets:** All screens utilize `react-native-safe-area-context` to adapt seamlessly across notched devices (iPhone Dynamic Island, Android hole-punch displays).
