import { ProductCardProps } from "./types";
import Button from "@/components/shared/Button/Button";
import Link from "next/link";
import { ImageOCC } from "../ImageOCC/ImageOCC";
import _ from "lodash";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import { getBaseUrl } from "@/utils/product";
import { ProductOCC } from "@/types";
import { DeleteCartModal } from "../DeleteCartModal/DeleteCartModal";

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const router = useRouter();
  const {
    product: {
      id,
      brand,
      route,
      thumbImageURLs,
      primaryFullImageURL,
      displayName,
      type,
      weight,
      length,
      height,
      width,
      x_pesoOperacional,
      x_potenciaDoMotor,
      x_cabine,
      x_capacidadeDoTanque,
      x_potenciaStandByKVA,
      x_potenciaStandByKW,
      x_potenciaPrimeKVA,
      x_potenciaPrimeKW,
      x_alcanceHorizontalM,
      x_alturaDeTrabalhoM,
      x_emissoMdiaKgDeCOH,
      x_emissaoMedia,
      x_peso,
    },
    itemType = "",
  } = props;

  const [deleteCartProducts, setDeleteCartProducts] = useState<any>([]);

  const { currentSiteTheme } = useContext(currentSiteThemeContext);
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const searchHomeParams = {
    localUtility: params.get("localUtility"),
    quantity: params.get("days"),
    dateType: params.get("dateType"),
  };

  const addToCart = async (product: any) => {
    const storedItems =
      localStorage.getItem("items") ?? ""
        ? JSON.parse(localStorage.getItem("items") ?? "")
        : [];

    const itemExists = storedItems.some(
      (storedItem: any) => storedItem.id === product.id
    );

    const dateType = searchHomeParams.dateType
      ? searchHomeParams.dateType
      : currentSiteTheme === "rentalLight"
      ? "Dias"
      : "Meses";

    if (!itemExists) {
      storedItems.push({
        ...product,
        localUtility: searchHomeParams.localUtility,
        timeToLocale: searchHomeParams.quantity,
        typeToLocale: dateType,
        quantity: 1,
        paymentFlow: localStorage.getItem("paymentFlow"),
      });

      const filteredItems = storedItems.filter(
        (item: ProductOCC) => item?.type === itemType
      );

      const deleteCart = filteredItems.length !== storedItems.length;
      if (deleteCart) {
        setDeleteCartProducts(filteredItems);
      } else {
        confirmCart(filteredItems);
      }
    }
  };

  const confirmCart = (products: any) => {
    localStorage.setItem("items", JSON.stringify(products));
    if (currentSiteTheme === "rentalLight") {
      router.push(`/carrinho/passo-01`);
    } else {
      router.push(`/maquinas-pesadas/carrinho/passo-01`);
    }
  };

  const specs =
    type === "Compressores"
      ? [
          {
            label: "Peso",
            value: `${weight} kg`,
            originalValue: weight,
          },
          {
            label: "Comprimento",
            value: `${length} m`,
            originalValue: length,
          },
          {
            label: "Largura",
            value: `${width} m`,
            originalValue: width,
          },
          {
            label: "Altura",
            value: `${height} m`,
            originalValue: height,
          },
          {
            label: "Emissão média",
            value: `${x_emissaoMedia} Kg de CO2 por hora`,
            originalValue: x_emissaoMedia,
          },
        ]
      : type === "Geradores"
      ? [
          {
            label: `Tanque com capacidade de ${x_capacidadeDoTanque} litros`,
            value: "",
            originalValue: x_capacidadeDoTanque,
          },
          {
            label: "Potências stand-by KVA",
            value: `${x_potenciaStandByKVA} KVA / KW: ${x_potenciaStandByKW}`,
            originalValue: x_potenciaStandByKVA,
          },
          {
            label: "Potências stand-by KVA",
            value: `${x_potenciaPrimeKVA} KVA / KW: ${x_potenciaPrimeKW}`,
            originalValue: x_potenciaPrimeKVA,
          },
        ]
      : type === "MaquinasPesadas"
      ? [
          {
            label: "Peso Operacional",
            value: `${x_pesoOperacional} t`,
            originalValue: x_pesoOperacional,
          },
          {
            label: "Potência do motor",
            value: `${x_potenciaDoMotor} HP`,
            originalValue: x_potenciaDoMotor,
          },
          {
            label: "Cabine",
            value: x_cabine,
            originalValue: x_cabine,
          },
        ]
      : [
          {
            label: "Alcance horizontal",
            value: `${x_alcanceHorizontalM} m`,
            originalValue: x_alcanceHorizontalM,
          },
          {
            label: "Altura do trabalho",
            value: `${x_alturaDeTrabalhoM} m`,
            originalValue: x_alturaDeTrabalhoM,
          },
          {
            label: "Peso",
            value: `${x_peso} kg`,
            originalValue: x_peso,
          },
          {
            label: "Emissão Média",
            value: `${x_emissoMdiaKgDeCOH} Kg de CO2 por hora`,
            originalValue: x_emissoMdiaKgDeCOH,
          },
        ];

  const baseUrl = getBaseUrl(type);

  return (
    <div className="rounded-lg max-w-[282px] tablet:max-w-none w-full border-gray-200 border-2 w-full flex flex-col p-3 tablet:pb-6 items-center bg-white justify-end">
      <Link href={`/${baseUrl}${route}`} className="h-full flex items-center">
        {_.isArray(thumbImageURLs) &&
        thumbImageURLs[0]?.startsWith("/ccstore") ? (
          <ImageOCC
            imageName={thumbImageURLs[0]}
            alt={primaryFullImageURL}
            className="max-w-full block max-h-[156px]"
          />
        ) : (
          <img src={thumbImageURLs[0]} alt="" />
        )}
      </Link>
      {type === "MaquinasPesadas" && (
        <p className="text-[10px] text-green-800 mb-4 tablet:mb-2">
          Imagem meramente ilustrativa
        </p>
      )}
      <h5 className="text-green-800 font-semibold w-full">{`${brand ?? ""} ${
        id ?? ""
      }`}</h5>
      <h6 className="text-green-800 font-semibold w-full mb-3">
        {displayName ?? ""}
      </h6>
      {specs?.map(
        ({ label, value, originalValue }, index) =>
          originalValue &&
          originalValue !== "N/A" && (
            <p
              key={index}
              className={`w-full text-green-800 text-sm tablet:text-xs ${
                type === "MaquinasPesadas" && "py-1"
              }`}
            >{`${label}: ${value}`}</p>
          )
      )}
      <Button
        className="mt-6 py-2"
        size="full"
        onClick={() => addToCart(props.product)}
      >
        <p className="text-sm font-semibold">Incluir no orçamento</p>
      </Button>
      <Link
        href={`/${baseUrl}${route}`}
        className="text-orange-500 mt-2 text-sm font-semibold hover:underline"
      >
        Ver detalhes
      </Link>
      {!_.isEmpty(deleteCartProducts) && (
        <DeleteCartModal
          onConfirm={() => confirmCart(deleteCartProducts)}
          onClose={() => setDeleteCartProducts([])}
        />
      )}
    </div>
  );
};
