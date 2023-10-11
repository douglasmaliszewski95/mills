import { Carousel } from "@/components/shared/Carousel/Carousel";
import { Section } from "@/components/shared/Section/Section";
import {
  PositiveImpactsCarouselCardsProps,
  PositiveImpactsCarouselProps,
} from "./types";
import { PositiveImpactsCarouselCard } from "./PositiveImpactsCarouselCard";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const PositiveImpactsCarousel: React.FC<PositiveImpactsCarouselProps> = (
  props
) => {
  const { cards = [], title = "" } = props;
  const { isMobile } = useScreenWidth();

  return (
    <Section containerClass="tablet:px-4 mt-8" sectionClass="bg-gray-50">
      <h3 className="text-2xl font-semibold text-green-800 tablet:text-base">{title}</h3>
      <Carousel
        className="mb-24 tablet:mt-2"
        hasDots={true}
        nextArrow={
          !isMobile &&
          <LargeNextArrow
            width={22}
            height={41}
            arrowBorderRightDistance="right-0"
          />
        }
      >
        {cards.map((card: PositiveImpactsCarouselCardsProps) => (
          <PositiveImpactsCarouselCard
            key={card.id}
            description={card.description}
            id={card.id}
            src={card.src}
            title={card.title}
            btnTitle={card.btnTitle}
            link={card.link}
          />
        ))}
      </Carousel>
    </Section>
  );
};
