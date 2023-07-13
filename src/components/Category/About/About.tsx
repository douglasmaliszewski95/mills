import { Section } from "@/components/shared/Section/Section";
import { AboutProps } from "./types";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const About: React.FC<AboutProps> = (props) => {
  const { title, description, image, alt } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section containerClass="flex justify-between tablet:flex-col tablet:px-4 tablet:my-6">
      <div className="basis-1/2 mt-16 pr-[120px] tablet:pr-0 tablet:mt-0 pb-[104px] tablet:pb-0">
        <h2 className="text-green-800 font-semibold text-2xl mb-7 tablet:text-base tablet:mb-2">
          {title}
        </h2>
        <p className="text-green-800 text-lg mb-7 tablet:text-xs">
          {description}
        </p>
        <Button className="max-w-[264px] w-full tablet:max-w-[992px]">
          <p className="py-[2px] text-sm font-semibold">Ver modelos</p>
        </Button>
      </div>
      {isDesktop && (
        <div className="basis-1/2 ml-8 relative">
          <Image src={image} alt={alt} fill />
        </div>
      )}
    </Section>
  );
};
