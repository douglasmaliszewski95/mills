import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/shared/Button/Button";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { useForm } from "react-hook-form";
import pinMarker from "@/assets/pinMarker.svg";

export const SearchDialog = ({ listOfMarkers, uniqueStates }: any) => {
  const [stateList, setStateList] = useState<any>([]);
  const [cityList, setCityList] = useState<any>([]);
  const { handleSubmit, watch, setValue } = useForm();
  const selectedState: any = watch("state");
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    if (selectedState) {
      setValue("local", "");
      const UF = selectedState.split(" - ")[0];
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/distritos`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados.");
          }
          return response.json();
        })
        .then((data) => {
          const cityList: string[] = data
            .filter((item: any) => {
              const hasOnMarkers = listOfMarkers.some((marker: any) => {
                return marker.unitInfo.name === `${UF}, ${item.nome}`;
              });
              return hasOnMarkers;
            })
            .map((item: any) => item.nome);

          setCityList(cityList.sort());
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedState]);

  useEffect(() => {
    setList(listOfMarkers);
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados.");
        }
        return response.json();
      })
      .then((data) => {
        const stateList: string[] = [];
        data.forEach((item: any) => {
          if (uniqueStates.includes(item.sigla)) {
            stateList.push(`${item.sigla} - ${item.nome}`);
          }
        });
        setStateList(stateList.sort());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onSubmit = (data: any) => {
    if (data?.state && data?.local) {
      const UF = data.state.split(" - ")[0];
      const city = data.local ?? "";
      const filteredMarkers = listOfMarkers.filter((item: any) => {
        return item.unitInfo.name === `${UF}, ${city}`;
      });
      setList(filteredMarkers);
    }
  };

  const showButton = () => {
    const local = watch("local");
    const state = watch("state");

    if (local !== "" && state !== "") return true;
    return false;
  };

  const clearFields = () => {
    setValue("local", "");
    setValue("state", "");
    setList(listOfMarkers);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          className="tablet:w-full tablet:text-sm max-w-[260px] tablet:max-w-none w-full"
          size="large"
        >
          Buscar unidades
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className={`data-[state=open]:animate-contentShow fixed ${
            list.length <= 1 ? "top-[40%]" : "top-[50%]"
          } left-[50%] max-h-[750px] w-[90vw] max-w-[1013px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 tablet:w-full tablet:max-h-full`}
        >
          <Dialog.Title className="text-2xl text-green-800 font-semibold p-10 tablet:text-base">
            Encontre a unidade mais próxima de você
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex p-9 bg-beige-200 gap-8 tablet:flex-col tablet:p-4"
          >
            <div className="basis-5/12 tablet:w-full">
              <InputSelector
                name="state"
                watch={watch}
                options={stateList}
                setValue={setValue}
                placeholder="Selecione o estado"
              />
            </div>
            <div className="basis-5/12 tablet:w-full">
              <InputSelector
                name="local"
                watch={watch}
                options={cityList}
                setValue={setValue}
                placeholder="Selecione a cidade"
              />
            </div>
            <div className="basis-3/12 tablet:w-full tablet:mt-[-10px]">
              <Button
                className={`w-full ${
                  showButton() ? "bg-orange-500" : "bg-orange-500/20"
                }`}
                size="large"
              >
                Buscar
              </Button>
            </div>
          </form>
          <div className="px-10 overflow-auto max-h-[500px] tablet:px-4">
            {list.length === 0 && (
              <div className="flex items-center align-middle justify-center w-full h-32">
                <p className="font-ibm-font text-lg text-green-800">
                  Nenhuma unidade encontrada.
                </p>
              </div>
            )}
            {list.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-start gap-4 py-7 font-ibm-font text-lg text-green-800 border-b border-green-800"
                >
                  <img
                    src={pinMarker.src}
                    alt="pin marker"
                    className="w-[36px] tablet:w-[25px]"
                  />
                  <div className="tablet:text-xs">
                    <p className="font-semibold">{item.unitInfo.name}</p>
                    <p>{item.unitInfo.address}</p>
                    <div className="flex flex-row items-end gap-2 mt-2 tablet:flex-col tablet:items-start">
                      <a
                        className="text-sm text-orange-500 underline decoration-solid"
                        href={item.unitInfo.href}
                      >
                        Saiba mais sobre esta unidade
                      </a>
                      {item.freeDelivery && (
                        <div className="flex justify-center  border border-green-800 rounded-sm max-w-[161px] text-xs uppercase p-1">
                          <p>Frete Mills Disponível</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
              aria-label="Close"
              onClick={() => clearFields()}
            >
              <p className="text-2xl text-orange-500">x</p>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
