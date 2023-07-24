/* eslint-disable react-hooks/exhaustive-deps */
import { SearchIcon } from "@/assets/SearchIcon";
import { SearchModalProps } from "./types";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { ProductOCC } from "@/types";
import { Close } from "@/assets/Close";
import _ from "lodash";

export const SearchModal: React.FC<SearchModalProps> = (props) => {
  const { onClose, onSearch = () => null } = props;

  const router = useRouter();
  const [recommendations, setRecommendations] = useState<ProductOCC[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getRecommendations = useCallback(
    _.debounce(async () => {
      const response = await fetch(`/api/search?productName=${inputValue}`);
      const formattedResponse = await response.json();
      if (!!formattedResponse.error) return;
      setRecommendations(formattedResponse.products[0]);
    }, 300),
    []
  );

  useEffect(() => {
    getRecommendations();
  }, [inputValue]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputValue === "") return;

      router.push(`/buscar-equipamento?productName=${inputValue}`);
      onClose();
      onSearch(inputValue);
    },
    [inputValue]
  );

  const handleRecommendationClick = (id: string) => {
    router.push(`/product/${id}`);
    onClose();
  };

  return (
    <>
      <Dialog.Root
        defaultOpen={true}
        onOpenChange={(isOpen) => (!isOpen ? onClose() : null)}
      >
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="p-[18px] h-full w-full data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-transparent">
            <div className="w-full flex flex-col items-end">
              <Dialog.DialogClose>
                <Close />
              </Dialog.DialogClose>
              <form
                onSubmit={handleSubmit}
                className="relative w-full mt-8 mb-3"
              >
                <input
                  autoFocus
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border-b-[1px] pl-[14px] bg-transparent outline-none text-white"
                />
                <button type="submit" className="absolute top-0 right-0">
                  <SearchIcon color="white" width="16" height="16" />
                </button>
              </form>
              {recommendations.length > 0 && (
                <div className="bg-white rounded-lg pt-6 px-4 pb-3 w-full max-h-[77vh] overflow-y-scroll">
                  {recommendations.map((product, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecommendationClick(product.id)}
                      className="w-full cursor-pointer"
                    >
                      <p className="text-green-800 text-sm font-semibold">{`${product.id} - ${product.brand} - ${product.displayName}`}</p>
                      <p
                        className={`text-green-800 text-xs w-full ${
                          recommendations.length - 1 > index &&
                          "border-green-800/100 pb-6 mb-6 border-b"
                        }`}
                      >
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
