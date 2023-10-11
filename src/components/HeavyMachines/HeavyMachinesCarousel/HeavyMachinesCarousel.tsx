import { Section } from "@/components/shared/Section/Section";
import { HeavyMachinesCarouselProps } from "./types";
import Button from "@/components/shared/Button/Button";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { useCallback, useEffect, useState } from "react";
import { ProductOCC } from "@/types";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { TalkToSpecialistModal } from "@/components/shared/TalkToSpecialistModal/TalkToSpecialistModal";

export const HeavyMachinesCarousel: React.FC<HeavyMachinesCarouselProps> = (
  props
) => {
  const {
    title,
    buttonTitle,
    products: productIds,
    description,
    isTalkToSpecialist = false,
  } = props;
  const [products, setProducts] = useState<ProductOCC[]>();

  const { isDesktop, isMobile } = useScreenWidth();

  const getProduct = useCallback(async (ids: string[]) => {
    const productsAux: ProductOCC[] = [];

    for (const id of ids) {
      const response = await fetch(`/api/product?product=${id}`);
      const formattedResponse = await response.json();
      if (formattedResponse.error) continue;
      productsAux.push(formattedResponse);
    }
    setProducts(productsAux);
  }, []);

  useEffect(() => {
    if (productIds) {
      getProduct(productIds);
    }
  }, [productIds]);

  return (
    <Section containerClass="flex gap-12 py-10 tablet:flex-col tablet:py-6">
      <div className="basis-1/2 flex flex-col justify-center gap-8 tablet:px-4 tablet:gap-6">
        <h5 className="text-2xl text-green-800 font-semibold tablet:text-base tablet:max-w-[64%]">
          {title}
        </h5>
        {description && (
          <p className="text-lg text-green-800 tablet:text-xs">{description}</p>
        )}
        {isDesktop &&
          (isTalkToSpecialist ? (
            <TalkToSpecialistModal>
              <Button className="max-w-[260px]">
                <p className="font-semibold text-sm">{buttonTitle}</p>
              </Button>
            </TalkToSpecialistModal>
          ) : (
            <Button className="max-w-[260px]">
              <p className="font-semibold text-sm">{buttonTitle}</p>
            </Button>
          ))}
      </div>
      <div className="basis-1/2 max-w-[48%] tablet:max-w-[100%]">
        <Carousel
          hasDots={false}
          nextArrow={
            <LargeNextArrow
              width={isDesktop ? 22 : 14}
              customProps="mr-[-32px] tablet:mr-[-32px]"
            />
          }
          prevArrow={
            <LargePrevArrow
              width={isDesktop ? 22 : 14}
              customProps="ml-[-32px] tablet:ml-[-32px]"
            />
          }
        >
          {products?.map((product) => (
            <>
              <div className="grid place-items-center">
                <ImageOCC
                  imageName={product?.thumbImageURLs[0]}
                  alt={product?.displayName}
                  className="h-[224px] tablet:h-[136px]"
                />
                <div className="w-full px-[68px] tablet:px-4 tablet:text-center">
                  <p className="my-6 text-lg text-green-800 font-semibold tablet:text-xs">
                    {product?.displayName}
                  </p>
                  <a href={`/product/${product?.id}`}>
                    <Button
                      variant="outlined"
                      className="w-[260px] tablet:w-full"
                    >
                      <p className="text-sm font-semibold">Ver detalhes</p>
                    </Button>
                  </a>
                </div>
              </div>
            </>
          ))}
        </Carousel>
        {isMobile &&
          (isTalkToSpecialist ? (
            <TalkToSpecialistModal>
              <div className="px-4 mt-6">
                <Button className="w-full">
                  <p className="font-semibold text-sm">{buttonTitle}</p>
                </Button>
              </div>
            </TalkToSpecialistModal>
          ) : (
            <div className="px-4 mt-6">
              <Button className="w-full">
                <p className="font-semibold text-sm">{buttonTitle}</p>
              </Button>
            </div>
          ))}
      </div>
    </Section>
  );
};
