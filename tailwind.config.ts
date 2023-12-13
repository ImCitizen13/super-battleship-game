import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        // Dhurjati: ['"Dhurjati"', ]
      },
      colors: {
        "primary-red": "var(--primary-red)",
        "secondary-red": "var(--secondary-red)",
        "tertiary-red": "var(--tertiary-red)",
        "dark-red": "var(--dark-red)",
        "neutral": "var(--neutral)",
        "primary-blue": "var(--primary-blue)",
        "secondary-blue": "var(--secondary-blue)",
        "tertiary-blue": "var(--tertiary-blue)",
        "dark-blue": "var(--dark-blue)",
      }
    },
  },
  plugins: [],
} satisfies Config;
