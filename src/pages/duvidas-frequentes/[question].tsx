import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Footer } from "@/components/shared/Footer/Footer";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Banner } from "@/components/shared/Banner/Banner";
import { Header } from "@/components/shared/Header/Header";
import { useRouter } from "next/router";
import _ from "lodash";
import { CartModal } from "@/components/shared/CartModal/CartModal";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import chevronLeft from "@/assets/large-orange-chevron-left.svg";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import { updateParagraphs } from "@/utils/texts";

export default function QuestionDetails() {
  const router = useRouter();
  const [banner, setBanner] = useState<any>();
  const [knowOurProducts, setKnowOurProducts] = useState<any>();
  const [faqQuestion, setFaqQuestion] = useState<any>();
  const [svgGreenColor, setSvgGreenColor] = useState<string>("#404040");
  const [svgRedColor, setSvgRedColor] = useState<string>("#404040");
  const { isMobile } = useScreenWidth();

  const { currentSiteTheme } = useContext(currentSiteThemeContext);

  const getContent = useCallback(async () => {
    const [images, texts]: any = await Promise.all([
      getImage("duvidas_frequentes"),
      getText("faq")
    ]);  

    const question = router.isReady
      ? `/duvidas-frequentes/${router.query.question}`
      : `/duvidas-frequentes/${window.location.pathname.substring(
        "/duvidas-frequentes/".length
      )}`;

    setBanner({
      img: images?.banner_faq_light?.[0].fields.native.links[0].href,
      title: images?.banner_faq_light?.[0].fields.content_title,
      imgMobile:
        images?.banner_faq_light?.[0].mobileObj.fields.native.links[0].href,
    });

    setKnowOurProducts({
      img: images?.know_our_products?.[0].fields.native.links[0].href,
      title: images?.know_our_products?.[0].fields.content_title,
      text: images?.know_our_products?.[0].fields.content_text,
    });

    const faqQuestion = texts?.faq_questions?.find(
      (x: any) => x.fields.hrefButton[0] === question
    );
    setFaqQuestion({
      title: faqQuestion?.fields.title,
      text: faqQuestion?.fields.text_field[0],
      categories: faqQuestion?.fields.subtitle,
      href: faqQuestion?.fields.hrefButton[0],
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [faqQuestion, knowOurProducts, banner]);

  const goBack = () => {
    router.push("/duvidas-frequentes");
  };

  return (
    <>
      <Header />
      <main>
        <Banner
          subTitle={banner?.title}
          title={banner?.title}
          backgroundImage={isMobile ? banner?.mobileObj : banner?.img}
          blur="bg-black/50"
        />
        <section className="flex justify-center bg-gray-50 font-ibm-font tablet:px-3">
          <div className="container justify-center py-5">
            <div className="flex cursor-pointer" onClick={() => goBack()}>
              <Image
                src={chevronLeft}
                height={18}
                alt="Seta apontada para a esquerda"
              />
              <p className="text-orange-500 text-sm pl-3">Voltar</p>
            </div>
            <div className="flex pt-5">
              {faqQuestion?.categories?.map((category: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="h-fit flex border-[1px] border-orange-500 rounded pl-3 pr-3 py-1 ml-1 gap-1 justify-between"
                  >
                    <p className="text-green-800 text-xs">{category}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-green-800 text-2xl font-bold py-5">
              {faqQuestion?.title}
            </p>
            <p>{faqQuestion?.text}</p>
            <p className="flex py-7">
              Esse conteúdo foi útil para você?
              <button
                type="button"
                className="ml-3 cursor-pointer"
                onClick={() => setSvgGreenColor(svgGreenColor === "#22bb33" ? "#404040" : "#22bb33")}
              >
                <svg width="30" height="18" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 26.25H5.45455V10.5H0V26.25ZM30 11.8125C30 10.3687 28.7727 9.1875 27.2727 9.1875H18.6682L19.9636 3.18938L20.0045 2.76937C20.0045 2.23125 19.7727 1.7325 19.4045 1.37812L17.9591 0L8.98636 8.64937C8.48182 9.12187 8.18182 9.77812 8.18182 10.5V23.625C8.18182 25.0688 9.40909 26.25 10.9091 26.25H23.1818C24.3136 26.25 25.2818 25.5938 25.6909 24.6488L29.8091 15.3956C29.9318 15.0937 30 14.7788 30 14.4375V11.8125Z" fill={svgGreenColor} />
                </svg>
              </button>
              <button
                type="button"
                className="ml-1 cursor-pointer"
                onClick={() => setSvgRedColor(svgRedColor === "#bb2124" ? "#404040" : "#bb2124")}
              >
                <svg width="31" height="18" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.9659 0H7.69318C6.56136 0 5.59318 0.75 5.18409 1.83L1.06591 12.405C0.943182 12.75 0.875 13.11 0.875 13.5V16.5C0.875 18.15 2.10227 19.5 3.60227 19.5H12.2068L10.9114 26.355L10.8705 26.835C10.8705 27.45 11.1023 28.02 11.4705 28.425L12.9159 30L21.9023 20.115C22.3932 19.575 22.6932 18.825 22.6932 18V3C22.6932 1.35 21.4659 0 19.9659 0ZM25.4205 0V18H30.875V0H25.4205Z" fill={svgRedColor} />
                </svg>
              </button>
            </p>
          </div>
        </section>
        <ExpertRecommendation />
        <RightImgWithLeftText
          headerText={knowOurProducts?.title}
          text={knowOurProducts?.text}
          img={knowOurProducts?.img}
          bgColor={
            currentSiteTheme === "rentalLight"
              ? "bg-orange-500"
              : "bg-green-800"
          }
          buttonProps={{ text: "Ver modelos" }}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
      <CartModal />
    </>
  );
}
