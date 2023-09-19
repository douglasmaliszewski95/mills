import { IconProps } from "@/utils/types";

export const ChevronUp: React.FC<IconProps> = (props) => {
  const { color = "#F37021", width = "20", height = "10" } = props;

  return (
    <svg
      width="32"
      height={height}
      viewBox="0 0 20 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.49846 10.3701L0.531006 8.58785L9.84363 0.335159L19.1562 8.58785L17.1888 10.3701L9.84363 3.82221L2.49846 10.3701Z"
        fill={color}
      />
    </svg>
  );
};
