export const getBaseUrl = (type: string) => {
  const baseUrl =
    type === "Compressores"
      ? "compressores"
      : type === "Geradores"
      ? "geradores"
      : type === "Equipamentos"
      ? "plataformas-elevatorias"
      : type === "MaquinasPesadas"
      ? "maquinas-pesadas"
      : "plataformas-elevatorias";

  return baseUrl;
};
