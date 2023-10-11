import LargeChevronRightGreen from "@/assets/large-green-chevron-right.svg";
import LargeChevronLeftGreen from "@/assets/large-green-chevron-left.svg";
import { Section } from "@/components/shared/Section/Section";
import { useEffect, useState } from "react";
import { QuestionsComponentProps, QuestionsAndAnswersProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const QuestionsComponent: React.FC<QuestionsComponentProps> = (
  props
) => {
  const { questionsList } = props;

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionsAndAnswersProps>(questionsList[0]);

  const { isMobile } = useScreenWidth();

  useEffect(() => {
    setSelectedQuestion(questionsList[0]);
  }, [questionsList]);

  return isMobile ? (
    <Section
      sectionClass="bg-beige-200"
      containerClass="gap-14 flex flex-row px-4 py-4"
    >
      <div className="text-green-800 flex flex-col gap-4 w-full justify-center">
        {questionsList?.map((item: QuestionsAndAnswersProps, index: number) => (
          <div
            key={index}
            className={`${
              questionsList.length !== index + 1 &&
              "border-beige-500  border-b-[2px]"
            } w-full flex flex-col`}
          >
            <button
              key={item.id}
              onClick={() => {
                if (
                  selectedQuestion?.question?.toLowerCase() ===
                  item?.question?.toLowerCase()
                ) {
                  setSelectedQuestion({ answear: "", id: 0, question: "" });
                } else {
                  setSelectedQuestion(item);
                }
              }}
              className={`text-sm w-full flex py-6 justify-between items-center  ${
                selectedQuestion?.question?.toLowerCase() ===
                item?.question?.toLowerCase()
                  ? "font-semibold"
                  : "font-light"
              }`}
            >
              {item.question}
              {selectedQuestion?.answear === item.answear ? (
                <img
                  src={LargeChevronLeftGreen.src}
                  className={`w-[10px] h-[19px] rotate-90`}
                />
              ) : (
                <img
                  src={LargeChevronRightGreen.src}
                  className={`opacity-50 w-[10px] h-[19px] rotate-90`}
                />
              )}
            </button>

            {item?.question.toLowerCase() ===
              selectedQuestion?.question.toLowerCase() && (
              <div className="pb-6">
                <h3 className="font-normal text-xs text-green-800">
                  {selectedQuestion?.answear}
                </h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  ) : (
    <Section
      sectionClass="bg-beige-200"
      containerClass="gap-14 flex flex-row desktop:h-[500px]"
    >
      <div className="text-green-800 flex flex-col gap-4 w-[50%] justify-center">
        {questionsList?.map((item: QuestionsAndAnswersProps, index: number) => (
          <button
            key={item.id}
            onClick={() => setSelectedQuestion(item)}
            className={`text-2xl flex py-8 justify-between items-center ${
              questionsList.length !== index + 1 &&
              "border-beige-500  border-b-[2px]"
            } ${
              selectedQuestion?.question?.toLowerCase() ===
              item?.question?.toLowerCase()
                ? "font-semibold"
                : "font-light"
            }`}
          >
            {item.question}
            {selectedQuestion?.answear === item.answear ? (
              <img
                src={LargeChevronLeftGreen.src}
                className={`w-[17px] h-[34.50px]`}
              />
            ) : (
              <img
                src={LargeChevronRightGreen.src}
                className={`opacity-50 w-[17px] h-[34.50px]`}
              />
            )}
          </button>
        ))}
      </div>
      <div className="bg-green-800 flex flex-col gap-4 w-[50%] p-16">
        <h3 className="font-normal text-lg text-white">
          {selectedQuestion?.answear}
        </h3>
      </div>
    </Section>
  );
};
