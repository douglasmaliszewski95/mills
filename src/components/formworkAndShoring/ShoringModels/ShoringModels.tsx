import { Section } from "@/components/shared/Section/Section";
import { ShoringCard } from "./ShoringCards/ShoringCards";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import Button from "@/components/shared/Button/Button";
import { ShoringModelsProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useCallback, useEffect, useState } from "react";
import { ProductOCC } from "@/types";
import { SimpleProductCard } from "@/components/shared/SimpleProductCard/SimpleProductCard";
import { useRouter } from "next/router";

export const ShoringModels: React.FC<ShoringModelsProps> = (props) => {
  const {
    ids = [],
    title,
    cardText = "Ver detalhes",
    textOnCenter = false,
    theme = "green-800",
    buttonTitle = "Ver modelos",
  } = props;
  const { isMobile } = useScreenWidth();
  const [products, setProducts] = useState<ProductOCC[]>([]);
  const router = useRouter();

  const addToCart = async (product: ProductOCC) => {
    const storedItems =
      localStorage.getItem("items") ?? ""
        ? JSON.parse(localStorage.getItem("items") ?? "")
        : [];
    const findPaymentFlow = storedItems.find(
      (item: any) => item.paymentFlow === localStorage.getItem("paymentFlow")
    );
    if (findPaymentFlow) {
      const itemExists = storedItems.some(
        (storedItem: any) => storedItem.id === product.id
      );

      if (!itemExists) {
        storedItems.push({
          ...product,
          localUtility: null,
          timeToLocale: 0,
          typeToLocale: "Dias",
          quantity: 1,
          paymentFlow: localStorage.getItem("paymentFlow"),
        });
        localStorage.setItem("items", JSON.stringify(storedItems));
      }
    } else {
      localStorage.removeItem("customInfos");
      localStorage.removeItem("customServices");
      localStorage.removeItem("items");
      setTimeout(() => {
        const itemExists = storedItems.some(
          (storedItem: any) => storedItem.id === product.id
        );

        if (!itemExists) {
          storedItems.push({
            ...product,
            localUtility: null,
            timeToLocale: 0,
            typeToLocale: "Dias",
            quantity: 1,
            paymentFlow: localStorage.getItem("paymentFlow"),
          });
          localStorage.setItem("items", JSON.stringify(storedItems));
        }
      }, 1000);
    }

    router.push("/carrinho/passo-01");
  };

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
    if (ids) {
      getProduct(ids);
    }
  }, [ids]);

  return (
    <>
      <Section sectionClass={`bg-${theme} pt-10 tablet:px-[18px]`}>
        <div className={`text-${theme === "white" ? "green-800" : "white"}`}>
          <h1
            className={`font-semibold text-2xl tablet:text-base ${
              textOnCenter && "w-full text-center"
            }`}
          >
            {title}
          </h1>
          <div className="flex flex-row mt-5">
            <Carousel
              className="w-full absolute"
              slidesToShow={isMobile ? 1 : 4}
              slidesToScroll={isMobile ? 1 : 4}
              hasDots
              spacing="-16"
            >
              {products.map((card, index) => (
                <SimpleProductCard
                  product={card}
                  handleAddToCart={addToCart}
                  key={card?.description}
                  cardText={cardText}
                  borderFull={theme === "white"}
                />
              ))}
            </Carousel>
          </div>

          <div className="w-full flex items-center justify-center py-10 font-semibold text-sm">
            <Button className="w-[251.14px] h-[37px] tablet:w-full">
              {buttonTitle}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};
