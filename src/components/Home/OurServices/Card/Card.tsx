import Image from "next/image";
import { CardProps } from "./types";
import Button from "@/components/shared/Button/Button";

export const Card: React.FC<CardProps> = (props) => {
  const { image, alt, title, article, url = "" } = props;
  return (
    <div className="flex tablet:flex-col">
      <img src={url} alt="img" />
      <div className="flex flex-col gap-8 pl-[72px] rounded-b pr-9 pt-12 bg-white tablet:max-w-[100%] tablet:px-4 tablet:pt-4 tablet:gap-3">
        <h3 className="font-semibold text-lg text-green-800 max-w-[50%] tablet:max-w-full tablet:text-base ">
          {title}
        </h3>
        <article className="text-green-800 tablet:text-xs max-w-[95%] tablet:max-w-full">
          {article}
        </article>
        <Button
          variant="outlined"
          className="w-64 tablet:w-full tablet:mb-6"
          size="medium"
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  );
};
