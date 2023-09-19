import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Button from "@/components/shared/Button/Button";
import { useEffect, useState } from "react";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { formatCentimetersAndGrams } from "@/utils/metricsTransform";
import { useRouter } from "next/router";

export default function FinalizedBudget() {
  const router = useRouter();
  const { banner } = useGetCMSAssemblyStructure();
  const [customInfos, setCustomInfos] = useState<any>(null);
  const [customServices, setCustomServices] = useState<any>(null);
  const [items, setItems] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const customInfos = localStorage.getItem("customInfos");
    const customServices = localStorage.getItem("customServices");
    const items = localStorage.getItem("items");
    setCustomInfos(customInfos ? JSON.parse(customInfos) : undefined);
    setCustomServices(customServices ? JSON.parse(customServices) : undefined);
    setItems(items ? JSON.parse(items) : undefined);
  }, []);

  const cleanupFunction = () => {
    localStorage.removeItem("customInfos");
    localStorage.removeItem("customServices");
    localStorage.removeItem("items");
  };

  const handleFinishFlux = () => {
    cleanupFunction();
    router.push("/");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

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
            <div className="flex justify-center items-center flex-col w-full font-ibm-font text-green-800">
              <div className="container">
                <div className="flex flex-col items-start my-8 tablet:px-5">
                  <h3 className="font-semibold text-2xl tablet:text-base">
                    Orçamento enviado com sucesso!
                  </h3>
                  <p className="tablet:text-xs">
                    Ficamos felizes ao saber que você se interessou pelos nossos
                    produtos e queremos avisar que, em breve, um de nossos
                    especialistas irá entrar em contato com você. Caso você
                    tenha urgência, ligue gratuitamente para{" "}
                    <a href="#" className="text-orange-500">
                      0800 944 1282.
                    </a>
                  </p>
                </div>
                <div
                  className={`flex flex-col gap-4 justify-start bg-beige-50 rounded-lg py-8 px-12 tablet:px-5`}
                >
                  <div className="flex justify-center w-full bg-beige-100">
                    <p className="text-2xl font-semibold text-center p-4 tablet:text-base tablet:p-3">
                      Número do Orçamento:
                      <br /> {customInfos?.randomNumber}
                    </p>
                  </div>
                  {customInfos && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4 tablet:text-sm">
                        Dados Gerais
                      </h4>
                      <div className="flex gap-24 bg-white rounded p-4 tablet:flex-col tablet:gap-2 tablet:text-xs">
                        <div className="flex flex-col gap-2 ">
                          <p>Nome: {customInfos?.nome}</p>
                          <p>Telefone: {customInfos?.telefone}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p>E-mail: {customInfos?.email}</p>
                          <p>
                            Comentários adicionais:{" "}
                            {customInfos?.additionalComments !== ""
                              ? customInfos?.additionalComments
                              : "-"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p>CNPJ: {customInfos?.cnpj}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {items && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4 tablet:text-sm">
                        Equipamentos selecionados
                      </h4>
                      {items.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            className="flex gap-10 bg-white py-12 px-11 rounded my-6 w-full text-green-800 tablet:flex-col tablet:p-5"
                          >
                            <ImageOCC
                              imageName={item?.fullImageURLs[0]}
                              alt="product_image"
                              className="w-[286px] h-[184px] object-contain"
                            />

                            <div className="flex flex-col gap-2 max-w-[287px]">
                              <p className="font-semibold text-base tablet:text-sm">
                                {item.brand} {item.id}
                              </p>
                              <p className="font-semibold text-base tablet:text-sm">
                                {item.displayName}
                              </p>
                            </div>
                            <div>
                              <p className="font-normal text-sm tablet:text-xs">
                                Altura de Trabalho:
                                {formatCentimetersAndGrams(item.height)} m
                                <br />
                                Alcance Horizontal: {
                                  item.x_alcanceHorizontalM
                                }{" "}
                                m
                                <br />
                                Peso: {formatCentimetersAndGrams(
                                  item.x_peso
                                )}{" "}
                                kg
                                <br />
                                Emissão Média: {item.x_emissoMdiaKgDeCOH} Kg de
                                CO2 por hora
                              </p>
                            </div>

                            <div>
                              <p className="font-normal text-sm tablet:text-xs">
                                Tempo de aluguel: {item?.timeToLocale}{" "}
                                {item?.typeToLocale}
                                <br />
                                Quantidade: {item?.quantity}
                                <br />
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {customServices && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4 tablet:text-sm">
                        Outros serviços selecionados
                      </h4>
                      <div className="flex flex-col gap-2 tablet:text-xs">
                        {customServices?.shipping?.checked && (
                          <div className="flex gap-24 bg-white rounded p-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">
                                Frete Mills - Serviço de Entrega e Devolução de
                                Equipamentos
                              </h3>
                              <p>
                                {customServices?.shipping?.state},{" "}
                                {customServices?.shipping?.city}
                              </p>
                            </div>
                          </div>
                        )}
                        {customServices?.operationTraining?.checked && (
                          <div className="flex gap-24 bg-white rounded p-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">
                                Treinamento Operação Mills: Certificação
                                Nacional
                              </h3>
                              <p>
                                Quantidade de operadores:
                                {customServices?.operationTraining?.quantity}
                              </p>
                            </div>
                          </div>
                        )}
                        {customServices?.ipafTraining?.checked && (
                          <div className="flex gap-24 bg-white rounded p-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">
                                Treinamento Operação IPAF: Certificação Nacional
                              </h3>
                              <p>
                                Quantidade de operadores:
                                {customServices?.ipafTraining?.quantity}
                              </p>
                            </div>
                          </div>
                        )}
                        {customServices?.loadingUnloadingOperationQuantity
                          ?.checked && (
                          <div className="flex gap-24 bg-white rounded p-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">
                                Treinamento Carga e Desgarga de Plataformas
                              </h3>
                              <p>
                                Quantidade de operadores:
                                {
                                  customServices
                                    ?.loadingUnloadingOperationQuantity
                                    ?.quantity
                                }
                              </p>
                            </div>
                          </div>
                        )}
                        {customServices?.seatBeltTraining?.checked && (
                          <div className="flex gap-24 bg-white rounded p-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">
                                Treinamento: Uso do cinto de segurança e
                                inspeção
                              </h3>
                              <p>
                                Quantidade de operadores:
                                {customServices?.seatBeltTraining?.quantity}
                              </p>
                            </div>
                          </div>
                        )}
                        {customServices?.accessoriesAndImplements?.checked && (
                          <div className="flex gap-24 bg-white rounded p-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">
                                Acessórios e Implementos
                              </h3>
                              <div>
                                {customServices?.accessoriesAndImplements
                                  ?.backhoeLoader.length && (
                                  <div>
                                    <h4 className="font-semibold text-sm mt-4 mb-2">
                                      Retroescavadeira
                                    </h4>
                                    <div className="flex flex-row gap-1">
                                      {customServices?.accessoriesAndImplements?.backhoeLoader.map(
                                        (item: string[], index: number) => {
                                          return (
                                            <label
                                              key={index}
                                              className="border border-orange-500 rounded py-1 px-2 text-center"
                                            >
                                              {item}
                                            </label>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                )}
                                {customServices?.accessoriesAndImplements
                                  ?.smallLoader.length && (
                                  <div>
                                    <h4 className="font-semibold text-sm mt-4 mb-2">
                                      Retroescavadeira
                                    </h4>
                                    <div className="flex flex-row gap-1">
                                      {customServices?.accessoriesAndImplements?.smallLoader.map(
                                        (item: string[], index: number) => {
                                          return (
                                            <label
                                              key={index}
                                              className="border border-orange-500 rounded py-1 px-2 text-center"
                                            >
                                              {item}
                                            </label>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="flex justify-end mt-7">
                <Button
                  className="w-[258px]"
                  onClick={() => handleFinishFlux()}
                >
                  Novo orçamento
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
