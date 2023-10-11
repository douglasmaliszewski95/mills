import { Section } from "@/components/shared/Section/Section";
import donwload from "@/assets/download.svg";
import Image from "next/image";
import { DownloadsCardProps, DownloadComponentProps } from "./types";

export const DownloadsComponent: React.FC<DownloadComponentProps>= (props) => {
    const { downloadCards = [] } = props;
    
  const card = (cardItem: DownloadsCardProps) => {
    return (
      <div
        key={cardItem.id}
        className="w-full border-[0.5px] border-green-800 items-center tablet:items-start rounded-lg flex flex-row px-6 py-4 text-green-800 justify-between tablet:flex-col tablet:gap-6"
      >
        <div className="tablet:text-sm text-base">
          <h3 className="font-semibold">{cardItem.title}</h3>
          <p className="font-normal">{cardItem.subtitle}</p>
        </div>
        <a
          className="flex flex-row gap-2"
          href={cardItem.file}
          download="Example-PDF-document"
          target="_blank"
          rel="noreferrer"
        >
          <Image alt="icone de donwload" src={donwload} />
          <p className="text-orange-500 text-sm font-semibold">
            Fazer download
          </p>
        </a>
      </div>
    );
  };

  return (
    <Section containerClass="my-8 tablet:px-4">
      <div className="flex flex-col gap-4">
        {downloadCards.map((item: DownloadsCardProps) => card(item))}
      </div>
    </Section>
  );
};
