import useScreenWidth from "@/services/hooks/useScreenWidth";
import Button from "../shared/Button/Button";
import { LeftImgWithRightTextProps } from "./types";
import LeftImgWithRightTextBg from "@/assets/img/LeftImgWithRightTextBg.png";

export const AlwaysLeftImgWithRightText: React.FC<
  LeftImgWithRightTextProps
> = ({
  img,
  headerText,
  paragraphText,
  buttonProps,
  variant = "orange",
  bgImage = false,
  hideImageInMobileMode = false,
}) => {
  const { isMobile } = useScreenWidth();
  return (
    <section
      className={`flex justify-center bg-no-repeat bg-right-bottom ${
        variant === "green"
          ? "text-white bg-green-800"
          : "text-green-800 bg-white"
      } `}
      style={{
        backgroundImage: bgImage ? `url(${LeftImgWithRightTextBg.src})` : "",
        backgroundSize: isMobile ? "220px" : "580px",
      }}
    >
      <div className={`flex justify-between container tablet:flex-col`}>
        <div
          style={{
            backgroundImage:
              hideImageInMobileMode && isMobile ? "none" : `url(${img})`,
          }}
          className={`flex justify-center bg-no-repeat bg-cover w-[564px] h-[505px] tablet:w-full  ${
            hideImageInMobileMode && isMobile
              ? "tablet:h-[25px]"
              : "tablet:h-[232px]"
          }`}
        />
        <div className="flex flex-col justify-center pr-[90px] gap-6 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9">
          <h3 className="font-semibold text-2xl tablet:text-base">
            {headerText}
          </h3>
          <p className="text-lg tablet:text-xs whitespace-pre-line">
            {paragraphText}
          </p>
          {buttonProps && (
            <Button
              variant={variant === "green" ? "inverted" : "default"}
              className="max-w-[265px]"
            >
              {buttonProps?.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
