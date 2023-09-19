import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Footer } from "@/components/shared/Footer/Footer";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
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
import like from "@/assets/like.svg";
import dislike from "@/assets/dislike.svg";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import { HtmlRenderer } from "@/components/HtmlRender/htmlRender";

export default function QuestionDetails() {
  const router = useRouter();
  const [banner, setBanner] = useState<any>();
  const [knowOurProducts, setKnowOurProducts] = useState<any>();
  const [faqQuestion, setFaqQuestion] = useState<any>();
  const { isMobile } = useScreenWidth();

  const { currentSiteTheme } = useContext(currentSiteThemeContext);

  const getContent = useCallback(async () => {
    const images = await getImage("duvidas_frequentes");
    const texts = await getText("faq");

    const question = router.isReady ? `/duvidas-frequentes/${router.query.question}` : `/duvidas-frequentes/${window.location.pathname.substring("/duvidas-frequentes/".length)}`;

    setBanner({
      img: images?.banner_faq_light?.[0].fields.native.links[0].href,
      title: images?.banner_faq_light?.[0].fields.content_title,
      imgMobile: images?.banner_faq_light?.[0].mobileObj.fields.native.links[0].href
    });

    setKnowOurProducts({
      img: images?.know_our_products?.[0].fields.native.links[0].href,
      title: images?.know_our_products?.[0].fields.content_title,
      text: images?.know_our_products?.[0].fields.content_text
    });

    const faqQuestion = texts?.faq_questions?.find((x: any) => x.fields.hrefButton[0] === question);
    setFaqQuestion({
      title: faqQuestion?.fields.title,
      text: faqQuestion?.fields.text_field[0],
      categories: faqQuestion?.fields.subtitle,
      href: faqQuestion?.fields.hrefButton[0]
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  const goBack = () => {
    router.push("/duvidas-frequentes");
  }

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
                return <div
                  key={index}
                  className="h-fit flex border-[1px] border-orange-500 rounded pl-3 pr-3 py-1 ml-1 gap-1 justify-between"
                >
                  <p className="text-green-800 text-xs">{category}</p>
                </div>
              })}
            </div>
            <p className="text-green-800 text-2xl font-bold py-5">
              {faqQuestion?.title}
            </p>
            <HtmlRenderer htmlContent={faqQuestion?.text} />
            <p className="flex py-7">
              Esse conteúdo foi útil para você?
              <Image
                src={like}
                height={18}
                alt="Like"
                className="ml-3 cursor-pointer"
                onClick={() => console.log("Like")}
              />
              <Image
                src={dislike}
                height={18}
                alt="dislike"
                className="ml-3 cursor-pointer"
                onClick={() => console.log("Dislike")}
              />
            </p>
          </div>
        </section>
        <ExpertRecommendation />
        <RightImgWithLeftText
          headerText={knowOurProducts?.title}
          text={knowOurProducts?.text}
          img={knowOurProducts?.img}
          bgColor={currentSiteTheme === 'rentalLight' ? "bg-orange-500" : "bg-green-800"}
          buttonProps={{ text: "Ver modelos" }}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
      <CartModal />
    </>
  );
}
