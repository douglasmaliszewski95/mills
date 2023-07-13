interface SubMenuProps {
  title: string;
  url: string;
}
export interface MenuProps {
  title: string;
  open: boolean;
  submenu: SubMenuProps[];
}
