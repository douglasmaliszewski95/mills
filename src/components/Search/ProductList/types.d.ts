import { Product } from "@/types";

export interface ProductListProps {
  products: Product[];
  selectedFilters: string[];
  onRemoveFilter: (filter: string) => void;
  setIsFiltersOpen?: (isOpen: boolean) => void;
}
