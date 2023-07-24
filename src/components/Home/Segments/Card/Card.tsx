import Image from "next/image";
import { CardProps } from "./types";

export const Card: React.FC<CardProps> = (props) => {
  const { title, image, alt } = props;

  return (
    <button className="w-[159px] flex flex-col flex-1 gap-6 text-orange-500  items-center justify-center py-10 px-14 rounded bg-beige-100 h-[180px] tablet:flex-row hover:bg-orange-500 hover:text-white tablet:py-6 tablet:px-6 tablet:w-full">
      <div className="flex items-end">
        <img src={image.src} alt={alt} className="w-[44px] h-[44px]" />
      </div>
      <div className="flex grow pb-4 max-h-[50%] tablet:pb-0">
        <p className="leading-5 ">{title}</p>
      </div>
    </button>
  );
  3;
};
