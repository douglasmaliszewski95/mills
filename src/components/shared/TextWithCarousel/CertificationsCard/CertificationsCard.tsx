import { CertificationsCardProps } from "../types";

export const CertificationsCard: React.FC<CertificationsCardProps> = (
  props
) => {
  const { src, description, title } = props;
  return (
    <div className="w-[570px] h-[207px] tablet:w-full bg-white text-base font-semibold px-8 flex text-green-800 justify-center flex-col rounded-md tablet:h-[104.59px]">
      <img
        src={src}
        className="max-w-[133px] w-min h-auto tablet:w-[67.2px] tablet:h-[25.77px]"
      />
      <h3 className="w-full tablet:w-full font-semibold tablet:text-xs">
        {title}
      </h3>
      <p className="text-base font-normal">{description}</p>
    </div>
  );
};
