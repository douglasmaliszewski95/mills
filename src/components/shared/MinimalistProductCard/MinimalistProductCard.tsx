import { MinimalistProductCardProps } from "./types";
import Button from "@/components/shared/Button/Button";
import { ImageOCC } from "../ImageOCC/ImageOCC";
import _ from "lodash";
import { useRouter } from "next/router";
import { ProductOCC } from "@/types";
import { useState } from "react";
import { DeleteCartModal } from "../DeleteCartModal/DeleteCartModal";

export const MinimalistProductCard: React.FC<MinimalistProductCardProps> = (
  props
) => {
  const router = useRouter();
  const {
    product: { thumbImageURLs, displayName },
    itemType = "Pecas",
  } = props;

  const [deleteCartProducts, setDeleteCartProducts] = useState<any>([]);

  const addToCart = async (product: any, confirmed?: boolean) => {
    const storedItems =
      localStorage.getItem("items") ?? ""
        ? JSON.parse(localStorage.getItem("items") ?? "")
        : [];

    const itemExists = storedItems.some(
      (storedItem: any) => storedItem.id === product.id
    );

    if (!itemExists) {
      storedItems.push({
        ...product,
        quantity: 1,
        paymentFlow:
          itemType === "Pecas" ? itemType : localStorage.getItem("paymentFlow"),
      });
    }

    const filteredItems = storedItems.filter(
      (item: ProductOCC) => item?.type === itemType
    );

    const deleteCart = filteredItems.length !== storedItems.length;

    if (deleteCart) {
      setDeleteCartProducts(filteredItems);
    } else {
      confirmCart(filteredItems);
    }
  };

  const confirmCart = (products: any) => {
    localStorage.setItem("items", JSON.stringify(products));
    if (itemType === "Pecas") {
      router.push(`/pecas/carrinho/passo-01`);
    } else if (itemType === null) {
      router.push(`/vendas-de-maquinas/carrinho/passo-01`);
    } else {
      router.push(`/carrinho/passo-01`);
    }
  };

  return (
    <div className="rounded-lg max-w-[282px] h-[404px] tablet:h-[374px] w-full tablet:max-w-none border-gray-200 border-2 flex flex-col px-3 py-6 tablet:pb-6 items-center bg-white justify-between">
      <div>
        {_.isArray(thumbImageURLs) &&
        thumbImageURLs[0]?.startsWith("/ccstore") ? (
          <ImageOCC
            imageName={thumbImageURLs[0]}
            alt={displayName}
            className="max-w-full block"
          />
        ) : (
          <img src={thumbImageURLs[0]} alt={displayName} />
        )}
        <h6 className="text-green-800 text-center font-semibold w-full mb-3">
          {displayName}
        </h6>
      </div>
      <Button size="full" onClick={() => addToCart(props.product)}>
        Incluir no orçamento
      </Button>
      {!_.isEmpty(deleteCartProducts) && (
        <DeleteCartModal
          onConfirm={() => confirmCart(deleteCartProducts)}
          onClose={() => setDeleteCartProducts([])}
        />
      )}
    </div>
  );
};
