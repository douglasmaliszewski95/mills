import { Section } from "../Section/Section";
import { SimpleInformationProps } from "./types";
import dnaBottom from "@/assets/dna-bottom.svg";

export const SimpleInformation: React.FC<SimpleInformationProps> = (props) => {
  const { text } = props;

  return (
    <Section
      sectionClass="bg-green-800 relative"
      containerClass="py-20 tablet:pt-8 tablet:pb-24"
    >
      <h5 className="text-white font-semibold text-[28px] tablet:text-base max-w-[70%] tablet:max-w-full tablet:px-4">
        {text}
      </h5>
      <div className="absolute right-3 overflow-hidden bottom-3 tablet:flex tablet:justify-end">
        <img src={dnaBottom.src} className=" mr-[-56px]" />
      </div>
    </Section>
  );
};
