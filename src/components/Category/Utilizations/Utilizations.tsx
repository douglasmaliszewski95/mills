import { Section } from "@/components/shared/Section/Section";
import { UtilizationsProps } from "./types";
import Image from "next/image";
import { DnaBottom } from "@/assets/DnaBottom";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const Utilizations: React.FC<UtilizationsProps> = (props) => {
  const { title, description, cards, theme = "white", page } = props;
  const isOrangeBg = theme === "orange";
  const smallFont = cards.length > 8;
  const { isMobile } = useScreenWidth();
  const numberSlice = page === "Tesoura" ? 4 : 5;

  return (
    <Section
      containerClass="flex tablet:gap-6 tablet:flex-col"
      sectionClass={`pb-12 tablet:pb-8 pt-[76px] tablet:px-4 tablet:pt-6 ${isOrangeBg && "bg-orange-500"
        }`}
    >
      <div className="basis-1/2 flex flex-col justify-center h-full gap-[30px] tablet:gap-4 pr-[90px] tablet:pr-0">
        <h4
          className={`${isOrangeBg ? "text-white" : "text-green-800"
            } text-2xl font-semibold tablet:text-base tablet:mr-[20%]`}
        >
          {title ?? null}
        </h4>
        <div
          className={`${isOrangeBg ? "text-white" : "text-green-800"
            } text-green-800 text-lg tablet:text-xs`}
        >
          {description}
        </div>
      </div>
      <div className="basis-1/2 grid grid-cols-2 gap-4 tablet:grid-cols-1">
        {[0, 1].map((columnIndex) => (
          <div key={columnIndex} className="basis-1/2 grid gap-4 tablet:grid-cols-1">
            {cards?.slice(columnIndex * numberSlice, columnIndex * numberSlice + numberSlice).map(({ id, title, image, alt }) => (
              <div
                key={id}
                className={`px-6 py-[18px] h-[75px] ${page === "Tesoura" ? "bg-beige-200" : "bg-white"} rounded flex gap-4 items-center grow`}
              >
                <img src={image} width={32} height={32} alt={alt} />
                <p
                  className={`text-green-800 tablet:text-sm ${smallFont ? "text-sm font-normal" : "font-semibold"
                    }`}
                >
                  {title ?? null}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {!isMobile && <div className="relative flex justify-end">
        <div className="absolute bottom-[-50px]">
          <DnaBottom width="670" height="110" color="#FFFFFF" />
        </div>
      </div>}
    </Section>
  );
};
