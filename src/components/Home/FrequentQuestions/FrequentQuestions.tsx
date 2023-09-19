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
          <h2
            className={`text-2xl font-semibold ${
              theme === "rentalLight" ? "text-orange-500" : "text-green-800"
            } mb-6 tablet:mb-2 tablet:text-lg`}
          >
            {frequentQuestions?.title}
          </h2>
          <p className="text-green-800 text-lg mb-8 tablet:text-xs">
            {frequentQuestions?.text}
          </p>
          <Link href="/duvidas-frequentes">
            <Button className="max-w-[60%] py-3 font-semibold w-full tablet:hidden">
              Ver todas
            </Button>
          </Link>
        </div>
        <div className="max-w-[60%] w-full pl-8 py-12 h-full tablet:max-w-[100%] tablet:pl-0 tablet:pt-0 tablet:pb-5">
          <ul className="w-full flex flex-col h-full justify-between">
            {frequentQuestions?.questions_fields?.map(
              ({ question, href }: ListProps, index: number) => (
                <li key={index}>
                  <a
                    href={href}
                    className="pb-[3px] font-medium text-lg text-green-800 flex justify-between tablet:text-sm"
                  >
                    <p>{question}</p>
                    <Image
                      src={chevronRight}
                      height={18}
                      alt="Seta apontada para a direita"
                    />
                  </a>
                  <div className="h-[0.1px] w-full bg-green-800 tablet:mb-7 tablet:mt-2" />
                </li>
              )
            )}
          </ul>
        </div>
        <Button className="w-full desktop:hidden mb-5 mt-[-0.5rem] py-3 text-sm">
          Ver todas
        </Button>
      </div>
    </section>
  );
};
