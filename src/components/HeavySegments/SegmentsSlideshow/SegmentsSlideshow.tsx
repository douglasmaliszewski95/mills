import { Section } from "@/components/shared/Section/Section";
import { SegmentsSlideshowProps } from "./types";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { ImageCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import Button from "@/components/shared/Button/Button";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const SegmentsSlideshow: React.FC<SegmentsSlideshowProps> = (props) => {
  const { title, description, buttonHref = "#", slides } = props;
  const { isDesktop, isMobile } = useScreenWidth();

  return (
    <Section
      containerClass="flex gap-12 tablet:gap-6 tablet:flex-col tablet:py-6"
      sectionClass="bg-[#F5F5F5]"
    >
      <div className="basis-1/2 flex flex-col justify-center gap-6 tablet:px-4">
        <h4 className="text-2xl text-green-800 font-semibold tablet:text-base">
          {title}
        </h4>
        <p className="text-green-800 text-lg tablet:text-xs tablet:leading-5">
          {description}
        </p>
        {isDesktop && (
          <a className="max-w-[264px]" href={buttonHref}>
            <Button className="w-full">
              <p className="font-semibold text-sm">Ver modelos</p>
            </Button>
          </a>
        )}
      </div>
      <div className="basis-1/2 max-w-[48%] tablet:max-w-[100%]">
        <Carousel
          spacing={isDesktop ? "28" : "20"}
          marginLeft="12px"
          smallDots
          nextArrow={
            <LargeNextArrow
              width={12}
              customProps="mr-[-20px] tablet:mr-[-32px]"
            />
          }
          prevArrow={
            <LargePrevArrow
              width={12}
              customProps="ml-[-20px] tablet:ml-[-32px]"
            />
          }
        >
          {slides?.map((slide: ImageCMS) => (
            <div
              key={slide?.fields?.content_title}
              className="h-[510px] tablet:h-[232px] relative mb-[-6px]"
            >
              <div
                className="absolute h-full w-full bg-no-repeat bg-cover "
                style={{
                  backgroundImage: `url(${getImageSrc(slide?.fields)})`,
                }}
              ></div>
              <div className="absolute h-full w-full bg-black/70 pl-[72px] tablet:pl-12 pr-10 flex flex-col justify-end pb-20 tablet:pb-10 gap-4">
                <h6 className="text-white text-lg font-semibold tablet:text-base">
                  {slide?.fields?.content_title}
                </h6>
                <p className="text-white leading-5 tablet:text-xs">
                  {slide?.fields?.content_text}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
        {isMobile && (
          <a href="#">
            <div className="px-4 mt-6">
              <Button className="w-full">
                <p className="font-semibold text-sm">Ver modelos</p>
              </Button>
            </div>
          </a>
        )}
      </div>
    </Section>
  );
};
