import useScreenWidth from "@/services/hooks/useScreenWidth";
import { IconProps } from "@/utils/types";

export const DnaTopResponsive: React.FC<IconProps> = (props) => {
  const {
    color,
    width = "720",
    opacity = "0.15",
    height,
    cellWidth = "19.4573",
    sizePercentage = 100,
  } = props;
  const { isMobile } = useScreenWidth();

  const finalHeight = height || isMobile ? "88" : "130";

  const calculateValue = (value: number) => {
    const calculatedValue = (sizePercentage / 100) * value;
    const result = calculatedValue.toString();

    return result;
  };

  const finalWidth = calculateValue(parseFloat(cellWidth));

  return (
    <svg
      width={width}
      height={finalHeight}
      viewBox={`0 0 ${width} ${finalHeight}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={calculateValue(615.703)}
        y={calculateValue(34.1875)}
        width={finalWidth}
        height={calculateValue(34.1771)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(615.703)} ${calculateValue(
          34.1875
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(578.742)}
        y={calculateValue(52.2168)}
        width={finalWidth}
        height={calculateValue(52.2151)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(578.742)} ${calculateValue(
          52.2168
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(541.758)}
        y={calculateValue(88.291)}
        width={finalWidth}
        height={calculateValue(88.2909)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(541.758)} ${calculateValue(
          88.291
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(504.797)}
        y={calculateValue(88.291)}
        width={finalWidth}
        height={calculateValue(88.2909)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(504.797)} ${calculateValue(
          88.291
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(467.836)}
        y={calculateValue(68.3574)}
        width={finalWidth}
        height={calculateValue(68.3543)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(467.836)} ${calculateValue(
          68.3574
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(430.852)}
        y={calculateValue(107.281)}
        width={finalWidth}
        height={calculateValue(107.278)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(430.852)} ${calculateValue(
          107.281
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(393.883)}
        y={calculateValue(34.1855)}
        width={finalWidth}
        height={calculateValue(34.1771)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(393.883)} ${calculateValue(
          34.1855
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(578.742)}
        y={calculateValue(107.281)}
        width={finalWidth}
        height={calculateValue(18.9873)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(578.742)} ${calculateValue(
          107.281
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(131.219)}
        y={calculateValue(107.281)}
        width={finalWidth}
        height={calculateValue(18.9873)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(131.219)} ${calculateValue(
          107.281
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(356.93)}
        y={calculateValue(52.2168)}
        width={finalWidth}
        height={calculateValue(52.2151)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(356.93)} ${calculateValue(
          52.2168
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(318.008)}
        y={calculateValue(88.291)}
        width={finalWidth}
        height={calculateValue(88.2909)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(318.008)} ${calculateValue(
          88.291
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(279.094)}
        y={calculateValue(88.291)}
        width={finalWidth}
        height={calculateValue(88.2909)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(279.094)} ${calculateValue(
          88.291
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(205.156)}
        y={calculateValue(107.281)}
        width={finalWidth}
        height={calculateValue(107.278)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(205.156)} ${calculateValue(
          107.281
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(168.195)}
        y={calculateValue(34.1855)}
        width={finalWidth}
        height={calculateValue(34.1771)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(168.195)} ${calculateValue(
          34.1855
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(131.219)}
        y={calculateValue(52.2168)}
        width={finalWidth}
        height={calculateValue(52.2151)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(131.219)} ${calculateValue(
          52.2168
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(94.2344)}
        y={calculateValue(88.291)}
        width={finalWidth}
        height={calculateValue(88.2909)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(94.2344)} ${calculateValue(
          88.291
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(57.2891)}
        y={calculateValue(88.291)}
        width={finalWidth}
        height={calculateValue(88.2909)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(57.2891)} ${calculateValue(
          88.291
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
      <rect
        x={calculateValue(20.3047)}
        y={calculateValue(17.0898)}
        width={finalWidth}
        height={calculateValue(17.0886)}
        rx="1"
        transform={`rotate(-180 ${calculateValue(20.3047)} ${calculateValue(
          17.0898
        )})`}
        fill={color}
        fill-opacity={opacity}
      />
    </svg>
  );
};
