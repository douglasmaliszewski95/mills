import { CertificationsCardProps } from "../types";

export const CertificationsCard: React.FC<CertificationsCardProps> = (
  props
) => {
  const { src, description, title } = props;
  return (
    <div className="w-[570px] h-[207px] tablet:w-full bg-white text-base font-semibold px-8 flex text-green-800 justify-center flex-col rounded-md tablet:h-[104.59px]">
      <img
        src={src}
        className="w-[133px] h-[60px] tablet:w-[67.2px] tablet:h-[25.77px]"
      />
      <h1 className="w-full tablet:w-full font-semibold tablet:text-xs">
        {title}
      </h1>
      <p className="text-base font-normal">{description}</p>
    </div>
  );
};
