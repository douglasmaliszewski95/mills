import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { GridInformation } from "@/components/shared/GridInformation/GridInformation";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { getImage } from "@/services/hooks/getImage";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useCallback, useEffect, useState } from "react";
import { updateParagraphs } from "@/utils/texts";

export default function Maintenance() {
  const { isMobile } = useScreenWidth();
  const [content, setContent] = useState<any>();

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const getContent = useCallback(async () => {
    const images = await getImage("maquinas_pesadas_manutencao");

    const gridCards = images?.["maintenance_icon"]
      ?.sort((a: any, b: any) => a?.description?.localeCompare(b?.description))
      .map((item: any, index: number) => {
        item.fields.content_text = item.fields.content_title;
        return {
          description: item.description,
          fields: item.fields,
          content_text: item.fields.content_title,
        };
      });

    const banner = {
      img: images?.["banner_heavy_maintenance_machinery"]?.[0].fields.native
        .links[0].href,
      title:
        images?.["banner_heavy_maintenance_machinery"]?.[0].fields
          .content_title,
      mobileImg:
        images?.["banner_heavy_maintenance_machinery"]?.[0].mobileObj.fields
          .native.links[0].href,
    };

    const firstAbout = images?.["heavy_maintenance_machinery"]?.find(
      (item: any) => item.description.includes("manutencao01")
    );

    const secondAbout = images?.["heavy_maintenance_machinery"]?.find(
      (item: any) => item.description.includes("manutencao02")
    );

    const thirdAbout = images?.["heavy_maintenance_machinery"]?.find(
      (item: any) => item.description.includes("manutencao03")
    );

    const fourthAbout = images?.["heavy_maintenance_machinery"]?.find(
      (item: any) => item.description.includes("manutencao04")
    );

    const fifthAbout = images?.["heavy_maintenance_machinery"]?.find(
      (item: any) => item.description.includes("manutencao05")
    );

    const logo = {
      img: images?.["methodology_lean"]?.[0].fields.native.links[0].href,
      title: images?.["methodology_lean"]?.[0].fields.content_title,
    };

    const map = {
      title: images?.["map_pemt"]?.[0].fields?.content_title,
      text: images?.["map_pemt"]?.[0].fields?.content_text,
      img: images?.["map_pemt"]?.[0].fields?.native.links[0].href || "",
      mobileImg:
        images?.["map_pemt"]?.[0].mobileObj?.fields?.native.links[0].href || "",
      alt: images?.["map_pemt"]?.[0].fields?.alt_attribute,
    };

    setContent({
      banner,
      firstAbout: {
        title: firstAbout?.fields?.content_title,
        description: firstAbout?.fields?.content_text,
        image: firstAbout?.fields?.native.links[0].href,
        alt: firstAbout?.fields?.alt_attribute,
        mobileImg: firstAbout?.mobileObj?.fields?.native.links[0].href ?? "",
      },
      secondAbout: {
        title: secondAbout?.fields?.content_title,
        description: secondAbout?.fields?.content_text,
        image: secondAbout?.fields?.native.links[0].href,
        alt: secondAbout?.fields?.alt_attribute,
        mobileImg: secondAbout?.mobileObj?.fields?.native.links[0].href ?? "",
      },
      thirdAbout: {
        title: thirdAbout?.fields?.content_title,
        description: thirdAbout?.fields?.content_text,
        image: thirdAbout?.fields?.native.links[0].href,
        alt: thirdAbout?.fields?.alt_attribute,
        mobileImg: thirdAbout?.mobileObj?.fields?.native.links[0].href ?? "",
      },
      fourthAbout: {
        title: fourthAbout?.fields?.content_title,
        description: fourthAbout?.fields?.content_text,
        image: fourthAbout?.fields?.native.links[0].href,
        alt: fourthAbout?.fields?.alt_attribute,
        mobileImg: fourthAbout?.mobileObj?.fields?.native.links[0].href ?? "",
      },
      fifthAbout: {
        title: fifthAbout?.fields?.content_title,
        description: fifthAbout?.fields?.content_text,
        image: fifthAbout?.fields?.native.links[0].href,
        alt: fifthAbout?.fields?.alt_attribute,
        mobileImg: fifthAbout?.mobileObj?.fields?.native.links[0].href ?? "",
      },
      map,
      logo,
      gridCards,
    });
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
            isMobile ? content?.banner.mobileImg : content?.banner.img
          }
          title={content?.banner?.title}
          linkList={[
            {
              name: "Manutenção e assistência técnica",
              href: "/pesadas/manutencao",
            },
          ]}
          height="184px"
        />
        <About
          title={content?.firstAbout?.title}
          description={content?.firstAbout?.description}
          image={
            isMobile
              ? content?.firstAbout?.mobileImg
              : content?.firstAbout?.image
          }
          alt={content?.firstAbout?.alt}
          buttonTitle={
            content?.firstAbout?.buttonText ?? "Falar com um especialista"
          }
          isTalkToSpecialist
        />
        {content?.gridCards && (
          <GridInformation
            title="Assistência Técnica Mills"
            cards={content?.gridCards}
          />
        )}
        <About
          title={content?.secondAbout?.title}
          description={content?.secondAbout?.description}
          image={
            isMobile
              ? content?.secondAbout?.mobileImg
              : content?.secondAbout?.image
          }
          alt={content?.secondAbout?.alt}
          orientation="inverted"
          hasButton={false}
        />
        <About
          title={content?.thirdAbout?.title}
          description={content?.thirdAbout?.description}
          image={
            isMobile
              ? content?.thirdAbout?.mobileImg
              : content?.thirdAbout?.image
          }
          alt={content?.thirdAbout?.alt}
          theme="beige-200"
          hasButton={false}
          forceImageDisplayOnMobile
        />
        <About
          title={content?.fourthAbout?.title}
          description={content?.fourthAbout?.description}
          image={
            isMobile
              ? content?.fourthAbout?.mobileImg
              : content?.fourthAbout?.image
          }
          alt={content?.fourthAbout?.alt}
          orientation="inverted"
          hasButton={false}
        />
        <section className="bg-green-800 py-[56px] flex justify-center tablet:py-8 tablet:px-4">
          <div className="container flex gap-10 tablet:gap-6 items-center tablet:flex-col">
            <div className="bg-white px-7 rounded shrink-0 tablet:shrink">
              <img src={content?.logo?.img} />
            </div>
            <h5 className="text-2xl text-white font-semibold tablet:text-base tablet:text-center">
              {content?.logo?.title}
            </h5>
          </div>
        </section>
        <About
          title={content?.map.title}
          description={content?.map.text}
          image={isMobile ? content?.map.mobileImg : content?.map.img}
          alt={content?.map.alt}
          hasButton={false}
          imagePadding="py-8 tablet:px-4"
          forceImageDisplayOnMobile
        />
        <About
          title={content?.fifthAbout?.title}
          description={content?.fifthAbout?.description}
          image={
            isMobile
              ? content?.fifthAbout?.mobileImg
              : content?.fifthAbout?.image
          }
          alt={content?.fifthAbout?.alt}
          orientation="inverted"
          theme="green-800"
          color="white"
        />
        <MachinesAndPlatforms />
      </main>
      <Footer theme="rentalHeavy" />
    </>
  );
}

