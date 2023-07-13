import { VariantProps, cva } from "class-variance-authority";

export const radioButtonStyles = cva("radio", {
  variants: {
    intent: {
      primary: [
        "appearance-none",
        "bg-white",
        "font-inherit",
        "color-orange",
        "border-orange",
        "rounded-full",
        "grid",
        "place-items-center",
      ],
    },
    size: {
      default: ["w-[24px]", "h-[24px]", "border-[1px]"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "default",
  },
});

export interface RadioProps
  extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof radioButtonStyles> {}
