import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";

export const CardProduct = ({
  id,
  image,
  model,
  description,
  specs,
  route,
  type,
}: any) => {
  const baseUrl =
    type === "Compressores"
      ? "compressores"
      : type === "Geradores"
      ? "geradores"
      : type === "Equipamentos"
      ? "plataformas-elevatorias"
      : type === "MaquinasPesadas"
      ? "maquinas-pesadas"
      : "plataformas-elevatorias";

  return (
    <div key={id} className="flex items-center justify-center flex-row px-10">
      <div className="w-[40%]">
        <ImageOCC
          imageName={image}
          alt={description}
          className="tablet:max-w-full h-[max]"
        />
      </div>
      <div className="tablet:mt-[18px] w-[60%]">
        <h5 className="text-green-800 font-semibold tablet:text-sm">{model}</h5>
        <h5 className="text-green-800 font-semibold tablet:text-sm max-w-[248x]">
          {description}
        </h5>
        <div className="flex flex-col gap-px mt-[18px]">
          {specs?.map(({ name, value }: any) => (
            <p
              key={`${name}${value}`}
              className="text-green-800 text-sm tablet:text-[10px]"
            >{`${name}: ${value}`}</p>
          ))}
        </div>
        <a
          className="w-82 mt-1.5 pl-0 border-none font-semibold text-sm text-orange-500 tablet:mb-6"
          href={`${baseUrl}/${route}`}
          target="blank"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  );
};
