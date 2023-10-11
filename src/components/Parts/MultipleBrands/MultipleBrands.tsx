import { Section } from "@/components/shared/Section/Section";
import { MultipleBrandsProps } from "./types";
import { getImageSrc } from "@/utils/images";
import { ImageCMS } from "@/types";
import { DnaTop } from "@/assets/DnaTop";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { DnaTopResponsive } from "@/assets/DnaTopResponsive";
import DynamicImage from "@/components/shared/DynamicImage/DynamicImage";

export const MultipleBrands: React.FC<MultipleBrandsProps> = (props) => {
  const { title, subtitle, brands } = props;
  const { isMobile } = useScreenWidth();

  return (
    <Section sectionClass="bg-beige-200 py-[120px] relative tablet:px-4 tablet:pt-[88px] tablet:pb-12">
      <div className="absolute right-3 top-3 flex justify-end">
        <DnaTopResponsive
          color="#F37021"
          sizePercentage={isMobile ? 52 : 100}
          width={isMobile ? "265" : "615"}
        />
      </div>
      <h4 className="text-2xl font-semibold text-green-800 mb-6 tablet:text-base tablet:mb-4">
        {title}
      </h4>
      <p className="text-green-800 text-lg max-w-[48%] mb-16 tablet:text-xs tablet:mb-8 tablet:max-w-full">
        {subtitle}
      </p>
      <div className="flex justify-between items-end tablet:flex-col tablet:gap-8 tablet:items-center tablet:px-12">
        {brands?.map((image: ImageCMS) => (
          <DynamicImage
            key={image?.description}
            src={getImageSrc(image?.fields)}
            alt={image?.fields?.alt_attribute ?? ""}
          />
        ))}
      </div>
    </Section>
  );
};
