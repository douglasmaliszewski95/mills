import { getCMSContent, getCMSText } from "@/components/Generators/content";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { updateParagraphs } from "@/utils/texts";
import { Header } from "@/components/shared/Header/Header";
import { Fragment, useEffect, useState } from "react";
import { getImageSrc } from "@/utils/images";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Section } from "@/components/shared/Section/Section";
import { Image, ImageCMS, TextCMS } from "@/types";
import { formatArrInOrder } from "@/utils/formatArrInOrder";

const TermsAndCondition = () => {
  const [pageContent, setPageContent] = useState<any>();
  const [textContent, setTextContent] = useState<any>();

  const { isMobile } = useScreenWidth();

  const getContent = async () => {
    const cont = await getCMSContent("termos_condicoes_de_uso");
    const text = await getCMSText("termos_condicoes_de_uso");

    setPageContent(cont);
    const arr: any[] = [];

    text?.termos_text?.map((text: any) => {
      arr.push({
        id: text?.fields?.content_order,
        title: text?.fields?.title,
        text: text?.fields?.text_field[0],
      });
    });

    formatArrInOrder(arr);
    setTextContent(arr);
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [pageContent, textContent]);

  return (
    <Fragment>
      <Header />
      <main>
        <Banner
          backgroundImage={getImageSrc(
            isMobile
              ? pageContent?.banner_terms_of_use[0]?.mobileObj?.fields
              : pageContent?.banner_terms_of_use[0]?.fields
          )}
          title={pageContent?.banner_terms_of_use[0]?.fields.content_title}
          subTitle="Termos e Condições"
        />
        {isMobile && (
          <p className="px-4 text-xs font-normal text-green-800 pt-4">
            A navegação e consulta pública deste website se sujeita aos Termos e
            Condições abaixo:
          </p>
        )}
        <Section
          containerClass="tablet:gap-6 gap-8 flex flex-col tablet:pt-6 pt-8"
          sectionClass="tablet:px-4"
        >
          {textContent?.map((item: any) => {
            return (
              <div
                key={item?.id}
                className="text-green-800 flex flex-col gap-8 tablet:gap-4"
              >
                <h1 className="text-2xl font-bold tablet:text-sm">
                  {item?.title}
                </h1>
                <p className="font-normal tablet:text-xs text-base">
                  {item?.text}
                </p>
              </div>
            );
          })}
        </Section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default TermsAndCondition;
