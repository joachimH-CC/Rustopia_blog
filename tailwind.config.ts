import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rust: {
          950: "#2c0a0a",
          900: "#3d1010",
          800: "#4a1212",
          700: "#6b1a1a",
          600: "#8b3a2a",
          500: "#a84c35",
          400: "#c45c3e",
          accent: "#e85d3a",
          glow: "#ff7a50",
        },
        parchment: {
          DEFAULT: "#f0d4bc",
          muted: "#b08060",
          dim: "#7a5040",
        },
      },
      fontFamily: {
        monument: ["var(--font-cinzel)", "Palatino Linotype", "serif"],
        thin: ["var(--font-barlow)", "system-ui", "sans-serif"],
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        "float-up": "float-up 10s ease-in-out infinite",
        scan: "scan 8s linear infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.06)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.6" },
          "100%": {
            transform: "translateY(-120px) translateX(12px)",
            opacity: "0",
          },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "geo-grid": `
          linear-gradient(rgba(232,93,58,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,93,58,0.045) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      boxShadow: {
        "rust-glow":
          "0 0 20px rgba(232,93,58,0.15), inset 0 0 20px rgba(0,0,0,0.3)",
        "rust-glow-lg":
          "0 0 40px rgba(232,93,58,0.2), 0 0 80px rgba(139,58,42,0.1)",
        "hard-top": "0 -8px 0 rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
