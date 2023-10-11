import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import {
  currentSiteThemeContext,
  watchCart,
} from "@/services/hooks/useCurrentSiteTheme";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [currentSiteTheme, setCurrentSiteTheme] = useState("rentalLight");
  const [watch, setWatch] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const route = router.asPath;
    const pageTitle = generateTitleFromRoute(route);
    document.title = pageTitle || "Novo Site Mills";

    const firstH1 = document.querySelector("h1");
    if (firstH1) {
      let description;
      route === "/"
        ? (description =
            "A melhor solução para sua obra! Mills é a empresa líder de mercado e oferece a melhor solução para locação de equipamentos e plataforma elevatória. Confira!")
        : (description = firstH1.textContent || "");
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [router]);

  function generateTitleFromRoute(route: string): string {
    if (route === "/") {
      return "Mills - Locação de Equipamentos e Plataforma Elevatória";
    }
    let title;
    const routeParts = route.split("/").filter((part) => part !== "");
    if (routeParts.length >= 3) {
      title = routeParts[1];
      title = title.split("-");
      return title
        .map((word, ind) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    title = routeParts
      .map((part, indx) => {
        const words = part.split("-");
        return words
          .map((word, ind) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      })
      .join(" - ");

    return title;
  }

  return (
    <currentSiteThemeContext.Provider
      value={{ currentSiteTheme, setCurrentSiteTheme }}
    >
      <watchCart.Provider value={{ watch, setWatch }}>
        <Component {...pageProps} />
      </watchCart.Provider>
    </currentSiteThemeContext.Provider>
  );
}
