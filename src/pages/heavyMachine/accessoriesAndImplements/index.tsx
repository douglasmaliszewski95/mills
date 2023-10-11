import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { ImageCards } from "@/components/ImageCards/ImageCards";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import Button from "@/components/shared/Button/Button";
import { updateParagraphs } from "@/utils/texts";

export default function AccessoriesAndImplements() {
  const { isMobile } = useScreenWidth();
  const [content, setContent] = useState<any>();
  const getContent = useCallback(async () => {
    const images = await getImage("pesados_acessorios_implementos");
    const texts = await getText("pesados_acessorios_implementos");

    const firstImplement = images?.["heavy_machinery_implements_types"]?.find(
      (item: any) => item.description.includes("implementos01")
    );

    const secondImplement = images?.["heavy_machinery_implements_types"]?.find(
      (item: any) => item.description.includes("implementos02")
    );

    const thirdImplement = images?.["heavy_machinery_implements_types"]?.find(
      (item: any) => item.description.includes("implementos03")
    );

    const fourthImplement = images?.["heavy_machinery_implements_types"]?.find(
      (item: any) => item.description.includes("implementos04")
    );

    setContent({
      banner: {
        img: images?.["banner_heavy_accessories"]?.[0].fields.native.links[0]
          .href,
        title: images?.["banner_heavy_accessories"]?.[0].fields.content_title,
        mobileImg:
          images?.["banner_heavy_accessories"]?.[0].mobileObj?.fields.native
            .links[0].href,
      },
      about: {
        img: images?.["heavy_machinery_implement"]?.[0].fields.native.links[0]
          .href,
        title: images?.["heavy_machinery_implement"]?.[0].fields.content_title,
        text: images?.["heavy_machinery_implement"]?.[0].fields.content_text,
        alt: images?.["heavy_machinery_implement"]?.[0].fields.alt_attribute,
        btnText: images?.["heavy_machinery_implement"]?.[0].fields.button_text,
      },
      specialist: {
        img: images?.["heavy_machinery_specialist"]?.[0].fields.native.links[0]
          .href,
        title: images?.["heavy_machinery_specialist"]?.[0].fields.content_title,
        mobileImg:
          images?.["heavy_machinery_specialist"]?.[0].mobileObj?.fields.native
            .links[0].href,
        btnText: images?.["heavy_machinery_specialist"]?.[0].fields.button_text,
      },
      firstImplement: {
        img: firstImplement?.fields.native.links[0].href,
        title:
          texts?.["heavy_machinery_implements_retroescavadeira"]?.[0].fields
            .title,
        cards:
          texts?.["heavy_machinery_implements_retroescavadeira"]?.[0].fields
            .text_field,
      },
      secondImplement: {
        img: secondImplement?.fields.native.links[0].href,
        title:
          texts?.["heavy_machinery_implements_escavadeira"]?.[0].fields.title,
        cards:
          texts?.["heavy_machinery_implements_escavadeira"]?.[0].fields
            .text_field,
      },
      thirdImplement: {
        img: thirdImplement?.fields.native.links[0].href,
        title:
          texts?.["heavy_machinery_implements_carregadeira"]?.[0].fields.title,
        cards:
          texts?.["heavy_machinery_implements_carregadeira"]?.[0].fields
            .text_field,
      },
      fourthImplement: {
        img: fourthImplement?.fields.native.links[0].href,
        title:
          texts?.["heavy_machinery_implements_minicarregadeira"]?.[0].fields
            .title,
        cards:
          texts?.["heavy_machinery_implements_minicarregadeira"]?.[0].fields
            .text_field,
      },
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  return (
    <>
      <Header theme="rentalHeavy" />
      <main className="h-full bg-white w-full">
        <Banner
          backgroundImage={
            isMobile ? content?.banner.mobileImg : content?.banner.img
          }
          title={content?.banner?.title}
          linkList={[
            {
              name: content?.banner?.title,
              href: "/pesadas/manutencao",
            },
          ]}
          height="184px"
        />
        <About
          title={content?.about?.title}
          description={content?.about?.text}
          image={content?.about?.img}
          alt={content?.about?.alt}
          buttonTitle={content?.about?.btnText}
        />
        <ImageCards
          img={content?.firstImplement?.img}
          headerText={content?.firstImplement?.title}
          textCards={content?.firstImplement?.cards}
          orientation="default"
        />
        <ImageCards
          img={content?.secondImplement?.img}
          headerText={content?.secondImplement?.title}
          textCards={content?.secondImplement?.cards}
          orientation="inverted"
        />
        <ImageCards
          img={content?.thirdImplement?.img}
          headerText={content?.thirdImplement?.title}
          textCards={content?.thirdImplement?.cards}
          orientation="default"
        />
        <ImageCards
          img={content?.fourthImplement?.img}
          headerText={content?.fourthImplement?.title}
          textCards={content?.fourthImplement?.cards}
          orientation="inverted"
        />
        <section className="flex justify-center text-white">
          <div
            style={{
              backgroundImage: `url(${
                isMobile
                  ? content?.specialist?.mobileImg
                  : content?.specialist?.img
              })`,
            }}
            className="flex bg-no-repeat bg-cover w-full tablet:flex-col tablet:py-0"
          >
            <div className="flex justify-center items-center flex-col bg-gray-25 w-full h-full py-16 tablet:pt-28 tablet:pb-6">
              <div className="container justify-start tablet:flex-col tablet:pb-11 tablet:px-4">
                <h3 className="font-semibold w-[900px] text-3xl mb-6 tablet:w-full tablet:text-base tablet:mb-5">
                  {content?.specialist?.title}
                </h3>
                <Button className="py-3 w-[251px] tablet:w-full">
                  {content?.specialist?.btnText}
                </Button>
              </div>
            </div>
          </div>
        </section>
        <MachinesAndPlatforms />
      </main>
      <Footer theme="rentalHeavy" />
    </>
  );
}
