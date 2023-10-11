import Button from "@/components/shared/Button/Button";
import verticalLines from "@/assets/FrequentQuestions/vertical-lines.svg";
import Image from "next/image";
import chevronRight from "@/assets/chevron-right.svg";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";
import { ListProps } from "./types";
import Link from "next/link";

interface FrequentQuestionsProps {
  theme?: string;
}

export const FrequentQuestions = ({
  theme = "rentalLight",
}: FrequentQuestionsProps) => {
  const { frequentQuestions } = useGetCMSShared();

  return (
    <section className="flex justify-center relative bg-gray-50 font-ibm-font">
      <Image
        src={verticalLines}
        alt="Linhas verticais laranjas e verdes"
        className="absolute left-0 top-0"
      />
      <div className="container flex items-center tablet:flex-col tablet:px-4">
        <div className="max-w-[40%] pt-40 pb-[84px] tablet:max-w-[100%] tablet:pb-5 tablet:pt-20">
          <h3
            className={`text-2xl font-semibold ${
              theme === "rentalLight" ? "text-orange-500" : "text-green-800"
            } mb-6 tablet:mb-2 tablet:text-lg`}
          >
            {frequentQuestions?.title}
          </h3>
          <p className="text-green-800 text-lg mb-8 tablet:text-xs">
            {frequentQuestions?.text}
          </p>
          <a href={frequentQuestions?.href}>
            <Button
              className="max-w-[264px] py-2 w-full tablet:hidden"
              size="large"
            >
              Ver todas
            </Button>
          </a>
        </div>
        <div className="max-w-[60%] w-full pl-8 py-12 h-full tablet:max-w-[100%] tablet:pl-0 tablet:pt-0 tablet:pb-5">
          <ul className="w-full tablet:gap-4 flex flex-col h-full justify-between">
            {frequentQuestions?.questions_fields?.map(
              ({ question, href }: ListProps, index: number) => (
                <li key={index}>
                  <a
                    href={href}
                    className="pb-[3px] tablet:mt-2 font-medium text-lg text-green-800 border-b-[1px] pb-2 border-green-800 flex justify-between tablet:text-sm"
                  >
                    <p className="tablet:pb-4">{question}</p>
                    <Image
                      src={chevronRight}
                      height={18}
                      alt="Seta apontada para a direita"
                    />
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <a href={frequentQuestions?.href} className="w-full desktop:hidden">
          <Button className="w-full desktop:hidden mb-5 mt-[-0.5rem] py-3 text-sm">
            Ver todas
          </Button>
        </a>
      </div>
    </section>
  );
};
