/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, FormEvent } from "react";
import { SearchIcon } from "@/assets/SearchIcon";
import { ProductOCC } from "@/types";
import { useRouter } from "next/navigation";
import { SearchInputProps } from "./types";
import _ from "lodash";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { closeInput, onSearch = () => null } = props;
  const { isMobile } = useScreenWidth();

  const router = useRouter();
  const [recommendations, setRecommendations] = useState<ProductOCC[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getRecommendations = useCallback(
    _.debounce(async (term: string) => {
      const response = await fetch(`/api/search?productName=?Ntt=${term}`);
      const formattedResponse = await response.json();
      if (!!formattedResponse.error) return;
      setRecommendations(formattedResponse.products[0] || []);
    }, 300),
    []
  );

  useEffect(() => {
    getRecommendations(inputValue);
  }, [inputValue]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputValue === "") return;

      router.push(`/plataformas-elevatorias/busca?productName=${inputValue}`);
      onSearch(inputValue);
    },
    [inputValue]
  );

  const handleRecommendationClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleOnBlur = (e: any) => {
    const recommendationsDiv = document.querySelector("#recommendations");

    if (isDescendant(recommendationsDiv, e.relatedTarget)) return;

    closeInput();
  };

  const isDescendant = (parent: Element | null, child: Element) => {
    if (parent === null) return false;

    return parent.contains(child);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full pl-6 h-[90%] flex items-center pt-[6px] pr-3 relative"
      >
        <input
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          onBlur={handleOnBlur}
          className="relative box-border px-3 w-full h-[24px] bg-orange-500 outline-none text-white border-b-[1px] border-white text-sm"
        />
        {recommendations.length > 0 && (
          <div
            id="recommendations"
            className="focus:outline-none shadow-lg absolute top-[58px] w-full pr-9 z-50"
          >
            <div className="rounded-b-lg bg-white px-8 pt-6 pb-3 max-h-[318px] h-full overflow-y-auto">
              {recommendations.map(
                ({ id, brand, displayName, description }, index) => (
                  <div
                    key={id}
                    className="text-start w-full cursor-pointer"
                    onClick={() => handleRecommendationClick(id)}
                  >
                    <p className="px-4 text-green-800 text-sm font-semibold">{`${id} - ${
                      brand ? `${brand} -` : ""
                    } ${displayName}`}</p>
                    <p
                      className={`px-4 text-green-800 text-sm ${
                        recommendations.length - 1 > index &&
                        `border-b-[1px] ${
                          isMobile ? "border-green-800" : "border-gray-200"
                        } mb-6 pb-6`
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
        <button type="submit" className="absolute right-[16px] top-[9px]">
          <SearchIcon color="white" width="16" height="16" />
        </button>
      </form>
    </>
  );
};
