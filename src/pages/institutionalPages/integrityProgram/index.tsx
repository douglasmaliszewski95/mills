import { Information } from "@/components/Category/Information/Information";
import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { IntegrityAndQuality } from "@/components/InstitutionalComponents/IntegrityAndQuality/IntegrityAndQuality";
import { IntegrityAndQualityModalProps } from "@/components/InstitutionalComponents/IntegrityAndQuality/types";
import { RelationshipManual } from "@/components/InstitutionalComponents/RelationshipManual/RelationshipManual";
import { ReportingChannel } from "@/components/InstitutionalComponents/ReportingChannel/ReportingChannel";
import { About } from "@/components/shared/About/About";
import { AboutTwoButtons } from "@/components/shared/AboutTwoButtons/AboutTwoButtons";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { ImageCMS } from "@/types";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";
import { Fragment, useEffect, useState } from "react";

const IntegrityProgram = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const [codigoConduta, setCodigoConduta] = useState<any>();
  const [ictsContent, setIctsContent] = useState<any>();
  const [reportingChannel, setReportingChannel] = useState<ImageCMS>();
  const [firstContentTitle, setFirstContentTitle] = useState<any>();

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("programa_de_integridade");
    const contentText = await getCMSText("programa_de_integridade");
    setPageContent(content);
    setTextContent(contentText);

    content?.integrity_program?.map((item: any) => {
      if (item.description === "programa de integridade02")
        setCodigoConduta(item);
      if (item.description === "programa de integridade04")
        setIctsContent(item);
      if (item.description === "programa de integridade03")
        setReportingChannel(item);
    });
    contentText?.integrity_first_content?.map((item: any) => {
      if (item.description === "integrity first content title")
        setFirstContentTitle(item);
    });
  };

  const formatIntegrityButtons = () => {
    let formattedIntegrityButtons: IntegrityAndQualityModalProps[] = [];

    textContent?.integrity_first_content?.map((item: any) => {
      if (item.description !== "integrity first content title") {
        formattedIntegrityButtons.push({
          description: item?.fields?.text_field,
          title: item?.fields?.title,
          id: item?.fields?.content_order,
        });
      }
    });

    return formatArrInOrder(formattedIntegrityButtons);
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
      <main>
        <Banner
          width={isMobile ? "w-[100%]" : "w-[65%]"}
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_integrity_program[0]?.mobileObj.fields
              : pageContent?.banner_integrity_program[0]?.fields
          )}
          title={
            isMobile
              ? pageContent?.banner_integrity_program[0]?.mobileObj.fields
                  .content_text
              : pageContent?.banner_integrity_program[0]?.fields.content_text
          }
          subTitle={
            isMobile
              ? pageContent?.banner_integrity_program[0]?.mobileObj.fields
                  .content_title
              : pageContent?.banner_integrity_program[0]?.fields.content_title
          }
        />

        <IntegrityAndQuality
          buttons={formatIntegrityButtons()}
          description={firstContentTitle?.fields?.text_field[0]}
          title={firstContentTitle?.fields?.title}
        />

        <Information
          width={isMobile ? "w-[100%]" : "w-[90%]"}
          titleSize="text-3xl"
          title={textContent?.set_of_mechanisms[0]?.fields?.text_field[0]}
        />

        <About
          theme="white"
          color="green-800"
          hasButton={true}
          description={codigoConduta?.fields?.content_text}
          image={getImageSrc(
            isMobile ? codigoConduta?.mobileObj?.fields : codigoConduta?.fields
          )}
          link={codigoConduta?.fields?.href_attribute}
          forceImageDisplayOnMobile={true}
          orientation="inverted"
          buttonTitle={codigoConduta?.fields?.button_text ? codigoConduta?.fields?.button_text : 'Acessar código' } 
          title={codigoConduta?.fields?.content_title}
        />

        <RelationshipManual
          description={
            textContent?.relationship_policy_manual[0]?.fields?.text_field[0]
          }
          firstBtn={{
            link: textContent?.relationship_policy_manual[0]?.fields
              .hrefButton[0],
            title:
              textContent?.relationship_policy_manual[0]?.fields.buttonText[0],
          }}
          secondBtn={{
            link: textContent?.relationship_policy_manual[0]?.fields
              .hrefButton[1],
            title:
              textContent?.relationship_policy_manual[0]?.fields.buttonText[1],
          }}
          title={textContent?.relationship_policy_manual[0]?.fields?.title}
        />

        <ReportingChannel
          src={getImageSrc(
            isMobile
              ? reportingChannel?.mobileObj?.fields
              : reportingChannel?.fields
          )}
        />

        <AboutTwoButtons
          description=""
          firstBtn={{
            link: textContent?.integrity_program[1]?.fields?.hrefButton[0],
            title: textContent?.integrity_program[1]?.fields?.buttonText[0],
          }}
          image={getImageSrc(
            isMobile ? ictsContent?.mobileObj.fields : ictsContent?.fields
          )}
          secondBtn={{
            link: textContent?.integrity_program[0]?.fields?.hrefButton[0],
            title: textContent?.integrity_program[0]?.fields?.buttonText[0],
          }}
          title={ictsContent?.fields?.content_text}
        />

        <MachinesAndPlatforms />
      </main>
      <Footer />
    </Fragment>
  );
};

export default IntegrityProgram;
