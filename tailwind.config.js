/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  boxShadow: {
    innerLg: "inset 0px -200px 50px -100px rgba(0,0,0,1)",
  },
  fontFamily: {
    "ibm-font": ["IBM Plex Sans", "sans-serif"],
    roboto: ["Roboto", "sans-serif"],
  },
  screens: {
    tablet: { max: "992px" },
    desktop: { min: "993px" },
  },
  container: {
    screens: {
      desktop: "1200px",
    },
  },
  colors: {
    transparent: "transparent",
    orange: {
      500: "#F37021",
      800: "#C75302",
    },
    green: {
      300: "#25D366",
      800: "#004042",
    },
    brown: {
      100: "#EBE3C7",
    },
    white: "#ffffff",
    beige: {
      100: "#EBEBEB",
      200: "#EBE3C7",
    },
    red: {
      600: "#FF585F",
    },
    black: "#000000",
    gray: {
      25: "rgba(0, 0, 0, 0.60)",
      50: "#F8F8F8",
      75: "#F4F3F3",
      100: "#F6F6F6C7",
      200: "#E9E9E9",
      300: "#444444",
      400: "#CBCBCB",
      500: "#B6ADB479",
      700: "#424242",
    },
  },
  extend: {
    fontFamily: {
      sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
    },
    height: {
      478: "30rem",
    },
  },
};
