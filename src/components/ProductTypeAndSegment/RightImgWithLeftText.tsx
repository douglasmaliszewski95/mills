import useScreenWidth from "@/services/hooks/useScreenWidth";
import Button from "../shared/Button/Button";
import { RightImgWithLeftTextProps } from "./types";
import RightImgWithLeftTextBg from "@/assets/img/RightImgWithLeftTextbg.png";

export const RightImgWithLeftText: React.FC<RightImgWithLeftTextProps> = ({
  img,
  headerText,
  text,
  buttonProps,
  bgColor = "bg-green-800",
  bgImage = false,
  textColor = "text-white",
  showMobile = false,
  reverse = false,
  variant = "inverted",
  theme,
  bgWidth = "w-[564px]"
}) => {
  const { isMobile } = useScreenWidth();
  return (
    <section
      className={`flex justify-center text-white  ${bgColor} bg-no-repeat bg-left-bottom`}
      style={{
        backgroundImage: bgImage ? `url(${RightImgWithLeftTextBg.src})` : "",
        backgroundSize: isMobile ? "310px" : "620px",
      }}
    >
      <div
        className={`flex justify-between container tablet:flex-col ${textColor} ${
          isMobile ? "mb-10" : ""
        } ${reverse === false ? "tablet:flex-col" : "tablet:flex-col-reverse"}`}
      >
        <div className={`flex flex-col max-w-[482px] whitespace-pre-line ${theme === "rentalHeavy" ? "pt-10" : "pt-20"} gap-10 w-1/2 tablet:w-full tablet:px-4 ${reverse === false ? "tablet:pt-6" : "tablet:pt-15"} tablet:pb-9`}>
          <h3 className="font-semibold text-2xl tablet:text-base">
            {headerText}
          </h3>
          <div className="flex flex-wrap gap-2">
            <p className="tablet:text-xs tablet:font-normal">{text}</p>
          </div>
          {buttonProps && (
            <Button
              variant={variant}
              className="max-w-[265px] py-3 font-semibold tablet:max-w-full "
            >
              <a href={buttonProps.link} target="blank">
                {buttonProps?.text}
              </a>
            </Button>
          )}
        </div>
        <div
          style={{
            backgroundImage: `url(${img})`,
          }}
          className={`flex justify-center bg-no-repeat bg-cover ${bgWidth} h-[495px] tablet:w-full tablet:h-[232px] ${
            showMobile ? "tablet: mb-[-40px]" : "tablet:hidden"
          }`}
        />
      </div>
    </section>
  );
};
