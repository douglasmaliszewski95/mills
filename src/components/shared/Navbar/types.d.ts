export interface NavbarProps {
  menu?: any;
  searchMode?: boolean;
  onSearch?: (value: string) => void;
  openForm?: () => void;
  setSearchMode?: (isActive: boolean) => void;
  openMenu?: () => void;
  setIsMenuOpen?: (value: SetStateAction<boolean>) => void;
  theme: string;
  setTheme?: (value: string) => void;
}
