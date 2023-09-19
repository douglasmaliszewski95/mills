import { VariantProps, cva } from "class-variance-authority";

export const buttonStyles = cva("button", {
  variants: {
    intent: {
      default: ["bg-orange-500", "text-white"],
      outlined: [
        "bg-transparent",
        "border-orange-500",
        "border-2",
        "text-sm",
        "font-semibold",
        "transition",
        "text-orange-500",
        "font-ibm-font",
        "cursor-pointer",
      ],
      disabled: ["bg-gray-500", "text-opacity-50", "text-white"],
      inverted: ["bg-white", "text-orange-500"],
      whiteOutline: [
        "bg-transparent",
        "border-white",
        "border-2",
        "text-sm",
        "font-semibold",
        "transition",
        "text-white",
        "cursor-pointer",
      ],
    },
    size: {
      responsive: ["rounded-3xl h-full w-full"],
      small: ["py-1", "px-3", "rounded-3xl"],
      medium: ["py-2", "px-4", "rounded-3xl", "leading-4"],
      large: ["w-[265px]", "py-2", "text-sm", "font-semibold", "rounded-3xl"],
      full: ["w-full", "py-1", "rounded-3xl"],
    },
  },
  defaultVariants: {
    intent: "default",
    size: "medium",
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}
