import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "choco-cosmos": "#4C061D",
        ochre: "#D17A22",
        sage: "#B4C292",
        "reseda-green": "#736F4E",
        "drab-brown": "#3B3923"
      },
    },
  },
  plugins: [],
} satisfies Config;
