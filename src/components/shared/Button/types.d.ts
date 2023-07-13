export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large" | "full" | "responsive";
  variant?: "default" | "outlined" | "disabled" | "inverted";
}
