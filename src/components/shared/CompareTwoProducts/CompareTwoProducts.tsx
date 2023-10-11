import { number } from "yup";
import { Section } from "../Section/Section";
import { CompareTwoProductsProps, ProductsProps } from "./types";

export const CompareTwoProducts: React.FC<CompareTwoProductsProps> = (
  props
) => {
  const { title, products = [] } = props;
  return (
    <Section
      sectionClass="bg-white"
      containerClass="flex flex-col gap-6 tablet:px-4 text-green-800 py-10 tablet:py-4"
    >
      <h3 className="text-2xl font-semibold tablet:text-base">{title}</h3>
      <div className="flex flex-row-reverse gap-24 tablet:gap-10 tablet:flex-col-reverse ">
        {products.map((prd: ProductsProps, index: number) => (
          <div
            className="flex flex-col items-center justify-center w-[50%] tablet:w-full"
            key={index}
          >
            <img src={prd.img} height="153px" width="212px" />
            <h4 className="text-lg font-semibold my-4 tablet:text-base">
              {prd.title}
            </h4>
            <p className="text-base font-normal tablet:text-xs">
              {prd.description}
            </p>
            <a
              href={prd.link}
              target="blank"
              className="mt-8 tablet:w-full bg-trasparent text-sm border-[2px] border-orange-500 font-semibold text-orange-500 h-[37px] flex items-center justify-center w-[40%] rounded-3xl"
            >
              Ver Modelos
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
};
