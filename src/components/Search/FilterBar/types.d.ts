import { RefinementCrumbs, Refinements, Filter } from "@/dtos/SearchProducts";

export interface FilterBarProps {
  filters: Filter[];
  refinementCrumbs: RefinementCrumbs[];
  baseUrl?: string;
  clearFilters: () => void;
  submitFilters?: () => void;
  onSearch: (term: string) => void;
  onSelectFilter: (label: string, link: string) => void;
  setIsFiltersOpen?: (isOpen: boolean) => void;
  page?: string;
}
