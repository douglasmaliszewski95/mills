import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { SellParts } from "@/components/Category/SellParts/SellParts";
import SearchCMS from "@/dtos/SearchCMS";
import { ShoringModels } from "@/components/formworkAndShoring/ShoringModels/ShoringModels";
import { MultipleBrands } from "@/components/Parts/MultipleBrands/MultipleBrands";
import { AboutSmallImage } from "@/components/AboutSmallImage/AboutSmallImage";
import { getImageSrc } from "@/utils/images";
import { updateParagraphs } from "@/utils/texts";

export default function PartsSale() {
  const [content, setContent] = useState<any>();
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const getContent = useCallback(async () => {
    const images = await getImage("pesados_venda_pecas");
    const texts = await getText("pesados_venda_pecas");
    const contentAux = await getImage("venda_pecas");
    const contentText = await getText("venda_pecas");

    const brands = [
      contentAux?.["logo_brands_consolidated"]?.find(
        (image: any) => image?.description === "logo brand venda de pecas JLG"
      ),
      contentAux?.["logo_brands_consolidated"]?.find(
        (image: any) => image?.description === "logo brand venda de pecas genie"
      ),
      contentAux?.["logo_brands_consolidated"]?.find(
        (image: any) =>
          image?.description === "logo brand venda de pecas skyjack"
      ),
      contentAux?.["logo_brands_consolidated"]?.find(
        (image: any) =>
          image?.description === "logo brand venda de pecas haulotte"
      ),
    ];

    const formattedData = {
      banner: images?.["heavy_machinery_banner_parts"]?.[0],
      firstAbout: {
        title:
          images?.["heavy_machinery_parts_variety"]?.[0].fields.content_title,
        description:
          images?.["heavy_machinery_parts_variety"]?.[0].fields.content_text,
        image:
          images?.["heavy_machinery_parts_variety"]?.[0].fields.native.links[0]
            .href,
        alt: images?.["heavy_machinery_parts_variety"]?.[0].fields
          .alt_attribute,
        btnText:
          images?.["heavy_machinery_parts_variety"]?.[0].fields.button_text,
        href: images?.["heavy_machinery_parts_variety"]?.[0].fields
          .href_attribute,
      },
      secondAbout: {
        title:
          images?.["heavy_machinery_parts_available"]?.[0].fields.content_title,
        image:
          images?.["heavy_machinery_parts_available"]?.[0].fields.native
            .links[0].href,
        alt: images?.["heavy_machinery_parts_available"]?.[0].fields
          .alt_attribute,
      },
      benefits: images?.["heavy_machinery_parts_benefits"]
        ?.sort(
          (a: any, b: any) => a?.fields.content_order - b?.fields.content_order
        )
        .map((item: SearchCMS) => {
          return {
            title: item.fields.content_title,
            image: item.fields.native.links[0].href,
            alt: item.fields.alt_attribute,
          };
        }),
      platformParts: contentText?.["platform_parts_text"]?.[0],
      brands,
      brandsText: contentText?.["consolidated_brands_text"]?.[0],
      compressorParts: contentText?.["compressor_parts_text"]?.[0],
      aboutSmallImage: contentAux?.["logo_brands_consolidated"]?.find(
        (image: any) =>
          image?.description === "logo brand venda de pecas sullair"
      ),
      rent: {
        title: texts?.["heavy_machinery_parts_rent"]?.[0].fields.title,
        btnText:
          texts?.["heavy_machinery_parts_rent"]?.[0].fields.buttonText[0],
        href: texts?.["heavy_machinery_parts_rent"]?.[0].fields.hrefButton[0],
      },
      contact: {
        title: texts?.["heavy_machinery_parts_contact"]?.[0].fields.title,
        btnText:
          texts?.["heavy_machinery_parts_contact"]?.[0].fields.buttonText[0],
        href: texts?.["heavy_machinery_parts_contact"]?.[0].fields
          .hrefButton[0],
      },
      thirdAbout: {
        title:
          images?.["heavy_machinery_parts_analysis"]?.[0].fields.content_title,
        description:
          images?.["heavy_machinery_parts_analysis"]?.[0].fields.content_text,
        image:
          images?.["heavy_machinery_parts_analysis"]?.[0].fields.native.links[0]
            .href,
        alt: images?.["heavy_machinery_parts_analysis"]?.[0].fields
          .alt_attribute,
      },
      fourthAbout: {
        title:
          images?.["heavy_machinery_parts_warranty"]?.[0].fields.content_title,
        image:
          images?.["heavy_machinery_parts_warranty"]?.[0].fields.native.links[0]
            .href,
        alt: images?.["heavy_machinery_parts_warranty"]?.[0].fields
          .alt_attribute,
      },
      fifthAbout: {
        title:
          images?.["heavy_machinery_parts_maintenance"]?.[0].fields
            .content_title,
        description:
          images?.["heavy_machinery_parts_maintenance"]?.[0].fields
            .content_text,
        image:
          images?.["heavy_machinery_parts_maintenance"]?.[0].fields.native
            .links[0].href,
        alt: images?.["heavy_machinery_parts_maintenance"]?.[0].fields
          .alt_attribute,
        btnText:
          images?.["heavy_machinery_parts_maintenance"]?.[0].fields.button_text,
        href: images?.["heavy_machinery_parts_maintenance"]?.[0].fields
          .href_attribute,
      },
      sixthAbout: {
        title:
          images?.["heavy_machinery_parts_specialist"]?.[0].fields
            .content_title,
        image:
          images?.["heavy_machinery_parts_specialist"]?.[0].fields.native
            .links[0].href,
        alt: images?.["heavy_machinery_parts_specialist"]?.[0].fields
          .alt_attribute,
        btnText:
          images?.["heavy_machinery_parts_specialist"]?.[0].fields.button_text,
        href: images?.["heavy_machinery_parts_specialist"]?.[0].fields
          .href_attribute,
      },
    };

    setContent(formattedData);
  }, []);

  useEffect(() => {
    getContent();
  }, []);
  return (
    <>
      <Header theme="rentalHeavy" />
      <main className="h-full bg-white w-full">
        <Banner
          backgroundImage={
            isMobile
              ? content?.banner?.fields.native.links[0].href
              : content?.banner?.mobileObj?.fields.native.links[0].href
          }
          title={content?.banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: content?.banner?.fields?.content_title ?? "",
              href: "/venda-pecas",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.title}
          description={content?.firstAbout?.description}
          image={content?.firstAbout?.image}
          alt={content?.firstAbout?.alt}
          buttonTitle={content?.firstAbout?.btnText}
          link={content?.firstAbout?.href}
        />
        <About
          title={content?.secondAbout?.title}
          image={content?.secondAbout?.image}
          alt={content?.secondAbout?.alt}
          orientation="inverted"
          hasButton={false}
          theme="green-800"
          color="white"
          // dnaColor="white"
        />
        <section
          className="flex justify-center h-full text-green-800 bg-white bg-no-repeat bg-right-top"
          // style={{ backgroundImage: isMobile ? "" : `url(${bgImg.src})` }}
        >
          <div className="flex justify-between container tablet:flex-col">
            <div
              className={`flex flex-col py-20 gap-10 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9`}
            >
              <h3 className="font-semibold text-2xl w-[50%] tablet:text-base tablet:w-full">
                Ao escolher a Mills como fornecedor de peças para plataformas
                elevatórias, você terá
              </h3>
              <div className="flex flex-wrap gap-2 tablet:justify-center">
                {content?.benefits?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-4 w-[230px]"
                    >
                      <img
                        alt={item.alt}
                        src={item.image}
                        width={56}
                        height={56}
                      />
                      <p className="text-center font-bold">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <SellParts
          text={content?.rent?.title}
          buttonTitle={content?.rent?.btnText}
          buttonVariant="inverted"
          href={content?.rent?.href ?? ""}
        />
        <ShoringModels
          ids={content?.platformParts?.fields?.text_field ?? []}
          title={content?.platformParts?.fields?.title ?? ""}
          cardText="Incluir no orçamento"
          theme="white"
          buttonTitle="Ver todas"
        />
        {content?.brands && (
          <MultipleBrands
            brands={content.brands}
            title={content?.brandsText?.fields?.title ?? ""}
            subtitle={content?.brandsText?.fields?.text_field?.[0] ?? ""}
          />
        )}
        <ShoringModels
          ids={content?.compressorParts?.fields?.text_field ?? []}
          title={content?.compressorParts?.fields?.title ?? ""}
          cardText="Incluir no orçamento"
          textOnCenter
          theme="white"
          buttonTitle="Ver todas"
        />
        <AboutSmallImage
          title={content?.aboutSmallImage?.fields?.content_text ?? ""}
          image={getImageSrc(content?.aboutSmallImage?.fields)}
          alt={content?.aboutSmallImage?.fields?.alt_attribute ?? ""}
        />
        <SellParts
          text={content?.contact?.title}
          buttonTitle={content?.contact?.btnText}
          buttonVariant="inverted"
          href={content?.contact?.href ?? ""}
        />
        <About
          title={content?.thirdAbout?.title}
          description={content?.thirdAbout?.description}
          image={content?.thirdAbout?.image}
          alt={content?.thirdAbout?.alt}
          hasButton={false}
          forceImageDisplayOnMobile={true}
        />
        <About
          title={content?.fourthAbout?.title}
          image={content?.fourthAbout?.image}
          alt={content?.fourthAbout?.alt}
          orientation="inverted"
          hasButton={false}
          theme="green-800"
          color="white"
          // dnaColor="white"
        />
        <About
          title={content?.fifthAbout?.title}
          description={content?.fifthAbout?.description}
          image={content?.fifthAbout?.image}
          alt={content?.fifthAbout?.alt}
          buttonTitle={content?.fifthAbout?.btnText}
          link={content?.fifthAbout?.href}
          forceImageDisplayOnMobile={true}
        />
        <About
          title={content?.sixthAbout?.title}
          image={content?.sixthAbout?.image}
          alt={content?.sixthAbout?.alt}
          orientation="inverted"
          buttonTitle={content?.sixthAbout?.btnText}
          buttonVariant="inverted"
          link={content?.sixthAbout?.href}
          theme="green-800"
          color="white"
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
