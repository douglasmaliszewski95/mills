import { Section } from "@/components/shared/Section/Section";
import { MainApplicationsProps } from "./types";
import { getImageSrc } from "@/utils/images";

export const MainApplications: React.FC<MainApplicationsProps> = (props) => {
  const { title, cards } = props;

  return (
    <Section sectionClass="bg-orange-500 py-[56px] tablet:pt-5 tablet:pb-8 tablet:px-4">
      <h5 className="text-white text-2xl font-semibold mb-10 tablet:text-base">
        {title ?? null}
      </h5>
      <div className="flex gap-4 tablet:flex-col">
        {cards.map((card, index) => (
          <div key={index} className="rounded-lg bg-white basis-1/2 pb-6">
            <img
              className="rounded-t-lg w-full"
              src={getImageSrc(card?.fields)}
            />
            <h6 className="text-lg tablet:text-sm font-semibold text-green-800 pl-8 mt-6 mb-4 tablet:px-4">
              {card?.fields?.content_title}
            </h6>
            <p className="text-lg tablet:text-sm text-green-800 pr-[102px] pl-8 tablet:px-4">
              {card?.fields?.content_text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
