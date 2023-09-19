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
import { RentalElevatingPlatforms } from "@/components/Home/RentalElevatingPlatforms/RentalElevatingPlatforms";
import { useGetCMSHeavyHome } from "@/services/hooks/useGetCMSHeavyHome";
import { FindMachines } from "@/components/HeavyMachines/components/FindMachines/FIndMachines";
import { HeavySegments } from "@/components/HeavyMachines/components/HeavySegments/HeavySegments";

export default function HeavyMachine() {
  const content = useGetCMSHeavyHome();
  console.log(content?.segments);
  return (
    <>
      <Header />
      <main className="h-full bg-white w-full">
        <div className="flex flex-col-reverse tablet:flex-col">
          <BannerCarousel banners={content?.bannersResult} />
          <RequestQuote />
        </div>
        <MeetOurProducts
          isCarrossel
          theme="rentalHeavy"
          cards={content?.ourProducts}
        />

        <RentalElevatingPlatforms
          content={content?.bannerRentalLiftingPlatforms}
        />
        <FindMachines />
        <HeavySegments
          theme="rentalHeavy"
          segments={content?.segments}
          isHome={true}
        />
        <MillsNumbers
          bannerDesktop={content?.bannerNumbers?.[0].image || ""}
          bannerMobile={content?.bannerNumbers?.[0].mobileImage || ""}
          textNumbers={content?.textNumbers}
        />
        <Newsletter />
        <OurServices theme="rentalHeavy" serviceCards={content?.ourServices} />
        <SuccessStories
          stories={content?.successHistory}
          successHistoryTexts={content?.successHistoryTexts}
          theme="rentalHeavy"
        />
        <FrequentQuestions theme="rentalHeavy" />
        <TrendingInformation
          theme="rentalHeavy"
          millsMagazine={content?.millsMagazine}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer theme="rentalHeavy" />
    </>
  );
}
