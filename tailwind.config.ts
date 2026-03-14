import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#F8FAFC"
        },
        sidebar: {
          DEFAULT: "#0F172A",
          foreground: "#E2E8F0",
          muted: "#1E293B"
        },
        success: "#15803D",
        warning: "#D97706",
        danger: "#DC2626"
      },
      boxShadow: {
        panel: "0 22px 70px rgba(15, 23, 42, 0.08)",
        card: "0 12px 28px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
