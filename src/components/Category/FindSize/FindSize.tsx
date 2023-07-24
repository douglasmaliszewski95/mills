import { Carousel } from "@/components/shared/Carousel/Carousel";
import { Section } from "@/components/shared/Section/Section";
import { FindSizeProps } from "./types";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const FindSize: React.FC<FindSizeProps> = (props) => {
  const { title, slides } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section
      containerClass="flex gap-12 tablet:gap-5 tablet:flex-col"
      sectionClass="bg-orange-500 h-[506px] tablet:h-full tablet:pb-[52px] tablet:px-4 tablet:pt-8"
    >
      <div className="basis-1/2 tablet:basis-0 h-full flex items-center">
        <h3 className="text-white text-4xl font-semibold mb-6 tablet:mb-0 tablet:text-base">
          {title}
        </h3>
      </div>
      <div className="basis-1/2 tablet:basis-0 px-6 max-w-[50%] tablet:max-w-full tablet:px-0 h-full">
        <div className="px-6 bg-white h-full tablet:rounded">
          <Carousel
            className="h-full"
            hasDots={false}
            nextArrow={
              <LargeNextArrow
                width={isDesktop ? 28 : 18}
                customProps="mr-[-32px] tablet:mr-[-52px]"
              />
            }
            prevArrow={
              <LargePrevArrow
                width={isDesktop ? 28 : 18}
                customProps="ml-[-32px] tablet:ml-[-52px]"
              />
            }
          >
            {slides.map((text, index) => (
              <div
                key={index}
                className="h-[506px] tablet:min-h-[380px] tablet:h-min"
              >
                <div className="px-20 tablet:px-7 h-full flex flex-col justify-center tablet:min-h-[380px] tablet:py-2">
                  <p className="text-[200px] tablet:text-[100px] font-semibold text-green-800 leading-[200px] tablet:leading-[100px]">
                    {index + 1}
                  </p>
                  <div className="text-green-800 text-lg tablet:text-sm">
                    {text}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </Section>
  );
};
