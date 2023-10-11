import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";

import { LeftImgWithRightText } from "@/components/ProductTypeAndSegment/LeftImgWithRightText";

import { Platforms } from "@/components/ProductTypeAndSegment/Platforms";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { DividerText } from "@/components/ProductTypeAndSegment/DividerText";
import MillsServices from "@/components/Others/MillsServices";
import { LeftImgWithRightTextAndBg } from "@/components/Others/LeftImgWithRightTextAndBg";

import { Loading } from "@/components/Loading/Loading";
import { useGetCMSOtherPage } from "@/services/hooks/useGetCMSOtherPage";
import { Header } from "@/components/shared/Header/Header";
import { AlwaysLeftImgWithRightText } from "@/components/ProductTypeAndSegment/AlwaysLeftImgWithRightText";
import { AlwaysRightImgWithLeftText } from "@/components/ProductTypeAndSegment/AlwaysRightImgWithLeftText";
import { updateParagraphs } from "@/utils/texts";
import { useEffect } from "react";

export default function Others() {
  const {
    banner,
    millsServices,
    graffitiAndUrban,
    harvestingMachines,
    muralPainting,
    verticalCemetery,
    cheeseDrying,
    movementOfPartsStock,
    millsHasTheSolution,
    otherTexts,
  } = useGetCMSOtherPage();

  useEffect(() => {
    updateParagraphs();
  }, [
    banner,
    millsServices,
    graffitiAndUrban,
    harvestingMachines,
    muralPainting,
    verticalCemetery,
    cheeseDrying,
    movementOfPartsStock,
    millsHasTheSolution,
    otherTexts,
  ]);

  return (
    <>
      <Loading open={true} />
      <Header />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Segmentos",
              href: "/plataformas-elevatorias",
            },
            { name: banner?.title, href: "#" },
          ]}
          title={banner?.title}
          backgroundImage={banner?.backgroundImage}
        />
        <MillsServices
          headerText={millsServices?.header}
          cardList={millsServices?.cardList}
        />
        <DividerText text={otherTexts?.divider} />
        <AlwaysLeftImgWithRightText
          img={graffitiAndUrban?.image}
          headerText={graffitiAndUrban?.headerText}
          paragraphText={graffitiAndUrban?.paragraphText}
        />
        <AlwaysRightImgWithLeftText
          img={harvestingMachines?.image}
          headerText={harvestingMachines?.headerText}
          text={harvestingMachines?.paragraphText}
          bgColor="bg-orange-500"
          bgImage={true}
        />
        <LeftImgWithRightText
          img={muralPainting?.image}
          headerText={muralPainting?.headerText}
          paragraphText={muralPainting?.paragraphText}
          reverse={false}
        />
        <RightImgWithLeftText
          img={verticalCemetery?.image}
          headerText={verticalCemetery?.headerText}
          text={verticalCemetery?.paragraphText}
          bgColor="bg-brown-100"
          textColor="text-green-800"
          showMobile={true}
          reverse
          bgWidth="w-[605px]"
        />
        <LeftImgWithRightText
          img={cheeseDrying?.image}
          headerText={cheeseDrying?.headerText}
          paragraphText={cheeseDrying?.paragraphText}
          bgImage={true}
          reverse={false}
          paddingBottom="pb-14"
        />
        <LeftImgWithRightText
          img={movementOfPartsStock?.image}
          headerText={movementOfPartsStock?.headerText}
          paragraphText={movementOfPartsStock?.paragraphText}
          variant="green"
        />

        <Platforms bgColor="bg-beige-200" />
        <LeftImgWithRightTextAndBg
          img={millsHasTheSolution?.image}
          headerText={millsHasTheSolution?.headerText}
          buttonProps={{ text: "Fale com um especialista" }}
          bgImage={true}
          isTalkToSpecialist
        />

        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
