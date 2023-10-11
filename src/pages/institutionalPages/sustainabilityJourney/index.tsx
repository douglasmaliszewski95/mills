import { Information } from "@/components/Category/Information/Information";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { GlobalImpact } from "@/components/InstitutionalComponents/Globallmpact/GlobalImpact";
import { InterestCards } from "@/components/InstitutionalComponents/InterestCards/InterestCards";
import { IntCardProps } from "@/components/InstitutionalComponents/InterestCards/types";
import { OurAcknowledgments } from "@/components/InstitutionalComponents/OurAcknowledgments/OurAcknowledgments";
import { AcknowledgmentsCardsProps } from "@/components/InstitutionalComponents/OurAcknowledgments/types";
import { PositiveImpactsCarousel } from "@/components/InstitutionalComponents/PositiveImpactsCarousel/PositiveImpactsCarousel";
import { PositiveImpactsCarouselCardsProps } from "@/components/InstitutionalComponents/PositiveImpactsCarousel/types";
import { SustainabilityJourneyButtons } from "@/components/InstitutionalComponents/SustainabilityJourneyButtons";
import {
  SustainabilityJourneyButtonsCardProps,
  odsInterface,
} from "@/components/InstitutionalComponents/SustainabilityJourneyButtons/types";
import { SustainabilityJourneyCarousel } from "@/components/InstitutionalComponents/SustainabilityJourneyCarousel/SustainabilityJourneyCarousel";
import { SustainabilityJourneyCardProps } from "@/components/InstitutionalComponents/SustainabilityJourneyCarousel/types";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { CardProps } from "@/components/shared/Card/types";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";
import { Fragment, useEffect, useState } from "react";

