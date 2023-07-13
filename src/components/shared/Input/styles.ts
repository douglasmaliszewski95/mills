import { VariantProps, cva } from "class-variance-authority";

export const inputStyles = cva("input", {
  variants: {
    intent: {
      green: [
        "bg-transparent",
        "outline-none",
        "border-green-800",
        "text-green-800",
      ],
      white: ["bg-transparent", "outline-none", "border-white", "text-white"],
    },
    size: {
      default: ["pb-[6px]", "border-b-[1px]", "text-xs"],
    },
  },

  defaultVariants: {
    intent: "green",
    size: "default",
  },
});

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {}
