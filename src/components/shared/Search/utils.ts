import productSampleImage from "@/assets/img/product-sample.jpg";

export const products = [...Array(13)].fill({
  image: productSampleImage,
  model: "JLG 450AJ SII",
  description: "Plataforma Elevatória Articulada Lança - Diesel - 45 pés",
  specs: [
    {
      name: "Altura do trabalho",
      value: "15,72 m",
    },
    {
      name: "Alcance Horizontal",
      value: "7,47 m",
    },
    {
      name: "Peso",
      value: "6.146 kg",
    },
    {
      name: "Emissão Média",
      value: "7,46 Kg de CO2 por hora",
    },
  ],
});

export const filters = [
  {
    id: "0",
    title: "Equipamentos",
    options: ["Plataformas Elevatórias", "Compressores", "Geradores"],
  },
  {
    id: "1",
    title: "Plataformas:",
    options: [
      "Pantográfica ou Tesoura",
      "Lança Telescópica",
      "Lança Articulada",
    ],
  },
  {
    id: "2",
    title: "Piso:",
    options: ["Plano", "Irregular"],
  },
  {
    id: "3",
    title: "Filtre por tipos:",
    options: [
      "Plataformas Diesel",
      "Plataformas Elétricas",
      "Plataformas Híbridas",
    ],
  },
];

export const selectedFilters = [
  "Plataformas Elevatórias",
  "Geradores",
  "Pantográfica ou Tesoura",
  "Lança Articulada",
  "Plano",
  "Plataformas Diesel",
  "Plataforma Híbridas",
];
