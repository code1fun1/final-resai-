# ResAI — Sign In Page

A responsive **Sign In** page for the ResAI platform, built with **React**, **TypeScript**, and **CSS Modules**. The UI is fully responsive across mobile, tablet, and desktop screen sizes.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/code1fun1/final-resai-.git
cd final-resai-
```

2. **Switch to the signup branch**

```bash
git checkout signup-page
```

3. **Install dependencies**

```bash
npm install
```

---

## 🧑‍💻 Running the Project

### Start the development server

```bash
npm start
```

The app will open at **[http://localhost:3000](http://localhost:3000)** in your browser.

Hot-reloading is enabled — any changes you make will instantly reflect in the browser.

### Build for production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Run tests

```bash
npm test
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target Device |
|---|---|
| `> 1100px` | Desktop / Wide Laptop |
| `≤ 1100px` | iPad Pro / Tablet Landscape |
| `≤ 768px` | Tablet Portrait |
| `≤ 480px` | Mobile |

---

## 📁 Folder Structure

```
Singup/
├── public/
│   ├── index.html              # HTML entry point (includes viewport meta tag)
│   ├── favicon.ico
│   └── thumbnail.png
│
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Button.tsx          # Primary CTA button
│   │   ├── Button.module.css   # Button styles + responsive breakpoints
│   │   │
│   │   ├── CheckboxField.tsx   # "Keep me signed in" checkbox
│   │   ├── CheckboxField.module.css
│   │   │
│   │   ├── Divider.tsx         # "OR" divider between sections
│   │   ├── Divider.module.css
│   │   │
│   │   ├── Footer.tsx          # Left panel — image slider + branding
│   │   ├── Footer.module.css   # Footer styles + responsive breakpoints
│   │   │
│   │   ├── FrameComponent.tsx  # Right panel — Sign In form
│   │   ├── FrameComponent.module.css  # Form styles + responsive breakpoints
│   │   │
│   │   ├── Input1.tsx          # Reusable input field component
│   │   └── Input1.module.css   # Input styles + responsive breakpoints
│   │
│   ├── pages/
│   │   ├── A.tsx               # Main page — composes Footer + FrameComponent
│   │   └── A.module.css        # Page-level layout + responsive breakpoints
│   │
│   ├── App.tsx                 # Root app component with routing
│   ├── global.css              # Global CSS variables (colors, fonts, spacing)
│   ├── index.tsx               # React DOM entry point
│   └── typings.d.ts            # TypeScript module declarations
│
├── package.json                # Project metadata and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation (this file)
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| CSS Modules | Scoped, component-level styling |
| React Router v7 | Client-side routing |
| Satoshi / Inter | Typography (Google Fonts + Fontshare) |

---

## ✨ Features

- 🔐 Sign In form with Email & Password fields
- ☑️ "Keep me signed in" checkbox + Forgot Password link
- 🔗 Continue with Google / LinkedIn OAuth buttons
- 🖼️ Auto-rotating image slider on the left panel with animated transitions
- 💛 Gold accent color system (`#DABF67`) throughout the UI
- 📱 Fully responsive — Mobile, Tablet, iPad Pro, Desktop

---

## 📄 License

This project is private and proprietary to ResAI.