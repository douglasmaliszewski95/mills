export interface DetailsProps {
  product: ProductOCC;
  addToCart: (id: string) => void;
  theme?: "rentalHeavy" | "rentalLight";
}
