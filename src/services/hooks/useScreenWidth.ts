import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth === 0 ? undefined : screenWidth <= 992;
  const isDesktop = isMobile === undefined ? isMobile : !isMobile;

  return { isMobile, isDesktop, screenWidth };
};

export default useScreenWidth;
