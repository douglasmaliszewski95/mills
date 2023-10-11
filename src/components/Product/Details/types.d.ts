export interface DetailsProps {
  product?: ProductOCC;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  theme?: "rentalHeavy" | "rentalLight";
  isDisabled?: boolean;
}
