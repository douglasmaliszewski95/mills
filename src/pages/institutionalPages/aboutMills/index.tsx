import { Fragment, useContext, useEffect, useState } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { Information } from "@/components/Category/Information/Information";
import { OurCulture } from "@/components/InstitutionalComponents/OurCulture/OurCulture";
import { cultureCardsProps } from "@/components/InstitutionalComponents/OurCulture/types";
import { GoalsCardProps } from "@/components/InstitutionalComponents/OurGoals/types";
import { OurGoals } from "@/components/InstitutionalComponents/OurGoals/OurGoals";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import { OurAcknowledgments } from "@/components/InstitutionalComponents/OurAcknowledgments/OurAcknowledgments";
import { AcknowledgmentsCardsProps } from "@/components/InstitutionalComponents/OurAcknowledgments/types";
import { TextWithCarousel } from "@/components/shared/TextWithCarousel/TextWithCarousel";
import { CertificationsCardProps } from "@/components/shared/TextWithCarousel/types";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import { getImageSrc } from "@/utils/images";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { updateParagraphs } from "@/utils/texts";

const AboutMills = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const { currentSiteTheme } = useContext(currentSiteThemeContext);
  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("sobre_a_mills");
    const contentText = await getCMSText("sobre_a_mills");

    setPageContent(content);
    setTextContent(contentText);
  };

  const formatOurCultureIcons = () => {
    const ourCultureIcons: cultureCardsProps[] = [];

    pageContent?.icon_our_culture?.map((card: any) =>
      ourCultureIcons.push({
        cardDescription: card?.fields?.content_text,
        cardTitle: card?.fields?.content_title,
        src: card?.fields?.native?.links[0]?.href,
        id: card?.fields?.content_order,
      })
    );

    return formatArrInOrder(ourCultureIcons);
  };

  const formatOurGoalsCarousel = () => {
    const formattedOurGoals: GoalsCardProps[] = [];

    pageContent?.our_goals?.map((card: any, index: string) =>
      formattedOurGoals.push({
        id: card?.fields?.content_order,
        cardDescription: card?.fields?.content_text,
        cardTitle: card?.fields?.content_title,
        src: card?.fields?.native?.links[0]?.href,
      })
    );

    return formatArrInOrder(formattedOurGoals);
  };

  const formatOurAcknowledgmentCarousel = () => {
    const formattedOurAcknowledgment: AcknowledgmentsCardsProps[] = [];

    pageContent?.recognition_initiative?.map((card: any) =>
      formattedOurAcknowledgment.push({
        cardDescription: card?.fields?.content_text,
        cardTitle: card?.fields?.content_title,
        src: card?.fields?.native?.links[0]?.href,
        id: card?.fields?.content_order,
      })
    );

    return formatArrInOrder(formattedOurAcknowledgment);
  };

  const formatCertification = () => {
    const formattedCertification: CertificationsCardProps[] = [];

    pageContent?.certificates_awards?.map((card: any) =>
      formattedCertification.push({
        title: card?.fields.content_title,
        description: card?.fields.content_subtitle,
        src: getImageSrc(isMobile ? card?.mobileObj?.fields : card?.fields),
        id: card?.fields?.content_order,
      })
    );

    return formatArrInOrder(formattedCertification);
  };

  useEffect(() => {
    getPageContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [pageContent, textContent]);

  return (
    <Fragment>
      <Header menu={undefined} />
      <main className="overflow-x-hidden">
        <Banner
          subTitle={pageContent?.banner_about_mills[0]?.fields?.content_title}
          backgroundImage={
            isMobile
              ? pageContent?.banner_about_mills[0]?.mobileObj?.fields?.native
                  .links[0].href
              : pageContent?.banner_about_mills[0]?.fields?.native.links[0].href
          }
          title={pageContent?.banner_about_mills[0]?.fields?.content_title}
          blur="bg-black/[0.6]"
          className="bg-center"
        />

        <About
          title={pageContent?.about_mills[0]?.fields?.content_title}
          description={[pageContent?.about_mills[0]?.fields?.content_text]}
          image={pageContent?.about_mills[0]?.fields?.native?.links[0]?.href}
          alt="Imagem"
          forceImageDisplayOnMobile={true}
          hasButton={false}
          mobileImageFirst={true}
          theme="white"
        />

        <Information
          title={
            textContent?.our_purpose[0]?.fields?.content_text_json[0]?.title
          }
          description={
            textContent?.our_purpose[0]?.fields?.content_text_json[0]?.text
          }
          titleSize="text-base"
          descriptionSize="text-2xl"
        />

        <OurCulture
          cultureCards={formatOurCultureIcons()}
          description={
            textContent?.our_culture[0]?.fields?.content_text_json[0]?.text
          }
          title={
            textContent?.our_culture[0]?.fields?.content_text_json[0]?.title
          }
        />

        <OurGoals
          description={
            textContent?.our_goals[0]?.fields?.content_text_json[0]?.text
          }
          goalsCards={formatOurGoalsCarousel()}
          title={textContent?.our_goals[0]?.fields?.content_text_json[0]?.title}
        />

        <About
          buttonTitle="Conhecer Jornada"
          title={pageContent?.sustainability_journey[0]?.fields?.content_title}
          description={[
            pageContent?.sustainability_journey[0]?.fields?.content_text,
          ]}
          image={
            pageContent?.sustainability_journey[0]?.fields?.native?.links[0]
              ?.href
          }
          alt="Imagem"
          hasButton={true}
          link={pageContent?.sustainability_journey[0]?.fields?.href_attribute}
          theme="beige-200"
          forceImageDisplayOnMobile={true}
        />

        <InformationWithButton
          buttonTitle={textContent?.success_stories[0]?.fields?.buttonText}
          description={textContent?.success_stories[0]?.fields?.text_field[0]}
          title={textContent?.success_stories[0]?.fields?.title}
          buttonColor="bg-white"
          buttonTextColor="text-orange-500"
          imagePosition="bottom"
          dnaColor="white"
          buttonLink={textContent?.success_stories[0]?.fields?.hrefButton[0]}
        />

        <OurAcknowledgments
          acknowledgmentsCards={formatOurAcknowledgmentCarousel()}
          title={textContent?.recognition_initiative_text[0]?.fields?.title}
        />

        <TextWithCarousel
          certificationCard={formatCertification()}
          description={
            textContent?.certifications_awards[0]?.fields?.content_text_json[0]
              ?.text
          }
          theme={
            currentSiteTheme === "rentalHeavy"
              ? "bg-green-800"
              : "bg-orange-500"
          }
          title={
            textContent?.certifications_awards[0]?.fields?.content_text_json[0]
              ?.title
          }
        />

        <MachinesAndPlatforms />
      </main>
      <Footer />
    </Fragment>
  );
};

export default AboutMills;
