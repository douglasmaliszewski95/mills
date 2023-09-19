import { TalkToSpecialistProps } from "./types";
import bgOperator from "@/assets/img/operators.png";
import bgOperatorMobile from "@/assets/img/operatorsMobile.png";
import Button from "../shared/Button/Button";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";

export const TalkToSpecialist = () => {
  const { isMobile } = useScreenWidth();
  const { talkToSpecialist } = useGetCMSShared();

  return (
    <section className="flex justify-center text-white">
      <div
        style={{
          backgroundImage: `url(${
            isMobile
              ? talkToSpecialist?.bgImageMobile
              : talkToSpecialist?.bgImage
          })`,
        }}
        className="flex bg-no-repeat bg-cover w-full tablet:flex-col tablet:py-0"
      >
        <div className="flex justify-center items-center flex-col bg-gray-25 w-full h-full py-16 tablet:pt-28 tablet:pb-6">
          <div className="container justify-start tablet:flex-col tablet:pb-11 tablet:px-4">
            <h3 className="font-semibold w-[665px] text-3xl mb-6 tablet:w-full tablet:text-base tablet:mb-5">
              {talkToSpecialist?.headerText}
            </h3>
            <Button className="py-3 w-[251px] tablet:w-full">
              {talkToSpecialist?.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
