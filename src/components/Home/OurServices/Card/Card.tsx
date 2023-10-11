import { CardProps } from "./types";
import Button from "@/components/shared/Button/Button";
import { useRouter } from "next/router";

export const Card: React.FC<CardProps> = (props) => {
  const { alt, title, article, url = "", href, theme } = props;
  const router = useRouter();

  return (
    <div className="flex tablet:flex-col">
      <img src={url} alt={alt} className="h-auto w-full basis-1/2" />
      <div className="basis-1/2 flex flex-col gap-8 pl-[72px] rounded-b pr-9 pt-12 bg-white tablet:max-w-[100%] tablet:px-4 tablet:pt-4 tablet:gap-3">
        <h3 className="font-semibold text-lg text-green-800 max-w-[50%] tablet:max-w-full tablet:text-base ">
          {title ?? null}
        </h3>
        <article className="text-green-800 tablet:text-xs max-w-[95%] tablet:max-w-full">
          {article}
        </article>
        <a href={href} className="w-64 tablet:w-full">
          <Button
            variant={theme === "rentalHeavy" ? "outlinedHeavy" : "outlined"}
            className="w-64 tablet:w-full tablet:mb-6"
            size="medium"
            onClick={() => router.push(href)}
          >
            Ver detalhes
          </Button>
        </a>
      </div>
    </div>
  );
};
