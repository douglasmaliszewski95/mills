import { ProductOCC } from "@/types";

export interface MinimalistProductCardProps {
  product: ProductOCC;
  itemType?:
    | "Equipamentos"
    | "Pecas"
    | "Seminovos"
    | "MaquinasPesadas"
    | "Compressores"
    | "Geradores"
    | null;
}
