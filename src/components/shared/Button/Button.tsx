import React from "react";
import { ButtonProps } from "./types";
import { buttonStyles } from "./styles";

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  size = "medium",
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={`${buttonStyles({
        intent: variant,
        size,
      })} ${className}`}
      disabled={variant === "disabled"}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
