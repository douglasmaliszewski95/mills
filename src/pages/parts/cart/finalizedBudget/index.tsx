import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Button from "@/components/shared/Button/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { useRouter } from "next/router";
import { updateParagraphs } from "@/utils/texts";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import downloadIcon from "@/assets/download.svg";
import { transformContentToMobile } from "@/utils/content";
import { getCMSContent } from "@/components/Generators/content";
import _ from "lodash";
import { getImageSrc } from "@/utils/images";

export default function FinalizedBudget() {
  const router = useRouter();
  const { banner } = useGetCMSAssemblyStructure();
  const [customInfos, setCustomInfos] = useState<any>(null);
  const [content, setContent] = useState<any>();
  const [contentBase, setContentBase] = useState<any>();
  const [items, setItems] = useState<any>(null);
  const { isMobile } = useScreenWidth();
  const mobileRef = useRef<any>(null);
  const desktopRef = useRef<any>(null);

  useEffect(() => {
    updateParagraphs();
  }, [customInfos, items]);

  useEffect(() => {
    const customInfos = localStorage.getItem("customInfos");
    const items = localStorage.getItem("items");
    setCustomInfos(customInfos ? JSON.parse(customInfos) : undefined);
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

  const formatData = useCallback(
    ({ contentAux }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      setContent(responsiveContent?.banner_search_parts?.[0]);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("venda_pecas_busca");
        setContentBase({ contentAux });
        formatData({ contentAux });
      } else {
        formatData({ ...contentBase });
      }
    };
    getContent();
  }, [formatData]);

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
      <Header />
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
          backgroundImage={getImageSrc(content?.fields)}
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
                  especialistas irá entrar em contato com você. Caso você tenha
                  urgência, ligue gratuitamente para{" "}
                  <a href="#" className="text-orange-500 underline">
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
                  ref={mobileRef}
                  className={`absolute w-[1200px] z-[-20] flex flex-col gap-4 justify-start bg-beige-50 rounded-lg py-8 px-12`}
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
                        Peças selecionadas
                      </h4>
                      {items.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex gap-10 items-center bg-white py-12 px-11 rounded mb-4 w-full text-green-800"
                          >
                            <ImageOCC
                              imageName={item?.fullImageURLs[0]}
                              alt="product_image"
                              className="w-[172px]"
                            />
                            <div className="flex flex-col">
                              <p className="font-semibold text-base">
                                {item.displayName}
                              </p>
                              <p className="text-sm">{`Quantidade: ${item.quantity}`}</p>
                            </div>
                          </div>
                        );
                      })}
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
                      Peças selecionadas
                    </h4>
                    {items.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="tablet:border-[1px] tablet:rounded-lg flex gap-10 items-center tablet:items-start bg-white px-11 rounded mb-4 w-full text-green-800 tablet:flex-col tablet:p-5"
                        >
                          <ImageOCC
                            imageName={item?.fullImageURLs[0]}
                            alt="product_image"
                            className="w-[172px] tablet:w-full tablet:px-10"
                          />
                          <div className="flex flex-col">
                            <p className="font-semibold text-base tablet:text-sm">
                              {item.displayName}
                            </p>
                            <p className="text-sm">{`Quantidade: ${item.quantity}`}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container tablet:py-6">
            <div className="flex justify-end mt-7 tablet:justify-center">
              <Button
                className="w-[258px]"
                size="large"
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
  );
}
