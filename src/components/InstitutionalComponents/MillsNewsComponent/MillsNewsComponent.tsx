import { Section } from "@/components/shared/Section/Section";
import valorEconomico from "@/assets/image-logo-teste.svg";
import newsImageTeste from "@/assets/news-image-teste.jpg";
import Image from "next/image";
import { MillsNewsComponentProps, PostProps } from "./types";
import { formatDayText } from "@/utils/format-day-time";

export const MillsNewsComponent: React.FC<MillsNewsComponentProps> = (
  props
) => {
  const { posts } = props;

  const component = (item: PostProps, index: number) => {
    return (
      <div
        key={index}
        className="w-full border-[0.5px] border-green-800/50 flex flex-row tablet:flex-col gap-8 tablet:gap-0 rounded-md my-6"
      >
        <div className="w-[35%] tablet:w-full">
          <img src={item.image} className="h-full" />
        </div>
        <div className="py-8 tablet:py-6 w-[65%] tablet:w-full text-green-800 tablet:px-4">
          {item.portalImage && (
            <Image alt="Logo do portal de notícias" src={item.portalImage} width={100} height={100}/>
          )}
          <h1 className="text-lg font-semibold tablet:mt-0 mt-4">
            {item.title}
          </h1>
          <h6 className="text-xs font-normal italic tablet:text-sm">
            {formatDayText(item.data)}
          </h6>

          <p className="text-base my-4 tablet:my-2 tablet:w-full w-[95%] tablet:text-xs">
            {item.text}
          </p>

          <a
            href={item.link}
            target="blank"
            className="tablet:w-full border-[1.5px] border-orange-500 rounded-3xl text-orange-500 h-[37px] flex w-[30%] text-sm font-semibold mt-4 items-center justify-center"
          >
            Ler notícia na íntegra
          </a>
        </div>
      </div>
    );
  };

  const a = ["", "", ""];

  return (
    <Section containerClass="py-4 tablet:px-4">
      {posts.map((item: PostProps, index: number) => component(item, index))}
    </Section>
  );
};
