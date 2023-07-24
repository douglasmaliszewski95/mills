import { ProductOCC } from "@/types";

export interface ProductListProps {
  products: ProductOCC[];
  selectedFilters: string[];
  onRemoveFilter: (filter: string) => void;
  setIsFiltersOpen?: (isOpen: boolean) => void;
}
