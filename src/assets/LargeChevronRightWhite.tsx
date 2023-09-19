interface LargeChevronRightProps {
  color?: string;
}

export function LargeChevronRight(props: LargeChevronRightProps) {
  const { color } = props;

  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.74937 0.756836L0.515625 1.99059L4.52312 6.00684L0.515625 10.0231L1.74937 11.2568L6.99937 6.00684L1.74937 0.756836Z"
        fill={color || "white"}
      />
    </svg>
  );
}
