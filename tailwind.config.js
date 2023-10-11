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
      10: "#0ED222",
      300: "#25D366",
      800: "#004042",
      900: "#043D3F",
    },
    brown: {
      100: "#EBE3C7",
    },
    white: "#ffffff",
    beige: {
      50: "#F9F7EE",
      100: "#EBEBEB",
      200: "#EBE3C7",
      500: "#A0A0A0",
    },
    red: {
      600: "#FF585F",
      800: "#B00020",
    },
    black: "#000000",
    gray: {
      25: "rgba(0, 0, 0, 0.60)",
      30: "#CCCCCC",
      50: "#F8F8F8",
      75: "#F4F3F3",
      80: "#F5F5F5",
      100: "#F6F6F6C7",
      150: "#F6F6F6C7",
      200: "#E9E9E9",
      300: "#444444",
      400: "#CBCBCB",
      500: "#B6ADB479",
      700: "#424242",
      800: "#D9D9D9",
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

  extends: {
    backgroundSize: {
      mobile: "244px",
    },
    backgroundPosition: {
      "top-right": "top right -175px;",
      "top-right-mobile": "top right -15px;",
      "bottom-right-mobile": "bottom right -15px;",
    },
  },
};
