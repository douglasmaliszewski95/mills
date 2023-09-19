import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { Section } from "@/components/shared/Section/Section";
import { SmallLoaderCarouselComponent } from "./SmallLoaderCarouselComponent";
import {
  SmallLoaderCarouselComponentProps,
  SmallLoaderFuncProps,
} from "./types";
import { number } from "yup";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const SmallLoaderFunc: React.FC<SmallLoaderFuncProps> = (props) => {
  const { carouselComp = [], title } = props;
  const { isMobile } = useScreenWidth();

  return (
    <Section containerClass="tablet:px-4 flex flex-col gap-12 tablet:py-8 tablet:gap-0 py-20">
      <h1 className="text-2xl text-green-800 font-semibold tablet:w-full w-[50%] tablet:text-base">{title}</h1>
      {isMobile ? (
        <div className="flex flex-col">
          {carouselComp.map((item: SmallLoaderCarouselComponentProps) => (
            <SmallLoaderCarouselComponent
              image={item.image}
              text={item.text}
              titulo={item.titulo}
              id={item.id}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="">
          <Carousel
            className="mb-6"
            hasDots={true}
            slidesToShow={3}
            slidesToScroll={3}
            spacing="-40"
            nextArrow={
              <LargeNextArrow
                width={22}
                arrowBorderRightDistance="right-[1.5rem]"
              />
            }
            prevArrow={
              <LargePrevArrow
                width={22}
                arrowBorderRightDistance="right-[-10]"
              />
            }
          >
            {carouselComp.map((item: SmallLoaderCarouselComponentProps) => (
              <SmallLoaderCarouselComponent
                image={item.image}
                text={item.text}
                titulo={item.titulo}
                id={item.id}
                key={item.id}
              />
            ))}
          </Carousel>
        </div>
      )}
    </Section>
  );
};
