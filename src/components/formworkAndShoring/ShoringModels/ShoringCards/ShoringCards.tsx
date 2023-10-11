import { ShoringCardProps } from "../types";

export const ShoringCard: React.FC<ShoringCardProps> = (props) => {
    const { src, title } = props;
  return (
    <div className="w-[282px] tablet:w-full h-[359px] flex flex-col rounded-xl bg-white">
      <img src={src} className="w-[full] h-[180px]"/>
      <div className="flex items-center justify-around h-[179px] flex-col">
        <h3 className="font-semibold text-green-800 text-lg">{title}</h3>

        <button className="rounded-3xl transparent border-[1px] text-orange-500 font-semibold text-sm border-orange-500 w-[236.86px] h-[39.17px]">
          Ver detalhes
        </button>
      </div>
    </div>
  );
};
