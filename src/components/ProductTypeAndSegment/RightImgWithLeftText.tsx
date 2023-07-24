import Button from "../shared/Button/Button";
import { RightImgWithLeftTextProps } from "./types";

export const RightImgWithLeftText: React.FC<RightImgWithLeftTextProps> = ({
  img,
  headerText,
  text,
  buttonProps,
}) => {
  return (
    <section className="flex justify-center text-white bg-green-800">
      <div className="flex justify-between container tablet:flex-col">
        <div className="flex flex-col max-w-[482px] whitespace-pre-line pt-20 gap-10 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9">
          <h3 className="font-semibold text-2xl tablet:text-base">
            {headerText}
          </h3>
          <div className="flex flex-wrap gap-2">
            <p className="tablet:text-xs tablet:font-normal">{text}</p>
          </div>
          <Button
            variant="inverted"
            className="max-w-[265px] py-3 tablet:max-w-full "
          >
            {buttonProps?.text}
          </Button>
        </div>
        <div
          style={{
            backgroundImage: `url(${img})`,
          }}
          className="flex justify-center bg-no-repeat bg-cover w-[564px] h-[505px] tablet:w-full tablet:h-[232px] tablet:hidden"
        />
      </div>
    </section>
  );
};
