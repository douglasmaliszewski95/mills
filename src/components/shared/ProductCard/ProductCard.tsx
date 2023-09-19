/* eslint-disable @next/next/no-img-element */
import { ProductCardProps } from "./types";
import Button from "@/components/shared/Button/Button";
import Link from "next/link";
import { ImageOCC } from "../ImageOCC/ImageOCC";
import _ from "lodash";
import { useRouter } from "next/router";

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const router = useRouter();
  const {
    product: {
      id,
      brand,
      thumbImageURLs,
      primaryFullImageURL,
      displayName,
      x_alcanceHorizontalM,
      x_alturaDeTrabalhoM,
      x_emissoMdiaKgDeCOH,
      x_peso,
    },
  } = props;

  const addToCart = async (product: any) => {
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

  const specs = [
    {
      label: "Alcance horizontal",
      value: x_alcanceHorizontalM,
    },
    {
      label: "Altura do trabalho",
      value: x_alturaDeTrabalhoM,
    },
    {
      label: "Peso",
      value: x_peso,
    },
    {
      label: "Emissão Média",
      value: `${x_emissoMdiaKgDeCOH} Kg de CO2 por hora`,
    },
  ];

  return (
    <div className="rounded-lg max-w-[282px] tablet:max-w-none w-full border-gray-200 border-2 w-full flex flex-col p-3 tablet:pb-6 items-center bg-white justify-end">
      <Link href={`/product/${id}`}>
        {_.isArray(thumbImageURLs) &&
        thumbImageURLs[0]?.startsWith("/ccstore") ? (
          <ImageOCC
            imageName={thumbImageURLs[0]}
            alt={primaryFullImageURL}
            className="max-w-full block"
          />
        ) : (
          <img src={thumbImageURLs[0]} alt="" />
        )}
      </Link>
      <h5 className="text-green-800 font-semibold w-full">{brand}</h5>
      <h6 className="text-green-800 font-semibold w-full mb-3">
        {displayName}
      </h6>
      {specs?.map(({ label, value }, index) => (
        <p
          key={label}
          className="w-full text-green-800 text-sm tablet:text-xs"
        >{`${label}: ${value}`}</p>
      ))}
      <Button
        className="mt-6"
        size="full"
        onClick={() => addToCart(props.product)}
      >
        Incluir no orçamento
      </Button>
      <Link
        href={`/product/${id}`}
        className="text-orange-500 mt-2 text-sm font-semibold hover:underline"
      >
        Ver detalhes
      </Link>
    </div>
  );
};
