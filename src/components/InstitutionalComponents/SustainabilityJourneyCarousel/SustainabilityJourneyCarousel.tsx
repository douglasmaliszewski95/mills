import { Carousel } from "@/components/shared/Carousel/Carousel";
import { Section } from "@/components/shared/Section/Section";
import { SustainabilityJourneyCard } from "./sustainabilityJourneyCard";
import {
  SustainabilityJourneyProps,
  SustainabilityJourneyCardProps,
} from "./types";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const SustainabilityJourneyCarousel: React.FC<
  SustainabilityJourneyProps
> = (props) => {
  const { cards = [] } = props;
  const {isMobile} = useScreenWidth()

  return (
    <Section containerClass="tablet:px-4 tablet:pb-20 py-10">
      <Carousel className="w-full" hasDots={isMobile ? true : false} nextArrow={
        !isMobile && <LargeNextArrow width={22} height={41}/>
      }>
        {cards.map((card: SustainabilityJourneyCardProps) => (
          <SustainabilityJourneyCard
            image={card.image}
            description={card.description}
            text={card.text}
            title={card.title}
            key={card.id}
            links={card.links}
            id={card.id}
          />
        ))}
      </Carousel>
    </Section>
  );
};
