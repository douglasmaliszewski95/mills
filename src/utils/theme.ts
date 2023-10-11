export const getCurrentTheme = () => {
  const url = window.location.href;
  const isHeavy = url.includes("maquinas-pesadas");

  return isHeavy ? "rentalHeavy" : "rentalLight";
};
