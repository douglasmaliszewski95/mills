import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { ExcavatorFunction } from "@/components/HeavyMachines/ExcavatorFunction/ExcavatorFunction";
import { ImplementsComponent } from "@/components/HeavyMachines/ImplementsComponent/ImplementsComponent";
import { TalkToSpecialistHeavy } from "@/components/ProductTypeAndSegment/TalkToSpecialistHeavy";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { CompareTwoProducts } from "@/components/shared/CompareTwoProducts/CompareTwoProducts";
import { ProductsProps } from "@/components/shared/CompareTwoProducts/types";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { ImageCMS, TextCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import { Fragment, useEffect, useState } from "react";

const Backhoe = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const [firstAbout, setFirstAbout] = useState<ImageCMS>();
  const [secondAbout, setSecondAbout] = useState<ImageCMS>();
  const [thirdAbout, setThirdAbout] = useState<ImageCMS>();
  const [firstInformation, setFirstInformation] = useState<any>();
  const [secondInformation, setSecondInformation] = useState<any>();
  const [sharedInformation, setSharedInformation] = useState<any>();

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("maquinas_pesadas_retroescavadeira");
    const contentText = await getCMSText("maquinas_pesadas_retroescavadeira");
    const shared = await getCMSContent("shared");

    content?.heavy_machinery_backhoe?.map((cont: any) => {
      if (cont.description === "pesados maquinas pesadas retroescavadeira01")
        setFirstAbout(cont);
      if (cont.description === "pesados maquinas pesadas retroescavadeira02")
        setSecondAbout(cont);
      if (cont.description === "pesados maquinas pesadas retroescavadeira03")
        setThirdAbout(cont);
    });

    contentText.technical_assistance_text.map((cont: any) => {
      if (cont.description === "pesados assistencia retroescavadeira texto02")
        setFirstInformation(cont);
      if (cont.description === "pesados mapa retroescavadeira texto04")
        setSecondInformation(cont);
    });

    setSharedInformation(shared);
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
              ? pageContent?.banner_heavy_machinery_backhoe[0]?.mobileObj
                  ?.fields
              : pageContent?.banner_heavy_machinery_backhoe[0]?.fields
          )}
          title={
            pageContent?.banner_heavy_machinery_backhoe[0]?.fields
              ?.content_title
          }
          subTitle="Categorias > Retroescavadeira"
        />

        <About
          hideImage={isMobile && true}
          title={firstAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? firstAbout?.mobileObj?.fields : firstAbout?.fields
          )}
          description={firstAbout?.fields?.content_text}
          link={firstAbout?.fields?.href_attribute}
          orientation="inverted"
        />

        <ExcavatorFunction
          dnaColor="green-800"
          imagePos="bottom"
          description={textContent?.backhoe_text[0]?.fields?.subtitle[0]}
          functions={textContent?.backhoe_text[0]?.fields?.text_field}
          title={textContent?.backhoe_text[0]?.fields?.title}
        />

        <InformationWithButton
          buttonColor="border-white border-[2px]"
          buttonTextColor="text-white "
          buttonTitle={firstInformation?.fields.buttonText[0]}
          description=""
          title={firstInformation?.fields.title}
          buttonLink={firstInformation?.fields.hrefButton[0]}
          dnaColor="white"
          imagePosition="top"
        />

        <About
          title={secondAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? secondAbout?.mobileObj?.fields : secondAbout?.fields
          )}
          description={secondAbout?.fields?.content_text}
          hasButton={false}
          forceImageDisplayOnMobile={true}
        />

        <ImplementsComponent
          image={getImageSrc(
            isMobile ? thirdAbout?.mobileObj?.fields : thirdAbout?.fields
          )}
          implementsText={textContent?.implements_text[0]?.fields?.text_field}
          title={textContent?.implements_text[0]?.fields?.title}
          orientation="inverted"
        />

        {sharedInformation?.truck_rental && (
          <InformationWithButton
            title={sharedInformation?.truck_rental[0]?.fields?.content_title}
            buttonLink={
              sharedInformation?.truck_rental[0]?.fields?.href_attribute
            }
            theme="bg-green-800"
            description={""}
            buttonTitle={"Saiba Mais"}
            buttonColor={"bg-orange-500"}
            buttonTextColor={"text-white"}
            showDna={false}
            image={getImageSrc(
              isMobile
                ? sharedInformation?.truck_rental[0]?.mobileObj?.fields
                : sharedInformation?.truck_rental[0]?.fields
            )}
            paddingY="0"
          />
        )}

        <CompareTwoProducts
          title={"Diferença entre uma retroescavadeira e uma pá carregadeira"}
          products={formattedCompareMachines()}
        />

        <InformationWithButton
          buttonColor="border-white border-[2px]"
          buttonTextColor="text-white "
          buttonTitle={secondInformation?.fields?.buttonText[0]}
          description=""
          title={secondInformation?.fields?.title}
          buttonLink={secondInformation?.fields?.hrefButton[0]}
          dnaColor="white"
          imagePosition="bottom"
        />

        <TalkToSpecialistHeavy
          buttonText={
            pageContent?.especialista_retroescavadeira[0]?.fields?.button_text
          }
          link={
            pageContent?.especialista_retroescavadeira[0]?.fields
              ?.href_attribute
          }
          text={
            pageContent?.especialista_retroescavadeira[0]?.fields?.content_text
          }
          title={
            pageContent?.especialista_retroescavadeira[0]?.fields?.content_title
          }
          image={getImageSrc(
            isMobile
              ? pageContent?.especialista_retroescavadeira[0]?.mobileObj?.fields
              : pageContent?.especialista_retroescavadeira[0]?.fields
          )}
        />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Backhoe;
