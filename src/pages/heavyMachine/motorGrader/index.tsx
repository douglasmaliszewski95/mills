import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { GraderFunc } from "@/components/HeavyMachines/GraderFunc/GraderFunc";
import { SquareProps } from "@/components/HeavyMachines/GraderFunc/types";
import { InformationWithLines } from "@/components/HeavyMachines/InformationWithLines/InformationWithLines";
import { TalkToSpecialistHeavy } from "@/components/ProductTypeAndSegment/TalkToSpecialistHeavy";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";
import { Fragment, useEffect, useState } from "react";

const MotorGrader = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const [sharedContent, setSharedContent] = useState<any>();
  const [firstAbout, setFisrtAbout] = useState<any>();
  const [secondAbout, setSecondAbout] = useState<any>();
  const [thirdAbout, setThirdAbout] = useState<any>();
  const [fourthAbout, setFourthAbout] = useState<any>();

  useEffect(() => {
    updateParagraphs();
  }, [pageContent, textContent, firstAbout, secondAbout, sharedContent]);

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("maquinas_pesadas_motoniveladora");
    const contentText = await getCMSText("maquinas_pesadas_motoniveladora");
    const shared = await getCMSContent("shared");

    content?.grader?.map((about: any) => {
      if (about?.description === "pesados maquinas pesadas motoniveladora01") {
        setFisrtAbout(about);
      }
      if (about?.description === "pesados maquinas pesadas motoniveladora02") {
        setSecondAbout(about);
      }
      if (about?.description === "pesados maquinas pesadas motoniveladora03") {
        setThirdAbout(about);
      }
      if (about?.description === "pesados maquinas pesadas motoniveladora04") {
        setFourthAbout(about);
      }
    });

    setSharedContent(shared);
    setPageContent(content);
    setTextContent(contentText);
  };

  useEffect(() => {
    getPageContent();
  }, []);

  const formatSquares = () => {
    let formattedSquared: SquareProps[] = [];

    pageContent?.icon_grader?.map((item: any) => {
      formattedSquared.push({
        id: item?.fields?.content_order,
        src: getImageSrc(item?.fields),
        title: item?.fields?.content_title,
      });
    });

    return formatArrInOrder(formattedSquared);
  };

  return (
    <Fragment>
      <Header theme="rentalHeavy" />
      <main className="overflow-x-hidden">
        <Banner
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_grader[0]?.mobileObj?.fields
              : pageContent?.banner_grader[0]?.fields
          )}
          title={pageContent?.banner_grader[0]?.fields.content_title}
          subTitle="Categorias > Motoniveladora"
        />

        <About
          title={firstAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? firstAbout?.mobileObj?.fields : firstAbout?.fields
          )}
          description={firstAbout?.fields?.content_text}
          link={firstAbout?.fields?.href_attribute}
          showDna={false}
        />

        <GraderFunc
          description={textContent?.grader_text[0]?.fields?.text_field[0]}
          squaresInfo={formatSquares()}
          title={textContent?.grader_text[0]?.fields?.title}
        />

        <About
          title={secondAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? secondAbout?.mobileObj?.fields : secondAbout?.fields
          )}
          description={secondAbout?.fields?.content_text}
          link={secondAbout?.fields?.href_attribute}
          orientation="inverted"
          buttonTitle={
            secondAbout?.fields?.buttonText ?? "Fale com um especialista"
          }
          isTalkToSpecialist
        />

        <InformationWithLines
          title={textContent?.grader_assistance_text[0]?.fields?.title}
          buttonTitle={
            textContent?.grader_assistance_text[0]?.fields?.buttonText[0]
          }
          buttonLink={
            textContent?.grader_assistance_text[0]?.fields?.hrefButton[0]
          }
        />

        <About
          title={thirdAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? thirdAbout?.mobileObj?.fields : thirdAbout?.fields
          )}
          description={thirdAbout?.fields?.content_text}
          link={thirdAbout?.fields?.href_attribute}
          buttonTitle="Fale com um especialista"
          showDna={isMobile ? false : true}
          forceImageDisplayOnMobile={true}
          hasButton={false}
        />

        <About
          title={fourthAbout?.fields?.content_title}
          image={getImageSrc(
            isMobile ? fourthAbout?.mobileObj?.fields : fourthAbout?.fields
          )}
          description={fourthAbout?.fields?.content_text}
          link={fourthAbout?.fields?.href_attribute}
          orientation="inverted"
          theme="beige-100"
          showDna={false}
          hasButton={false}
        />

        {sharedContent?.truck_rental && (
          <InformationWithButton
            buttonColor="bg-orange-500"
            buttonTextColor=""
            buttonLink={sharedContent?.truck_rental[0]?.fields?.href_attribute}
            description=""
            title={sharedContent?.truck_rental[0]?.fields?.content_title}
            image={getImageSrc(
              isMobile
                ? sharedContent?.truck_rental[0]?.mobileObj?.fields
                : sharedContent?.truck_rental[0]?.fields
            )}
            buttonTitle="Saiba mais"
            paddingY="0"
          />
        )}
        <TalkToSpecialistHeavy
          buttonText={
            pageContent?.especialista_motoniveladora[0]?.fields?.button_text
          }
          link={
            pageContent?.especialista_motoniveladora[0]?.fields?.href_attribute
          }
          text={
            pageContent?.especialista_motoniveladora[0]?.fields?.content_text
          }
          title={
            pageContent?.especialista_motoniveladora[0]?.fields?.content_title
          }
          image={getImageSrc(
            isMobile
              ? pageContent?.especialista_motoniveladora[0]?.mobileObj?.fields
              : pageContent?.especialista_motoniveladora[0]?.fields
          )}
        />
      </main>
      <Footer />
    </Fragment>
  );
};

export default MotorGrader;
