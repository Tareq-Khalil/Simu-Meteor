# 🌌 Impact Lab

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite)](https://vitejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> **An interactive asteroid impact simulator and planetary defense game**  
> Experience scientifically accurate orbital mechanics, visualize devastating impacts, and explore strategies to defend Earth from cosmic threats.

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Acknowledgments](#-acknowledgments)

---

## ✨ Features

### Core Functionality
- 🌍 **Real-time orbital simulation** with accurate physics calculations
- 💥 **Impact modeling** with energy, crater size, and damage predictions
- 📊 **Interactive data visualizations** using D3.js
- 🎮 **Game mode** with planetary defense missions
- 🛡️ **Multiple defense strategies**: kinetic impactors, nuclear deflection, gravity tractors

### Technical Highlights
- ⚡ Built with React 18 and Vite for blazing-fast performance
- 🎨 Modern, responsive UI with Tailwind CSS and shadcn/ui
- 🌐 3D visualizations powered by Three.js
- 📱 Fully responsive design for mobile and desktop
- ♿ Accessible components using Radix UI primitives
- 🔬 Scientific accuracy based on NASA data and physics principles

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/meteor-madness.git

# Navigate to project directory
cd meteor-madness

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Alternative Package Managers

```bash
# Using yarn
yarn install
yarn dev

# Using pnpm
pnpm install
pnpm dev
```

---

## 📖 Usage

### Development Mode

```bash
npm run dev
```

Starts the Vite development server with hot module replacement (HMR).

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style.

---

## 📁 Project Structure

```
meteor-madness/
├── .github/
│   └── workflows/          # CI/CD workflows
├── public/
│   ├── assets/            # Static assets
│   └── data/              # Asteroid datasets
├── src/
│   ├── components/
│   │   ├── simulation/    # Orbital mechanics components
│   │   ├── visualization/ # D3/Three.js visualizations
│   │   ├── game/          # Defense game components
│   │   └── ui/            # Reusable UI components
│   ├── lib/
│   │   ├── physics/       # Impact calculations
│   │   ├── astronomy/     # Orbital mechanics
│   │   └── utils/         # Helper functions
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript definitions
│   ├── constants/         # App constants
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── docs/                  # Documentation
├── tests/                 # Test files
├── .env.example           # Environment variables template
├── .eslintrc.json         # ESLint configuration
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠️ Technologies

### Frontend Framework
- **React** 18.2.0 - UI component library
- **React DOM** 18.2.0 - React rendering

### Build Tools
- **Vite** 5.x - Next generation frontend tooling
- **PostCSS** - CSS transformation
- **Autoprefixer** - CSS vendor prefixing

### Styling
- **Tailwind CSS** 3.x - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Radix UI** - Accessible component primitives
- **class-variance-authority** - CSS utility for variants
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind classes

### Visualization
- **D3.js** 7.x - Data visualization library
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber

### UI Components & Icons
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### Utilities
- **date-fns** - Date manipulation
- **recharts** - Composable charting library

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run type-check` | Check TypeScript types |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.meteormadness.com
VITE_NASA_API_KEY=your_nasa_api_key_here

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_3D_RENDERING=true

# Development
VITE_DEBUG_MODE=false
```

### Tailwind Configuration

Customize the theme in `tailwind.config.js`:

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
    },
  },
  plugins: [],
}
```

### Vite Configuration

Modify build settings in `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
})
```

---

## 🙏 Acknowledgments

### Data Sources
- [NASA Center for Near-Earth Object Studies (CNEOS)](https://cneos.jpl.nasa.gov/) - NEO data
- [Minor Planet Center](https://www.minorplanetcenter.net/) - Asteroid orbital elements
- [JPL Small-Body Database](https://ssd.jpl.nasa.gov/sbdb.cgi) - Physical characteristics

### Inspiration
- NASA's [DART Mission](https://www.nasa.gov/dart) - First planetary defense test
- ESA's [Hera Mission](https://www.esa.int/Safety_Security/Hera) - Follow-up assessment
- [The Planetary Society](https://www.planetary.org/) - Planetary defense advocacy

### Libraries & Tools
- [Three.js](https://threejs.org/) - 3D graphics
- [D3.js](https://d3js.org/) - Data visualization
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

---

<div align="center">

Made with ❤️ and ☕ by space enthusiasts

⭐ **Star us on GitHub — it helps!**

</div>