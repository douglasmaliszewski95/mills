import { useRouter } from "next/router";
import { CardProps } from "./types";
import { useEffect, useState } from "react";

export const Card: React.FC<CardProps> = (props: any) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <button
      className={`w-[159px] flex flex-col flex-1 gap-6 ${
        props.theme === "rentalLight" ? "text-orange-500" : "text-green-800"
      }  items-center justify-center py-10 px-1 rounded bg-beige-100 h-[180px] tablet:flex-row ${
        props.theme === "rentalLight"
          ? "hover:bg-orange-500"
          : "hover:bg-green-800"
      } hover:text-white tablet:py-6 tablet:px-6 tablet:w-full`}
      onClick={() => router.push(props?.href)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-end">
        <img
          src={hovered ? props?.hoverImage : props?.image}
          alt={props?.alt}
          width={44}
          height={44}
        />
      </div>
      <div className="flex grow pb-4 max-h-[50%] tablet:pb-0">
        <p className="leading-5 tablet:text-start">{props?.title ?? null}</p>
      </div>
    </button>
  );
};
