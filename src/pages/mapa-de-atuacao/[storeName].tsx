import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { getImageSrc } from "@/utils/images";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import NotFoundPage from "../404";
import Loading from "../loading";
import { isEmpty } from "lodash";
import { AboutWithButton } from "@/components/InstitutionalComponents/AboutWithButtons/AboutWithButtons";
import { MillsUnityComponent } from "@/components/InstitutionalComponents/MillsUnityComponent/MillsUnityComponent";
import { StoresProducts } from "@/components/InstitutionalComponents/StoresProducts/StoresProducts";
import { cardProps } from "@/components/InstitutionalComponents/StoresProducts/types";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";

export default function MillsStores() {
  const router = useRouter();
  const { storeName } = router.query;
  const storeSingleName = storeName?.toString()?.split("-")[1];

  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const [existStore, setExistStore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    if (storeName) {
      const content = await getCMSContent(
        `mapa_atuacao_${storeName?.toString().replace("-", "_")}`
      );
      const contentText = await getCMSText(
        `mapa_atuacao_${storeName?.toString().replace("-", "_")}`
      );

      if (isEmpty(content)) setExistStore(false);
      setPageContent(content);
      setTextContent(contentText);
      setIsLoading(false);
    }
  };

  const formatStoreProducts = () => {
    let formattedData: cardProps[] = [];

    pageContent?.rent_options?.map((option: any) => {
      formattedData.push({
        description: option?.fields?.content_text,
        src: getImageSrc(isMobile ? option?.mobileObj?.fields : option?.fields),
        title: option?.fields?.content_title,
        id: option?.fields?.content_order,
        link: option?.fields?.href_attribute
      });
    });

    return formatArrInOrder(formattedData);
  };

  const btnsTexts = () => {
    const btnArr: string[] = [];

    textContent?.heavy_machinery_text[0]?.fields?.text_field.map(
      (item: string) => {
        btnArr.push(item);
      }
    );

    return btnArr;
  };

  useEffect(() => {
    getPageContent();
  }, [storeName]);

  const spinnigLoading = () => {
    return (
      <div
        role="status"
        className="w-full flex items-center h-full mt-20 justify-center"
      >
        <svg
          aria-hidden="true"
          className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  };

  return isLoading ? (
    spinnigLoading()
  ) : (
    <>
      {existStore ? (
        <Fragment>
          <Header menu={undefined} />
          {pageContent && (
            <main>
              <Banner
                title={pageContent?.top_banner_filial[0]?.fields?.content_title}
                backgroundImage={getImageSrc(
                  isMobile
                    ? pageContent?.top_banner_filial[0]?.mobileObj?.fields
                    : pageContent?.top_banner_filial[0]?.fields
                )}
                subTitle={`Mapa de Atuação > Aluguel de plataformas elevatórias e máquinas pesadas em ${storeSingleName
                  ?.charAt(0)
                  .toUpperCase()}${storeSingleName?.slice(1)}`}
              />

              <MillsUnityComponent
                address={textContent?.rent_text[0]?.fields?.text_field[0]}
                email=""
                phoneNumber={textContent?.rent_text[0]?.fields?.text_field[1]}
                title={`Unidade Mills em ${storeSingleName
                  ?.charAt(0)
                  .toUpperCase()}${storeSingleName?.slice(1)}`}
                src={getImageSrc(
                  isMobile
                    ? pageContent?.rent_filial[0]?.mobileObj?.fields
                    : pageContent?.rent_filial[0]?.fields
                )}
              />

              <AboutWithButton
                description={pageContent?.budget[0]?.fields?.content_text}
                title={pageContent?.budget[0]?.fields?.content_title}
                btnText="Buscar Equipamentos"
                src={getImageSrc(
                  isMobile
                    ? pageContent?.budget[0]?.mobileObj?.fields
                    : pageContent?.budget[0]?.fields
                )}
              />

              <StoresProducts cards={formatStoreProducts()} />

              <AboutWithButton
                description={
                  textContent?.heavy_machinery_text[0]?.fields?.subtitle[0]
                }
                title={textContent?.heavy_machinery_text[0]?.fields?.title}
                multipleBtns={btnsTexts()}
                src={getImageSrc(
                  isMobile
                    ? pageContent?.heavy_machinery[0]?.mobileObj?.fields
                    : pageContent?.heavy_machinery[0]?.fields
                )}
                type="multipleBtns"
              />

              <InformationWithButton
                buttonTitle={textContent?.call_contact_text[0]?.fields?.buttonText[0]}
                description=""
                title={textContent?.call_contact_text[0]?.fields?.text_field[0]}
                imagePosition="bottom"
                buttonLink={textContent?.call_contact_text[0]?.fields?.hrefButton[0]}
                theme="bg-beige-200"
                buttonColor="bg-orange-500"
                buttonTextColor="text-white"
                dnaColor="white"
                paddingY="py-10"
              />

              <AboutWithButton
                description={
                  pageContent?.sale_parts_equipments[0]?.fields?.content_text
                }
                title={
                  pageContent?.sale_parts_equipments[0]?.fields?.content_title
                }
                btnText="Saiba Mais"
                src={getImageSrc(
                  isMobile
                    ? pageContent?.sale_parts_equipments[0]?.mobileObj?.fields
                    : pageContent?.sale_parts_equipments[0]?.fields
                )}
                orientation="inverted"
                theme="white"
                link={pageContent?.sale_parts_equipments[0]?.fields?.href_attribute}
              />

              <MachinesAndPlatforms />
            </main>
          )}
          <Footer />
        </Fragment>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
