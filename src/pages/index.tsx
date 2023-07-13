/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { Footer } from "@/components/shared/Footer/Footer";
import { TrendingInformation } from "@/components/Home/TrendingInformation/TrendingInformation";
import { MeetOurProducts } from "@/components/Home/MeetOurProducts/MeetOurProducts";
import { FindPlatform } from "@/components/Home/FindPlatform/FindPlatform";
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
import { HomeSectionsProps } from "./types";
import { getCMSContent } from "@/utils/content";

export default function Home() {
  const [content, setContent] = useState<HomeSectionsProps>();

  const getContent = useCallback(async () => {
    const contentAux = await getCMSContent("home_leves");
    setContent(contentAux);
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header />
      <main className="h-full bg-white w-full">
        <div className="flex flex-col-reverse tablet:flex-col">
          <BannerCarousel banners={content?.banners} />
          <RequestQuote />
        </div>
        <MeetOurProducts cards={content?.ourProducts} />
        <FindPlatform />
        <Segments />
        <MillsNumbers
          bannerDesktop={content?.numbers.bannerDesktop || ""}
          bannerMobile={content?.numbers.bannerMobile || ""}
        />
        <Newsletter />
        <OurServices serviceCards={content?.ourServices} />
        <SuccessStories />
        <FrequentQuestions />
        <TrendingInformation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
