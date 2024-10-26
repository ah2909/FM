import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground) / <alpha-value>)',
      card: 'hsl(var(--card) / <alpha-value>)',
      card_foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
      popover: 'hsl(var(--popover) / <alpha-value>)',
      popover_foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
      primary: 'hsl(var(--primary) / <alpha-value>)',
      primary_foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
      secondary: 'hsl(var(--secondary) / <alpha-value>)',
      secondary_foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
      muted: 'hsl(var(--muted) / <alpha-value>)',
      muted_foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
      accent: 'hsl(var(--accent) / <alpha-value>)',
      accent_foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
      destructive: 'hsl(var(--destructive) / <alpha-value>)',
      destructive_foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
      border: 'hsl(var(--border) / <alpha-value>)',
      input: 'hsl(var(--input) / <alpha-value>)',
      ring: 'hsl(var(--ring) / <alpha-value>)',
      radius: 'hsl(var(--radius) / <alpha-value>)',
      chart_1: 'hsl(var(--chart-1) / <alpha-value>)',
      chart_2: 'hsl(var(--chart-2) / <alpha-value>)',
      chart_3: 'hsl(var(--chart-3) / <alpha-value>)',
      chart_4: 'hsl(var(--chart-4) / <alpha-value>)',
      chart_5: 'hsl(var(--chart-5) / <alpha-value>)',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config