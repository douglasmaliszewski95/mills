import { cards } from "@/components/Home/MeetOurProducts/utils";
import { Section } from "@/components/shared/Section/Section";
import { GuideProps } from "./types";

export const Guide: React.FC<GuideProps> = (props) => {
  const { cards } = props;

  return (
    <Section
      sectionClass="bg-beige-200 py-[44px] tablet:px-4 tablet:py-6 tablet:pb-8"
      containerClass="flex gap-5 tablet:flex-col"
    >
      {cards.map(({ id, title, description }) => (
        <div
          key={id}
          className={`basis-1/${cards.length} border-2 border-orange-500 rounded p-6 bg-transparent`}
        >
          <h6 className="text-green-800 mb-3 font-semibold">{title}</h6>
          <p className="text-green-800 text-sm">{description}</p>
        </div>
      ))}
    </Section>
  );
};
