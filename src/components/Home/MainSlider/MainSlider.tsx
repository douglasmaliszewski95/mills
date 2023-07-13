import * as Slider from "@radix-ui/react-slider";
import { MainSliderProps } from "./MainSlider.types";

export const MainSlider = (props: MainSliderProps) => {
  const { onChange } = props;

  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      defaultValue={[25]}
      onValueChange={(val) => onChange(val[0])}
      min={2}
      max={56}
      step={1}
    >
      <Slider.Track className="bg-green-800 relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-green-800 rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        className="block w-5 h-5 bg-orange rounded-[10px] hover:bg-orange focus:outline-none focus:shadow-blackA8"
        aria-label="Volume"
      />
    </Slider.Root>
  );
};
