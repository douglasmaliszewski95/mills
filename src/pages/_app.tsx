import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";

export default function App({ Component, pageProps }: AppProps) {
  const [currentSiteTheme, setCurrentSiteTheme] = useState("rentalLight");

  return (
    <currentSiteThemeContext.Provider
      value={{ currentSiteTheme, setCurrentSiteTheme }}
    >
      <Component {...pageProps} />
    </currentSiteThemeContext.Provider>
  );
}
