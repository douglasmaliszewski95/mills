import { Section } from "@/components/shared/Section/Section";
import verticalLines from "@/assets/FrequentQuestions/vertical-lines.svg";
import Image from "next/image";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { OurGoalsCard } from "./OurGoalsCard/OurGoalsCard";
import { OurGoalsProps, GoalsCardProps } from "./types";
import React from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const OurGoals: React.FC<OurGoalsProps> = (props) => {
  const { description, goalsCards = [], title } = props;
  const { isDesktop } = useScreenWidth();
  return (
    <section className="relative overflow-x-hidden min-h-[550px] tablet:min-h-[700px]">
      <Image
        src={verticalLines}
        alt="Linhas verticais laranjas e verdes"
        className="absolute right-0 top-4 opacity-30 tablet:w-[45%]"
      />

      <Section containerClass="flex bg-white flex-col justify-between pt-16 tablet:pt-8 tablet:px-4 text-green-800">
        <div className="w-[750px] tablet:w-[70%]">
          <h3 className="text-base font-normal tablet:text-xs">{title}</h3>
          <p className="text-2xl tablet:text-base font-semibold mt-4">
            {description}
          </p>
        </div>

        <div className="mt-10 tablet:mt-8">
          <Carousel
            spacing={"-30"}
            nextArrow={
              isDesktop && (
                <LargeNextArrow
                  arrowColor="white"
                  width={20}
                  arrowBorderRightDistance="right-6"
                />
              )
            }
            prevArrow={
              isDesktop && <LargeNextArrow width={isDesktop ? 20 : 0} />
            }
          >
            {goalsCards.map((card: GoalsCardProps) => (
              <OurGoalsCard
                cardDescription={card.cardDescription}
                key={card.id}
                id={card.id}
                cardTitle={card.cardTitle}
                src={card.src}
              />
            ))}
          </Carousel>
        </div>
      </Section>
    </section>
  );
};
