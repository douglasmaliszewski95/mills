import Button from "../Button/Button";
import { ImageOCC } from "../ImageOCC/ImageOCC";
import { SimpleProductCardProps } from "./types";

export const SimpleProductCard: React.FC<SimpleProductCardProps> = (props) => {
  const { product, cardText, borderFull, handleAddToCart = () => null } = props;

  const baseUrl =
    product.type === "Compressores"
      ? "compressores"
      : product.type === "Geradores"
      ? "geradores"
      : product.type === "Equipamentos"
      ? "formas-e-escoramentos"
      : product.type === "MaquinasPesadas"
      ? "maquinas-pesadas"
      : "plataformas-elevatorias";

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
        <a href={`${baseUrl}${product.route}`} className="w-full">
          <Button
            onClick={() => cardText && handleAddToCart(product)}
            variant="outlined"
            className="w-full"
          >
            {cardText ?? "Ver detalhes"}
          </Button>
        </a>
      </div>
    </div>
  );
};
