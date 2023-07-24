interface Filter {
  id: string;
  title: string;
  options: string[];
}

export interface FilterBarProps {
  filters: Filter[];
  clearFilters: () => void;
  submitFilters?: () => void;
  onSearch: (term: string) => void;
  onSelectFilter: (filter: string, isChecked: boolean) => void;
  setIsFiltersOpen?: (isOpen: boolean) => void;
}
