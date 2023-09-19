import { ImageCMS } from "@/types";
import { Carousel } from "../Carousel/Carousel";
import { Section } from "../Section/Section";
import { SlideshowProps } from "./types";
import { getImageSrc } from "@/utils/images";
import { LargeNextArrow } from "../Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "../Arrows/LargePrevArrow/LargePrevArrow";
import dnaBottom from "@/assets/dna-bottom-white.svg";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const Slideshow: React.FC<SlideshowProps> = (props) => {
  const { title, slides } = props;
  const { isDesktop, isMobile } = useScreenWidth();

  return (
    <Section
      containerClass="flex tablet:flex-col gap-12 tablet:gap-5 justify-between items-center"
      sectionClass="bg-beige-200 relative"
    >
      {isDesktop && (
        <img src={dnaBottom.src} className="absolute left-3 bottom-3" />
      )}
      <div className="basis-1/2 pr-24 tablet:pr-4 tablet:pl-4">
        <h4 className="text-green-800 text-3xl tablet:text-base font-semibold mb-12 tablet:mb-0 tablet:mt-8">
          {title}
        </h4>
      </div>
      <div className="basis-1/2 max-w-[562px] h-[506px] tablet:h-[302px] tablet:w-[100%]">
        <Carousel
          hasDots={false}
          nextArrow={
            <LargeNextArrow
              width={isMobile ? 14 : 22}
              arrowColor="white"
              customProps="tablet:mr-[-24px]"
            />
          }
          prevArrow={
            <LargePrevArrow
              width={isMobile ? 14 : 22}
              arrowColor="white"
              customProps="tablet:ml-[-24px]"
            />
          }
        >
          {slides?.map((image: ImageCMS) => (
            <div
              key={image?.description}
              className="relative h-[506px] w-[562px] tablet:h-[302px] tablet:w-[100%]"
            >
              <img
                className="absolute right-0 top-0 w-full h-full"
                src={getImageSrc(image?.fields)}
              />
              <div className="absolute bottom-0 h-[300px] w-full px-16 pb-8 bg-gradient-to-b from-transparent to-black flex items-end justify-center">
                <div>
                  <h6 className="text-2xl font-semibold text-white mb-1 tablet:text-sm">
                    {image?.fields?.content_title}
                  </h6>
                  <p className="text-white font-semibold text-lg tablet:text-xs">
                    {image?.fields?.content_text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
};
