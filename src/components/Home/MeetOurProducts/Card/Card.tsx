import { CardProps } from "./types";

export const Card: React.FC<CardProps> = (props) => {
  const { image, title, alt } = props;

  return (
    <div
      className="flex justify-center relative text-center w-[226px] h-[472px] bg-center bg-no-repeat bg-cover rounded tablet:w-[100%] tablet:h-[330px]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-center items-end relative text-center w-[226px] h-[472px] bg-gradient-to-t from-black to-transparent tablet:w-[100%] tablet:h-[330px]">
        <div className="z-index-1 text-2xl pb-[93px] h-[150px] font-semibold whitespace-pre-line text-white bottom-[20%] tablet:text-2xl tablet:bottom-[10%] tablet:h-0 tablet:w-[85%]">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};
