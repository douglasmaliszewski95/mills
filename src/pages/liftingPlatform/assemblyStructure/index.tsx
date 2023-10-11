import { useEffect, useState } from "react";
// import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
// import banner from "@/assets/img/elevatingPlatforms.jpg";
import { LeftImgWithRightText } from "@/components/ProductTypeAndSegment/LeftImgWithRightText";
import { Platforms } from "@/components/ProductTypeAndSegment/Platforms";
import { TalkToSpecialist } from "@/components/ProductTypeAndSegment/TalkToSpecialist";
import { assemblyStructureMock } from "@/components/ProductTypeAndSegment/utils";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { LiftingPlatforms } from "@/components/AssemblyStructure/LiftingPlatforms";
import { WhyRestAerialPlatforms } from "@/components/WhyRestAerialPlatforms/WhyRestAerialPlatforms";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { updateParagraphs } from "@/utils/texts";

export default function AssemblyStructure() {
  //const [infosToShow, setInfosToShow] = useState<any>(null);
  const {
    banner,
    firstSegment,
    secondSegment,
    segmentCards,
    icons
  } = useGetCMSAssemblyStructure();

  useEffect(() => {
    updateParagraphs();
  }, [banner,
    firstSegment,
    secondSegment,
    segmentCards,
    icons]);

  // useEffect(() => {
  //   setInfosToShow(assemblyStructureMock);
  // }, []);

  return (
    <>
      <Header />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Segmentos",
              href: "/plataformas-elevatorias",
            },
            {
              name: banner?.title,
              href: "/plataformas-elevatorias/montagem-de-estrutura-para-eventos",
            },
          ]}
          title={banner?.title}
          backgroundImage={banner?.img}
        />
        <LeftImgWithRightText
          img={firstSegment?.img}
          headerText={firstSegment?.title}
          paragraphText={firstSegment?.text}
        />
        <RightImgWithLeftText
          img={secondSegment?.img}
          headerText={secondSegment?.title}
          text={secondSegment?.text}
          bgColor="bg-orange-500"
        />
        <LiftingPlatforms
          headerText={segmentCards?.title}
          textCards={segmentCards?.cards}
          buttonProps={{link: segmentCards?.link, text: segmentCards?.btnText}}
        />
        <WhyRestAerialPlatforms
          headerText={icons?.title}
          whyList={icons?.icons}
        />
        <Platforms bgColor="bg-beige-200" />
        <TalkToSpecialist />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
