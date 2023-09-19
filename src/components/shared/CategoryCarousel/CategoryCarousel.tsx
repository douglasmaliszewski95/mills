import { ImageCMS } from "@/types";
import { Carousel } from "../Carousel/Carousel";
import { Section } from "../Section/Section";
import { CategoryCarouselProps } from "./types";
import { getImageSrc } from "@/utils/images";
import Button from "../Button/Button";
import { LargeNextArrow } from "../Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "../Arrows/LargePrevArrow/LargePrevArrow";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const CategoryCarousel: React.FC<CategoryCarouselProps> = (props) => {
  const { categories, title } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section sectionClass="pt-[56px] pb-20 tablet:pt-6 tablet:pb-8 tablet:px-4">
      <h5 className="text-2xl text-green-800 font-semibold mb-4 tablet:text-base tablet:max-w-[75%] ">
        {title}
      </h5>
      <div className="max-w-[100%]">
        <Carousel
          slidesToShow={isDesktop ? 3 : 1}
          slidesToScroll={isDesktop ? 3 : 1}
          hasDots={false}
          nextArrow={
            <LargeNextArrow
              width={isDesktop ? 22 : 12}
              height={isDesktop ? 22 : 19}
              arrowBorderRightDistance="right-[20px]"
            />
          }
          prevArrow={
            <LargePrevArrow
              width={isDesktop ? 22 : 12}
              height={isDesktop ? 22 : 19}
              arrowBorderRightDistance="-20px"
            />
          }
        >
          {categories?.map((category: ImageCMS) => (
            <>
              <div
                key={category?.description}
                className="text-center flex flex-col items-center justify-between h-[288px] px-12 tablet:px-0"
              >
                <div className="h-[140px] flex items-center">
                  <img
                    src={getImageSrc(category?.fields)}
                    className="max-w-[176px]"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-green-800 mb-3 tablet:text-sm">
                    {category?.fields?.content_title}
                  </p>
                  <p className="text-sm text-green-800 mb-3 tablet:text-xs">
                    {category?.fields?.content_text}
                  </p>
                  <a
                    href={category?.fields?.href_attribute ?? "#"}
                    className="w-[256px] tablet:w-full"
                  >
                    <Button variant="outlined" className="w-full">
                      <p>{category?.fields?.buttonText ?? "Ver detalhes"}</p>
                    </Button>
                  </a>
                </div>
              </div>
            </>
          ))}
        </Carousel>
      </div>
    </Section>
  );
};
