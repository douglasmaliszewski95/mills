import { AboutRentalProps } from "./types";
import { Section } from "@/components/shared/Section/Section";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import linesUp from "@/assets/img/linesUp.png";
import { DnaTopResponsive } from "@/assets/DnaTopResponsive";

export const AboutRental: React.FC<AboutRentalProps> = (props) => {
  const {
    title,
    description,
    items,
    theme = "green-800",
    textColor = "white",
    iconFont = "lg",
    hasDna = true,
    forceTitleDisplay = false,
    largeDescription = false,
  } = props;
  const { isDesktop } = useScreenWidth();

  const basis = `basis-1/${items?.length}`;

  return (
    <Section
      sectionClass={`bg-${theme} relative pt-2 ${
        description && isDesktop ? "tablet:pt-[68px]" : "tablet:pt-8"
      } pb-20 tablet:pb-12 tablet:px-[18px] relative`}
    >
      {isDesktop &&
        hasDna &&
        (theme === "white" || theme === "gray-50" ? (
          <div className="absolute top-3 right-3">
            <DnaTopResponsive sizePercentage={116.5} />
          </div>
        ) : (
          <div className="absolute top-3 right-3">
            <img src={linesUp.src} />
          </div>
        ))}
      {(!description || forceTitleDisplay || isDesktop) && (
        <h5
          className={`text-${textColor} text-2xl font-semibold tablet:mt-0 mt-[64px] max-w-[46%] tablet:max-w-full tablet:text-base`}
        >
          {title ?? null}
        </h5>
      )}
      {description && (
        <p
          className={`text-${textColor} ${
            largeDescription ? "max-w-[80%]" : "max-w-[506px]"
          } mt-6 tablet:text-xs`}
        >
          {description}
        </p>
      )}
      <div className="flex justify-between mt-[80px] tablet:mt-[44px] gap-[75px] tablet:gap-10 tablet:flex-col tablet:px-8">
        {items?.map((item) => (
          <div
            key={item?.title}
            className={`flex flex-col items-center justify-start ${basis}`}
          >
            <img src={item?.image} alt={item?.alt} className="h-[60px]" />
            <h6
              className={`mt-3 mb-6 tablet:mb-2 text-${iconFont} font-semibold text-${textColor} text-center tablet:text-sm`}
            >
              {item?.title}
            </h6>
            <p className={`text-${textColor} text-center tablet:text-xs`}>
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