// export async function getStaticProps() {
//   const images = await getImage("maquinas_pesadas_manutencao");

//   const gridCards = images?.["maintenance_icon"]?.sort(
//     (a: any, b: any) => a?.description?.localeCompare(b?.description)
//   ).map((item: any, index: number) => {
//     item.fields.content_text = item.fields.content_title;
//     return {
//       description: item.description,
//       fields: item.fields,
//       content_text: item.fields.content_title
//     }
//   });

//   const banner = {
//     img: images?.["banner_heavy_maintenance_machinery"]?.[0].fields.native.links[0].href,
//     title: images?.["banner_heavy_maintenance_machinery"]?.[0].fields.content_title,
//     mobileImg: images?.["banner_heavy_maintenance_machinery"]?.[0].mobileObj.fields.native.links[0].href
//   };

//   const firstAbout = images?.["heavy_maintenance_machinery"]?.find(
//     (item: any) => item.description.includes("manutencao01")
//   );

//   const secondAbout = images?.["heavy_maintenance_machinery"]?.find(
//     (item: any) => item.description.includes("manutencao02")
//   );

//   const thirdAbout = images?.["heavy_maintenance_machinery"]?.find(
//     (item: any) => item.description.includes("manutencao03")
//   );

//   const fourthAbout = images?.["heavy_maintenance_machinery"]?.find(
//     (item: any) => item.description.includes("manutencao04")
//   );

//   const fifthAbout = images?.["heavy_maintenance_machinery"]?.find(
//     (item: any) => item.description.includes("manutencao05")
//   );

//   const logo = {
//     img: images?.["methodology_lean"]?.[0].fields.native.links[0].href,
//     title: images?.["methodology_lean"]?.[0].fields.content_title
//   };

//   const map = {
//     title: images?.["map_pemt"]?.[0].fields?.content_title,
//     text: images?.["map_pemt"]?.[0].fields?.content_text,
//     img: images?.["map_pemt"]?.[0].fields?.native.links[0].href ?? "",
//     mobileImg: images?.["map_pemt"]?.[0].mobileObj?.fields?.native.links[0].href ?? "",
//     alt: images?.["map_pemt"]?.[0].fields?.alt_attribute
//   };

//   const formattedData = {
//     banner,
//     firstAbout: {
//       title: firstAbout?.fields?.content_title,
//       description: firstAbout?.fields?.content_text,
//       image: firstAbout?.fields?.native.links[0].href,
//       alt: firstAbout?.fields?.alt_attribute,
//       mobileImg: firstAbout?.mobileObj?.fields?.native.links[0].href ?? ""
//     },
//     secondAbout: {
//       title: secondAbout?.fields?.content_title,
//       description: secondAbout?.fields?.content_text,
//       image: secondAbout?.fields?.native.links[0].href,
//       alt: secondAbout?.fields?.alt_attribute,
//       mobileImg: secondAbout?.mobileObj?.fields?.native.links[0].href ?? ""
//     },
//     thirdAbout: {
//       title: thirdAbout?.fields?.content_title,
//       description: thirdAbout?.fields?.content_text,
//       image: thirdAbout?.fields?.native.links[0].href,
//       alt: thirdAbout?.fields?.alt_attribute,
//       mobileImg: thirdAbout?.mobileObj?.fields?.native.links[0].href ?? ""
//     },
//     fourthAbout: {
//       title: fourthAbout?.fields?.content_title,
//       description: fourthAbout?.fields?.content_text,
//       image: fourthAbout?.fields?.native.links[0].href,
//       alt: fourthAbout?.fields?.alt_attribute,
//       mobileImg: fourthAbout?.mobileObj?.fields?.native.links[0].href ?? ""
//     },
//     fifthAbout: {
//       title: fifthAbout?.fields?.content_title,
//       description: fifthAbout?.fields?.content_text,
//       image: fifthAbout?.fields?.native.links[0].href,
//       alt: fifthAbout?.fields?.alt_attribute,
//       mobileImg: fifthAbout?.mobileObj?.fields?.native.links[0].href ?? ""
//     },
//     map,
//     logo,
//     gridCards
//   };

//   return {
//     props: {
//       content: formattedData ?? null
//     }
//   }
// }
