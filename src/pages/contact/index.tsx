/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { FrequentQuestions } from "@/components/Home/FrequentQuestions/FrequentQuestions";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { ContactForm } from "@/components/Contact/ContactForm";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { ContactFormType } from "@/components/Contact/types";
import { SubmitHandler } from "react-hook-form";
import { useCallback, useContext, useEffect, useState } from "react";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import { updateParagraphs } from "@/utils/texts";
import Image from "next/image";
import green_check from "@/assets/green_check.svg";

export default function Contact() {
  const [content, setContent] = useState<any>();
  const [openSuccess, setOpenSuccess] = useState(false);
  const getContent = useCallback(async () => {
    const [
      images,
      texts
    ]: any = await Promise.all([
      getImage("fale_conosco"),
      getText("shared")
    ]);

    const banner = {
      img: images?.banner_contact_us?.[0].fields.native.links[0].href,
      title: images?.banner_contact_us?.[0].fields.content_title,
    };

    const formImg = images?.form_contact_us?.[0].fields.native.links[0].href;
    const knowOurProducts = {
      img: images?.know_our_products?.[0].fields.native.links[0].href,
      title: images?.know_our_products?.[0].fields.content_title,
      text: images?.know_our_products?.[0].fields.content_text,
      href: images?.know_our_products?.[0].fields.href_attribute
    };

    setContent({
      banner: banner || null,
      formImg: formImg || null,
      knowOurProducts: knowOurProducts || null,
      central: {
        title: texts?.footer_infos?.[0].fields.subtitle[0],
        text: texts?.footer_infos?.[0].fields.text_field[0],
      },
      horario: {
        title: texts?.footer_infos?.[0].fields.subtitle[1],
        text: texts?.footer_infos?.[0].fields.text_field[1],
      },
      contactTerm: texts?.contact_us_term_checkbox?.[0].fields.title
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const modal = () => {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 tablet:overflow-y-scroll"
        onClick={() => setOpenSuccess(false)}
      >
        <div className="fixed bg-white max-w-[35%] tablet:max-w-full tablet:w-[90%] tablet:h-auto top-[40%] rounded-xl">
          {/* Header */}
          <div
            className={`flex w-full px-10 tablet:px-6 rounded-lg items-start pb-8 pt-14 tablet:pb-4 tablet:pt-8 items-center justify-between bg-white-500`}
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                src={green_check}
                alt="check"
                className="mb-10"
                width="77"
                height="77"
              />
              <h3 className="text-lg font-semibold tablet:text-base text-green-800">
                Sua solicitação foi enviada com sucesso! Em breve um especialista entrará em contato.
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit: SubmitHandler<ContactFormType> = async (data) => {
    const formData = {
      nome: data.name,
      email: data.email,
      telefone: data.telefone,
      cnpj: data.cnpj,
      motivoContato: data.motivo,
      comentarios: data.comentarios
    };

    const result: any = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    if (result.ok) {
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
      }, 3000);
    }
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
              {content ? content?.central?.title + " " + content?.central?.text : ""}
            </h3>
            <h3 className="whitespace-pre-line text-2xl pb-10 tablet:text-sm tablet:pt-3 tablet:pb-8">
              {content ? content?.horario?.title + " " + content?.horario?.text : ""}
            </h3>
          </div>
        </section>
        <ContactForm
          img={content?.formImg}
          headerText="Em até 24 horas, um de nossos especialistas entrará em contato para tirar suas dúvidas e te ajudar a encontrar o equipamento ideal."
          paragraphText={content?.contactTerm}
          buttonProps={{ text: "Enviar" }}
          onSubmit={handleSubmit}
          reverse={false}
        />
        <About
          title={content?.knowOurProducts.title}
          description={content?.knowOurProducts.text}
          image={content?.knowOurProducts.img}
          forceImageDisplayOnMobile
          color="white"
          theme={
            currentSiteTheme === "rentalLight"
              ? "orange-500"
              : "green-800"
          }
          link={content?.knowOurProducts.href}
          showMobile={true}
          reverse={true}
        />
        <FrequentQuestions />
        <MachinesAndPlatforms />
      </main>
      {openSuccess && modal()}
      <Footer />
    </>
  );
}
