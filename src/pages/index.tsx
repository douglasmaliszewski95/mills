/* eslint-disable react-hooks/exhaustive-deps */
import { Footer } from "@/components/shared/Footer/Footer";
import { TrendingInformation } from "@/components/Home/TrendingInformation/TrendingInformation";
import { MeetOurProducts } from "@/components/Home/MeetOurProducts/MeetOurProducts";
import { MillsNumbers } from "@/components/Home/MillsNumbers/MillsNumbers";
import { Segments } from "@/components/Home/Segments/Segments";
import { Newsletter } from "@/components/Home/Newsletter/Newsletter";
import { FrequentQuestions } from "@/components/Home/FrequentQuestions/FrequentQuestions";
import { OurServices } from "@/components/Home/OurServices/OurServices";
import { SuccessStories } from "@/components/Home/SuccessStories/SuccessStories";
import { RequestQuote } from "@/components/Home/RequestQuote/RequestQuote";
import { BannerCarousel } from "@/components/Home/BannerCarousel/BannerCarousel";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Header } from "@/components/shared/Header/Header";
import { getCMSHomeImage } from "@/utils/content";
import { useEffect } from "react";
import { updateParagraphs } from "@/utils/texts";
import { GetServerSideProps } from "next";
import { FindPlatform } from "@/components/Home/FindPlatform/FindPlatform";

export default function Home({ content }: any) {
  useEffect(() => {
    updateParagraphs();
  }, [content]);

  return (
    <>
    {console.log(process.env.NEXT_PUBLIC_API_GRAPHQL)} 
  {console.log(process.env.MILLS_USER)}
  {console.log(process.env.MILLS_SECRET)}
      <Header theme="rentalLight" />
      <main className="h-full bg-white w-full">
        <div className="flex flex-col-reverse tablet:flex-col">
          <BannerCarousel banners={content?.bannersResult} />
          <RequestQuote />
        </div>
        <MeetOurProducts theme="rentalLight" cards={content?.ourProducts} />
        <FindPlatform />
        <Segments
          bgColor="bg-gray-150"
          segments={content?.segments}
          isHome={true}
        />
        <MillsNumbers
          bannerDesktop={content?.bannerNumbers?.[0].image || ""}
          bannerMobile={content?.bannerNumbers?.[0].mobileImage || ""}
          textNumbers={content?.textNumbers}
        />
        <Newsletter />
        <OurServices serviceCards={content?.ourServices} />
        <SuccessStories
          stories={content?.successHistory}
          successHistoryTexts={content?.successHistoryTexts}
        />
        <FrequentQuestions />
        <TrendingInformation millsMagazine={content?.millsMagazine} />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const {
    bannersResult,
    ourProducts,
    segments,
    bannerNumbers,
    ourServices,
    successHistory,
    textNumbers,
    successHistoryTexts,
    millsMagazine,
  } = await getCMSHomeImage();

  const content = {
    bannersResult,
    ourProducts,
    segments,
    bannerNumbers,
    ourServices,
    successHistory,
    textNumbers,
    successHistoryTexts,
    millsMagazine,
  };
  console.log(process.env.NEXT_PUBLIC_API_GRAPHQL); 
  console.log(process.env.MILLS_USER);
  console.log(process.env.MILLS_SECRET);

  return {
    props: {
      content: content || [],
    },
  };
};
