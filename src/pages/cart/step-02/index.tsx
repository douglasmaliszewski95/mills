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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MultiSelect from "@/components/shared/MultiSelect/MultiSelect";

export default function StepTwo() {
  const router = useRouter();
  const { banner } = useGetCMSAssemblyStructure();
  const [customServices, setCustomServices] = useState<any>(null);
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
        },
      };
      setCustomServices(newCustomServices);
      return localStorage.setItem(
        "customServices",
        JSON.stringify(newCustomServices)
      );
    }
  }, [customServices]);

  const STATE_OPTIONS = ["SP", "MG"];

  const options = [
    { id: "Ancinho frontal", label: "Ancinho frontal" },
    {
      id: "Braço movimentador de big-bag",
      label: "Braço movimentador de big-bag",
    },
    {
      id: "Braço para levantamento de cargas",
      label: "Braço para levantamento de cargas",
    },
    { id: "Caçamba de descarga lateral", label: "Caçamba de descarga lateral" },
    { id: "Caçambas especiais", label: "Caçambas especiais" },
    { id: "Garfo para pallets", label: "Garfo para pallets" },
    {
      id: "Garra para manipulação de madeira",
      label: "Garra para manipulação de madeira",
    },
    { id: "Lâmina frontal", label: "Lâmina frontal" },
    { id: "Trado", label: "Trado" },
  ];

  const miniOptions = [
    { id: "Caçambas especiais", label: "Caçambas especiais" },
    {
      id: "Destocador e triturador de madeira",
      label: "Destocador e triturador de madeira",
    },
    { id: "Fresadora de pavimento", label: "Fresadora de pavimento" },
    { id: "Ancinho frontal", label: "Ancinho frontal" },
    { id: "Garfo para pallets", label: "Garfo para pallets" },
    {
      id: "Garra para manipulação de madeira",
      label: "Garra para manipulação de madeira",
    },
    { id: "Lâmina frontal", label: "Lâmina frontal" },
    { id: "Roçadeira frontal", label: "Roçadeira frontal" },
    { id: "Rompedor hidráulico", label: "Rompedor hidráulico" },
    { id: "Trado", label: "Trado" },
    { id: "Valetadeira", label: "Valetadeira" },
    { id: "Vassoura coletora", label: "Vassoura coletora" },
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
    }
  };

  const handleMultiSelectChange = (newSelectedOptions: string[]) => {
    const existingOptions =
      customServices.accessoriesAndImplements.backhoeLoader;

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

  const handleMultiSelectChangeSmallLoader = (newSelectedOptions: string[]) => {
    const existingOptions = customServices.accessoriesAndImplements.smallLoader;

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
            title={"Solicitar orçamento"}
            backgroundImage={banner?.src}
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
                    <div className="flex gap-10 tablet:flex-col">
                      <div className="grow max-w-[300px]">
                        <label className="text-sm text-green-800 mb-3">
                          Para qual estado ?
                        </label>
                        <InputSelector
                          name="state"
                          options={STATE_OPTIONS}
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
                          options={STATE_OPTIONS}
                          watch={(value: any) =>
                            customServices?.shipping?.city === ""
                              ? "Selecione um estado"
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
                              ? "Selecione um estado"
                              : customServices?.shipping?.city
                          }
                          disabled={
                            customServices?.shipping?.state ? false : true
                          }
                        />
                      </div>
                    </div>
                  </OurServices>
                  {paymentFlow === "rentalLight" && (
                    <>
                      <OurServices
                        title="Treinamento Operação Mills: Certificação Nacional"
                        tooltipText="O operador estará devidamente habilitado para manusear o equipamento, seguindo normas vigentes como NR 18, NBR 16776 e NR 35. Certificado com validade nacional."
                        onClick={() =>
                          handleAddOrChangeCustomServices(
                            "operationTraining",
                            !customServices?.operationTraining.checked,
                            "checked"
                          )
                        }
                        checked={customServices?.operationTraining?.checked}
                      >
                        <div className="flex items-center align-middle gap-10 tablet:flex-col tablet:items-start">
                          <label className="text-sm text-green-800">
                            Quantidade de operadores
                          </label>
                          <NumberInput
                            value={customServices?.operationTraining?.quantity}
                            setValue={(value: any) =>
                              handleAddOrChangeCustomServices(
                                "operationTraining",
                                value,
                                "quantity"
                              )
                            }
                          />
                        </div>
                      </OurServices>
                      <OurServices
                        title="Treinamento Operação IPAF: Certificação Nacional"
                        tooltipText="Treinamento especializado para as categorias 3A e 3B, permitindo o manuseio de todos os modelos e fabricantes. Certificado com validade internacional."
                        onClick={() =>
                          handleAddOrChangeCustomServices(
                            "ipafTraining",
                            !customServices?.ipafTraining.checked,
                            "checked"
                          )
                        }
                        checked={customServices?.ipafTraining?.checked}
                      >
                        <div className="flex items-center align-middle gap-10 tablet:flex-col tablet:items-start">
                          <label className="text-sm text-green-800">
                            Quantidade de operadores
                          </label>
                          <NumberInput
                            value={customServices?.ipafTraining?.quantity}
                            setValue={(value: any) =>
                              handleAddOrChangeCustomServices(
                                "ipafTraining",
                                value,
                                "quantity"
                              )
                            }
                          />
                        </div>
                      </OurServices>
                      <OurServices
                        title="Treinamento Carga e Desgarga de Plataformas"
                        tooltipText="Instrução em procedimentos corretos de segurança para a carga, descarga e fixação de plataformas, antes ou depois do transporte rodoviário."
                        onClick={() =>
                          handleAddOrChangeCustomServices(
                            "loadingUnloadingOperationQuantity",
                            !customServices?.loadingUnloadingOperationQuantity
                              .checked,
                            "checked"
                          )
                        }
                        checked={
                          customServices?.loadingUnloadingOperationQuantity
                            ?.checked
                        }
                      >
                        <div className="flex items-center align-middle gap-10 tablet:flex-col tablet:items-start">
                          <label className="text-sm text-green-800">
                            Quantidade de operadores
                          </label>
                          <NumberInput
                            value={
                              customServices?.loadingUnloadingOperationQuantity
                                ?.quantity
                            }
                            setValue={(value: any) =>
                              handleAddOrChangeCustomServices(
                                "loadingUnloadingOperationQuantity",
                                value,
                                "quantity"
                              )
                            }
                          />
                        </div>
                      </OurServices>
                      <OurServices
                        title="Treinamento: Uso do cinto de segurança e inspeção"
                        tooltipText="Instrução para o usuário inspecionar, selecionar e usar corretamente o cinto e outros equipamentos com segurança quando operando uma plataforma de acesso em altura."
                        onClick={() =>
                          handleAddOrChangeCustomServices(
                            "seatBeltTraining",
                            !customServices?.seatBeltTraining.checked,
                            "checked"
                          )
                        }
                        checked={customServices?.seatBeltTraining?.checked}
                      >
                        <div className="flex items-center align-middle gap-10 tablet:flex-col tablet:items-start">
                          <label className="text-sm text-green-800">
                            Quantidade de operadores
                          </label>
                          <NumberInput
                            value={customServices?.seatBeltTraining?.quantity}
                            setValue={(value: any) =>
                              handleAddOrChangeCustomServices(
                                "seatBeltTraining",
                                value,
                                "quantity"
                              )
                            }
                          />
                        </div>
                      </OurServices>
                    </>
                  )}
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
                          <div className="flex flex-col gap-1">
                            <h2 className="text-green-800 font-semibold mb-5">
                              Retroescavadeira
                            </h2>
                            <label className="text-sm text-green-800 mb-3">
                              Escolha o(s) acessório(s) ou implemento(s)
                            </label>
                            <MultiSelect
                              options={options}
                              selectedOptions={
                                customServices?.accessoriesAndImplements
                                  ?.backhoeLoader
                              }
                              onChange={handleMultiSelectChange}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h2 className="text-green-800 font-semibold mb-5">
                              Minicarregadeira
                            </h2>
                            <label className="text-sm text-green-800 mb-3">
                              Escolha o(s) acessório(s) ou implemento(s)
                            </label>
                            <MultiSelect
                              options={miniOptions}
                              selectedOptions={
                                customServices?.accessoriesAndImplements
                                  ?.smallLoader
                              }
                              onChange={handleMultiSelectChangeSmallLoader}
                            />
                          </div>
                        </div>
                      </OurServices>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="flex justify-between mt-7 tablet:flex-col-reverse tablet:items-center tablet:gap-5">
                <a
                  className="flex items-center w-[55px]"
                  href="/carrinho/passo-01"
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
                </a>
                <Button
                  className="w-[258px]"
                  onClick={() => router.push("/carrinho/passo-03")}
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
