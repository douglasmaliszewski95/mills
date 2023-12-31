import { Section } from "@/components/shared/Section/Section";
import { GeneratorCarrouselProps } from "./types";
import Button from "@/components/shared/Button/Button";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { useEffect, useState } from "react";
import { ProductOCC } from "@/types";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { useRouter } from "next/router";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { DnaBottom } from "@/assets/DnaBottom";
import { getBaseUrl } from "@/utils/product";

export const GeneratorCarrousel: React.FC<GeneratorCarrouselProps> = (
  props
) => {
  const { title, products, description, hasDna = false, link = "#" } = props;
  const { isDesktop, isMobile } = useScreenWidth();
  const [productsOCC, setProductsOCC] = useState<ProductOCC[]>([]);
  const router = useRouter();

  const fetchProducts = async (productsIds: string[]) => {
    const productsAux = [];
    for (const product of productsIds) {
      const response = await fetch(`/api/product?product=${product}`);
      const formattedResponse = await response.json();
      productsAux.push(formattedResponse);
    }
    return productsAux;
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsAux = await fetchProducts(products);
      setProductsOCC(productsAux);
    };
    getProducts();
  }, [products]);

  return (
    <Section
      containerClass="flex tablet:flex-col tablet:px-4 tablet:gap-8 tablet:pt-6"
      sectionClass={hasDna ? "relative mb-12" : ""}
    >
      {hasDna && isDesktop && (
        <div className="absolute bottom-[-36px] left-3">
          <DnaBottom color="#F37021" />
        </div>
      )}
      <div className="basis-1/2 pr-[138px] flex h-full flex-col justify-center gap-9 tablet:pr-0">
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-semibold text-green-800 tablet:text-base">
            {title ?? null}
          </h4>
          {description && (
            <p className="text-green-800 text-lg tablet:text-xs">
              {description}
            </p>
          )}
        </div>
        {isDesktop && (
          <a href={link ?? "#"} className="w-[260px]">
            <Button className="w-full">
              <p className="py-[1px] text-sm font-semibold">Ver modelos</p>
            </Button>
          </a>
        )}
      </div>
      <div className="basis-1/2 max-w-[50%] py-12 px-[110px] tablet:px-0 tablet:max-w-[100%] tablet:py-0 tablet:basis-0">
        <Carousel
          className={isDesktop ? "px-4" : ""}
          hasDots={false}
          nextArrow={
            <LargeNextArrow
              width={22}
              customProps="mr-[-90px] tablet:mr-[-52px]"
            />
          }
          prevArrow={
            <LargePrevArrow
              width={22}
              customProps="ml-[-90px] tablet:ml-[-52px]"
            />
          }
        >
          {productsOCC?.map((product) => (
            <>
              <div className={isMobile ? "px-4" : ""}>
                <ImageOCC
                  imageName={product.primaryLargeImageURL}
                  alt={product.displayName}
                  className="max-h-[260px]"
                />
                <p className="text-green-800 font-semibold text-lg tablet:text-xs">{`${product.brand} ${product.id}:`}</p>
                {product.type === "Compressores" ? (
                  <>
                    <p className="text-green-800 tablet:text-xs">
                      {`Peso: ${product.weight} kg`}
                    </p>
                    <p className="text-green-800 tablet:text-xs">
                      {`Motor: ${product.x_motor}`}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-green-800 tablet:text-xs">{`Tanque com capacidade de ${Number(
                      product.x_capacidadeDoTanque
                    ).toFixed()} litros.`}</p>
                    <p className="text-green-800 tablet:text-xs">{`Potências stand-by KVA: de ${Number(
                      product.x_potenciaStandByKVA
                    )} KVA / KW: ${product.x_potenciaStandByKW}`}</p>
                    <p className="text-green-800 tablet:text-xs">{`Potências prime KVA: de ${Number(
                      product.x_potenciaPrimeKVA
                    )} KVA / KW: ${product.x_potenciaPrimeKW}`}</p>
                  </>
                )}
              </div>
              {isDesktop ? (
                <a href={`/${getBaseUrl(product.type)}${product.route}`}>
                  <Button variant="outlined" className="mt-6">
                    <p className="px-12">Ver detalhes</p>
                  </Button>
                </a>
              ) : (
                <a href={`${getBaseUrl(product.type)}${product.route}`}>
                  <Button variant="outlined" className="w-full mb-3 mt-6">
                    <p className="font-semibold text-sm">Ver detalhes</p>
                  </Button>
                </a>
              )}
            </>
          ))}
        </Carousel>
        {isMobile && (
          <a href={link ?? "#"}>
            <Button className="w-full mb-6">
              <p className="py-[1px] font-semibold text-sm">Ver modelos</p>
            </Button>
          </a>
        )}
      </div>
    </Section>
  );
};
