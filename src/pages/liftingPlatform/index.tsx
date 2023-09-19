import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { ProductCarousel } from "@/components/Category/ProductCarousel/ProductCarousel";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { Segments } from "@/components/Home/Segments/Segments";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import { ProductOCC } from "@/dtos/Products";
import { useCallback, useEffect, useState } from "react";

export default function LiftingPlatform() {
  const [content, setContent] = useState<any>();
  const getContent = useCallback(async () => {
    const images = await getImage("plataformas_elevatorias");
    const texts = await getText("plataformas_elevatorias");
    const findSegments = await getImage("shared");
    const pantograficaTesoura = await fetch(
      `${process.env.NEXT_PUBLIC_API_GRAPHQL}/api/platforms?collection=plataforma_pantografica_ou_tesoura`
    ).then((res) => res.json());
    const articulada = await fetch(
      `${process.env.NEXT_PUBLIC_API_GRAPHQL}/api/platforms?collection=lanca_articulada`
    ).then((res) => res.json());
    const telescopica = await fetch(
      `${process.env.NEXT_PUBLIC_API_GRAPHQL}/api/platforms?collection=plataforma_aerea_de_lanca_telescopica`
    ).then((res) => res.json());

    let graySegments: any = [];
    let filterSegments: any = [];
    findSegments?.icon_types_segments?.map((segment: any) => {
      if (segment.name.includes("cinza")) {
        graySegments.push(segment);
      }
    });

    for (let i = 1; i <= graySegments.length; i++) {
      const search = graySegments.find(
        (x: any) => x.fields.content_order === i
      );
      if (search) filterSegments.push(search);
    }

    const mapSegments = filterSegments?.map((segment: any) => {
      return {
        id: segment.id,
        alt: segment.fields.alt_attribute,
        image: findSegments.icon_types_segments
          .filter((x: any) => x.description.includes(`${segment.description}`))
          .find((y: any) => y.name.includes("laranja"))?.fields.native.links[0]
          .href,
        hoverImage: segment.fields.native.links[0].href,
        title: segment.fields.content_title,
        content_order: segment.fields.content_order,
        href: segment.fields.alt_attribute ?? "#",
      };
    });
    const filterText = texts.where_to_use?.find(
      (x: any) => x.fields.content_page === "plataformas_elevatorias"
    );

    let filterIcons: any = [];
    const filter = images.plataformas_elevatorias.filter(
      (x: any) => x.mobileObj !== undefined
    );
    for (let i = 1; i <= filter.length; i++) {
      const search = filter.find((x: any) => x.fields.content_order === i);
      if (search) {
        const obj = {
          id: search.id,
          alt: search.fields.alt_attribute,
          image: search.fields.native.links[0].href,
          title: search.fields.content_title,
          description: search.fields.content_text,
        };
        filterIcons.push(obj);
      }
    }

    const filterSection = images.plataformas_elevatorias.find(
      (x: any) => x.mobileObj === undefined
    );

    const productsCarousels = [
      {
        id: texts.scissors_antographic_text[0].id,
        title: texts.scissors_antographic_text[0].fields.title,
        href: texts.scissors_antographic_text[0].fields.hrefButton?.[0],
        paragraphs: texts.scissors_antographic_text[0].fields.text_field,
        backgroundColor: "bg-beige-200",
        products: pantograficaTesoura.products.map((item: ProductOCC) => {
          return {
            id: item.id,
            image: item.fullImageURLs,
            model: item.id,
            description: item.displayName,
            specs: [
              {
                name: "Altura de Trabalho",
                value: item.x_alturaDeTrabalhoM,
              },
              {
                name: "Alcance Horizontal",
                value: item.x_alcanceHorizontalM,
              },
              {
                name: "Peso",
                value: item.x_peso,
              },
              {
                name: "Emissão Média",
                value: item.x_emissoMdiaKgDeCOH,
              },
            ],
          };
        }),
        whiteButton: false,
      },
      {
        id: texts.articulated_text[0].id,
        title: texts.articulated_text[0].fields.title,
        href: texts.articulated_text[0].fields.hrefButton?.[0],
        paragraphs: texts.articulated_text[0].fields.text_field,
        backgroundColor: "bg-orange-500",
        products: articulada.products.map((item: ProductOCC) => {
          return {
            id: item.id,
            image: item.fullImageURLs,
            model: item.id,
            description: item.displayName,
            specs: [
              {
                name: "Altura de Trabalho",
                value: item.x_alturaDeTrabalhoM,
              },
              {
                name: "Alcance Horizontal",
                value: item.x_alcanceHorizontalM,
              },
              {
                name: "Peso",
                value: item.x_peso,
              },
              {
                name: "Emissão Média",
                value: item.x_emissoMdiaKgDeCOH,
              },
            ],
          };
        }),
        whiteButton: true,
      },
      {
        id: texts.telescopic_boom_text[0].id,
        title: texts.telescopic_boom_text[0].fields.title,
        href: texts.telescopic_boom_text[0].fields.hrefButton?.[0],
        paragraphs: texts.telescopic_boom_text[0].fields.text_field,
        backgroundColor: "bg-beige-200",
        products: telescopica.products.map((item: ProductOCC) => {
          return {
            id: item.id,
            image: item.fullImageURLs,
            model: item.id,
            description: item.displayName,
            specs: [
              {
                name: "Altura de Trabalho",
                value: item.x_alturaDeTrabalhoM,
              },
              {
                name: "Alcance Horizontal",
                value: item.x_alcanceHorizontalM,
              },
              {
                name: "Peso",
                value: item.x_peso,
              },
              {
                name: "Emissão Média",
                value: item.x_emissoMdiaKgDeCOH,
              },
            ],
          };
        }),
        whiteButton: false,
      },
    ];

    setContent({
      banner: images.banner[0] || null,
      segments: mapSegments || null,
      texts:
        {
          title: filterText?.fields.title,
          texts: filterText?.fields.text_field,
        } || null,
      rentalText:
        {
          title: texts.location[0]?.fields.title,
          description: texts.location[0]?.fields.text_field,
        } || null,
      icons: filterIcons || null,
      section:
        {
          image: filterSection?.fields.native.links[0].href,
          title: filterSection?.fields.content_title,
          description: filterSection?.fields?.content_text,
          alt: filterSection?.fields.alt_attribute,
          href_attribute: filterSection?.fields?.href_attribute,
        } || null,
      products: productsCarousels || null,
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner
          backgroundImage={content?.banner?.fields.native.links[0].href}
          title={content?.banner?.fields.content_title}
          linkList={[
            {
              name: "Plataformas Elevatórias",
              href: "/plataformas-elevatorias",
            },
          ]}
        />
        <About
          image={content?.section?.image}
          title={content?.section?.title}
          description={content?.section?.description}
          alt={content?.section?.alt}
          link={content?.section?.href_attribute}
          buttonTitle={content?.section?.buttonText ?? "Ver modelos"}
        />
        <Segments
          segments={content?.segments || []}
          title={content?.texts?.title}
          texts={content?.texts?.texts}
        />
        {content?.products?.map((productCarousel: any) => (
          <ProductCarousel
            key={productCarousel.id}
            href={productCarousel.href ?? "#"}
            variant={
              productCarousel.backgroundColor === "bg-orange-500"
                ? "white"
                : undefined
            }
            {...productCarousel}
          />
        ))}
        <AboutRental
          items={content?.icons}
          title={content?.rentalText?.title}
          description={content?.rentalText?.description}
        />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
