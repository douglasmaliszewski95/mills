/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import { FrequentQuestions } from "@/components/Home/FrequentQuestions/FrequentQuestions";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { ContactForm } from "@/components/Contact/ContactForm";
import { getImage } from "@/services/hooks/getImage";
import { ContactFormProps } from "@/components/Contact/types";
import { SubmitHandler } from "react-hook-form";
import { useCallback, useContext, useEffect, useState } from "react";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";

export default function Contact() {
  const [content, setContent] = useState<any>();
  const getContent = useCallback(async () => {
    const images = await getImage("fale_conosco");

    const banner = {
      img: images?.banner_contact_us?.[0].fields.native.links[0].href,
      title: images?.banner_contact_us?.[0].fields.content_title,
    };

    const formImg = images?.form_contact_us?.[0].fields.native.links[0].href;
    const knowOurProducts = {
      img: images?.know_our_products?.[0].fields.native.links[0].href,
      title: images?.know_our_products?.[0].fields.content_title,
      text: images?.know_our_products?.[0].fields.content_text,
    };
    setContent({
      banner: banner || null,
      formImg: formImg || null,
      knowOurProducts: knowOurProducts || null,
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);
  const handleSubmit: SubmitHandler<ContactFormProps> = (data) => {
    console.log(data);
    //sendAlert();
  };
  const { currentSiteTheme } = useContext(currentSiteThemeContext);

  return (
    <>
      <Header />
      <main>
        <Banner
          subTitle="Fale conosco"
          title={content?.banner?.title}
          backgroundImage={content?.banner?.img}
          blur="bg-black/50"
        />
        <section className="flex justify-center text-white bg-green-800 bg-no-repeat bg-right-bottom tablet:px-4">
          <div className="container tablet:flex-col-reverse">
            <h3 className="whitespace-pre-line text-2xl pt-10 tablet:text-sm tablet:pt-8 tablet:pb-3">
              Central de Relacionamento: 0800 705 1000
            </h3>
            <h3 className="whitespace-pre-line text-2xl pb-10 tablet:text-sm tablet:pt-3 tablet:pb-8">
              Horário de atendimento: Segunda a sexta, das 7 às 18h | Sábados,
              das 8h às 12h
            </h3>
          </div>
        </section>
        <ContactForm
          img={content?.formImg}
          headerText="Em até 24 horas, um de nossos especialistas entrará em contato para tirar suas dúvidas e te ajudar a encontrar o equipamento ideal."
          paragraphText="Declaro que li e concordo com o Termo de Política de Privacidade e Cookies da Mills e dou consentimento para receber e-mails com informações sobre produtos e serviços e contato comercial."
          buttonProps={{ text: "Enviar" }}
          onSubmit={handleSubmit}
          reverse={false}
        />
        <RightImgWithLeftText
          headerText={content?.knowOurProducts.title}
          text={content?.knowOurProducts.text}
          img={content?.knowOurProducts.img}
          bgColor={
            currentSiteTheme === "rentalLight"
              ? "bg-orange-500"
              : "bg-green-800"
          }
          buttonProps={{ text: "Ver modelos" }}
          showMobile={true}
          reverse={true}
        />
        <FrequentQuestions />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
