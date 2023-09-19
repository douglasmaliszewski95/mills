import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import banner from "@/assets/img/elevatingPlatforms.jpg";

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

export default function AssemblyStructure() {
  const [infosToShow, setInfosToShow] = useState<any>(null);
  const { banner } = useGetCMSAssemblyStructure();

  useEffect(() => {
    setInfosToShow(assemblyStructureMock);
  }, []);

  return (
    <>
      <Header />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Segmentos",
              href: "#",
            },
            { name: infosToShow?.banner.title, href: "#" },
          ]}
          title={banner?.title}
          backgroundImage={banner?.src}
        />
        <LeftImgWithRightText
          img={infosToShow?.sectionWithLeftImage.image}
          headerText={infosToShow?.sectionWithLeftImage?.headerText}
          paragraphText={infosToShow?.sectionWithLeftImage?.paragraphText}
        />
        <RightImgWithLeftText
          img={infosToShow?.sectionWithLeftTextRightImage?.image}
          headerText={infosToShow?.sectionWithLeftTextRightImage?.headerText}
          text={infosToShow?.sectionWithLeftTextRightImage?.text}
          buttonProps={infosToShow?.sectionWithLeftTextRightImage?.buttonProps}
          bgColor="bg-orange-500"
        />
        <LiftingPlatforms
          headerText={infosToShow?.liftingPlatforms.headerText}
          textCards={infosToShow?.liftingPlatforms.textCards}
        />
        <WhyRestAerialPlatforms
          headerText={infosToShow?.whyRestAerialPlatforms.headerText}
          whyList={infosToShow?.whyRestAerialPlatforms.whyList}
        />
        <Platforms bgColor="bg-beige-200" />
        <TalkToSpecialist />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
