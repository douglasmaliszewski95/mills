import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { AboutWithButton } from "@/components/InstitutionalComponents/AboutWithButtons/AboutWithButtons";
import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getImageSrc } from "@/utils/images";
import { Fragment, useContext, useEffect, useState } from "react";

const WorkWithUs = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();
  const { currentSiteTheme } = useContext(currentSiteThemeContext);

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("trabalhe_conosco");
    const contentText = await getCMSText("trabalhe_conosco");
    setPageContent(content);
    setTextContent(contentText);
  };

  useEffect(() => {
    getPageContent();
  }, []);

  return (
    <Fragment>
      <Header />
      <main>
        <Banner
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_trabalhe_conosco[0]?.mobileObj?.fields
              : pageContent?.banner_trabalhe_conosco[0]?.fields
          )}
          title={"Venha fazer parte do time Mills."}
          subTitle="Trabalhe Conosco"
          buttonLink={
            pageContent?.banner_trabalhe_conosco[0]?.fields?.href_attribute
          }
          buttonTitle={
            pageContent?.banner_trabalhe_conosco[0]?.fields?.button_text
          }
        />

        <About
          description={pageContent?.work_with_us[0]?.fields?.content_text}
          image={getImageSrc(
            isMobile
              ? pageContent?.work_with_us[0]?.mobileObj?.fields
              : pageContent?.work_with_us[0]?.fields
          )}
          title={pageContent?.work_with_us[0]?.fields?.content_title}
          buttonTitle={pageContent?.work_with_us[0]?.fields?.button_text}
          theme="white"
          link={pageContent?.work_with_us[0]?.fields?.href_attribute}
          showDna={isMobile ? false : true}
          dnaColor="#ebe3c7"
        />

        <About
          description={pageContent?.work_with_us[1]?.fields?.content_text}
          image={getImageSrc(
            isMobile
              ? pageContent?.work_with_us[1]?.mobileObj?.fields
              : pageContent?.work_with_us[1]?.fields
          )}
          title={pageContent?.work_with_us[1]?.fields?.content_title}
          theme="beige-200"
          showDna={false}
          orientation="inverted"
          buttonTitle={pageContent?.work_with_us[1]?.fields?.button_text}
          link={pageContent?.work_with_us[1]?.fields?.href_attribute}
        />

        <About
          description=""
          image={getImageSrc(
            isMobile
              ? pageContent?.work_with_us[2]?.mobileObj?.fields
              : pageContent?.work_with_us[2]?.fields
          )}
          title={pageContent?.work_with_us[2]?.fields?.content_text}
          theme="white"
          forceImageDisplayOnMobile={true}
          showDna={false}
          hasButton={false}
        />

        <About
          description={pageContent?.work_with_us[3]?.fields?.content_text}
          image={getImageSrc(
            isMobile
              ? pageContent?.work_with_us[3]?.mobileObj?.fields
              : pageContent?.work_with_us[3]?.fields
          )}
          title={pageContent?.work_with_us[3]?.fields?.content_title}
          orientation="inverted"
          theme={
            currentSiteTheme === "rentalHeavy" ? "green-800" : "orange-500"
          }
          showDna={false}
          color="white"
          link={pageContent?.work_with_us[3]?.fields?.href_attribute}
          hasButton={true}
          buttonTitle={pageContent?.work_with_us[3]?.fields?.button_text}
          costumizedButtonClass={
            currentSiteTheme === "rentalHeavy"
              ? "bg-transparent border-[1px] border-white"
              : ""
          }
        />

        <MachinesAndPlatforms />
      </main>
      <Footer />
    </Fragment>
  );
};

export default WorkWithUs;
