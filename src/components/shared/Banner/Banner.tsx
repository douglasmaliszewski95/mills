import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Section } from "../Section/Section";
import { BannerProps } from "./types";

export const Banner: React.FC<BannerProps> = (props) => {
  const { breadcrumb, title, backgroundImage, blur = "" } = props;

  return (
    <Section
      blur={blur}
      containerClass="pt-[98px] pb-[88px] tablet:pt-6 tablet:pb-[66px] tablet:text-[10px] tablet:px-4"
      backgroundImage={backgroundImage}
    >
      <p className="text-white mb-4 tablet:mb-6">{breadcrumb}</p>
      <h1 className="text-white text-4xl font-bold tablet:text-base tablet:font-semibold">
        {title}
      </h1>
    </Section>
  );
};
