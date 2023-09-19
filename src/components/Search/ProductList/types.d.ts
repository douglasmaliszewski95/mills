import { ProductOCC } from "@/types";
import { Refinement } from "@/dtos/SearchProducts";

export interface ProductListProps {
  products: ProductOCC[];
  selectedFilters: Refinement[];
  minimalistCards?: boolean;
  type?: string;
  itemType?: "Equipamentos" | "Pecas";
  onRemoveFilter: (label: string, link: string) => void;
  setIsFiltersOpen?: (isOpen: boolean) => void;
}
