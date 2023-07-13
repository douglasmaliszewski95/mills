import millsPersonnel from "@/assets/mills-personnel.svg";
import millsPersonnelMobile from "@/assets/img/millsPersonnelMobile.png";
import plus from "@/assets/plus.svg";
import Image from "next/image";
import { infos } from "./utils";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { MillsNumbersProps } from "./types";

export const MillsNumbers: React.FC<MillsNumbersProps> = (props) => {
  const { isMobile, isDesktop } = useScreenWidth();
  const { bannerDesktop, bannerMobile } = props;

  return (
    <section
      className="flex justify-center bg-black relative tablet:px-6 bg-no-repeat bg-cover"
      style={
        isDesktop
          ? {
              backgroundImage: `url(${
                isMobile ? bannerMobile : bannerDesktop
              })`,
            }
          : {}
      }
    >
      {isMobile && (
        <div
          className="absolute w-full h-[220px] bg-no-repeat bg-cover shadow-inner shadow-innerLg"
          style={{
            backgroundImage: `url(${bannerMobile}) bg-cover`,
          }}
        ></div>
      )}
      <div className="relative container pb-14 pt-[72px] flex flex-col gap-11 tablet:pt-60  tablet:pl-4 tablet:pr-1">
        {infos.map(({ id, title, subTitle }) => (
          <div key={id} className="flex gap-2 tablet:gap-5">
            <Image
              src={plus}
              width={isMobile ? 38 : 48}
              alt="Sinal de adição"
            />
            <div>
              <p className="text-white font-bold text-2xl tablet:text-lg">
                {title}
              </p>
              <p className="text-white tablet:text-sm tablet:font-normal">
                {subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
