/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#064e3b", // emerald-900
          dark: "#022c22", // emerald-950
          darker: "#064e3b", // emerald-900
          light: "#065f46", // emerald-800
          muted: "#ecfdf5", // emerald-50
          soft: "#d1fae5", // emerald-100
          subtle: "#a7f3d0", // emerald-200
          foreground: "#064e3b", // emerald-900
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#ecfdf5", // emerald-50 tint
          muted: "#f3f4f6",
        },
        ink: {
          DEFAULT: "#111827",
          muted: "#4b5563",
          subtle: "#6b7280",
        },
        nxtbite: {
          green: "#064e3b",
          dark: "#022c22",
        },
      },
    },
  },
  plugins: [],
};
