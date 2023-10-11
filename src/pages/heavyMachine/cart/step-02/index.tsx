import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { largeOrangeChevronLeft } from "@/assets";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { Steppers } from "@/components/Cart/Steppers/Steppers";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import OurServices from "@/components/Cart/Step02/OurServices/OurServices";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { NumberInput } from "@/components/Home/NumberInput/NumberInput";
import { getStates, getCities } from "@brazilian-utils/brazilian-utils";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MultiSelect from "@/components/shared/MultiSelect/MultiSelect";
import { updateParagraphs } from "@/utils/texts";
import _ from "lodash";
import { getCMSContent } from "@/components/Generators/content";
import { transformContentToMobile } from "@/utils/content";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getImageSrc } from "@/utils/images";
import { InputStateSelector } from "@/components/shared/InputSelector/InputStateSelector";

interface Item {
  id: string;
  fullImageURLs: string;
  primaryFullImageURL: string;
  brand: string;
  displayName: string;
  height: number;
  x_alcanceHorizontalM: number;
  x_peso: number;
  x_cabine: string;
  x_potenciaDoMotor: number;
  x_pesoOperacional: number;
  x_emissoMdiaKgDeCOH: number;
  localUtility?: string;
  timeToLocale?: number;
  typeToLocale?: string;
  paymentFlow?: "rentalLight" | "rentalHeavy";
  quantity?: number;
}
import { useGetPerformanceMap } from "@/components/PerformanceMap/useGetPerformanceMap";
import Link from "next/link";

