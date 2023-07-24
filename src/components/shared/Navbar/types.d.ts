export interface NavbarProps {
  searchMode?: boolean;
  onSearch?: (value: string) => void;
  setSearchMode?: (isActive: boolean) => void;
  openMenu?: () => void;
  setIsMenuOpen?: (value: SetStateAction<boolean>) => void;
}