const SustainabilityJourney = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("jornada_de_sustentabilidade");
    const contentText = await getCMSText("jornada_de_sustentabilidade");

    setPageContent(content);
    setTextContent(contentText);
  };

  useEffect(() => {
    getPageContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [pageContent, textContent]);

  const formatSustainabilityJourney = () => {
    const sustainabilityJourney: SustainabilityJourneyCardProps[] = [];

    pageContent?.showcase_sustainability_journey?.map((card: any) => {
      sustainabilityJourney.push({
        id: card?.fields?.content_order,
        image: getImageSrc(isMobile ? card?.mobileObj?.fields : card?.fields),
        description: card?.description,
        text: card?.fields?.content_text,
        title: card?.fields?.content_title,
        links: card?.fields?.href_attribute,
      });
    });

    return formatArrInOrder(sustainabilityJourney);
  };

  const formatSustainabilityJourneyButtons = () => {
    const sustainabilityJourneyButtonsArr: SustainabilityJourneyButtonsCardProps[] =
      [];

    pageContent?.icon_material_themes?.map((card: any) => {
      sustainabilityJourneyButtonsArr.push({
        description: card.description,
        src: getImageSrc(isMobile ? card?.mobileObj?.fields : card?.fields),
        title: card?.fields.content_title,
        id: card?.fields.content_order,
      });
    });

    return formatArrInOrder(sustainabilityJourneyButtonsArr);
  };

  const formatOds = () => {
    const formattedOds: odsInterface[] = [];

    pageContent?.ods_icon_material_themes?.map((od: any) => {
      formattedOds.push({
        description: od?.description,
        src: getImageSrc(od?.fields),
      });
    });

    return formatArrInOrder(formattedOds);
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

  const formatPositiveImpactCard = () => {
    const formattedPositiveImpactCard: PositiveImpactsCarouselCardsProps[] = [];

    pageContent?.carousel_positive_impact?.map((card: any) => {
      formattedPositiveImpactCard.push({
        description: card?.fields?.content_text,
        src: getImageSrc(isMobile ? card?.mobileObj?.fields : card?.fields),
        id: card?.fields?.content_order,
        title: card?.fields?.content_title,
        link: card?.fields?.href_attribute,
        btnTitle: card?.fields?.button_text,
      });
    });

    return formatArrInOrder(formattedPositiveImpactCard);
  };

  const formatInterestCard = () => {
    const formattedInterestCard: IntCardProps[] = [];

    pageContent?.interest.map((card: any) => {
      formattedInterestCard.push({
        buttonText: card.fields.alt_attribute,
        description: card.fields.content_text,
        title: card.fields.content_title,
        src: getImageSrc(isMobile ? card?.mobileObj?.fields : card?.fields),
        id: card.fields.content_order,
        link: card.fields.href_attribute,
      });
    });

    return formatArrInOrder(formattedInterestCard);
  };

  let titleA = "";

  textContent?.icon_material_themes_text?.map((card: any) => {
    if (card?.description === "jornada de sustentabilidade texto01")
      return (titleA = card?.fields?.title);
  });

  const banner = pageContent?.banner_jornada_de_sustentabilidade[0];
  const firstAbout = pageContent?.sustainability_journey[0];

  return (
    <Fragment>
      <Header menu={undefined} />
      <main className="overflow-x-hidden">
        <Banner
          backgroundImage={getImageSrc(
            isMobile ? banner?.mobileObj?.fields : banner?.fields
          )}
          subTitle={banner?.fields?.content_title}
          title={banner?.fields?.content_subtitle}
        />

        <SustainabilityJourneyCarousel cards={formatSustainabilityJourney()} />

        <About
          theme="green-800"
          color="white"
          hasButton={false}
          description={firstAbout?.fields?.content_text}
          image={getImageSrc(
            isMobile ? firstAbout?.mobileObj?.fields : firstAbout?.fields
          )}
          forceImageDisplayOnMobile={true}
          title={firstAbout?.fields?.content_title}
        />

        <SustainabilityJourneyButtons
          cards={formatSustainabilityJourneyButtons()}
          title={titleA}
          link={pageContent?.full_report_pdf[0]?.fields?.native?.links[0]?.href}
          ods={formatOds()}
        />

        <PositiveImpactsCarousel
          cards={formatPositiveImpactCard()}
          title={
            textContent?.carousel_positive_impact_text[0]?.fields
              .content_text_json[0]?.text
          }
        />

        <InformationWithButton
          title={textContent?.reports_text[0]?.fields?.title}
          buttonLink={textContent?.reports_text[0]?.fields?.hrefButton[0]}
          description=""
          theme="bg-orange-500"
          imagePosition="top"
          buttonColor="bg-white"
          buttonTextColor="text-orange-500"
          buttonTitle="Acessar"
          width="w-[70%]"
          paddingY="py-14"
          dnaColor="white"
        />

        <InterestCards
          cards={formatInterestCard()}
          title={textContent?.interest_text[0]?.fields?.title}
        />

        <OurAcknowledgments
          theme="green-800"
          acknowledgmentsCards={formatOurAcknowledgmentCarousel()}
          title={
            textContent?.recognition_initiative_text[0]?.fields
              ?.content_text_json[0]?.text
          }
        />

        <GlobalImpact
          description={
            textContent?.global_compact_text[0]?.fields?.text_field[0]
          }
          firstImage={getImageSrc(
            isMobile
              ? pageContent?.global_compact[1]?.mobileObj?.fields
              : pageContent?.global_compact[1]?.fields
          )}
          secondImage={getImageSrc(
            isMobile
              ? pageContent?.global_compact[0]?.mobileObj?.fields
              : pageContent?.global_compact[0]?.fields
          )}
          title={textContent?.global_compact_text[0]?.fields?.title}
          buttonOne={{
            href:textContent?.global_compact_text[0]?.fields?.hrefButton?.[0],
            title: textContent?.global_compact_text[0]?.fields?.buttonText?.[0],
          }}
          buttonTwo={{
            href: textContent?.global_compact_text[0]?.fields?.hrefButton?.[1],
            title: textContent?.global_compact_text[0]?.fields?.buttonText?.[1],
          }}
        />
      </main>

      <MachinesAndPlatforms />

      <Footer />
    </Fragment>
  );
};

export default SustainabilityJourney;
