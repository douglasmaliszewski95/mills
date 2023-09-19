import { Section } from "../Section/Section";
import { AboutTwoButtonsProps } from "./types";

export const AboutTwoButtons: React.FC<AboutTwoButtonsProps> = (props) => {
  const { description, firstBtn, image, secondBtn, title } = props;
  return (
    <Section
      containerClass="flex flex-row gap-12 tablet:flex-col-reverse tablet:gap-4 z-10"
      sectionClass="bg-green-800 z-10"
    >
      <div className="w-[50%] tablet:w-full text-lg text-white flex flex-col justify-center tablet:px-4 z-10 bg-green-800 tablet:text-xs">
        <h1 className="font-normal">{title}</h1>

        <p className="font-semibold">{description}</p>

        <div className="flex flex-col gap-4 tablet:w-full w-[45%] mt-4 tablet:pb-6 text-sm font-semibold">
          <a
            className="h-[37px] bg-orange-500 rounded-3xl flex items-center justify-center"
            href={firstBtn.link}
          >
            {firstBtn.title}
          </a>

          <a
            className="h-[37px] bg-transparent border-[1px] border-white rounded-3xl flex items-center justify-center"
            href={secondBtn.link}
          >
            {secondBtn.title}
          </a>
        </div>
      </div>
      <div className="w-[50%] tablet:w-full ">
        <img src={image} className="w-full h-full" />
      </div>
    </Section>
  );
};
