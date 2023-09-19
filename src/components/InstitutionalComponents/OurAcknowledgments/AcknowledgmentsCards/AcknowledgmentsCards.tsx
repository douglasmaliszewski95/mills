import { AcknowledgmentsCardsProps } from "../types";

export const AcknowledgmentsCards: React.FC<AcknowledgmentsCardsProps> = (
  props
) => {
  const { cardDescription, cardTitle, src, textColor } = props;
  return (
    <div
      className={`${textColor} tablet:flex tablet:justify-center tablet:flex-col tablet:items-center w-[354px] tablet:w-full`}
    >
      <div
        className={`w-[129.57px] h-[103.49px] flex items-center justify-center border-[1px] bg-${
          textColor === "text-white" ? "white" : ""
        } border-beige-500 rounded-md`}
      >
        <img src={src} className="h-[64.38px] w-[64.38px]" />
      </div>
      <h1 className="text-lg font-bold mt-6">{cardTitle}</h1>
      <p className="text-base font-normal mt-2 tablet:text-center tablet:h-[150px]">
        {cardDescription}
      </p>
    </div>
  );
};
