import { LiftingPlatformsProps } from "@/components/ProductTypeAndSegment/types";
import Button from "../shared/Button/Button";
import bgImg from "@/assets/img/liftingPlatformsbg.png";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const LiftingPlatforms: React.FC<LiftingPlatformsProps> = ({
  headerText,
  textCards,
}) => {
  const { isMobile } = useScreenWidth();
  return (
    <section
      className="flex justify-center h-full text-green-800 bg-beige-200 bg-no-repeat bg-right-bottom"
      style={{ backgroundImage: isMobile ? "" : `url(${bgImg.src})` }}
    >
      <div className="flex justify-between container tablet:flex-col">
        <div
          className={`flex flex-col py-20 gap-10 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9`}
        >
          <h3 className="font-semibold text-2xl tablet:text-base">
            {headerText}
          </h3>
          <div className="flex flex-wrap gap-2">
            {textCards?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center rounded bg-white/50 py-3 px-9 font-semibold tablet:w-full tablet:text-xs tablet:justify-center"
                >
                  <p className="text-left text-sm tablet:text-[10px] tablet:text-center">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
          <Button className="max-w-[265px] py-[10px]">Ver modelos</Button>
        </div>
      </div>
    </section>
  );
};
