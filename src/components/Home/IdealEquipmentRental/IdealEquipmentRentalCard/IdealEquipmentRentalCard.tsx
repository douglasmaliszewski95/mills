import Image from "next/image";
import { IdealEquipmentRentalCardProps } from "./types";

export const IdealEquipmentRentalCard: React.FC<
  IdealEquipmentRentalCardProps
> = (props) => {
  const { label, alt, image } = props;

  return (
    <div className="flex flex-col items-center max-w-[114px] gap-4">
      <div className="border-2 border-orange p-6 rounded-full">
        <img src={image} alt={alt} />
      </div>
      <p className="text-orange">{label}</p>
    </div>
  );
};
