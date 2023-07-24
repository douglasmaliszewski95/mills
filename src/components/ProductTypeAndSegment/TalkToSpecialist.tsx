import { TalkToSpecialistProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import bgOperator from "@/assets/img/operators.png";
import bgOperatorMobile from "@/assets/img/operatorsMobile.png";
import Button from "../shared/Button/Button";

export const TalkToSpecialist: React.FC<TalkToSpecialistProps> = ({
  headerText,
  buttonProps,
}) => {
  const { isMobile } = useScreenWidth();
  return (
    <section className="flex justify-center text-white">
      <div
        style={{
          backgroundImage: `url(${
            isMobile ? bgOperatorMobile.src : bgOperator.src
          })`,
        }}
        className="flex bg-no-repeat bg-cover w-full tablet:flex-col tablet:py-0"
      >
        <div className="flex justify-center items-center flex-col bg-gray-25 w-full h-full py-16 tablet:pt-28 tablet:pb-6">
          <div className="container justify-start tablet:flex-col tablet:pb-11 tablet:px-4">
            <h3 className="font-semibold w-[665px] text-3xl mb-6 tablet:w-full tablet:text-base tablet:mb-5">
              {headerText}
            </h3>
            <Button className="py-3 w-[251px] tablet:w-full">
              {buttonProps?.text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
