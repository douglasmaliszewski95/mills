import { Section } from "@/components/shared/Section/Section";
import dnatop from "@/assets/dna-top.svg";
import Image from "next/image";
import { OurAcknowledgmentsProps, AcknowledgmentsCardsProps } from "./types";
import { AcknowledgmentsCards } from "./AcknowledgmentsCards/AcknowledgmentsCards";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { DnaTop } from "@/assets/DnaTop";

export const OurAcknowledgments: React.FC<OurAcknowledgmentsProps> = (
  props
) => {
  const { acknowledgmentsCards = [], title, theme = "white" } = props;
  const { isMobile } = useScreenWidth();

  return (
    <section
      className={`relative bg-${theme} pt-2 tablet:pt-0 pb-24 tablet:pb-4 tablet:mb-8`}
    >
      {!isMobile && (
        <div className="absolute top-2 right-3">
          <DnaTop width="685" color="green-800" opacity="0.10" />
        </div>
      )}
      <Section
        containerClass="mt-10 tablet:mt-6 tablet:px-4 tablet:mb-10 "
        sectionClass={`bg-${theme}`}
      >
        <h1
          className={`font-semibold text-2xl ${
            theme === "white" ? "text-green-800" : "text-white"
          } tablet:text-base w-[40%] tablet:w-full`}
        >
          {title}
        </h1>

        <Carousel
          hasDots={true}
          spacing={"-30"}
          slidesToShow={isMobile ? 1 : 3}
          className="mt-10 tablet:mt-10"
        >
          {acknowledgmentsCards.map(
            (card: AcknowledgmentsCardsProps, index) => (
              <AcknowledgmentsCards
                textColor={theme === "white" ? "text-green-800" : "text-white"}
                key={index}
                cardDescription={card.cardDescription}
                cardTitle={card.cardTitle}
                src={card.src}
              />
            )
          )}
        </Carousel>
      </Section>
    </section>
  );
};
