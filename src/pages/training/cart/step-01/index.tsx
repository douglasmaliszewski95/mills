import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { largeOrangeChevronLeft } from "@/assets";
import { Header } from "@/components/shared/Header/Header";
import { Steppers } from "@/components/Cart/Steppers/Steppers";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import OurServices from "@/components/Cart/Step02/OurServices/OurServices";
import { NumberInput } from "@/components/Home/NumberInput/NumberInput";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MultiSelect from "@/components/shared/MultiSelect/MultiSelect";
import { updateParagraphs } from "@/utils/texts";
import _ from "lodash";
import { getCMSContent } from "@/components/Generators/content";
import { transformContentToMobile } from "@/utils/content";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getImageSrc } from "@/utils/images";

export default function TrainingStepOne() {
  const router = useRouter();
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

  const { isMobile } = useScreenWidth();
  const [banner, setBanner] = useState<any>();
  const [contentBase, setContentBase] = useState<any>();

  const formatData = useCallback(
    (contentAux: any) => {
      const content = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      setBanner(content?.["banner_request_quote"]?.[0]);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("solicitar_orcamento");
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
        },
      };
      setCustomServices(newCustomServices);
      return localStorage.setItem(
        "customServices",
        JSON.stringify(newCustomServices)
      );
    }
  }, [customServices]);

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
              {
                name: "Treinamento",
                href: "/treinamento",
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
                    text: "Você pode precisar de alguns dos nossos serviços",
                    active: true,
                    activeMobile: false,
                  },
                  {
                    step: 2,
                    text: "Por favor, confira seus dados ",
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
                  {paymentFlow === "rentalLight" && (
                    <>
                      <OurServices
                        href="/treinamento"
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
                        href="/treinamento"
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
                        href="/treinamento"
                        title="Treinamento Carga e Descarga de Plataformas"
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
                        href="/treinamento"
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
                  onClick={() => router.push("/treinamento/passo-2")}
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
