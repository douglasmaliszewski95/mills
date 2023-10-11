import { DnaBottom } from "@/assets/DnaBottom";
import { Section } from "@/components/shared/Section/Section";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Fragment, useState } from "react";
import {
  IntegrityAndQualityModalProps,
  IntegrityAndQualityProps,
} from "./types";

export const IntegrityAndQuality: React.FC<IntegrityAndQualityProps> = (
  props
) => {
  const { buttons = [], description = "", title = "" } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentButton, setCurrentButton] =
    useState<IntegrityAndQualityModalProps>(buttons[0]);

  const modal = (btn: IntegrityAndQualityModalProps) => {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 tablet:overflow-y-scroll"
        onClick={() => setIsOpenModal(false)}
      >
        <div className="bg-white w-[80%] tablet:w-[90%] tablet:h-[80%] rounded-xl">
          {/* Header */}
          <div
            className={`flex w-full px-10 tablet:px-6 rounded-lg items-start pb-8 pt-14 tablet:pb-4 tablet:pt-8 items-center justify-between bg-orange-500`}
          >
            <div className="flex items-center">
              <h3 className="text-2xl font-semibold tablet:text-base text-white">
                {btn?.title}
              </h3>
            </div>
            <button
              className="border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setIsOpenModal(false)}
            >
              <span className=" text-white w-6 tablet:text-xs text-3xl block outline-none focus:outline-none">
                X
              </span>
            </button>
          </div>
          {/* Main Content */}
          <div className="relative px-10 tablet:px-6 tablet:pt-0 flex-auto bg-white text-green-800 pb-6">
            {btn.description.map((desc: string, index: number) => {
              const title = desc.split(" || ")[0];
              const text = desc.split(" || ")[1];
              return (
                <div className="text-green-800 text-base my-6 tablet:text-xs" key={index}>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="font-normal">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const { isMobile } = useScreenWidth();
  return (
    <section className="relative">
      {!isMobile && (
        <div className="absolute top-[2px] right-2 rotate-180">
          <DnaBottom color="#EBE3C7" opacity="0.30" />
        </div>
      )}
      <Section
        sectionClass="bg-white"
        containerClass="tablet:px-4 tablet:py-8 py-24"
      >
        <div className="w-[65%] tablet:w-full text-green-800">
          <h3 className="text-2xl font-semibold tablet:w-full w-[70%] tablet:text-base tablet:font-bold">
            {title}
          </h3>
          <p className="text-lg font-normal mt-4 tablet:w-full w-[95%] tablet:text-xs">
            {description}
          </p>

          <div className="flex flex-row tablet:flex-col tablet:mt-6 gap-4 w-full mt-12">
            {buttons.map((btn: IntegrityAndQualityModalProps) => {
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    setCurrentButton(btn);
                    setIsOpenModal(true);
                  }}
                  className="h-[67.22px] tablet:h-[51px] tablet:text-sm w-full bg-orange-500 rounded-md text-white text-lg font-semibold"
                >
                  {btn.title}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {isOpenModal && modal(currentButton)}
    </section>
  );
};
