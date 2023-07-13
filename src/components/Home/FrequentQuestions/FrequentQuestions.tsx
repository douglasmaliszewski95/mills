import Button from "@/components/shared/Button/Button";
import verticalLines from "@/assets/FrequentQuestions/vertical-lines.svg";
import Image from "next/image";
import chevronRight from "@/assets/chevron-right.svg";
import { questions } from "./utils";

export const FrequentQuestions: React.FC = () => {
  return (
    <section className="flex justify-center relative bg-gray-50 font-ibm-font">
      <Image
        src={verticalLines}
        alt="Linhas verticais laranjas e verdes"
        className="absolute left-0 top-0"
      />
      <div className="container flex items-center tablet:flex-col tablet:px-4">
        <div className="max-w-[40%] pt-40 pb-[84px] tablet:max-w-[100%] tablet:pb-5 tablet:pt-20">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6 tablet:mb-2 tablet:text-lg">
            Dúvidas frequentes
          </h2>
          <p className="text-green-800 text-lg mb-8 tablet:text-xs">
            Vel illum dolore eu feugiat nulla facilisis at vero eros et accu qui
            blandit praesent luptatum zzril delenit augue dolore eu. Autem vel
            eum iriure dol
          </p>
          <Button className="max-w-[60%] w-full tablet:hidden">
            Ver todas
          </Button>
        </div>
        <div className="max-w-[60%] w-full pl-8 py-12 h-full tablet:max-w-[100%] tablet:pl-0 tablet:pt-0 tablet:pb-5">
          <ul className="w-full flex flex-col h-full justify-between">
            {questions.map(({ title, url }) => (
              <li key={title}>
                <a
                  href={url}
                  className="pb-[3px] font-medium text-lg text-green-800 flex justify-between tablet:text-sm"
                >
                  <p>{title}</p>
                  <Image
                    src={chevronRight}
                    height={18}
                    alt="Seta apontada para a direita"
                  />
                </a>
                <div className="h-[0.1px] w-full bg-green-800 tablet:mb-7 tablet:mt-2" />
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full desktop:hidden mb-5 mt-[-0.5rem] py-3 text-sm">
          Ver todas
        </Button>
      </div>
    </section>
  );
};
