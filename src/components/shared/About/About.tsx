import { Section } from "@/components/shared/Section/Section";
import { AboutProps, informationCard } from "./types";
import Button from "@/components/shared/Button/Button";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { DnaBottom } from "@/assets/DnaBottom";
import _ from "lodash";
import { Carousel } from "../Carousel/Carousel";
import { LargeNextArrow } from "../Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "../Arrows/LargePrevArrow/LargePrevArrow";
import { DnaTop } from "@/assets/DnaTop";
import { DnaTopResponsive } from "@/assets/DnaTopResponsive";
import { DnaBottomResponsive } from "@/assets/DnaBottomResponsive";

export const About: React.FC<AboutProps | any> = (props) => {
  const {
    title,
    theme = "white",
    color = "green-800",
    hasButton = true,
    orientation = "",
    description,
    image,
    alt,
    dnaOnTop = false,
    buttonTitle = "Ver modelos",
    buttonVariant = "default",
    link = "",
    forceDnaOnMobile = false,
    forceImageDisplayOnMobile = false,
    dnaColor,
    type = "banner",
    imagePadding = "",
    informationCards = [],
    hideImage = false,
    textFullLength = false,
    mobileImageFirst = false,
    costumizedButtonClass,
  } = props;

  const { isDesktop, isMobile } = useScreenWidth();

  const imageFirst = orientation === "inverted";
  const descriptionArray = _.isArray(description) ? description : [description];

  const forceImageDisplay = forceImageDisplayOnMobile && !isDesktop;

  const showDna =
    dnaOnTop || (dnaColor && (isDesktop || !imageFirst || forceDnaOnMobile));

  return (
    <Section
      containerClass={`flex justify-between ${
        (imageFirst || forceImageDisplay) && !hideImage
          ? `flex-row-reverse tablet:flex-col${
              mobileImageFirst ? "" : "-reverse"
            }`
          : "tablet:mt-6"
      } tablet:flex-col ${
        type === "carousel" ? "tablet:gap-0" : `tablet:gap-6`
      } gap-12  ${mobileImageFirst ? "tablet:mb-0" : "tablet:mb-6"}`}
      sectionClass={`bg-${theme} ${showDna && "relative"} ${
        forceDnaOnMobile && "pb-6"
      }`}
    >
      {showDna && !isMobile && !dnaOnTop && imageFirst && (
        <div
          className={`absolute ${
            imageFirst ? "right-3" : "left-0 w-full"
          } bottom-3`}
        >
          <DnaBottom color={dnaColor} />
        </div>
      )}
      <div
        className={`basis-1/2 ${
          dnaOnTop && isMobile
            ? "relative pl-0 pr-0"
            : "tablet:pl-4 tablet:pr-4"
        } ${!imageFirst && !textFullLength && "pr-[62px]"} ${
          mobileImageFirst ? "tablet:mt-4" : "tablet:mt-0"
        } tablet:pb-0 h-full flex flex-col justify-center pb-0 tablet:py-0`}
      >
        {showDna && (
          <div
            className={`absolute ${
              dnaOnTop
                ? `${isMobile ? "top-0 right-0 flex justify-end" : "top-3"}`
                : "bottom-3"
            } ${
              (imageFirst && isDesktop) || forceDnaOnMobile
                ? "right-3"
                : "left-3 w-full"
            }`}
          >
            {dnaOnTop ? (
              isMobile ? (
                <DnaTopResponsive
                  sizePercentage={50}
                  color={dnaColor}
                  width="254"
                  height="10"
                />
              ) : (
                <DnaTop color={dnaColor} width="615" height="20" />
              )
            ) : forceDnaOnMobile ? (
              <DnaBottomResponsive
                sizePercentage={32}
                color={dnaColor}
                width="190"
              />
            ) : (
              <DnaBottom color={dnaColor} />
            )}
          </div>
        )}
        <h2
          className={`text-${color} font-semibold text-2xl ${
            dnaOnTop && "mt-24"
          } mb-7 tablet:text-base tablet:mb-4 ${
            dnaOnTop && isMobile && "px-4"
          }`}
        >
          {title ?? null}
        </h2>
        <div
          className={`${
            dnaColor && isDesktop && !hasButton && "mb-16"
          } flex flex-col gap-3`}
        >
          {descriptionArray.map((text, index) => (
            <p
              key={`${text?.substring(0, 5)}`}
              className={`text-${color} text-lg tablet:text-xs ${
                type === "carousel" && "mb-4"
              }`}
            >
              {text}
            </p>
          ))}
        </div>

        {hasButton && (
          <a
            href={link}
            target="blank"
            className={`z-10 max-w-[264px] tablet:max-w-full ${
              dnaColor && isDesktop && "mb-16"
            }`}
          >
            {type === "banner" ? (
              <div className={dnaOnTop && isMobile && "px-4"}>
                <Button
                  className={`max-w-[264px] w-full mt-7 tablet:max-w-[992px] ${costumizedButtonClass}`}
                  variant={theme === "orange-500" ? "inverted" : buttonVariant}
                >
                  <p className="py-[2px] text-sm font-semibold">
                    {buttonTitle}
                  </p>
                </Button>
              </div>
            ) : (
              <>
                {isDesktop && (
                  <Button
                    className={`max-w-[264px] w-full ${
                      description !== undefined && "mt-7"
                    } tablet:max-w-[992px] ${costumizedButtonClass}`}
                    variant={
                      theme === "orange-500" ? "inverted" : buttonVariant
                    }
                  >
                    <p className="py-[2px] text-sm font-semibold">
                      {buttonTitle}
                    </p>
                  </Button>
                )}
              </>
            )}
          </a>
        )}
      </div>
      {type === "carousel" ? (
        <div className="max-w-[48%] tablet:max-w-full tablet:h-[268px] tablet:w-full h-[472px] tablet:mb-8 bg-green-800 flex items-center">
          <Carousel
            hasDots={false}
            className="w-full"
            nextArrow={
              <LargeNextArrow
                width={isDesktop ? 22 : 12}
                height={isDesktop ? 22 : 19}
                arrowColor="white"
                arrowBorderRightDistance={`${isDesktop ? "" : "right-[25px]"}`}
              />
            }
            prevArrow={
              <LargePrevArrow
                width={isDesktop ? 22 : 12}
                height={isDesktop ? 22 : 19}
                arrowColor="white"
                arrowBorderRightDistance={`${isDesktop ? "" : "left-[25px]"}`}
              />
            }
          >
            {informationCards?.map((card: informationCard, index: number) => (
              <div
                className="flex flex-col tablet:pl-0 pl-24 pr-16 tablet:pr-0 pt-48 tablet:pt-0 tablet:h-[268px] tablet:items-end basis-1/2"
                key={card?.title}
              >
                <div className="w-full tablet:h-full tablet:flex tablet:flex-col tablet:justify-end font-semibold text-white tablet:px-[18px] tablet:pb-8">
                  <h1 className="text-2xl tablet:text-base tablet:px-16">
                    {card.title}
                  </h1>
                  <p className="text-lg tablet:text-xs tablet:px-16">
                    {card.description}
                  </p>
                  <button className="rounded-3xl transparent border-[1px] w-[265.14px] tablet:w-full h-[37px] mt-8">
                    <p className="tablet:text-sm">Ver Detalhes</p>
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <>
          {(isDesktop || imageFirst || forceImageDisplay) && !hideImage && (
            <div className={`basis-1/2 relative ${imagePadding}`}>
              <img
                className={`block w-full ${
                  imageFirst
                    ? "object-top object-cover"
                    : "object-fill object-right"
                }`}
                src={image}
                alt={alt}
              />
            </div>
          )}
        </>
      )}

      {!isDesktop && hasButton && type === "carousel" && (
        <a href={link} target="blank" className="px-[18px]">
          <Button
            className="max-w-[264px] w-full tablet:max-w-[992px]"
            variant={theme === "orange-500" ? "inverted" : buttonVariant}
          >
            <p className="py-[2px] text-sm font-semibold">{buttonTitle}</p>
          </Button>
        </a>
      )}
    </Section>
  );
};
