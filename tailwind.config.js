/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F1F4F7",
          100: "#DCE3EA",
          200: "#B9C7D4",
          300: "#8FA3B8",
          400: "#5D7691",
          500: "#3A5470",
          600: "#24374F",
          700: "#182A3D",
          800: "#101F2F",
          900: "#0D1B2A", // brand primary
          950: "#070F18",
        },
        gold: {
          50: "#FBF7EA",
          100: "#F6ECC9",
          200: "#EEDA9B",
          300: "#E4C66C",
          400: "#DAB94F",
          500: "#D4AF37", // brand secondary
          600: "#B8952A",
          700: "#8F7420",
          800: "#6B5718",
          900: "#493C10",
        },
        slate: {
          50: "#F4F5F6",
          100: "#E4E6E8",
          200: "#C9CDD2",
          300: "#A6ACB4",
          400: "#838990",
          500: "#5C6570", // brand accent neutral
          600: "#4A525B",
          700: "#383E45",
          800: "#262A2F",
          900: "#16181B",
        },
        surface: {
          light: "#F2F2F2",
          DEFAULT: "#FFFFFF",
        },
        success: "#3E8E5B",
        error: "#B3372C",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["36px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h1-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["30px", { lineHeight: "1.2" }],
        "h2-lg": ["48px", { lineHeight: "1.15" }],
        h3: ["24px", { lineHeight: "1.25" }],
        "h3-lg": ["32px", { lineHeight: "1.25" }],
        h4: ["20px", { lineHeight: "1.3" }],
        "h4-lg": ["24px", { lineHeight: "1.3" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        body: ["16px", { lineHeight: "1.6" }],
        small: ["14px", { lineHeight: "1.5" }],
        overline: ["13px", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "16px",
        lg: "24px",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(13, 27, 42, 0.08)",
        elevated: "0 12px 32px -8px rgba(13, 27, 42, 0.18)",
        "gold-glow": "0 8px 28px -6px rgba(212, 175, 55, 0.35)",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #0D1B2A 0%, #182A3D 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #B8952A 100%)",
      },
      spacing: {
        section: "4rem",
        "section-lg": "7rem",
      },
      maxWidth: {
        container: "1280px",
        "container-lg": "1440px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
