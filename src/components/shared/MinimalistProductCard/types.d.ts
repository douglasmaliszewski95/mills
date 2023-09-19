import { ProductOCC } from "@/types";

export interface MinimalistProductCardProps {
  product: ProductOCC;
  baseUrl: string;
  itemType?: "Equipamentos" | "Pecas";
}
