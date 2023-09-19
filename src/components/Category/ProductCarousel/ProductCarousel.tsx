import { Section } from "@/components/shared/Section/Section";
import { ProductCarouselProps } from "./types";
import Button from "@/components/shared/Button/Button";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import Image from "next/image";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";

export const ProductCarousel: React.FC<ProductCarouselProps> = (props) => {
  const { backgroundColor, variant, title, paragraphs, products, href } = props;
  const isWhite = variant === "white";

  const { isDesktop } = useScreenWidth();

  return (
    <Section
      sectionClass={`${backgroundColor} ${isDesktop && "h-[468px]"}`}
      containerClass="flex gap-[18px] tablet:gap-0 tablet:flex-col tablet:px-[18px]"
    >
      <div className="basis-1/2 tablet:shrink shrink-0 py-14 tablet:py-[10px] tablet:pt-8 pr-[102px] tablet:pr-[18px]">
        <h3
          className={`${
            isWhite ? "text-white" : "text-green-800"
          } text-2xl font-semibold max-w-[320px] mb-7 tablet:mb-4 tablet:text-base tablet:max-w-[200px]`}
        >
          {title ?? null}
        </h3>
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`${
              isWhite ? "text-white" : "text-green-800"
            } text-lg text-green-800 mb-7 tablet:mb-4 tablet:text-xs`}
          >
            {paragraph}
          </p>
        ))}
        {isDesktop && (
          <a href={href} className="max-w-[264px]">
            <Button
              variant={isWhite ? "inverted" : "default"}
              className="max-w-[264px] w-full"
            >
              <p className="py-[2px] text-sm font-semibold">Saiba mais</p>
            </Button>
          </a>
        )}
      </div>
      <div className="max-w-[50%] tablet:max-w-none h-full w-full tablet:rounded bg-white grow-0 relative h-full tablet:static">
        <div className="max-w-[100%] absolute h-full overflow-hidden tablet:overflow-visible tablet:static">
          <Carousel
            className="h-full"
            hasDots={false}
            nextArrow={
              <LargeNextArrow
                width={isDesktop ? 28 : 12}
                customProps="tablet:mr-[-36px]"
              />
            }
            prevArrow={
              <LargePrevArrow
                width={isDesktop ? 28 : 12}
                customProps="tablet:ml-[-36px]"
              />
            }
          >
            {products.map(({ id, image, model, description, specs }) => (
              <div key={id}>
                <div className="flex pr-20 pl-16 gap-2 h-[468px] tablet:h-full items-center h-full tablet:px-12 tablet:my-[18px] items-center h-full tablet:flex-col">
                  <ImageOCC
                    imageName={image}
                    alt={description}
                    className="max-w-[50%] tablet:max-w-full h-max"
                  />
                  <div className="tablet:mt-[18px]">
                    <h5 className="text-green-800 font-semibold tablet:text-sm">
                      {model}
                    </h5>
                    <h5 className="text-green-800 font-semibold tablet:text-sm max-w-[248x]">
                      {description}
                    </h5>
                    <div className="flex flex-col gap-px mt-[18px]">
                      {specs?.map(({ name, value }) => (
                        <p
                          key={`${name}${value}`}
                          className="text-green-800 text-sm tablet:text-[10px]"
                        >{`${name}: ${value}`}</p>
                      ))}
                    </div>
                    <Button
                      variant="outlined"
                      className="w-82 mt-1.5 pl-0 border-none tablet:mb-6"
                      size="small"
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      {!isDesktop && (
        <a href={href} className="max-w-[264px] my-6">
          <Button
            variant={isWhite ? "inverted" : "default"}
            className="max-w-[264px] w-full tablet:max-w-[992px]"
          >
            <p className="py-[2px] text-sm font-semibold">Saiba mais</p>
          </Button>
        </a>
      )}
    </Section>
  );
};
