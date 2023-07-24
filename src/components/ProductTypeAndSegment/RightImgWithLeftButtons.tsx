import Button from "../shared/Button/Button";
import { RightImgWithLeftButtonsProps } from "./types";

export const RightImgWithLeftButtons: React.FC<
  RightImgWithLeftButtonsProps
> = ({
  img,
  headerText,
  textCards,
  buttonProps,
  width = "max-w-[574px]",
  imageHeight = "h-[550px]",
}) => {
  return (
    <section className="flex justify-center text-green-800 bg-beige-200">
      <div className="flex justify-between container tablet:flex-col">
        <div
          className={`flex flex-col pt-20 gap-10 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9 ${width}`}
        >
          <h3 className="font-semibold text-2xl tablet:text-base">
            {headerText}
          </h3>
          <div className="flex flex-wrap gap-2">
            {textCards?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center rounded bg-white/50 max-w-[386px] py-3 px-9 font-semibold tablet:w-full tablet:text-xs tablet:justify-center"
                >
                  <p className="text-left tablet:text-[10px] tablet:text-center">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
          <Button className="max-w-[265px] py-3 tablet:max-w-full">
            {buttonProps?.text}
          </Button>
        </div>
        <div
          style={{
            backgroundImage: `url(${img})`,
          }}
          className={`flex justify-center bg-no-repeat bg-cover w-[564px] tablet:w-full tablet:h-[232px] tablet:hidden ${imageHeight}`}
        />
      </div>
    </section>
  );
};
