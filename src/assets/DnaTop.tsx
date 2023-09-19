import useScreenWidth from "@/services/hooks/useScreenWidth";
import { IconProps } from "@/utils/types";

export const DnaTop: React.FC<IconProps> = (props) => {
  const { color, width = "720", opacity = "0.15", height } = props;
  const { isMobile } = useScreenWidth();

  const finalHeight = height || isMobile ? "88" : "130";

  return (
    <svg
      width={width}
      height={height ? height : finalHeight}
      viewBox={`0 0 ${width} ${finalHeight}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="615.703"
        y="34.1875"
        width="19.4573"
        height="34.1771"
        rx="1"
        transform="rotate(-180 615.703 34.1875)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="578.742"
        y="52.2168"
        width="19.4573"
        height="52.2151"
        rx="1"
        transform="rotate(-180 578.742 52.2168)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="541.758"
        y="88.291"
        width="19.4573"
        height="88.2909"
        rx="1"
        transform="rotate(-180 541.758 88.291)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="504.797"
        y="88.291"
        width="19.4573"
        height="88.2909"
        rx="1"
        transform="rotate(-180 504.797 88.291)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="467.836"
        y="68.3574"
        width="19.4573"
        height="68.3543"
        rx="1"
        transform="rotate(-180 467.836 68.3574)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="430.852"
        y="107.281"
        width="19.4573"
        height="107.278"
        rx="1"
        transform="rotate(-180 430.852 107.281)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="393.883"
        y="34.1855"
        width="19.4573"
        height="34.1771"
        rx="1"
        transform="rotate(-180 393.883 34.1855)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="578.742"
        y="107.281"
        width="19.4573"
        height="18.9873"
        rx="1"
        transform="rotate(-180 578.742 107.281)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="131.219"
        y="107.281"
        width="19.4573"
        height="18.9873"
        rx="1"
        transform="rotate(-180 131.219 107.281)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="356.93"
        y="52.2168"
        width="19.4573"
        height="52.2151"
        rx="1"
        transform="rotate(-180 356.93 52.2168)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="318.008"
        y="88.291"
        width="19.4573"
        height="88.2909"
        rx="1"
        transform="rotate(-180 318.008 88.291)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="279.094"
        y="88.291"
        width="19.4573"
        height="88.2909"
        rx="1"
        transform="rotate(-180 279.094 88.291)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="205.156"
        y="107.281"
        width="19.4573"
        height="107.278"
        rx="1"
        transform="rotate(-180 205.156 107.281)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="168.195"
        y="34.1855"
        width="19.4573"
        height="34.1771"
        rx="1"
        transform="rotate(-180 168.195 34.1855)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="131.219"
        y="52.2168"
        width="19.4573"
        height="52.2151"
        rx="1"
        transform="rotate(-180 131.219 52.2168)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="94.2344"
        y="88.291"
        width="19.4573"
        height="88.2909"
        rx="1"
        transform="rotate(-180 94.2344 88.291)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="57.2891"
        y="88.291"
        width="19.4573"
        height="88.2909"
        rx="1"
        transform="rotate(-180 57.2891 88.291)"
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x="20.3047"
        y="17.0898"
        width="19.4573"
        height="17.0886"
        rx="1"
        transform="rotate(-180 20.3047 17.0898)"
        fill={color}
        fill-opacity={opacity}
      />
    </svg>
  );
};
