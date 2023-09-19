import { NumberInput } from "@/components/Home/NumberInput/NumberInput";
import Button from "@/components/shared/Button/Button";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { CartListProps } from "./types";
import { formatCentimetersAndGrams } from "@/utils/metricsTransform";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Item {
  id: string;
  fullImageURLs: string;
  brand: string;
  displayName: string;
  height: number;
  x_alcanceHorizontalM: number;
  x_peso: number;
  x_emissoMdiaKgDeCOH: number;
  localUtility?: string;
  timeToLocale?: number;
  typeToLocale?: string;
  quantity?: number;
}

const LOCAL_UTILITY_OPTIONS = ["5 Metros", "10 Metros", "20 Metros"];
const TYPE_TO_LOCALE_OPTIONS = ["Dias", "Meses"];

export const CartList: React.FC<CartListProps> = (props) => {
  const { buttonTitle = "+ Adicionar novo equipamento", isSimpleCard = false } =
    props;

  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    setItems(storedItems ? JSON.parse(storedItems) : []);
  }, []);

  const handleChangeProduct = (
    id: string,
    selectedValue: any,
    variableName: keyof Item,
    currentItems: Item[]
  ) => {
    let updatedItems;

    if (selectedValue === 0 && variableName === "quantity") {
      updatedItems = currentItems.filter((item) => item.id !== id);
    } else {
      updatedItems = currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, [variableName]: selectedValue };
        }
        return item;
      });
    }

    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleValueChange = (name: keyof Item, value: any, itemId: string) => {
    handleChangeProduct(itemId, value, name, items);
  };

  return (
    <div className="flex justify-center items-center flex-col w-full font-ibm-font">
      <div className="container">
        <div
          className={`flex ${
            items.length === 0 ? "justify-center" : "justify-start"
          } bg-beige-50 rounded-lg`}
        >
          {items.length === 0 ? (
            <EmptyCartMessage
              onClickAdd={() => router.push("/pecas/busca")}
              buttonTitle={buttonTitle}
            />
          ) : (
            <ItemsList
              items={items}
              buttonTitle={buttonTitle}
              isSimpleCard={isSimpleCard}
              onValueChange={handleValueChange}
              onClickAdd={() => router.push("/pecas/busca")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyCartMessage: React.FC<{
  onClickAdd: () => void;
  buttonTitle: string;
}> = ({ onClickAdd, buttonTitle }) => (
  <div className="flex flex-col items-center my-36 gap-5">
    <span className="text-base text-green-800/40">
      Você ainda não incluiu nenhum equipamento no seu orçamento.
    </span>
    <Button variant="outlined" onClick={onClickAdd}>
      {buttonTitle}
    </Button>
  </div>
);

const ItemsList: React.FC<{
  items: Item[];
  isSimpleCard: boolean;
  buttonTitle: string;
  onValueChange: (name: keyof Item, value: any, itemId: string) => void;
  onClickAdd: () => void;
}> = ({ items, onValueChange, onClickAdd, buttonTitle, isSimpleCard }) => (
  <div className="my-10 mx-12 w-full tablet:mx-5">
    <Button
      className="w-full max-w-[334px]"
      variant="outlined"
      onClick={onClickAdd}
    >
      {buttonTitle}
    </Button>
    {items.map((item) =>
      isSimpleCard ? (
        <SimpleCartItem
          key={item.id}
          item={item}
          onValueChange={onValueChange}
        />
      ) : (
        <CartItem key={item.id} item={item} onValueChange={onValueChange} />
      )
    )}
  </div>
);

const CartItem: React.FC<{
  item: Item;
  onValueChange: (name: keyof Item, value: any, itemId: string) => void;
}> = ({ item, onValueChange }) => {
  return (
    <div className="flex gap-10 bg-white py-12 px-11 rounded my-6 w-full text-green-800 tablet:flex-col tablet:px-4">
      <ImageOCC
        imageName={item?.fullImageURLs}
        alt="product_image"
        className="w-[286px] h-[184px] object-contain"
      />

      <div className="flex flex-col gap-2 max-w-[287px]">
        <p className="font-semibold text-base tablet:text-sm">
          {item.brand} {item.id}
        </p>
        <p className="font-semibold text-base tablet:text-sm">
          {item.displayName}
        </p>
        <p className="font-normal text-sm tablet:text-xs">
          Altura de Trabalho: {formatCentimetersAndGrams(item.height)} m
          <br />
          Alcance Horizontal: {item.x_alcanceHorizontalM} m<br />
          Peso: {formatCentimetersAndGrams(item.x_peso)} kg
          <br />
          Emissão Média: {item.x_emissoMdiaKgDeCOH} Kg de CO2 por hora
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[302px]">
        <div className="grow">
          <p className="text-sm text-green-800 mb-3 tablet:text-xs">
            Qual o local de utilização?
          </p>
          <InputSelector
            name="localUtility"
            options={LOCAL_UTILITY_OPTIONS}
            watch={(value: any) => item.localUtility}
            setValue={(name, value) => onValueChange(name, value, item.id)}
            additionalProps={item.id}
            placeholder={
              item.localUtility ??
              "Selecione onde você irá utilizar o equipamento"
            }
          />
        </div>

        <div className="basis-4/12  tablet:basis-full tablet:w-full">
          <p className="text-sm text-green-800 mb-3 tablet:text-xs">
            Por quanto tempo você gostaria de alugar?
          </p>
          <div className="flex gap-5 ">
            <NumberInput
              value={item.timeToLocale ?? 0}
              setValue={(value: any) =>
                onValueChange("timeToLocale", value, item.id)
              }
            />
            <InputSelector
              name="typeToLocale"
              options={TYPE_TO_LOCALE_OPTIONS}
              watch={(value: any) => item.typeToLocale}
              setValue={(name, value) => onValueChange(name, value, item.id)}
              additionalProps={item.id}
              placeholder={item.typeToLocale ?? "Dias"}
            />
          </div>
        </div>

        <div className="basis-4/12  tablet:basis-full tablet:w-full">
          <p className="text-sm text-green-800 mb-3">Qual a quantidade?</p>
          <div className="flex gap-5 ">
            <NumberInput
              value={item?.quantity ?? 0}
              showTrash={true}
              setValue={(value: any) =>
                onValueChange("quantity", value, item.id)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SimpleCartItem: React.FC<{
  item: Item;
  onValueChange: (name: keyof Item, value: any, itemId: string) => void;
}> = ({ item, onValueChange }) => {
  return (
    <div className="flex items-center justify-between bg-white py-12 pl-24 pr-[152px] rounded w-full text-green-800 tablet:flex-col tablet:px-0">
      <div className="flex items-center gap-20 tablet:flex-col tablet:gap-4">
        <ImageOCC
          imageName={item?.fullImageURLs}
          alt="product_image"
          className="w-[110px] tablet:w-full tablet:h-full h-[110px] tablet:px-12 object-contain"
        />

        <div className="flex flex-col gap-2 max-w-[287px]">
          <p className="font-semibold text-base tablet:text-sm">
            {item.displayName}
          </p>
        </div>
      </div>

      <div className="max-w-[234px] tablet:max-w-full tablet:px-5 tablet:mt-12">
        <p className="text-sm text-green-800 mb-3 text-center tablet:text-xs">
          Selecione a quantidade de peças necessárias para seu orçamento
        </p>
        <div className="flex gap-5 w-full px-6 tablet:px-0">
          <NumberInput
            value={item?.quantity ?? 0}
            showTrash={true}
            wFull
            setValue={(value: any) => onValueChange("quantity", value, item.id)}
          />
        </div>
      </div>
    </div>
  );
};
