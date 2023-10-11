import Button from "@/components/shared/Button/Button";
import { PositiveImpactsCarouselCardsProps } from "./types";

export const PositiveImpactsCarouselCard: React.FC<
  PositiveImpactsCarouselCardsProps
> = (props) => {
  const { description, id, src, title, btnTitle, link } = props;
  return (
    <div className="flex flex-row tablet:flex-col rounded-lg border-2 border-slate-400 w-[95%] tablet:mt-4 mt-10 h-[300px] tablet:h-auto">
      <div className="w-[55%] tablet:w-full">
        <img src={src} className="h-full w-full rounded-tl-lg rounded-bl-lg" />
      </div>
      <div className="flex flex-col tablet:w-full w-[45%] justify-center bg-white tablet:p-4 py-10 px-6 gap-4 tablet:text-base text-green-800">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-base font-normal">{description}</p>

        {link && btnTitle && (
          <a href={link} target="_blank" className="mb-2">
            <Button variant="outlined">
            {btnTitle}
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};
