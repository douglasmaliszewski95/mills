import verticalLines from "@/assets/FrequentQuestions/vertical-lines.svg";
import Image from "next/image";
import { Section } from "@/components/shared/Section/Section";
import {
  SustainabilityJourneyButtonsCardProps,
  SustainabilityJourneyButtonsProps,
  odsInterface,
} from "./types";
import { useEffect, useState } from "react";
import { getCMSText } from "@/components/Generators/content";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Carousel } from "@/components/shared/Carousel/Carousel";

export const SustainabilityJourneyButtons: React.FC<
  SustainabilityJourneyButtonsProps
> = (props) => {
  const { cards = [], title, ods = [] } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentButton, setCurrentButton] = useState<any>();
  const [modalsTexts, setModalsTexts] = useState<any>({});

  const { isMobile } = useScreenWidth();

  const openModal = async (cards: any, index: number) => {
    const contentText = await getCMSText("jornada_de_sustentabilidade");
    contentText?.icon_material_themes_text?.map((item: any) => {
      if (item?.description === cards?.description) {
        setModalsTexts({
          metas: item?.fields?.subtitle,
          text: item?.fields?.text,
          ods: item?.fields?.text_field,
          metasTitle: item?.fields?.title,
          index: index
        });
      }
    });
    setCurrentButton(cards);
    setIsOpenModal(true);
  };

  return (
    <section className="relative">
      {!isMobile && (
        <Image
          src={verticalLines}
          alt="Linhas verticais laranjas e verdes"
          className="absolute right-0 top-3 w-[48%] opacity-30 tablet:w-[45%]"
        />
      )}
      <Section containerClass="tablet:px-4 tablet:py-6 py-10">
        <h1 className="font-semibold text-2xl tablet:text-base w-[40%] tablet:w-full text-green-800">
          {title}
        </h1>

        <div className="grid-cols-3 tablet:grid-cols-1 grid mt-10 tablet:mt-6 tablet:gap-4 gap-8">
          {cards?.map(
            (card: SustainabilityJourneyButtonsCardProps, index: number) => (
              <button
                key={card.id}
                className={`w-full ${
                  index <= 2 ? "bg-orange-500" : "bg-green-800"
                } h-[123px] tablet:h-[81px] rounded-xl text-white flex items-center tablet:gap-4 justify-center`}
                onClick={() => {
                  openModal(card, index);
                }}
              >
                <div className="w-[15%] flex items-center justify-end">
                  <img
                    src={card.src}
                    className="tablet:w-[48px] tablet:h-[35.05px]"
                  />
                </div>
                <h1 className="font-semibold ml-6 tablet:ml-0 tablet:text-sm w-[45%] text-left">
                  {card.title}
                </h1>
              </button>
            )
          )}
        </div>
      </Section>

      {isOpenModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 tablet:overflow-y-scroll"
          onClick={() => setIsOpenModal(false)}
        >
          <div className="bg-white w-[80%] tablet:w-[90%] tablet:h-[98%] rounded-xl">
            {/* Header */}
            <div
              className={`flex w-full h-[125px] tablet:h-[85px] px-10 tablet:px-6 rounded-lg items-start py-12 tablet:py-0 items-center justify-between ${
                modalsTexts.index <= 2 ? "bg-orange-500" : "bg-green-800"
              }`}
            >
              <div className="flex items-center">
                <img
                  src={currentButton?.src}
                  className="tablet:w-24px h-[20px]"
                />
                <h3 className="text-2xl font-semibold tablet:text-base text-white tablet:ml-4 ml-10">
                  {currentButton?.title}
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
            <div className="relative px-10 tablet:px-6 pt-4 tablet:pt-0 flex-auto bg-white text-base text-green-800">
              <h1 className="font-semibold tablet:text-sm tablet:my-4">
                {modalsTexts?.text?.split(":")[0]}
              </h1>
              <p className="font-normal tablet:text-xs">
                {modalsTexts?.text?.split(":")[1]}
              </p>

              <div>
                <h1 className="py-4 text-green-800 font-semibold tablet:text-sm tablet:py-4 text-base">
                  {modalsTexts?.metasTitle}
                </h1>
                {modalsTexts?.metas?.map((card: any, index: number) => (
                  <>
                    <h6 key={index} className="bg-green-800 text-white tablet:text-xs w-[99px] h-[22.97px] tablet:h-[18px] text-center mb-1">
                      Meta {index + 1}
                    </h6>
                    <p className="mb-2 tablet:text-xs tablet:mb-4">{card}</p>
                  </>
                ))}
              </div>

              {/* ODS */}
              <div>
                <h1 className="text-green-800 font-semibold tablet:text-sm text-base mb-2 mt-2">
                  ODS
                </h1>
                <div className={`flex ${isMobile ? 'grid grid-cols-4' : 'flex-row'} gap-2`}>
                  {modalsTexts?.ods?.map((currentOd: number) => {
                    const res = ods?.find(
                      (od: odsInterface) =>
                        od?.description === `icon selo ods ${currentOd}`
                    );

                    return <img key={currentOd} src={res?.src} className="w-[65px] h-[62px]" />;
                  })}
                </div>
              </div>

              <p className="my-6 tablet:my-2 text-base font-semibold tablet:text-xs">
                <a href="" className="text-orange-500">
                  Clique aqui
                </a>{" "}
                e acompanhe nossa evolução nas metas e iniciativas
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
