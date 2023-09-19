import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Card } from "./Card/Card";
import { SegmentsProps } from "./types";
import Image from "next/image";
import verticaLines from "@/assets/light-orange-vertical-lines.png";
import { Section } from "@/components/shared/Section/Section";

export const Segments: React.FC<SegmentsProps> = (props) => {
  const {
    segments,
    isHome,
    title,
    texts,
    theme = "rentalLight",
    bgColor = "bg-gray-100",
  } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <section
      className={`flex justify-center flex-wrap ${bgColor} py-20 font-ibm-font tablet:px-4 tablet:py-6 ${
        isDesktop && "relative"
      }`}
    >
      <div className="container h-full">
        {isHome ? (
          <h2
            className={`text-2xl  font-semibold mb-10 tablet:text-lg tablet:mb-6 ${
              theme === "rentalLight" ? "text-orange-500" : "text-green-800"
            }`}
          >
            Trabalhamos em diversos tipos de segmentos
          </h2>
        ) : (
          <>
            {isDesktop && (
              <Image
                src={verticaLines}
                alt="Linhas verticais laranja claro"
                className="absolute right-3 top-3"
              />
            )}
            <h3 className="text-green-800 font-semibold mb-10 text-2xl mb-[26px] tablet:text-base">
              {title ?? null}
            </h3>
            {isDesktop ? (
              texts?.map((description: any, index: any) => (
                <p
                  key={index}
                  className="text-green-800 text-lg  max-w-[61.5%] tablet:max-w-full"
                >
                  {description}
                  {index < texts?.length - 1 && <br />}
                </p>
              ))
            ) : (
              <p className="text-green-800 text-xs">{texts?.join(" ")}</p>
            )}
          </>
        )}
        <div
          className={`flex flex-wrap gap-2 justify-between h-full tablet:flex-col ${
            !isHome && "mt-12"
          }`}
        >
          {segments?.map((card) => (
            <Card key={card.id} {...card} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};
