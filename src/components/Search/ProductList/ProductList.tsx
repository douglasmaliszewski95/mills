import { useEffect, useState } from "react";
import Image from "next/image";
import { ProductListProps } from "./types";
import closeIcon from "@/assets/close.svg";
import { ProductCard } from "../../shared/ProductCard/ProductCard";
import chevronLeft from "@/assets/large-orange-chevron-left.svg";
import chevronRight from "@/assets/large-orange-chevron-right.svg";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { LargeChevronRight } from "@/assets/LargeChevronRight";

export const ProductList: React.FC<ProductListProps> = (props) => {
  const {
    products,
    selectedFilters,
    onRemoveFilter,
    setIsFiltersOpen = () => null,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const { isMobile } = useScreenWidth();

  useEffect(() => {
    if (currentPage > 1) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const quantityShowed = isMobile ? 4 : 9;

  const resultsQuantity = products?.length || 0;
  const isMultipleProducts = resultsQuantity > 1;
  const totalPageQuantity = Math.ceil(resultsQuantity / quantityShowed);

  const productsWithPagination = products?.slice(
    (currentPage - 1) * quantityShowed,
    currentPage * quantityShowed
  );

  return (
    <div className="tablet:px-[18px]">
      <div className="flex flex-wrap gap-2 h-fit mb-2">
        {selectedFilters?.length > 0
          ? selectedFilters.map((filter) => (
              <div
                key={filter}
                className="h-fit flex border-[1px] border-orange-500 rounded pl-3 pr-1 py-1 gap-1 justify-between"
              >
                <p className="text-green-800 text-xs">{filter}</p>
                <div
                  className="cursor-pointer"
                  onClick={() => onRemoveFilter(filter)}
                >
                  <img
                    className="w-[6px] h-[6px]"
                    width={6}
                    height={6}
                    src={closeIcon}
                    alt="Xis"
                  />
                </div>
              </div>
            ))
          : isMobile && (
              <div className="h-fit flex border-[1px] border-orange-500 rounded px-3 py-1 gap-1 justify-between">
                <p className="text-green-800 text-xs">Todas</p>
              </div>
            )}
      </div>
      <h3 className="text-green-800 tablet:text-xs mb-6 tablet:mb-4">{`(${
        resultsQuantity || "Nenhuma"
      } ${
        isMultipleProducts ? "plataformas encontradas" : "plataforma encontrada"
      })`}</h3>
      {isMobile && (
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="flex justify-between px-4 py-[10px] bg-orange-500 w-full rounded mb-4 items-center"
        >
          <p className="text-white text-sm font-medium">Ver filtros</p>
          <LargeChevronRight />
        </button>
      )}
      <div className="grid grid-cols-3 gap-4 tablet:grid-cols-1">
        {productsWithPagination?.map((product, index) => (
          <ProductCard
            key={`${product.displayName}${index}`}
            product={product}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-8">
        {resultsQuantity > quantityShowed && (
          <div className="flex gap-3">
            {currentPage !== 1 && (
              <div
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center"
              >
                <img
                  src={chevronLeft}
                  alt="Seta apontando para a esquerda"
                  className="cursor-pointer h-[10px] tablet:h-[17px]"
                  onClick={() =>
                    currentPage > 1 && setCurrentPage((prev) => prev - 1)
                  }
                />
              </div>
            )}
            <p className="text-green-800 text-xs">{`${currentPage} de ${totalPageQuantity}`}</p>
            {currentPage !== totalPageQuantity && (
              <div
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center"
              >
                <img
                  src={chevronRight}
                  alt="Seta apontando para a direita"
                  className="cursor-pointer h-[10px] tablet:h-[17px]"
                  onClick={() =>
                    currentPage < totalPageQuantity &&
                    setCurrentPage((prev) => prev + 1)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
