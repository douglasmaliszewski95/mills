export interface OurServicesProps {
  title: string;
  children: React.Children;
  tooltipText?: string;
  checked?: boolean;
  onClick?: () => void;
}
