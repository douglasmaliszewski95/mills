import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { ExcavatorFunction } from "@/components/HeavyMachines/ExcavatorFunction/ExcavatorFunction";
import { ImplementsComponent } from "@/components/HeavyMachines/ImplementsComponent/ImplementsComponent";
import { InformationWithLines } from "@/components/HeavyMachines/InformationWithLines/InformationWithLines";
import { QuestionsComponent } from "@/components/HeavyMachines/QuestionsComponent/QuestionsComponent";
import { QuestionsAndAnswersProps } from "@/components/HeavyMachines/QuestionsComponent/types";
import { SmallLoaderFunc } from "@/components/HeavyMachines/SmallLoaderFunc/SmallLoaderFunc";
import { SmallLoaderCarouselComponentProps } from "@/components/HeavyMachines/SmallLoaderFunc/types";
import { TalkToSpecialistHeavy } from "@/components/ProductTypeAndSegment/TalkToSpecialistHeavy";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { ImageCMS } from "@/types";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";
import { Fragment, useEffect, useState } from "react";

const SmallLoader = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const [firstContent, setFirstContent] = useState<any>();
  const [secondContent, setSecondContent] = useState<any>();
  const [thirdImage, setThirdImage] = useState<string>("");
  const [sharedContent, setSharedContent] = useState<any>();
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    updateParagraphs();
  }, [
    pageContent,
    textContent,
    firstContent,
    secondContent,
    thirdImage,
    sharedContent,
  ]);

  const getContent = async () => {
    const content = await getCMSContent("maquinas_pesadas_minicarregadeira");
    const contentText = await getCMSText("maquinas_pesadas_minicarregadeira");
    const shared = await getCMSContent("shared");

    content?.heavy_machine_skid_steer_loader?.map((cont: any) => {
      if (cont?.description === "maquinas pesadas minicarregadeira01")
        setFirstContent(cont);
      if (cont?.description === "maquinas pesadas minicarregadeira02")
        setSecondContent(cont);
      if (cont?.description === "maquinas pesadas minicarregadeira03")
        setThirdImage(
          getImageSrc(isMobile ? cont?.mobileObj?.fields : cont?.fields)
        );
    });

    setSharedContent(shared);
    setPageContent(content);
    setTextContent(contentText);
  };

  const formattedLoaderFunc = () => {
    let formatLoadFunc: SmallLoaderCarouselComponentProps[] = [];

    pageContent?.check_icon?.map((item: any) => {
      formatLoadFunc.push({
        id: item?.fields?.content_order,
        image: getImageSrc(item?.fields),
        text: item?.fields?.content_text,
        titulo: item?.fields?.content_title,
      });
    });

    return formatArrInOrder(formatLoadFunc);
  };

  const formattedAnsAndQues = () => {
    let ansAndQues: QuestionsAndAnswersProps[] = [];

    textContent?.colun_text?.map((item: any) => {
      ansAndQues.push({
        answear: item?.fields?.text_field[0],
        id: item?.fields?.content_order,
        question: item?.fields?.title,
      });
    });

    return formatArrInOrder(ansAndQues);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Fragment>
      <Header theme="rentalHeavy" />
      <main>
        <Banner
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_heavy_machine_skid_steer_loader[0]
                  ?.mobileObj?.fields
              : pageContent?.banner_heavy_machine_skid_steer_loader[0]?.fields
          )}
          title={
            pageContent?.banner_heavy_machine_skid_steer_loader[0]?.fields
              ?.content_title
          }
          subTitle="Categorias > Minicarregadeira"
        />

        <About
          title={firstContent?.fields?.content_title}
          image={getImageSrc(
            isMobile ? firstContent?.mobileObj?.fields : firstContent?.fields
          )}
          description={firstContent?.fields?.content_text}
          link={firstContent?.fields?.href_attribute}
          orientation="inverted"
          hideImage={isMobile && true}
        />

        <ExcavatorFunction
          hasImage={getImageSrc(
            isMobile ? secondContent?.mobileObj?.fields : secondContent?.fields
          )}
          title={secondContent?.fields?.content_title}
          imagePos="bottom"
          dnaColor="green-800"
        />

        <InformationWithLines
          theme="orange-500"
          title={textContent?.rental_text[0]?.fields?.title}
          buttonTitle={textContent?.rental_text[0]?.fields?.buttonText[0]}
          buttonLink={textContent?.rental_text[0]?.fields?.hrefButton[0]}
        />

        <SmallLoaderFunc
          title={textContent?.tasks_text[0]?.fields?.title}
          carouselComp={formattedLoaderFunc()}
        />

        <QuestionsComponent questionsList={formattedAnsAndQues()} />

        <ImplementsComponent
          orientation="inverted"
          image={thirdImage}
          implementsText={textContent?.adaptation_text[0]?.fields?.text_field}
          title={textContent?.adaptation_text[0]?.fields?.title}
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
            pageContent?.especialista_minicarregadeira[0]?.fields?.button_text
          }
          link={
            pageContent?.especialista_minicarregadeira[0]?.fields
              ?.href_attribute
          }
          text={
            pageContent?.especialista_minicarregadeira[0]?.fields?.content_text
          }
          title={
            pageContent?.especialista_minicarregadeira[0]?.fields?.content_title
          }
          image={getImageSrc(
            isMobile
              ? pageContent?.especialista_minicarregadeira[0]?.mobileObj?.fields
              : pageContent?.especialista_minicarregadeira[0]?.fields
          )}
        />
      </main>
      <Footer />
    </Fragment>
  );
};

export default SmallLoader;
