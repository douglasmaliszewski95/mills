export interface NavbarProps {
  openMenu?: () => void;
  setIsMenuOpen?: (value: SetStateAction<boolean>) => void;
}
