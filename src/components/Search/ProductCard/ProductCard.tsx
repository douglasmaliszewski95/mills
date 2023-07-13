import Image from "next/image";
import { ProductCardProps } from "./types";
import Button from "@/components/shared/Button/Button";
import Link from "next/link";

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const {
    product: { image, model, description, specs },
  } = props;

  return (
    <div className="rounded-lg border-gray-200 border-2 w-full flex flex-col p-3 tablet:pb-6 items-center">
      <Image src={image} alt={`Modelo ${model}`} />
      <h5 className="text-green-800 font-semibold w-full">{model}</h5>
      <h6 className="text-green-800 font-semibold w-full mb-3">
        {description}
      </h6>
      {specs.map(({ name, value }, index) => (
        <p
          key={`${name}${index}`}
          className="w-full text-green-800"
        >{`${name}: ${value}`}</p>
      ))}
      <Button className="mt-6" size="full">
        Incluir no orçamento
      </Button>
      <Link
        href=""
        className="text-orange-500 mt-2 text-sm font-semibold hover:underline"
      >
        Ver detalhes
      </Link>
    </div>
  );
};
