import Image from "next/image";
import { AboutRentalProps } from "./types";
import { Section } from "@/components/shared/Section/Section";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import linesUp from "@/assets/img/linesUp.png";

export const AboutRental: React.FC<AboutRentalProps> = (props) => {
  const { title, description, items } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section sectionClass="bg-green-800 pt-2 tablet:pt-[68px] pb-20 tablet:pb-12 tablet:px-[18px]">
      {isDesktop && (
        <div className="flex ">
          <h5 className="text-white text-2xl font-semibold mt-12">{title}</h5>
          <Image
            src={linesUp}
            width={683}
            height={123}
            alt="linesBg"
            className="ml-auto"
          />
        </div>
      )}
      <p className="text-white mb-[88px] max-w-[506px] tablet:text-xs">
        {description}
      </p>
      <div className="flex justify-between gap-[75px] tablet:flex-col tablet:px-8">
        {items.map((item) => (
          <div key={item.alt} className="flex flex-col items-center">
            <Image src={item.image} alt={item.alt} width={52} height={48} />
            <h6 className="mt-3 mb-6 tablet:mb-2 text-lg font-semibold text-white tablet:text-sm">
              {item.title}
            </h6>
            <p className="text-white text-center tablet:text-xs">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
