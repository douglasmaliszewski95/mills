export interface SimpleProductCardProps {
  product: ProductOCC;
  cardText?: string;
  borderFull?: boolean;
  handleAddToCart?: (product: ProductOCC) => void;
}
