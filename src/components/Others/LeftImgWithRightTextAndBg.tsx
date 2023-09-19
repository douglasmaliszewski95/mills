import useScreenWidth from "@/services/hooks/useScreenWidth";
import { LeftImgWithRightTextProps } from "../ProductTypeAndSegment/types";
import Button from "../shared/Button/Button";

import LeftImgWithRightTextAndBgImage from "@/assets/img/LeftImgWithRightTextAndBgImage.png";

export const LeftImgWithRightTextAndBg: React.FC<LeftImgWithRightTextProps> = ({
  img,
  headerText,
  paragraphText,
  buttonProps,
  variant = "orange",
  bgImage = false,
}) => {
  const { isMobile } = useScreenWidth();
  return (
    <section
      className={`flex justify-center bg-no-repeat bg-left-top ${
        variant === "green"
          ? "text-white bg-green-800"
          : "text-green-800 bg-white"
      } ${isMobile ? "" : "bg-left-top"} `}
      style={{
        backgroundImage: bgImage
          ? `url(${LeftImgWithRightTextAndBgImage.src})`
          : "",
        backgroundSize: isMobile ? "275px" : "580px",
        backgroundPosition: isMobile ? "0px" : "",
      }}
    >
      <div className="flex justify-between container tablet:flex-col-reverse ">
        <div className="flex flex-col justify-center pr-[90px] gap-6 w-1/2 tablet:w-full tablet:px-4 tablet:pb-9">
          <h3 className="font-semibold text-2xl tablet:text-base tablet:pt-16">
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
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="flex justify-center bg-no-repeat bg-cover w-[564px] h-[505px] tablet:w-full tablet:h-[232px] "
        />
      </div>
    </section>
  );
};
