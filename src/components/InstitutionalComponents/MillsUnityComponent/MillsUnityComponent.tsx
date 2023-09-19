import { Section } from "@/components/shared/Section/Section";
import { MillsUnityComponentProps } from "./types";
import mail from "@/assets/mail-ico-white.svg";
import phone from "@/assets/phone-ico.svg";
import location from "@/assets/location-ico.svg";
import Image from "next/image";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const MillsUnityComponent: React.FC<MillsUnityComponentProps> = (
  props
) => {
  const { address, email, phoneNumber, title, src } = props;

  const { isMobile } = useScreenWidth();

  const className =
    "flex flex-row items-center text-lg font-normal gap-4 mt-4 tablet:text-xs";

  return (
    <Section containerClass="flex flex-row gap-16 tablet:px-4">
      <div className="w-[45%] tablet:w-full tablet:py-10 py-28 text-green-800">
        <h1 className="text-2xl font-semibold mb-8">{title}</h1>

        <div className={className}>
          <div className="bg-green-800 rounded-md w-[47px] h-[44px] flex items-center justify-center">
            <Image
              src={location}
              alt="icone de localização"
              className="w[24px] tablet:w-[14px] tablet:h-[20px] h-[24px]"
            />
          </div>
          <p className="w-[70%] tablet:w-full">{address}</p>
        </div>

        <div className={className}>
          <div className="bg-green-800 rounded-md w-[47px] h-[44px] flex items-center justify-center">
            <Image
              src={phone}
              alt="icone de telefone"
              className="w[19px] tablet:w-[18px] tablet:h-[18px] h-[27px]"
            />
          </div>
          <p className="w-[55%] tablet:w-full">
            {phoneNumber}
          </p>
        </div>

        <div className={className}>
          <div className="bg-green-800 rounded-md w-[47px] tablet:w-[40px] h-[44px] flex items-center justify-center">
            <Image
              src={mail}
              alt="icone de email"
              className="w-[27px] tablet:w-[19.72px] tablet:h-[13.8px] h-[19px]"
            />
          </div>
          <p className="w-[55%] tablet:w-[70%]">
            Se preferir,{" "}
            <a
              className="text-orange-500 decoration-solid underline"
              href={email}
            >
              clique aqui
            </a>{" "}
            e envie-nos uma mensagem{" "}
          </p>
        </div>
      </div>

      {!isMobile && (
        <div className="w-[50%]">
          <img src={src} />
        </div>
      )}
    </Section>
  );
};
