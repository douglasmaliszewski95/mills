import { IconProps } from "@/utils/types";

export const LargeChevronLeft: React.FC<IconProps> = (props) => {
  const { color, width = "7", height = "12" } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.48375 1.99059L5.25 0.756836L0 6.00684L5.25 11.2568L6.48375 10.0231L2.47625 6.00684L6.48375 1.99059Z"
        fill={color}
      />
    </svg>
  );
};
