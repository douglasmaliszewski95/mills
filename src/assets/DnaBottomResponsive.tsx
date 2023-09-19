import useScreenWidth from "@/services/hooks/useScreenWidth";
import { IconProps } from "@/utils/types";

export const DnaBottomResponsive: React.FC<IconProps> = (props) => {
  const {
    color,
    width = "720",
    opacity = "0.15",
    height,
    cellWidth = "19.4573",
    sizePercentage = 100,
  } = props;
  const { isMobile } = useScreenWidth();

  const calculateValue = (value: number) => {
    const calculatedValue = (sizePercentage / 100) * value;
    const result = calculatedValue.toString();

    return result;
  };

  const finalHeight = height ? height : isMobile ? "38" : "130";
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
        y={calculateValue(88.1816)}
        width={finalWidth}
        height={calculateValue(40.9557)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(43.2266)}
        y={calculateValue(66.5742)}
        width={finalWidth}
        height={calculateValue(62.5712)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(86.4609)}
        y={calculateValue(23.3477)}
        width={finalWidth}
        height={calculateValue(105.802)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(129.688)}
        y={calculateValue(23.3477)}
        width={finalWidth}
        height={calculateValue(105.802)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(172.914)}
        y={calculateValue(47.2324)}
        width={finalWidth}
        height={calculateValue(81.9114)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(216.156)}
        y={calculateValue(0.589844)}
        width={finalWidth}
        height={calculateValue(128.555)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(259.391)}
        y={calculateValue(88.1816)}
        width={finalWidth}
        height={calculateValue(40.9557)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(43.2266)}
        y={calculateValue(0.589844)}
        width={finalWidth}
        height={calculateValue(22.7532)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(566.555)}
        y={calculateValue(0.589844)}
        width={finalWidth}
        height={calculateValue(22.7532)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(302.609)}
        y={calculateValue(66.5742)}
        width={finalWidth}
        height={calculateValue(62.5712)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(348.117)}
        y={calculateValue(23.3457)}
        width={finalWidth}
        height={calculateValue(105.802)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(393.625)}
        y={calculateValue(23.3477)}
        width={finalWidth}
        height={calculateValue(105.802)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(480.086)}
        y={calculateValue(0.589844)}
        width={finalWidth}
        height={calculateValue(128.555)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(523.305)}
        y={calculateValue(88.1816)}
        width={finalWidth}
        height={calculateValue(40.9557)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(566.555)}
        y={calculateValue(66.5742)}
        width={finalWidth}
        height={calculateValue(62.5712)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(609.797)}
        y={calculateValue(23.3477)}
        width={finalWidth}
        height={calculateValue(105.802)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(653.008)}
        y={calculateValue(23.3477)}
        width={finalWidth}
        height={calculateValue(105.802)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
      <rect
        x={calculateValue(696.25)}
        y={calculateValue(108.67)}
        width={finalWidth}
        height={calculateValue(20.4779)}
        rx="1"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};
