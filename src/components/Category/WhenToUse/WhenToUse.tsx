import { Section } from "@/components/shared/Section/Section";
import { WhenToUseProps } from "./types";
import { DnaTop } from "@/assets/DnaTop";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const WhenToUse: React.FC<WhenToUseProps> = (props) => {
  const { title, cards } = props;
  const { isMobile } = useScreenWidth();

  return (
    <Section sectionClass="py-12 tablet:pt-6 tablet:pb-8 tablet:px-4">
      {!isMobile && <div className="relative flex justify-end"><div className="absolute top-[-50px]">
        <DnaTop width="550" height="88" color="#ebe3c7" opacity="0.30" />
      </div></div>}
      <h4 className="text-2xl font-semibold text-green-800 mb-12 tablet:mb-8 tablet:text-base">
        {title ?? null}
      </h4>
      <div className="flex gap-5 tablet:gap-4 tablet:flex-col">
        {cards?.map((item, index) => (
          <div
            key={index}
            className="basis-1/3 rounded bg-beige-200 px-7 py-8 tablet:pb-6 flex flex-col items-center tablet:text-center"
          >
            <img
              width={52}
              height={52}
              alt="Certo"
              src={item.image}
              className="my-7 tablet:mt-0 tablet:mb-6"
            />
            <p className="text-green-800 tablet:text-xs">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};
