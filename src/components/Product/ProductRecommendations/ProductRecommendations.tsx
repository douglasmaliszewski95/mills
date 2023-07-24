import { Section } from "@/components/shared/Section/Section";
import { ProductRecommendationsProps } from "./types";
import { ProductCard } from "@/components/shared/ProductCard/ProductCard";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = (
  props
) => {
  const { products } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section sectionClass="bg-beige-200 tablet:bg-white pb-10 tablet:px-[18px]">
      <h4 className="text-green-800 text-2xl font-semibold mt-10 mb-8 tablet:mt-6 tablet:mb-4 tablet:text-base">
        Voce também pode se interessar por:
      </h4>
      <div className="flex gap-4 tablet:overflow-scroll">
        {isDesktop ? (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <ProductCard product={products[0]} />
        )}
      </div>
    </Section>
  );
};
