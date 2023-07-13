interface SubGroup {
  title: string;
  href: string;
}

interface Info {
  title: string;
  subGroups: SubGroup[];
  href?: string;
}

export interface HeaderMenuProps {
  menuInfo: Info[];
  onClose?: () => void;
  openForm?: () => void;
  setIsMenuOpen?: (value: SetStateAction<boolean>) => void;
  onSubmit?: (data: RequestQuoteFormType) => void;
}
