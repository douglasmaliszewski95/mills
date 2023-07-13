import { VariantProps, cva } from "class-variance-authority";

export const navbarStyles = cva("navbar", {
  variants: {
    intent: {
      primary: [
        "w-full",
        "px-32",
        "bg-orange",
        "flex",
        "justify-between",
        "items-center",
      ],
    },
    size: {
      default: ["px-10", "py-5", "mb-5"],
    },
  },

  defaultVariants: {
    intent: "primary",
    size: "default",
  },
});

export interface NavbarProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navbarStyles> {}
