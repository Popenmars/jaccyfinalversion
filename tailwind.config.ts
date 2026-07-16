import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        blue: "#005cff",
        "light-blue": "#e8f1ff",
        "dark-blue": "#021e40",
        "mid-blue": "#03336e",
        peach: "#ffefe8",
        "background-peach": "#ffefe8bb",
        "deep-peach": "#FFCBA4",
        "error-red": "#FF0100",
        "error-background": "#F1565686",
        "success-green": "#00FF00",
        "success-background": "#32F3324D",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float1: {
          from: { transform: "translate(0, 0)" },
          to: { transform: "translate(30px, 30px)" },
        },
        float2: {
          from: { transform: "translate(0, 0)" },
          to: { transform: "translate(-20px, -30px)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "float-1": "float1 10s ease-in-out infinite alternate",
        "float-2": "float2 12s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
