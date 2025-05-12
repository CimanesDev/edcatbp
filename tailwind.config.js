/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FF6B6B",
        "accent-dark": "#FF5252",
        "gray-100": "#F9FAFB",
        "gray-200": "#F3F4F6",
        "gray-300": "#E5E7EB",
        "gray-400": "#D1D5DB",
        "gray-500": "#9CA3AF",
        "gray-600": "#6B7280",
        "gray-700": "#4B5563",
        "gray-800": "#374151",
        "gray-900": "#1F2937",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}; 