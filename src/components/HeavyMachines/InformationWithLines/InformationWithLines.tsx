import verticalLines from "@/assets/verticalLineGray.svg";
import { InformationWithLinesProps } from "./types";
import Button from "@/components/shared/Button/Button";
import { Section } from "@/components/shared/Section/Section";
import { DnaBottomResponsive } from "@/assets/DnaBottomResponsive";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const InformationWithLines: React.FC<InformationWithLinesProps> = (
  props
) => {
  const { buttonLink, buttonTitle, title, theme = "green-800" } = props;
  const { isMobile } = useScreenWidth();

  const isBeige = theme === "beige-200";

  return (
    <Section
      sectionClass={`relative h-[192px] bg-${theme}`}
      containerClass={`tablet:px-4 flex flex-row tablet:flex-col text-${
        isBeige ? "green-800" : "white"
      } h-full justify-center tablet:justify-evenly`}
    >
      <h3 className="w-[50%] tablet:w-full text-2xl font-semibold tablet:text-base flex items-center">
        {title}
      </h3>
      <div className="w-[50%] tablet:w-full flex items-center justify-center">
        {isBeige ? (
          <a href={buttonLink} className="w-[40%] tablet:w-full relative z-50">
            <Button className="w-full">
              <p className="text-sm font-semibold">{buttonTitle}</p>
            </Button>
          </a>
        ) : (
          <a
            href={buttonLink}
            className="relative z-50 text-sm font-semibold tablet:w-full border-[2px] border-white w-[40%] flex items-center justify-center h-[37px] rounded-3xl"
          >
            {buttonTitle}
          </a>
        )}
      </div>
      {isBeige ? (
        isMobile ? (
          <div
            className="absolute bottom-0 overflow-hidden"
            style={{ maxWidth: "94vw" }}
          >
            <DnaBottomResponsive
              sizePercentage={110}
              width="720"
              height="120"
              color="#F37021"
            />
          </div>
        ) : (
          <div className="absolute bottom-0 right-0 flex">
            <DnaBottomResponsive
              sizePercentage={110}
              width="760"
              height="132"
              color="#F37021"
            />
          </div>
        )
      ) : isMobile ? (
        <div className="absolute bottom-0 right-0">
          <DnaBottomResponsive
            sizePercentage={44}
            width="260"
            height="60"
            color="#ababab"
          />
        </div>
      ) : (
        <div className="w-full absolute bottom-3 flex">
          <DnaBottomResponsive
            sizePercentage={80}
            width="488"
            height="80"
            color="#ababab"
          />
          <DnaBottomResponsive
            sizePercentage={80}
            width="488"
            height="80"
            color="#ababab"
          />
          <DnaBottomResponsive
            sizePercentage={80}
            width="488"
            height="80"
            color="#ababab"
          />
          <DnaBottomResponsive
            sizePercentage={80}
            width="488"
            height="80"
            color="#ababab"
          />
        </div>
      )}
    </Section>
  );
};
