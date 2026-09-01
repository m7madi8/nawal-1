import type { Config } from "tailwindcss";

/**
 * Design tokens for the Solace Yoga shop extension.
 * Every value here is deliberate and traces back to the brand's existing
 * site (warm, minimal, editorial). Do not add colors outside this palette —
 * the product photography (black / soft pink) should remain the strongest
 * color moment on the page.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F3EC",
        "warm-white": "#FBF9F5",
        sand: "#EDE4D3",
        stone: "#D9CCB8",
        "soft-brown": "#8B7355",
        "soft-brown-dark": "#6B5842",
        charcoal: "#2B2622",
        "muted-black": "#1A1714",
        "muted-pink": "#E3C2C2",
        "muted-pink-dark": "#CFA3A3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial type scale — oversized display sizes, generous leading
        "display-xl": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.15" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 10rem)",
        gutter: "clamp(1.25rem, 5vw, 4rem)",
      },
      maxWidth: {
        editorial: "90rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
        breath: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
      animation: {
        breathe: "breathe 6s ease-in-out infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.015)", opacity: "0.96" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        editorial: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
