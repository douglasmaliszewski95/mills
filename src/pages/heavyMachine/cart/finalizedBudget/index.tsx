import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Button from "@/components/shared/Button/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { formatCentimetersAndGrams } from "@/utils/metricsTransform";
import { useRouter } from "next/router";
import { updateParagraphs } from "@/utils/texts";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { transformContentToMobile } from "@/utils/content";
import { getCMSContent } from "@/components/Generators/content";
import _ from "lodash";
import { getImageSrc } from "@/utils/images";
import downloadIcon from "@/assets/download.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function FinalizedBudget() {
  const router = useRouter();
  const [customInfos, setCustomInfos] = useState<any>(null);
  const [customServices, setCustomServices] = useState<any>(null);
  const [items, setItems] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  const mobileRef = useRef<any>(null);
  const desktopRef = useRef<any>(null);

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
    router.push("/maquinas-pesadas");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [banner]);

  const downloadOrder = () => {
    const input = isMobile ? mobileRef.current : desktopRef.current;

    const contentWidth = isMobile ? 1200 : input.offsetWidth;
    const contentHeight = input.offsetHeight;

    const pdfWidth = 210;
    const pdfHeight = (contentHeight / contentWidth) * pdfWidth;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        format: "a4",
        unit: "mm",
        orientation: "portrait",
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("orcamento.pdf");
    });
  };

  return (
    <>
      <Header theme={isClient ? localStorage.getItem("paymentFlow") : ""} />
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
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center flex-col w-full font-ibm-font text-green-800">
            <div className="container">
              <div className="flex flex-col items-start my-8 tablet:px-5">
                <h3 className="font-semibold text-2xl tablet:text-base">
                  Orçamento enviado com sucesso!
                </h3>
                <p className="tablet:text-xs">
                  Ficamos felizes ao saber que você se interessou pelos nossos
                  produtos e queremos avisar que, em breve, um de nossos
                  especialistas irá entrar em contato com você. Caso você tenha
                  urgência, ligue gratuitamente para{" "}
                  <a
                    href="#"
                    className="text-orange-500 underline underline-offset-2"
                  >
                    0800 944 1282.
                  </a>
                </p>
              </div>
              <div className="flex pb-8 tablet:pb-3 justify-between  tablet:px-4">
                <h4 className="font-semibold text-2xl tablet:text-base">
                  Resumo do orçamento
                </h4>
                <button
                  className="flex items-center gap-2"
                  onClick={downloadOrder}
                >
                  <img src={downloadIcon.src} className="w-[20px]" />
                  {!isMobile && (
                    <p className="font-semibold text-sm text-orange-500">
                      Fazer download
                    </p>
                  )}
                </button>
              </div>
              {isMobile && (
                <div
                  id="orcamento"
                  ref={mobileRef}
                  className={`absolute z-[-20] w-[1200px] flex flex-col gap-4 justify-start bg-beige-50 rounded-lg py-8 px-12`}
                >
                  <div className="flex justify-center w-full bg-beige-100">
                    <p className="text-2xl font-semibold text-center p-4">
                      Número do Orçamento:
                      <br /> {customInfos?.randomNumber}
                    </p>
                  </div>
                  {customInfos && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Dados Gerais
                      </h4>
                      <div className="flex gap-24 bg-white rounded p-4">
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
                      <h4 className="text-lg font-semibold mb-4">
                        Equipamentos selecionados
                      </h4>
                      {items.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 bg-white pt-4 pb-6 pl-5 pr-8 rounded my-6 w-full text-green-800"
                          >
                            <ImageOCC
                              imageName={item?.fullImageURLs[0]}
                              alt="product_image"
                              className="w-[240px] h-[184px] object-contain"
                            />
                            <div className="flex w-full gap-3">
                              <div className="flex flex-col gap-2 max-w-[287px] basis-1/3">
                                <p className="font-semibold text-base">
                                  {item.brand} {item.id}
                                </p>
                                <p className="font-semibold text-base">
                                  {item.displayName}
                                </p>
                              </div>
                              <div className="basis-1/3">
                                <p className="font-normal text-sm">
                                  Peso Operacional: {item?.x_pesoOperacional} t
                                  <br />
                                  Potência do Motor: {
                                    item?.x_potenciaDoMotor
                                  }{" "}
                                  HP
                                  <br />
                                  Cabine: {item?.x_cabine}
                                </p>
                              </div>

                              <div className="basis-1/3">
                                <p className="font-normal text-sm">
                                  Local de utilização: {item?.localUtility}
                                  <br />
                                  Tempo de aluguel: {item?.timeToLocale}{" "}
                                  {item?.typeToLocale}
                                  <br />
                                  Quantidade: {item?.quantity}
                                  <br />
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {customServices && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Outros serviços selecionados
                      </h4>
                      <div className="flex flex-col gap-2">
                        {customServices?.shipping?.checked && (
                          <div className="flex gap-24 bg-white rounded p-4">
                            <div className="flex flex-col gap-2">
                              <h3 className="font-semibold">
                                Frete Mills - Serviço de Entrega e Devolução de
                                Equipamentos
                              </h3>
                              <p>
                                {customServices?.shipping?.city},{" "}
                                {customServices?.shipping?.state}
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
                                      Minicarregadeira
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
                                {customServices?.accessoriesAndImplements
                                  ?.excavator.length && (
                                  <div>
                                    <h4 className="font-semibold text-sm mt-4 mb-2">
                                      Escavadeira
                                    </h4>
                                    <div className="flex flex-row gap-1">
                                      {customServices?.accessoriesAndImplements?.excavator.map(
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
                                  ?.loader.length && (
                                  <div>
                                    <h4 className="font-semibold text-sm mt-4 mb-2">
                                      Carregadeira
                                    </h4>
                                    <div className="flex flex-row gap-1">
                                      {customServices?.accessoriesAndImplements?.loader.map(
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
              )}
              <div
                ref={desktopRef}
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
                          className="flex items-center gap-3 bg-white pt-4 pb-6 pl-5 pr-8 rounded my-6 w-full text-green-800 tablet:flex-col tablet:p-5"
                        >
                          <ImageOCC
                            imageName={item?.fullImageURLs[0]}
                            alt="product_image"
                            className="w-[240px] h-[184px] object-contain"
                          />
                          <div className="flex w-full gap-3 tablet:flex-col tablet:gap-4">
                            <div className="flex flex-col gap-2 max-w-[287px] basis-1/3">
                              <p className="font-semibold text-base tablet:text-sm tablet:leading-5">
                                {item.brand} {item.id}
                              </p>
                              <p className="font-semibold text-base tablet:text-sm tablet:leading-5">
                                {item.displayName}
                              </p>
                            </div>
                            <div className="basis-1/3">
                              <p className="font-normal text-sm tablet:text-xs tablet:leading-5">
                                Peso Operacional: {item.x_pesoOperacional} t
                                <br />
                                Potência do Motor: {item?.x_potenciaDoMotor} HP
                                <br />
                                Cabine: {item?.x_cabine}
                              </p>
                            </div>

                            <div className="basis-1/3">
                              <p className="font-normal text-sm tablet:text-xs tablet:leading-5">
                                Local de utilização: {item?.localUtility}
                                <br />
                                Tempo de aluguel: {item?.timeToLocale}{" "}
                                {item?.typeToLocale}
                                <br />
                                Quantidade: {item?.quantity}
                                <br />
                              </p>
                            </div>
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
                              {customServices?.shipping?.city},{" "}
                              {customServices?.shipping?.state}
                            </p>
                          </div>
                        </div>
                      )}
                      {customServices?.operationTraining?.checked && (
                        <div className="flex gap-24 bg-white rounded p-4">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold">
                              Treinamento Operação Mills: Certificação Nacional
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
                                  ?.loadingUnloadingOperationQuantity?.quantity
                              }
                            </p>
                          </div>
                        </div>
                      )}
                      {customServices?.seatBeltTraining?.checked && (
                        <div className="flex gap-24 bg-white rounded p-4">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold">
                              Treinamento: Uso do cinto de segurança e inspeção
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
                                ?.backhoeLoader.length > 0 && (
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
                                ?.smallLoader.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-sm mt-4 mb-2">
                                    Minicarregadeira
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
                              {customServices?.accessoriesAndImplements?.loader
                                .length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-sm mt-4 mb-2">
                                    Carregadeira
                                  </h4>
                                  <div className="flex flex-row gap-1">
                                    {customServices?.accessoriesAndImplements?.loader.map(
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
                                ?.excavator.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-sm mt-4 mb-2">
                                    Escavadeira
                                  </h4>
                                  <div className="flex flex-row gap-1">
                                    {customServices?.accessoriesAndImplements?.excavator.map(
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
              <Button className="w-[258px]" onClick={() => handleFinishFlux()}>
                Novo orçamento
              </Button>
            </div>
          </div>
        </div>

        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
