import { Section } from "@/components/shared/Section/Section";
import { exclamationIco } from "@/assets";
import { AboutCarouselProps } from "./types";
import Button from "@/components/shared/Button/Button";
import { ProductOCC } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { SimpleProductCard } from "@/components/shared/SimpleProductCard/SimpleProductCard";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";

export const AboutCarousel: React.FC<AboutCarouselProps> = (props) => {
  const { content, theme = "white", tooltipText } = props;
  const { isMobile } = useScreenWidth();
  const [products, setProducts] = useState<ProductOCC[]>([]);

  const getProduct = useCallback(async (ids: string[]) => {
    const productsAux: ProductOCC[] = [];

    for (const id of ids) {
      const response = await fetch(`/api/product?product=${id}`);
      const formattedResponse = await response.json();
      if (formattedResponse.erro) continue;
      productsAux.push(formattedResponse);
    }
    setProducts(productsAux);
  }, []);

  useEffect(() => {
    if (content?.fields?.text_field) {
      getProduct(content?.fields?.text_field);
    }
  }, [content?.fields?.text_field]);

  return (
    <Section
      sectionClass={`bg-${theme} py-[72px] tablet:pt-6 tablet:pb-8`}
      containerClass="flex tablet:flex-col"
    >
      <div className="basis-1/2 pr-[120px] tablet:pr-4 tablet:pl-4">
        <div className="flex pb-6 tablet:pb-0 items-center gap-1">
          <h4 className="text-2xl tablet:text-base text-green-800 font-semibold tablet:mb-4">
            {content?.fields?.title}
          </h4>
          {tooltipText && (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="tablet:w-full tablet:flex">
                    <Image
                      className="tablet:hidden"
                      src={exclamationIco}
                      alt="tooltip ico"
                      width={20}
                    />
                  </button>
                </Tooltip.Trigger>

                <Tooltip.Portal>
                  <Tooltip.Content
                    className="max-w-[256px] w-full h-[220px] select-none rounded-[4px] bg-white p-6 text-[10px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                    sideOffset={5}
                    align="end"
                    side="right"
                  >
                    <p className="text-green-800 text-[10px]">{tooltipText}</p>
                    <br />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          )}
        </div>
        <p className="text-green-800 text-lg mb-6 tablet:text-xs">
          {content?.fields?.text}
        </p>
        {!isMobile && (
          <a href={content?.fields?.hrefButton}>
            <Button>
              <p className="font-semibold px-[50px] text-sm">
                Ver todos os modelos
              </p>
            </Button>
          </a>
        )}
      </div>
      <div className="basis-1/2 max-w-[50%] tablet:max-w-[100%] h-full tablet:pl-4">
        <Carousel
          hasDots={!isMobile}
          slidesToShow={isMobile ? 1 : 2}
          slidesToScroll={isMobile ? 1 : 2}
          variableWidth={isMobile}
        >
          {products.map((product) => (
            <SimpleProductCard product={product} key={product.id} />
          ))}
        </Carousel>
      </div>
      {isMobile && (
        <a href={content?.fields?.hrefButton}>
          <Button className="mt-6 mx-4">
            <p className="font-semibold px-[50px] text-sm">
              Ver todos os modelos
            </p>
          </Button>
        </a>
      )}
    </Section>
  );
};
