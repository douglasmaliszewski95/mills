import { Section } from "@/components/shared/Section/Section";
import { OtherSegmentsProps } from "./types";
import { getImageSrc } from "@/utils/images";

export const OtherSegments: React.FC<OtherSegmentsProps> = (props) => {
  const { title, cards } = props;

  return (
    <Section containerClass="pt-10 pb-12 tablet:px-4 tablet:py-6">
      <h3 className="text-2xl font-semibold text-green-800 mb-8 tablet:mb-5 tablet:text-base">
        {title}
      </h3>
      <div className="flex gap-2 tablet:flex-col">
        {cards?.map((card) => (
          <a
            href={card?.fields?.href_attribute}
            key={card.description}
            style={{ backgroundImage: `url(${getImageSrc(card?.fields)})` }}
            className="basis-1/5 rounded-lg bg-center bg-cover bg-no-repeat"
          >
            <div className="bg-black/60 h-full w-full py-40 tablet:py-[44px] rounded-lg">
              <p className="text-white text-center text-xl tablet:text-base font-semibold">
                {card?.fields?.content_title}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};
