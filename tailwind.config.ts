import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme - Green Futuristic (PRD Section 7.1)
        dark: {
          DEFAULT: "hsl(222 47% 11%)",      // slate-900
          950: "hsl(222 47% 5%)",           // slate-950 / Background Primary
          900: "hsl(222 47% 11%)",          // slate-900 / Background Secondary
          800: "hsl(217 33% 17%)",           // slate-800 / Background Tertiary
          700: "hsl(216 33% 25%)",          // slate-700
          600: "hsl(215 25% 35%)",          // slate-600
        },
        // Emerald Primary (PRD Section 7.1)
        emerald: {
          DEFAULT: "hsl(160 84% 39%)",       // emerald-500 / Primary Green
          50: "hsl(160 100% 97%)",
          100: "hsl(160 96% 90%)",
          200: "hsl(161 94% 78%)",
          300: "hsl(162 89% 64%)",
          400: "hsl(162 88% 52%)",           // emerald-400 / Primary Green Light
          500: "hsl(160 84% 39%)",           // emerald-500 / Primary Green
          600: "hsl(161 93% 31%)",           // emerald-600 / Primary Green Dark
          700: "hsl(160 91% 25%)",
          800: "hsl(160 86% 20%)",
          900: "hsl(160 90% 16%)",
          950: "hsl(160 94% 10%)",
        },
        // Accent Cyan (PRD Section 7.1)
        cyan: {
          accent: "hsl(157 100% 50%)",       // #00FF94 - Neon accents
        },
        // Light Theme (existing)
        background: "hsl(0 0% 100%)",
        foreground: "hsl(240 10% 10%)",
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(240 10% 10%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(240 10% 10%)",
        },
        primary: {
          DEFAULT: "hsl(135 100% 34%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(240 5% 15%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(240 5% 96%)",
          foreground: "hsl(240 5% 40%)",
        },
        accent: {
          DEFAULT: "hsl(135 20% 92%)",
          foreground: "hsl(135 100% 25%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        border: "hsl(240 5% 90%)",
        input: "hsl(240 5% 90%)",
        ring: "hsl(135 100% 34%)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sub: ["Outfit", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Custom effects from PRD Section 7.4
      boxShadow: {
        "glow-green": "0 0 20px rgba(16, 185, 129, 0.15)",
        "glow-green-lg": "0 0 30px rgba(16, 185, 129, 0.2)",
        "glow-cyan": "0 0 20px rgba(0, 255, 148, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.15)" },
          "50%": { boxShadow: "0 0 30px rgba(16, 185, 129, 0.25)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
