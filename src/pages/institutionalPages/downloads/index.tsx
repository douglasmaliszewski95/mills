import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { DownloadsComponent } from "@/components/InstitutionalComponents/DownloadsComponent/DownloadsComponent";
import { DownloadsCardProps } from "@/components/InstitutionalComponents/DownloadsComponent/types";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { formatArrInOrder } from "@/utils/formatArrInOrder";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";
import { Fragment, useState, useEffect } from "react";

export default function Downloads() {
  const [pageContent, setPageContent] = useState<any>();

  const { isMobile } = useScreenWidth();

  const getPageContent = async () => {
    const content = await getCMSContent("downloads");
    setPageContent(content);
  };

  useEffect(() => {
    getPageContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [pageContent]);

  const formatDownloads = () => {
    let formattedDownloads: DownloadsCardProps[] = []

    pageContent?.pdf?.map((item: any) => {
      formattedDownloads.push({
        file: item?.fields?.native?.links[0]?.href,
        subtitle: item?.fields?.content_subtitle,
        title: item?.fields?.content_title,
        id: item?.fields?.content_order
      })
    })

    return formatArrInOrder(formattedDownloads);
  }

  return (
    <Fragment>
      <Header menu={undefined}/>
      <main>
        <Banner
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_downloads[0]?.mobileObj?.fields
              : pageContent?.banner_downloads[0]?.fields
          )}
          title={pageContent?.banner_downloads[0]?.fields?.content_text}
          subTitle={pageContent?.banner_downloads[0]?.fields?.content_title}
        />
        
        <DownloadsComponent downloadCards={formatDownloads()} />

        <MachinesAndPlatforms />
      </main>
      <Footer />
    </Fragment>
  );
}
