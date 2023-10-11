import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { ConstructionSlideShow } from "@/components/Category/ConstructionSlideShow/ConstructionSlideShow";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { ShoringModels } from "@/components/formworkAndShoring/ShoringModels/ShoringModels";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { ImageCMS } from "@/types";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { Item } from "@/components/Category/AboutRental/types";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";

export default function Energy() {
  const [pageContent, setPageContent] = useState({
    banner: { src: "", title: "" },
    firstAbout: { src: "", title: "", description: "", href_attribute: "" },
    secondAbout: { src: "", title: "", description: "" },
    aboutCarousel: { title: "", description: "" },
    thirdAbout: { description: "", src: "" },
  });
  const [shared, setShared] = useState<any>();
  const { isMobile } = useScreenWidth();
  const arrPresentConstruct: ImageCMS[] = [];
  const [productsIds, setProductsIds] = useState<string[]>([]);
  const [contentText, setContentText] = useState<any>();

  const getContent = async () => {
    const contentAux = await getCMSContent("formas-e-escoramentos-energia");
    const sharedAux = await getCMSContent("shared");

    const contentText = await getCMSText(
      "formas-e-escoramentos-grandes-edificacoes"
    );
    setContentText(contentText);
    let bannerContent = {
      src: "",
      title: "",
    };
    setShared(sharedAux);

    let firstAbout = {
      title: "",
      description: "",
      src: "",
      href_attribute: "#",
    };

    let secondAbout = {
      title: "",
      description: "",
      src: "",
    };

    let thirdAbout = {
      description: "",
      src: "",
    };

    let aboutCarousel = {
      title: "",
      description: "",
    };

    contentAux?.banner_formas_escoramentos?.map((item) => {
      if (item.description === "banner formas escoramentos energia") {
        bannerContent = {
          src:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.native.links[0].href
              : item.fields.native.links[0].href,
          title:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.content_title
              : item.fields.content_title,
        };
      }
    });

    contentAux?.formas_escoramentos_energia?.map((item) => {
      if (item.description === `formas escoramentos energia01`) {
        firstAbout = {
          title:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.content_title
              : item.fields.content_title,
          description:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.content_text
              : item.fields.content_text,
          src:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.native.links[0].href
              : item.fields.native.links[0].href,
          href_attribute:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.href_attribute ?? ""
              : item.fields.href_attribute ?? "",
        };
      }
      if (item.description === "formas escoramentos energia02") {
        secondAbout = {
          title:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.content_title
              : item.fields.content_title,
          description:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.content_text
              : item.fields.content_text,
          src:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.native.links[0].href
              : item.fields.native.links[0].href,
        };
      }
      if (item.description === "formas escoramentos energia03") {
        thirdAbout = {
          description:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.content_text
              : item.fields.content_text,
          src:
            isMobile && item.mobileObj
              ? item.mobileObj.fields.native.links[0].href
              : item.fields.native.links[0].href,
        };
      }
    });

    contentText?.shoring_models_text?.map((item: any) => {
      if (item?.description === "energia modelos escoramento texto") {
        setProductsIds(item?.fields?.text_field);
      }
    });

    contentText?.energy_text?.map((item: any) => {
      if (item.description === "energia formas escoramento texto02") {
        aboutCarousel = {
          title: item?.fields?.title,
          description: item?.fields?.text_field[0],
        };
      }
    });

    setPageContent({
      banner: {
        src: bannerContent.src,
        title: bannerContent.title,
      },
      firstAbout: firstAbout,
      secondAbout: secondAbout,
      aboutCarousel: aboutCarousel,
      thirdAbout: thirdAbout,
    });
  };

  const informationCard = () => {
    const a: any = [];

    contentText?.energy_text?.map((item: any) => {
      if (item.description === "energia formas escoramento texto01") {
        item.fields.text_field.map((text: string) => {
          const aux = { title: text, description: "" };
          a.push(aux);
        });
      }
    });

    return a;
  };

  const formattPresentConstructions = () => {
    shared?.construction_presents?.map((item: any) => {
      arrPresentConstruct.push({
        id: item.fields.content_order,
        description: item?.fields?.content_text,
        fields: item.fields,
        name: item?.fields?.content_text,
        mobileObj: item.mobileObj,
      });
    });
    return formatArrInOrder(arrPresentConstruct);
  };

  const formatAboutRental = () => {
    const aboutRentalFormatted: Item[] = [];

    shared?.["compressores_geradores"]?.map((item: any) => {
      aboutRentalFormatted.push({
        description: item.fields.content_text,
        id: item.fields.content_order,
        image: getImageSrc(item?.fields),
        title: item.fields.content_title,
        alt: item.fields.content_title,
      });
    });

    return formatArrInOrder(aboutRentalFormatted);
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [pageContent, contentText, shared]);

  return (
    <>
      <Header />
      <main>
        <Banner
          backgroundImage={pageContent.banner.src}
          title={pageContent.banner.title}
          subTitle="Fôrmas e escoramentos > Energia"
        />
        <About
          title={pageContent.firstAbout.title}
          theme="white"
          hasButton={true}
          forceImageDisplay={false}
          description={pageContent.firstAbout.description}
          image={pageContent.firstAbout.src}
          orientation="inverted"
          hideImage={isMobile}
          link={pageContent?.firstAbout?.href_attribute ?? "#"}
        />
        <About
          type="carousel"
          theme="orange-500"
          title={pageContent.aboutCarousel.title}
          buttonTitle="Ver Modelos"
          hasButton="true"
          color="white"
          informationCards={informationCard()}
          forceImageDisplayOnMobile={false}
          description={pageContent.aboutCarousel.description}
        />
        <About
          title={pageContent.secondAbout.title}
          theme="beige-200"
          hasButton={false}
          description={pageContent.secondAbout.description}
          image={pageContent.secondAbout.src}
          orientation="inverted"
        />
        {productsIds && (
          <ShoringModels ids={productsIds} title="" description="" />
        )}
        <About
          title={pageContent.thirdAbout.description}
          image={pageContent.thirdAbout.src}
          theme="beige-200"
          hasButton={false}
        />
        <AboutRental
          theme="orange-500"
          title="Por que alugar fôrmas e escoramentos para a sua empresa atuar em Serviços e Infraestrutura?"
          textColor="white"
          description=""
          items={formatAboutRental()}
        />

        {pageContent && (
          <ConstructionSlideShow cards={formattPresentConstructions() || []} />
        )}
        <ExpertRecommendation />
      </main>
      <Footer />
    </>
  );
}
