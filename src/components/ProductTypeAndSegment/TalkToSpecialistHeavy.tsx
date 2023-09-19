import { TalkToSpecialistProps } from "./types";
import bgOperator from "@/assets/img/operators.png";
import bgOperatorMobile from "@/assets/img/operatorsMobile.png";
import Button from "../shared/Button/Button";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";
import { Section } from "../shared/Section/Section";

interface SpecialistHeavy {
    title: string;
    text: string;
    link: string
    buttonText: string;
    image: string;
}

export const TalkToSpecialistHeavy: React.FC<SpecialistHeavy> = (props) => {
    const {buttonText,link,text,title, image} = props;
  const { isMobile } = useScreenWidth();

  return (
    <section className="flex justify-center text-white">
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="flex bg-no-repeat bg-cover w-full tablet:flex-col tablet:py-0"
      >
        <div className="flex items-center justify-center flex-col bg-gray-25 w-full h-full py-32 tablet:pt-56 tablet:pb-6">
          <div className="container justify-start flex flex-col tablet:flex-col tablet:pb-0 tablet:px-4 ">
            <h3 className="font-semibold w-[55%] tablet:w-full text-3xl tablet:w-full tablet:text-base tablet:mb-5">
              {title}
            </h3>
            <p className="w-[40%] tablet:w-full text-base font-normal tablet:my-0 my-4 tablet:text-xs">{text}</p>
            <a href={link ? link : ''} className="tablet:mt-2 flex w-[25%] bg-orange-500 tablet:w-full font-semibold items-center justify-center text-sm rounded-3xl h-[37px]">
              {buttonText ? buttonText : 'Fale com um especialista'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
