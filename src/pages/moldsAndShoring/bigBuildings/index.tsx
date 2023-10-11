import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { Fragment, useEffect, useState } from "react";
import { ShoringModels } from "@/components/formworkAndShoring/ShoringModels/ShoringModels";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Item } from "@/components/Category/AboutRental/types";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { ConstructionSlideShow } from "@/components/Category/ConstructionSlideShow/ConstructionSlideShow";
import { ImageCMS } from "@/types";
import { isEmpty } from "lodash";
import { updateParagraphs } from "@/utils/texts";
import { CustomExpertRecommendation } from "@/components/shared/CustomExpertRecommendation/CustomExpertRecommendation";

export default function BigBuildings() {
  const [pageContent, setPageContent] = useState<any>();
  const [aboutRentalContent, setAboutRentalContent] = useState<any>([]);
  const [presentConstructions, setPresentConstructions] = useState<any>([]);
  const [productsIds, setProductsIds] = useState<string[]>([]);
  const [
    informationCardsTitleDescription,
    setInformationCardsTitleDescription,
  ] = useState({
    title: "",
    description: "",
  });
  const [pageContentText, setPageContentText] = useState<any>();

  const getContent = async () => {
    const content = await getCMSContent(
      "formas-e-escoramentos-grandes-edificacoes"
    );
    const contentText = await getCMSText(
      "formas-e-escoramentos-grandes-edificacoes"
    );
    const shared = await getCMSContent("shared");
    setPageContentText(contentText);
    setPageContent(content);
    setAboutRentalContent(shared?.icon_formas_e_escoramentos);
    setPresentConstructions(shared?.construction_presents);
    contentText?.shoring_models_text?.map((item: any) => {
      if (
        item?.description === "grandes edificacoes modelos escoramento texto"
      ) {
        setProductsIds(item?.fields?.text_field);
      }
    });
    contentText?.product_carousel?.map((item: any) => {
      if (
        item.description ===
        "formas escoramentos grandes edificacoes principais formas-texto"
      ) {
        setInformationCardsTitleDescription({
          title: item?.fields?.title,
          description: item?.fields?.text_field[0],
        });
      }
    });
  };

  const informationCard = () => {
    const a: any = [];

    pageContentText?.product_carousel?.map((item: any) => {
      if (
        item.description.includes("grandes edificacoes") &&
        item.description !==
          "formas escoramentos grandes edificacoes principais formas-texto"
      ) {
        const aux = {
          title: item.fields.title,
          description: item.fields.text_field[0],
        };
        a.push(aux);
      }
    });

    return a;
  };

  const formatAboutRental = () => {
    const aboutRentalFormatted: Item[] = [];

    aboutRentalContent.map((item: any) => {
      aboutRentalFormatted.push({
        description: item.fields.content_text,
        id: item.fields.content_order,
        image: item.fields.native.links[0].href,
        title: item.fields.content_title,
        alt: item.fields.content_title,
      });
    });

    return formatArrInOrder(aboutRentalFormatted);
  };

  const formattPresentConstructions = () => {
    const formattedPresentConstruction: ImageCMS[] = [];

    presentConstructions.map((item: any) =>
      formattedPresentConstruction.push({
        description: item?.fields?.content_text,
        fields: item?.fields,
        name: item?.fields?.content_text,
        mobileObj: item.mobileObj,
        id: item?.fields?.content_order,
      })
    );

    return formatArrInOrder(formattedPresentConstruction);
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [pageContent]);

  return (
    <Fragment>
      <Header />
      <main>
        <Banner
          backgroundImage={
            pageContent?.banner_formas_escoramentos[0]?.fields?.native?.links[0]
              ?.href
          }
          breadcrumb="Fôrmas e escoramentos > Grandes edificações"
          title={
            pageContent?.banner_formas_escoramentos[0]?.fields?.content_title
          }
          subTitle="Fôrmas e escoramentos > Grandes edificações"
        />
        <About
          title={pageContent?.formas_e_escoramentos[0]?.fields?.content_title}
          theme="white"
          color="green-800"
          orientation="inverted"
          description={
            pageContent?.formas_e_escoramentos[0]?.fields?.content_text
          }
          image={
            pageContent?.formas_e_escoramentos[0]?.fields?.native?.links[0]
              ?.href
          }
          link={
            pageContent?.formas_e_escoramentos[0]?.fields?.href_attribute ?? "#"
          }
          buttonTitle={
            pageContent?.formas_e_escoramentos[0]?.buttonText ?? "Ver modelos"
          }
          forceImageDisplayOnMobile={false}
        />

        {!isEmpty(pageContentText) && (
          <About
            type="carousel"
            theme="orange-500"
            title={informationCardsTitleDescription.title}
            buttonTitle="Ver Modelos"
            hasButton="true"
            color="white"
            informationCards={informationCard()}
            forceImageDisplayOnMobile={false}
            description={informationCardsTitleDescription.description}
          />
        )}

        <AboutRental
          theme="white"
          title="Por que alugar fôrmas e escoramentos para a sua empresa atuar em Serviços e Infraestrutura?"
          textColor={"green-800"}
          description=""
          items={formatAboutRental()}
        />

        <ShoringModels ids={productsIds} title="" description="" />

        {pageContent && (
          <ConstructionSlideShow cards={formattPresentConstructions() || []} />
        )}

        <CustomExpertRecommendation
          content={pageContent?.banner_especialista?.[1]}
        />
      </main>
      <Footer />
    </Fragment>
  );
}