export default function StepTwo() {
  const router = useRouter();
  const [customServices, setCustomServices] = useState<any>(null);
  const [states, setStates] = useState(getStates());
  const [citites, setCities] = useState(getCities("SP"));
  const [paymentFlow, setPaymentFlow] = useState<string>("rentalLight");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const customServices = localStorage.getItem("customServices");
    const flow = localStorage.getItem("paymentFlow") ?? "";
    setPaymentFlow(flow);
    setCustomServices(customServices ? JSON.parse(customServices) : undefined);
  }, []);

  const { isMobile } = useScreenWidth();
  const [banner, setBanner] = useState<any>();
  const [items, setItems] = useState<string[]>([]);
  const [contentBase, setContentBase] = useState<any>();

  const getParentCategoriesProduct = () => {
    const storedItems = localStorage.getItem("items");
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    const arr: string[] = [];

    if (parsedItems) {
      parsedItems?.map((item: any) => {
        arr.push(item?.parentCategory?.repositoryId?.toLowerCase());
      });
    }

    setItems(arr);
  };

  const formatData = useCallback(
    (contentAux: any) => {
      const content = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      setBanner(content?.["banner_request_quote_heavy"]?.[0]);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("solicitar_orcamento_pesados");
        setContentBase(contentAux);
        formatData(contentAux);
      } else {
        formatData({ ...contentBase });
      }
    };
    getContent();
  }, [formatData]);

  useEffect(() => {
    updateParagraphs();
    getParentCategoriesProduct();
  }, [banner]);

  useEffect(() => {
    if (customServices === undefined) {
      const newCustomServices = {
        shipping: {
          checked: false,
          state: "",
          city: "",
        },
        operationTraining: { checked: false, quantity: 0 },
        ipafTraining: { checked: false, quantity: 0 },
        loadingUnloadingOperationQuantity: { checked: false, quantity: 0 },
        seatBeltTraining: { checked: false, quantity: 0 },
        accessoriesAndImplements: {
          checked: false,
          backhoeLoader: [],
          smallLoader: [],
          excavator: [],
          loader: [],
        },
        trucks: { checked: false },
      };
      setCustomServices(newCustomServices);
      return localStorage.setItem(
        "customServices",
        JSON.stringify(newCustomServices)
      );
    }
  }, [customServices]);

  const equipamentos = [
    {
      id: "loader",
      categoria: "Carregadeira",
      items: [
        {
          id: "Ancinho frontal",
          label: "Ancinho frontal",
        },
        {
          id: "Braço movimentador de big-bag",
          label: "Braço movimentador de big-bag",
        },
        {
          id: "Braço para levantamento de cargas",
          label: "Braço para levantamento de cargas",
        },
        {
          id: "Caçamba de descarga lateral",
          label: "Caçamba de descarga lateral",
        },
        {
          id: "Caçambas especiais",
          label: "Caçambas especiais",
        },
        {
          id: "Garfo para pallets",
          label: "Garfo para pallets",
        },
        {
          id: "Garra para manipulação de madeira",
          label: "Garra para manipulação de madeira",
        },
        {
          id: "Lâmina frontal",
          label: "Lâmina frontal",
        },
        {
          id: "Trado",
          label: "Trado",
        },
      ],
    },
    {
      id: "excavator",
      categoria: "Escavadeiras",
      items: [
        {
          id: "Braço de longo alcance",
          label: "Braço de longo alcance",
        },
        {
          id: "Cabeçote florestal",
          label: "Cabeçote florestal",
        },
        {
          id: "Caçambas especiais",
          label: "Caçambas especiais",
        },
        {
          id: "Garra de demolição",
          label: "Garra de demolição",
        },
        {
          id: "Garra traçadora",
          label: "Garra traçadora",
        },
        {
          id: "Imã para sucatas",
          label: "Imã para sucatas",
        },
        {
          id: "Pinça para madeira",
          label: "Pinça para madeira",
        },
        {
          id: "Pinça para sucatas",
          label: "Pinça para sucatas",
        },
        {
          id: "Placa compactadora",
          label: "Placa compactadora",
        },
        {
          id: "Rompedor hidráulico",
          label: "Rompedor hidráulico",
        },
        {
          id: "Rompedor hidráulico",
          label: "Rompedor hidráulico",
        },
      ],
    },
    {
      id: "smallLoader",
      categoria: "Minicarregadeira",
      items: [
        {
          id: "Caçambas especiais",
          label: "Caçambas especiais",
        },
        {
          id: "Destocador e triturador de madeira",
          label: "Destocador e triturador de madeira",
        },
        {
          id: "Fresadora de pavimento",
          label: "Fresadora de pavimento",
        },
        {
          id: "Garfo para pallets",
          label: "Garfo para pallets",
        },
        {
          id: "Garra para manipulação de madeira",
          label: "Garra para manipulação de madeira",
        },
        {
          id: "Lâmina frontal",
          label: "Lâmina frontal",
        },
        {
          id: "Roçadeira frontal",
          label: "Roçadeira frontal",
        },
        {
          id: "Rompedor hidráulico",
          label: "Rompedor hidráulico",
        },
        {
          id: "Trado",
          label: "Trado",
        },
        {
          id: "Valetadeira",
          label: "Valetadeira",
        },
        {
          id: "Vassoura coletora",
          label: "Vassoura coletora",
        },
      ],
    },
    {
      id: "backhoeLoader",
      categoria: "Retroescavadeira",
      items: [
        {
          id: "Ancinho frontal",
          label: "Ancinho frontal",
        },
        {
          id: "Braço movimentador de big-bag",
          label: "Braço movimentador de big-bag",
        },
        {
          id: "Braço para levantamento de cargas",
          label: "Braço para levantamento de cargas",
        },
        {
          id: "Caçambas especiais",
          label: "Caçambas especiais",
        },
        {
          id: "Garfo para pallets",
          label: "Garfo para pallets",
        },
        {
          id: "Garra para manipulação de madeira",
          label: "Garra para manipulação de madeira",
        },
        {
          id: "Lâmina frontal",
          label: "Lâmina frontal",
        },
        {
          id: "Pinça para madeira",
          label: "Pinça para madeira",
        },
        {
          id: "Placa compactadora",
          label: "Placa compactadora",
        },
        {
          id: "Roçadeira articulada",
          label: "Roçadeira articulada",
        },
        {
          id: "Rompedor hidráulico",
          label: "Rompedor hidráulico",
        },
        {
          id: "Trado",
          label: "Trado",
        },
      ],
    },
  ];

  const handleAddOrChangeCustomServices = async (
    name: string,
    value: any,
    property: string
  ) => {
    if (customServices.hasOwnProperty(name)) {
      const updatedCustomServices = {
        ...customServices,
        [name]: {
          ...customServices[name],
          [property]: value,
        },
      };

      setCustomServices(updatedCustomServices);
      localStorage.setItem(
        "customServices",
        JSON.stringify(updatedCustomServices)
      );

      setCities(getCities(value));
    }
  };

  const handleMultiSelectChange = (newSelectedOptions: string[]) => {
    const existingOptions = newSelectedOptions;

    const updatedOptions = existingOptions.reduce(
      (accumulator: any, option: any) => {
        if (!newSelectedOptions.includes(option)) {
          accumulator.push(option);
        }
        return accumulator;
      },
      newSelectedOptions
    );

    handleAddOrChangeCustomServices(
      "accessoriesAndImplements",
      updatedOptions,
      "backhoeLoader"
    );
  };

  const handleExcavatorSelectChange = (newSelectedOptions: string[]) => {
    const existingOptions = newSelectedOptions;

    const updatedOptions = existingOptions.reduce(
      (accumulator: any, option: any) => {
        if (!newSelectedOptions.includes(option)) {
          accumulator.push(option);
        }
        return accumulator;
      },
      newSelectedOptions
    );

    handleAddOrChangeCustomServices(
      "accessoriesAndImplements",
      updatedOptions,
      "excavator"
    );
  };

  const handleLoaderSelectChange = (newSelectedOptions: string[]) => {
    const existingOptions = newSelectedOptions;

    const updatedOptions = existingOptions.reduce(
      (accumulator: any, option: any) => {
        if (!newSelectedOptions.includes(option)) {
          accumulator.push(option);
        }
        return accumulator;
      },
      newSelectedOptions
    );

    handleAddOrChangeCustomServices(
      "accessoriesAndImplements",
      updatedOptions,
      "loader"
    );
  };

  const handleMultiSelectChangeSmallLoader = (newSelectedOptions: string[]) => {
    const existingOptions = newSelectedOptions;

    const updatedOptions = existingOptions.reduce(
      (accumulator: any, option: any) => {
        if (!newSelectedOptions.includes(option)) {
          accumulator.push(option);
        }
        return accumulator;
      },
      newSelectedOptions
    );

    handleAddOrChangeCustomServices(
      "accessoriesAndImplements",
      updatedOptions,
      "smallLoader"
    );
  };

  return (
    isClient && (
      <>
        <Header theme={localStorage.getItem("paymentFlow") ?? ""} />
        <main className="h-full bg-white w-full font-ibm-font">
          <Banner
            linkList={[
              {
                name: "Home",
                href: "/",
              },
              { name: "Solicitar orçamento", href: "#" },
            ]}
            title={banner?.fields?.content_title}
            backgroundImage={getImageSrc(banner?.fields)}
          />
          <div className="flex flex-col items-center ">
            <div className="my-8">
              <Steppers
                steps={[
                  {
                    step: 1,
                    text: "Qual o tipo de equipamento você precisa?",
                    active: true,
                    activeMobile: false,
                  },
                  {
                    step: 2,
                    text: "Você pode precisar de alguns dos nossos serviços",
                    active: true,
                    activeMobile: true,
                  },
                  {
                    step: 3,
                    text: "Por favor, confira seus dados",
                    active: false,
                    activeMobile: false,
                  },
                ]}
              />
            </div>
            <div className="flex justify-center items-center flex-col w-full font-ibm-font">
              <div className="container">
                <div
                  className={`flex flex-col gap-4 justify-start bg-beige-50 rounded-lg py-8 px-12 tablet:px-5 tablet:text-sm`}
                >
                  <OurServices
                    title="Frete Mills - Serviço de Entrega e Devolução de Equipamentos"
                    tooltipText="Além do aluguel do equipamento, nós também cuidamos da
                      entrega e devolução. Conte com o Frete Mills para
                      simplificar ainda mais seu dia a dia."
                    onClick={() =>
                      handleAddOrChangeCustomServices(
                        "shipping",
                        !customServices?.shipping.checked,
                        "checked"
                      )
                    }
                    checked={customServices?.shipping?.checked}
                  >
                    {/* Inicio */}
                    <div className="flex gap-10 tablet:flex-col">
                      <div className="grow max-w-[300px]">
                        <label className="text-sm text-green-800 mb-3">
                          Para qual estado ?
                        </label>
                        <InputStateSelector
                          name="state"
                          options={states}
                          watch={(value: any) =>
                            customServices?.shipping?.state === ""
                              ? "Selecione um estado"
                              : customServices?.shipping?.state
                          }
                          setValue={(name, value) =>
                            handleAddOrChangeCustomServices(
                              "shipping",
                              value,
                              "state"
                            )
                          }
                          placeholder={
                            customServices?.shipping?.state ??
                            "Selecione um estado"
                          }
                        />
                      </div>
                      <div className="grow max-w-[300px]">
                        <label className="text-sm text-green-800 mb-3">
                          Para qual cidade ?
                        </label>
                        <InputSelector
                          name="city"
                          options={citites}
                          watch={(value: any) =>
                            customServices?.shipping?.city === ""
                              ? "Selecione uma cidade"
                              : customServices?.shipping?.city
                          }
                          setValue={(name, value) =>
                            handleAddOrChangeCustomServices(
                              "shipping",
                              value,
                              "city"
                            )
                          }
                          placeholder={
                            customServices?.shipping?.city === ""
                              ? "Selecione uma cidade"
                              : customServices?.shipping?.city
                          }
                          disabled={
                            customServices?.shipping?.state ? false : true
                          }
                        />
                      </div>
                    </div>
                    {/* Fim */}
                  </OurServices>
                  {paymentFlow === "rentalHeavy" && (
                    <>
                      <OurServices
                        title="Acessórios e Implementos"
                        tooltipText="A Mills, além do aluguel das máquinas pesadas, também oferece implementos e acessórios para aumentar a produtividade das suas atividades."
                        onClick={() =>
                          handleAddOrChangeCustomServices(
                            "accessoriesAndImplements",
                            !customServices?.accessoriesAndImplements.checked,
                            "checked"
                          )
                        }
                        checked={
                          customServices?.accessoriesAndImplements?.checked
                        }
                      >
                        <div className="flex flex-col align-middle gap-10 tablet:items-start">
                          {equipamentos.map((equip: any) => {
                            return (
                              <>
                                {items.map((item: string) => (
                                  <>
                                    {equip.id === "backhoeLoader" &&
                                      item.includes("retroescavadeira") && (
                                        <div className="flex flex-col gap-1">
                                          <h2 className="text-green-800 font-semibold mb-5">
                                            {equip?.categoria}
                                          </h2>
                                          <label className="text-sm text-green-800 mb-3">
                                            Escolha o(s) acessório(s) ou
                                            implemento(s)
                                          </label>
                                          <MultiSelect
                                            options={equip?.items}
                                            selectedOptions={
                                              customServices
                                                ?.accessoriesAndImplements
                                                ?.backhoeLoader
                                            }
                                            onChange={handleMultiSelectChange}
                                          />
                                        </div>
                                      )}

                                    {equip.id === "smallLoader" &&
                                      item.includes("minicarregadeira") && (
                                        <div className="flex flex-col gap-1">
                                          <h2 className="text-green-800 font-semibold mb-5">
                                            {equip?.categoria}
                                          </h2>
                                          <label className="text-sm text-green-800 mb-3">
                                            Escolha o(s) acessório(s) ou
                                            implemento(s)
                                          </label>
                                          <MultiSelect
                                            options={equip?.items}
                                            selectedOptions={
                                              customServices
                                                ?.accessoriesAndImplements
                                                ?.smallLoader
                                            }
                                            onChange={
                                              handleMultiSelectChangeSmallLoader
                                            }
                                          />
                                        </div>
                                      )}

                                    {equip.id === "excavator" &&
                                      item.includes("escavadeira") && (
                                        <div className="flex flex-col gap-1">
                                          <h2 className="text-green-800 font-semibold mb-5">
                                            {equip?.categoria}
                                          </h2>
                                          <label className="text-sm text-green-800 mb-3">
                                            Escolha o(s) acessório(s) ou
                                            implemento(s)
                                          </label>
                                          <MultiSelect
                                            options={equip?.items}
                                            selectedOptions={
                                              customServices
                                                ?.accessoriesAndImplements
                                                ?.excavator
                                            }
                                            onChange={
                                              handleExcavatorSelectChange
                                            }
                                          />
                                        </div>
                                      )}

                                    {equip.id === "loader" &&
                                      item.includes("carregadeira") && (
                                        <div className="flex flex-col gap-1">
                                          <h2 className="text-green-800 font-semibold mb-5">
                                            {equip?.categoria}
                                          </h2>
                                          <label className="text-sm text-green-800 mb-3">
                                            Escolha o(s) acessório(s) ou
                                            implemento(s)
                                          </label>
                                          <MultiSelect
                                            options={equip?.items}
                                            selectedOptions={
                                              customServices
                                                ?.accessoriesAndImplements
                                                ?.loader
                                            }
                                            onChange={handleLoaderSelectChange}
                                          />
                                        </div>
                                      )}
                                  </>
                                ))}
                              </>
                            );
                          })}
                        </div>
                      </OurServices>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="flex justify-between mt-7 tablet:flex-col-reverse tablet:items-center tablet:gap-5">
                <Link
                  className="flex items-center w-[55px]"
                  href="/maquinas-pesadas/carrinho/passo-01"
                >
                  <Image
                    src={largeOrangeChevronLeft}
                    height={8}
                    width={12}
                    alt="chevron left"
                    className="tablet:hidden"
                  />
                  <span className="font-semibold text-orange-500 ml-2">
                    Voltar
                  </span>
                </Link>
                <Button
                  className="w-[258px]"
                  onClick={() =>
                    router.push("/maquinas-pesadas/carrinho/passo-03")
                  }
                >
                  Avançar
                </Button>
              </div>
            </div>
          </div>

          <MachinesAndPlatforms />
        </main>
        <Footer />
      </>
    )
  );
}
