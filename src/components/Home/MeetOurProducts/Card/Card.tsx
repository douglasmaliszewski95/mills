import { useRouter } from "next/router";
import { CardProps } from "./types";

export const Card: React.FC<CardProps> = (props) => {
  const { image, title, href, isCarrossel } = props;
  const router = useRouter();

  const width = isCarrossel ? "w-[126px]" : "w-[100%]";
  const textSize = isCarrossel ? "text-xs" : "text-2xl";

  return (
    <div
      className={`flex justify-center relative text-center w-[226px] h-[472px] bg-center bg-no-repeat bg-cover rounded tablet:${width} tablet:h-[330px] cursor-pointer`}
      style={{ backgroundImage: `url(${image})` }}
      onClick={() => router.push(href)}
    >
      <div
        className={`flex justify-center items-end relative text-center w-[226px] h-[472px] bg-gradient-to-t from-black to-transparent tablet:${width} tablet:h-[330px]`}
      >
        <div
          className={`z-index-1 pb-[93px] h-[150px] font-semibold whitespace-pre-line text-white bottom-[20%] tablet:${textSize} tablet:bottom-[10%] tablet:h-0 tablet:w-[85%]`}
        >
          <p>{title ?? null}</p>
        </div>
      </div>
    </div>
  );
};
