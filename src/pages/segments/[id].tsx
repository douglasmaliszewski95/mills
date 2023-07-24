import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { mobileMenuInfo } from "@/components/shared/Navbar/utils";
import checkCircle from "@/assets/check-circle.svg";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Banner } from "@/components/shared/Banner/Banner";
import banner from "@/assets/img/elevatingPlatforms.jpg";

import { HeaderMenu } from "@/components/shared/Header/HeaderMenu/HeaderMenu";
import { RequestQuoteFormType } from "@/types";
import { LeftImgWithRightText } from "@/components/ProductTypeAndSegment/LeftImgWithRightText";
import { RightImgWithLeftButtons } from "@/components/ProductTypeAndSegment/RightImgWithLeftButtons";
import { Benefits } from "@/components/ProductTypeAndSegment/Benefits";

import { Platforms } from "@/components/ProductTypeAndSegment/Platforms";
import { TalkToSpecialist } from "@/components/ProductTypeAndSegment/TalkToSpecialist";
import { useRouter } from "next/router";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import {
  building,
  clean,
  industrial,
  maintenance,
  organization,
} from "@/components/ProductTypeAndSegment/utils";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { DividerText } from "@/components/ProductTypeAndSegment/DividerText";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infosToShow, setInfosToShow] = useState<any>(null);

  useEffect(() => {
    if (id === "instalacao-e-manutencao-industrial") setInfosToShow(industrial);
    if (id === "construcao-e-edificacao") setInfosToShow(building);
    if (id === "pintura-e-limpeza-em-altura") setInfosToShow(clean);
    if (id === "instalacao-e-manutencao-predial") setInfosToShow(maintenance);
    if (id === "inventario-e-organizacao-do-estoque")
      setInfosToShow(organization);
  }, [id]);

  const sendAlert = () => {
    window.scrollTo(0, 0);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 4000);
  };

  const onSubmit = (data: RequestQuoteFormType) => {
    setIsMenuOpen(false);
    sendAlert();
  };

  return isMenuOpen ? (
    <HeaderMenu
      menuInfo={mobileMenuInfo}
      setIsMenuOpen={setIsMenuOpen}
      onSubmit={onSubmit}
    />
  ) : (
    <>
      <Navbar setIsMenuOpen={setIsMenuOpen} />
      <main className="h-full bg-white w-full font-ibm-font">
        {isModalOpen && (
          <Dialog.Root open={isModalOpen}>
            <Dialog.Trigger />
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="py-9 px-3 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white focus:outline-none">
                <div className="flex items-center gap-4 flex-col">
                  <img src={checkCircle} alt="green right check" />
                  <Dialog.Title className="text-green-800 text-sm font-semibold text-center">
                    Sua solicitação foi enviada com sucesso! Em breve um
                    especialista entrará em contato
                  </Dialog.Title>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
        <Banner
          linkList={[
            {
              name: "Segmentos",
              href: "#",
            },
            { name: infosToShow?.banner.title, href: "#" },
          ]}
          title={infosToShow?.banner.title}
          backgroundImage={banner.src}
        />
        <LeftImgWithRightText
          img={infosToShow?.sectionWithLeftImage.image}
          headerText={infosToShow?.sectionWithLeftImage?.headerText}
          paragraphText={infosToShow?.sectionWithLeftImage?.paragraphText}
        />
        {infosToShow?.sectionJustWithText && (
          <DividerText text={infosToShow?.sectionJustWithText?.text} />
        )}

        {infosToShow?.sectionWithRightImage && (
          <RightImgWithLeftButtons
            img={infosToShow?.sectionWithRightImage?.image}
            headerText={infosToShow?.sectionWithRightImage?.headerText}
            textCards={infosToShow?.sectionWithRightImage?.textCards}
            buttonProps={infosToShow?.sectionWithRightImage?.buttonProps}
            width={
              infosToShow?.sectionWithRightImage?.textCards.length >= 8
                ? ""
                : undefined
            }
            imageHeight={
              infosToShow?.sectionWithRightImage?.textCards.length >= 8
                ? "h-[564px]"
                : undefined
            }
          />
        )}
        {infosToShow?.sectionWithLeftTextRightImage && (
          <RightImgWithLeftText
            img={infosToShow?.sectionWithLeftTextRightImage?.image}
            headerText={infosToShow?.sectionWithLeftTextRightImage?.headerText}
            text={infosToShow?.sectionWithLeftTextRightImage?.text}
            buttonProps={
              infosToShow?.sectionWithLeftTextRightImage?.buttonProps
            }
          />
        )}
        {infosToShow?.sectionWithLeftTextRightImageGreen && (
          <LeftImgWithRightText
            img={infosToShow?.sectionWithLeftTextRightImageGreen.image}
            headerText={
              infosToShow?.sectionWithLeftTextRightImageGreen?.headerText
            }
            paragraphText={
              infosToShow?.sectionWithLeftTextRightImageGreen?.text
            }
            buttonProps={
              infosToShow?.sectionWithLeftTextRightImageGreen?.buttonProps
            }
            variant="green"
          />
        )}

        <Benefits
          headerText={infosToShow?.benefits.headerText}
          cards={infosToShow?.benefits.cards}
        />
        {infosToShow?.opinion && (
          <Opinion
            headerText={infosToShow?.opinion.headerText}
            paragraphText={infosToShow?.opinion.paragraphText}
            spanText={infosToShow?.opinion.spanText}
            testimonial={infosToShow?.opinion.testimonial}
          />
        )}
        {infosToShow?.platforms && (
          <Platforms
            headerText={infosToShow?.platforms.headerText}
            image={infosToShow?.platforms.image}
            cards={infosToShow?.platforms.cards}
          />
        )}

        <TalkToSpecialist
          headerText={infosToShow?.talkToSpecialist.headerText}
          buttonProps={infosToShow?.talkToSpecialist.buttonProps}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
