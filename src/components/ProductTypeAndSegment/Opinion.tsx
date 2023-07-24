import Image from "next/image";
import lineUp from "@/assets/img/linesUp.png";
import { OpinionProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const Opinion: React.FC<OpinionProps> = ({
  headerText,
  paragraphText,
  spanText,
  testimonial,
}) => {
  const { isMobile } = useScreenWidth();
  return (
    <section className="flex justify-center bg-orange-500 text-white">
      <div
        style={{
          backgroundImage: `url(${isMobile ? null : lineUp.src})`,
        }}
        className="flex justify-center py-11 bg-no-repeat w-full tablet:flex-col tablet:py-0"
      >
        <div className="flex justify-end desktop:hidden">
          <img src={lineUp.src} alt="barUp" />
        </div>
        <div className="flex container justify-between tablet:flex-col tablet:pb-11 tablet:pt-4 tablet:px-4">
          <div className="flex items-center">
            <h3 className="font-semibold text-3xl tablet:text-base tablet:mb-5">
              {headerText}
            </h3>
          </div>
          <div className="max-w-[444px]">
            <p className="text-lg font-semibold mb-2 tablet:text-sm">
              {paragraphText}
            </p>
            <span className="italic text-sm tablet:text-[10px]">
              {spanText}
            </span>
            <p className="font-normal mt-4 tablet:text-xs">{testimonial}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
