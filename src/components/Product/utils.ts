import productSampleImage from "@/assets/img/product-sample.jpg";

export const products = [...Array(4)].fill({
  thumbImageURLs: [productSampleImage.src],
  brand: "JLG 450AJ SII",
  displayName: "Plataforma Elevatória Articulada Lança - Diesel - 45 pés",
  x_alcanceHorizontalM: "7,47 m",
  x_alturaDeTrabalhoM: "15,72 m",
  x_peso: "6.146 kg",
  x_emissoMdiaKgDeCOH: "7,46 Kg de CO2 por hora",
});
