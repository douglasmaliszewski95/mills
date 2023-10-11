import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { ExcavatorFunction } from "@/components/HeavyMachines/ExcavatorFunction/ExcavatorFunction";
import { ImplementsComponent } from "@/components/HeavyMachines/ImplementsComponent/ImplementsComponent";
import { InformationWithLines } from "@/components/HeavyMachines/InformationWithLines/InformationWithLines";
import { TalkToSpecialistHeavy } from "@/components/ProductTypeAndSegment/TalkToSpecialistHeavy";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { CompareTwoProducts } from "@/components/shared/CompareTwoProducts/CompareTwoProducts";
import { ProductsProps } from "@/components/shared/CompareTwoProducts/types";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { ImageCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";
import { Fragment, useEffect, useState } from "react";

const Excavator = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const [firstAbout, setFisrtAbout] = useState<any>();
  const [secondAbout, setSecondAbout] = useState<any>();
  const [sharedContent, setSharedContent] = useState<any>();
  const [thirdImage, setThirdImage] = useState<string>("");

  useEffect(() => {
    updateParagraphs();
  }, [
    pageContent,
    textContent,
    firstAbout,
    secondAbout,
    sharedContent,
    thirdImage,
  ]);

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("maquinas_pesadas_escavadeira");
    const contentText = await getCMSText("maquinas_pesadas_escavadeira");
    const shared = await getCMSContent("shared");

    content?.heavy_machinery_excavator?.map((about: any) => {
      if (about?.description === "pesados maquinas pesadas escavadeira01") {
        setFisrtAbout(about);
      }
      if (about?.description === "pesados maquinas pesadas escavadeira02") {
        setSecondAbout(about);
      }
      if (about?.description === "pesados maquinas pesadas escavadeira03") {
        setThirdImage(
          getImageSrc(isMobile ? about?.mobileObj?.fields : about?.fields)
        );
      }
    });

    setSharedContent(shared);
    setPageContent(content);
    setTextContent(contentText);
  };

  useEffect(() => {
    getPageContent();
  }, []);

  const formattedCompareMachines = () => {
    let formattCompareMachines: ProductsProps[] = [];

    pageContent?.difference_machines?.map((machine: any) => {
      formattCompareMachines.push({
        description: machine?.fields?.content_text,
        img: getImageSrc(
          isMobile ? machine?.mobileObj?.fields : machine?.fields
        ),
        link: machine?.fields?.href_attribute,
        title: machine?.fields?.content_title,
      });
    });

    return formattCompareMachines;
  };

  return (
    <Fragment>
      <Header theme="rentalHeavy" />
      <main>
        <Banner
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_heavy_machinery_excavator[0]?.mobileObj
                  ?.fields
              : pageContent?.banner_heavy_machinery_excavator[0]?.fields
          )}
          title={
            pageContent?.banner_heavy_machinery_excavator[0]?.fields
              ?.content_title
          }
          subTitle="Categoria > Escavadeira"
        />

        <About
          title={firstAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? firstAbout?.mobileObj?.fields : firstAbout?.fields
          )}
          description={firstAbout?.fields?.content_text}
          link={firstAbout?.fields?.href_attribute}
        />

        <ExcavatorFunction
          description={textContent?.excavator_text[0]?.fields?.subtitle[0]}
          functions={textContent?.excavator_text[0]?.fields?.text_field}
          title={textContent?.excavator_text[0]?.fields?.title}
          dnaColor="#F37021"
        />

        <InformationWithLines
          title={textContent?.technical_assistance_text[0]?.fields?.title}
          buttonTitle={
            textContent?.technical_assistance_text[0]?.fields?.buttonText[0]
          }
          buttonLink={
            textContent?.technical_assistance_text[0]?.fields?.hrefButton[0]
          }
        />

        <About
          title={secondAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? secondAbout?.mobileObj?.fields : secondAbout?.fields
          )}
          description={secondAbout?.fields?.content_text}
          link={secondAbout?.fields?.href_attribute}
          hasButton={false}
          orientation="inverted"
        />

        <ImplementsComponent
          image={thirdImage}
          implementsText={textContent?.implements_text[0]?.fields?.text_field}
          title={textContent?.implements_text[0]?.fields?.title}
        />

        <CompareTwoProducts
          title={textContent?.diference_text[0]?.fields.title}
          products={formattedCompareMachines()}
        />

        {sharedContent?.truck_rental && (
          <InformationWithButton
            title={sharedContent?.truck_rental[0]?.fields?.content_title}
            buttonLink={sharedContent?.truck_rental[0]?.fields?.href_attribute}
            theme="bg-green-800"
            description={""}
            buttonTitle={"Saiba Mais"}
            buttonColor={"bg-orange-500"}
            buttonTextColor={"text-white"}
            showDna={false}
            image={getImageSrc(
              isMobile
                ? sharedContent?.truck_rental[0]?.mobileObj?.fields
                : sharedContent?.truck_rental[0]?.fields
            )}
            paddingY="0"
          />
        )}

        <TalkToSpecialistHeavy
          buttonText={
            pageContent?.especialista_escavadeira[0]?.fields?.button_text
          }
          link={
            pageContent?.especialista_escavadeira[0]?.fields?.href_attribute
          }
          text={pageContent?.especialista_escavadeira[0]?.fields?.content_text}
          title={
            pageContent?.especialista_escavadeira[0]?.fields?.content_title
          }
          image={getImageSrc(
            isMobile
              ? pageContent?.especialista_escavadeira[0]?.mobileObj?.fields
              : pageContent?.especialista_escavadeira[0]?.fields
          )}
        />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Excavator;
