import { Carousel } from "../Carousel/Carousel";
import { Section } from "../Section/Section";
import { TextWithCarouselProps, CertificationsCardProps } from "./types";
import { CertificationsCard } from "./CertificationsCard/CertificationsCard";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { LargeNextArrow } from "../Arrows/LargeNextArrow/LargeNextArrow";

export const TextWithCarousel: React.FC<TextWithCarouselProps> = (props) => {
  const {
    certificationCard = [],
    description,
    theme = "bg-orange-500",
    title,
  } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section
      sectionClass={`${theme}`}
      containerClass="mb-44 mt-32 flex flex-row tablet:flex-col justify-between tablet:px-4 tablet:mt-10 tablet:mb-20"
    >
      <div className="text-white w-[45%] tablet:w-full">
        <h1 className="text-[32px] font-semibold tablet:text-base tablet:font-semibold">
          {title}
        </h1>
        <p className="font-normal text-lg mt-4 tablet:text-xs tablet:font-normal">
          {description}
        </p>
      </div>
      <div className="w-[45%] tablet:w-full tablet:mt-8">
        <Carousel
          darkOrangeDot={true}
          nextArrow={
            <LargeNextArrow
              arrowColor="white"
              width={20}
              arrowBorderRightDistance={isDesktop ? "right-[-50px]" : "0"}
            />
          }
        >
          {certificationCard.map(
            (card: CertificationsCardProps, index: number) => (
              <CertificationsCard
                key={index}
                description={card.description}
                title={card.title}
                src={card.src}
              />
            )
          )}
        </Carousel>
      </div>
    </Section>
  );
};
