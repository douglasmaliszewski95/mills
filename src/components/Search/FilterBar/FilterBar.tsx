import { Checkbox } from "@/components/shared/Checkbox/Checkbox";
import { FilterBarProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { LargeChevronLeft } from "@/assets/LargeChevronLeft";
import { SearchIcon } from "@/assets/SearchIcon";
import { FormEvent } from "react";
import Button from "@/components/shared/Button/Button";

export const FilterBar: React.FC<FilterBarProps> = (props) => {
  const {
    filters,
    onSelectFilter,
    setIsFiltersOpen = () => null,
    clearFilters,
    submitFilters = () => null,
  } = props;
  const { isMobile } = useScreenWidth();

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="bg-brown-100/50 basis-1/3 rounded h-fit pb-4 tablet:bg-white">
      {isMobile && (
        <div
          onClick={() => setIsFiltersOpen(false)}
          className="flex px-4 items-baseline gap-2 mt-4 cursor-pointer"
        >
          <LargeChevronLeft color="orange" />
          <p className="text-orange-500 text-sm">Voltar</p>
        </div>
      )}
      <div className="pl-[18px] pr-4 py-7 tablet:px-4">
        <p className="text-green-800 font-semibold mb-2 tablet:mb-4">
          Busca rápida
        </p>
        <form onSubmit={onSearch} className="relative">
          <input
            name="search"
            placeholder="Busque por marca ou modelo"
            className="w-full pr-[32px] rounded border-[1px] focus:outline-none border-orange-500 py-2 tablet:py-4 px-3 tablet:px-4 text-xs text-green-800 bg-transparent"
          />
          <button type="submit" className="absolute right-[8px] top-[25%]">
            <SearchIcon color="#F37021" />
          </button>
        </form>
      </div>
      {filters.map(({ id, title, options }, index) => (
        <div key={id}>
          <p className="text-green-800 font-semibold mb-2 px-[18px]">{title}</p>
          {options.map((option, index) => (
            <div
              key={index}
              className="flex gap-[10px] items-center mb-[10px] px-[18px]"
            >
              <Checkbox
                checked={index % 2 === 0}
                onToggle={() => onSelectFilter(option, index % 2 === 0)}
              />
              <p className="text-sm text-green-800">{option}</p>
            </div>
          ))}
          {index < filters.length - 1 && (
            <hr className="border-t-gray-200 border-t-[1px] mx-[6px] tablet:mx-0 mt-5 mb-3"></hr>
          )}
        </div>
      ))}
      {isMobile && (
        <div className="flex mt-6 justify-between px-4 gap-4">
          <button
            onClick={clearFilters}
            className="text-green-800 text-sm font-medium"
          >
            Limpar filtros
          </button>
          <Button className="grow max-w-[260px]" onClick={submitFilters}>
            <p className="text-sm font-medium py-px">Exibir resultados</p>
          </Button>
        </div>
      )}
    </div>
  );
};
