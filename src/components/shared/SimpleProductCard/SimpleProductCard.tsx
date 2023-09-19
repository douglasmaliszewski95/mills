import Button from "../Button/Button";
import { ImageOCC } from "../ImageOCC/ImageOCC";
import { SimpleProductCardProps } from "./types";

export const SimpleProductCard: React.FC<SimpleProductCardProps> = (props) => {
  const {
    product,
    cardText = "Ver detalhes",
    borderFull,
    handleAddToCart = () => null,
  } = props;

  return (
    <div
      style={{ width: "282px" }}
      className={`rounded-lg h-full bg-white mr-4 ${
        borderFull && "border-[1px]"
      }`}
    >
      <ImageOCC
        imageName={product?.thumbImageURLs?.[0]}
        alt={product?.displayName}
        className="rounded-t-lg"
      />
      <div
        className={`pb-8 pt-10 gap-10 px-6 ${
          !borderFull && "border-x-[1px]"
        } border-b-[1px] rounded-b-lg border-gray-500 flex flex-col justify-center`}
      >
        <p className="text-lg text-green-800 font-semibold text-center">
          {product.id}
        </p>
        <Button onClick={() => handleAddToCart(product)} variant="outlined">
          {cardText}
        </Button>
      </div>
    </div>
  );
};
