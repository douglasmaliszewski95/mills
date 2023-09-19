import { ImageCMS } from "@/types";
import { Section } from "../Section/Section";
import { GridInformationProps } from "./types";
import { getImageSrc } from "@/utils/images";
import { DnaTop } from "@/assets/DnaTop";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const GridInformation: React.FC<GridInformationProps> = (props) => {
  const { title, cards } = props;
  const { isDesktop, isMobile } = useScreenWidth();

  return (
    <Section
      sectionClass="bg-green-800 relative"
      containerClass="pt-[72px] pb-24 tablet:pt-6 tablet:px-4"
    >
      {isDesktop && (
        <div className="absolute top-3 right-3">
          <DnaTop color="#FFFFFF" opacity="0.1" width="615" />
        </div>
      )}
      <h4 className="text-2xl text-white font-semibold mb-8 tablet:mb-6 tablet:text-base">
        {title}
      </h4>
      <div className="grid grid-cols-3 grid-rows-2 gap-6 tablet:flex tablet:flex-col tablet:gap-2 tablet:h-full">
        {cards?.map((card: ImageCMS) => (
          <div
            key={card?.description}
            className="rounded bg-white px-7 flex gap-4 items-center py-5 tablet:py-2 tablet:h-full tablet:basis-1/6"
          >
            <div className="flex h-full items-center justify-between gap-3 tablet:gap-5">
              <img
                src={getImageSrc(card?.fields)}
                className={`${isMobile ? "max-w-[44px] max-h-[44px]" : ""}`}
              />
              <p className="text-green-800 text-sm tablet:text-xs">
                {card?.fields?.content_text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
