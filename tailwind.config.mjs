/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx,svg}"],

  theme: {
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      dropShadow: {
        glow: [
          "1px 0px 0px rgba(241, 245, 249, 1)",
          "-1px 0px 0px rgba(241, 245, 245, 1)",
          "0px 1px 0px rgba(241, 245, 245, 1)",
          "0px -1px 0px rgba(241, 245, 245, 1)",
        ],
        glowdark: [
          "1px 0px 0px rgba(0, 0, 0, 1)",
          "-1px 0px 0px rgba(0, 0, 0, 1)",
          "0px 1px 0px rgba(0, 0, 0, 1)",
          "0px -1px 0px rgba(0, 0, 0, 1)",
        ],
      },
      colors: {
        "brand-green": "#4DF69B",
      },
      spacing: {
        128: "62.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
