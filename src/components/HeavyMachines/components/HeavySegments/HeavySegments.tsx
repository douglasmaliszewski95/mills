import useScreenWidth from "@/services/hooks/useScreenWidth";
import Image from "next/image";
import verticaLines from "@/assets/light-orange-vertical-lines.png";
import { SegmentsProps } from "./types";
import { useState } from "react";
import { useRouter } from "next/router";

export const HeavySegments: React.FC<SegmentsProps> = (props) => {
  const {
    segments,
    isHome,
    title,
    texts,
    theme = "rentalLight",
    bgColor = "bg-gray-100",
  } = props;
  const { isDesktop } = useScreenWidth();
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (card: any) => {
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

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
          {segments?.map((card: any) => (
            <button
              key={card.id}
              className={`w-[159px] flex flex-col flex-1 gap-6 ${
                props.theme === "rentalLight"
                  ? "text-orange-500"
                  : "text-green-800"
              }  items-center justify-center py-10 px-1 rounded bg-beige-100 h-[180px] tablet:flex-row ${
                props.theme === "rentalLight"
                  ? "hover:bg-orange-500"
                  : "hover:bg-green-800"
              } hover:text-white tablet:py-6 tablet:px-6 tablet:w-full`}
              onClick={() => router.push(card?.href)}
              onMouseEnter={() => handleMouseEnter(card)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-end">
                {hoveredCard === card ? (
                  <img
                    src={card?.hoverImage}
                    alt="ico_image"
                    width={44}
                    height={44}
                  />
                ) : (
                  <img
                    src={card?.image}
                    alt="ico_image"
                    width={44}
                    height={44}
                  />
                )}
              </div>
              <div className="flex grow pb-4 max-h-[50%] tablet:pb-0">
                <p className="leading-5 tablet:text-start">
                  {card?.title ?? null}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
