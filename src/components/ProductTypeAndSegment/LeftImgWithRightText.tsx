import Button from "../shared/Button/Button";
import { LeftImgWithRightTextProps } from "./types";

export const LeftImgWithRightText: React.FC<LeftImgWithRightTextProps> = ({
  img,
  headerText,
  paragraphText,
  buttonProps,
  variant = "orange",
}) => {
  return (
    <section
      className={`flex justify-center ${
        variant === "green"
          ? "text-white bg-green-800"
          : "text-green-800 bg-white"
      } `}
    >
      <div className="flex justify-between container tablet:flex-col-reverse">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="flex justify-center bg-no-repeat bg-cover w-[564px] h-[505px] tablet:w-full tablet:h-[232px]"
        />
        <div className="flex flex-col justify-center pr-[90px] gap-6 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9">
          <h3 className="font-semibold text-2xl tablet:text-base">
            {headerText}
          </h3>
          <p className="text-lg tablet:text-xs">{paragraphText}</p>
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
