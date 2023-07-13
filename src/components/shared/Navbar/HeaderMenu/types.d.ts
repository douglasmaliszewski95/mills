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
  setIsMenuOpen: (isOpen: boolean) => void;
  onSubmit: (data: RequestQuoteFormType) => void;
}
