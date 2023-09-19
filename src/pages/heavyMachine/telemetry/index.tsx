import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { getImage } from "@/services/hooks/getImage";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import Button from "@/components/shared/Button/Button";
import { Section } from "@/components/shared/Section/Section";
import { getText } from "@/services/hooks/getText";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import dnaBottom from "@/assets/dna-bottom.svg";
import { useCallback, useEffect, useState } from "react";

export default function Telemetry() {
  const { isMobile, isDesktop } = useScreenWidth();
  const [content, setContent] = useState<any>();
  const getContent = useCallback(async () => {
    const images = await getImage("telemetria_pesados");
    const texts = await getText("telemetria_pesados");

    const benefits = {
      title: texts?.["heavy_machinery_telemetry_text"]?.[0].fields.title,
      text: texts?.["heavy_machinery_telemetry_text"]?.[0].fields.text_field[0],
      cards: texts?.["heavy_machinery_telemetry_benefits"]?.[0].fields.subtitle.map((card: any, index: number) => {
        return {
          cardTitle: card,
          cardText: texts?.["heavy_machinery_telemetry_benefits"]?.[0].fields.text_field[index]
        }
      })
    };

    const telemetryData = {
      title: texts?.["heavy_machinery_telemetry_data_text"]?.[0].fields.title,
      text: texts?.["heavy_machinery_telemetry_data_text"]?.[0].fields.text_field[0],
      telemetryTypes: texts?.["heavy_machinery_telemetry_data"]?.[0].fields.subtitle.map((telemetry: any, index: number) => {
        return {
          title: telemetry,
          text: texts?.["heavy_machinery_telemetry_data"]?.[0].fields.text_field[index]
        }
      })
    };

    const telemetryWork = images?.["icon_heavy_telemetry"]?.map((item: any) => {
      return {
        img: item.fields.native.links[0].href,
        text: item.fields.content_text
      }
    });

    const banner = {
      img: images?.["banner_heavy_telemetry"]?.[0].fields.native.links[0].href,
      title: images?.["banner_heavy_telemetry"]?.[0].fields.content_title,
      mobileImg: images?.["banner_heavy_telemetry"]?.[0].mobileObj.fields.native.links[0].href
    };

    const catalog = {
      img: images?.["heavy_telemetry_catalog"]?.[0].fields.native.links[0].href,
      title: images?.["heavy_telemetry_catalog"]?.[0].fields.content_title,
      mobileImg: images?.["heavy_telemetry_catalog"]?.[0].mobileObj.fields.native.links[0].href
    };

    const firstAbout = images?.["heavy_telemetry"]?.find(
      (item: any) => item.description.includes("telemetria01")
    );

    const secondAbout = images?.["heavy_telemetry"]?.find(
      (item: any) => item.description.includes("telemetria02")
    );

    const thirdAbout = images?.["heavy_telemetry"]?.find(
      (item: any) => item.description.includes("telemetria03")
    );

    const fourthAbout = images?.["heavy_telemetry"]?.find(
      (item: any) => item.description.includes("telemetria04")
    );

    setContent({
      banner: banner || null,
      catalog: catalog || null,
      benefits: benefits || null,
      telemetryInfo: texts?.["heavy_machinery_telemetry_info"]?.[0].fields.title || "",
      telemetryWork: telemetryWork || null,
      telemetryData: telemetryData || null,
      firstAbout: {
        title: firstAbout?.fields?.content_title,
        description: firstAbout?.fields?.content_text,
        image: firstAbout?.fields?.native.links[0].href,
        alt: firstAbout?.fields?.alt_attribute,
        mobileImg: firstAbout?.mobileObj?.fields?.native.links[0].href || ""
      } || null,
      secondAbout: {
        title: secondAbout?.fields?.content_title,
        description: secondAbout?.fields?.content_text,
        image: secondAbout?.fields?.native.links[0].href,
        alt: secondAbout?.fields?.alt_attribute,
        mobileImg: secondAbout?.mobileObj?.fields?.native.links[0].href || ""
      } || null,
      thirdAbout: {
        title: thirdAbout?.fields?.content_title,
        description: thirdAbout?.fields?.content_text,
        image: thirdAbout?.fields?.native.links[0].href,
        alt: thirdAbout?.fields?.alt_attribute,
        mobileImg: thirdAbout?.mobileObj?.fields?.native.links[0].href || ""
      },
      fourthAbout: {
        title: fourthAbout?.fields?.content_title,
        description: fourthAbout?.fields?.content_text,
        image: fourthAbout?.fields?.native.links[0].href,
        alt: fourthAbout?.fields?.alt_attribute,
        mobileImg: fourthAbout?.mobileObj?.fields?.native.links[0].href || ""
      }
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
            isMobile ? content?.banner?.mobileImg : content?.banner?.img
          }
          title={content?.banner?.title}
          linkList={[
            {
              name: "Nossos serviços > Telemetria",
              href: "/pesadas/telemetria",
            },
          ]}
          height="184px"
        />
        <About
          title={content?.firstAbout?.title}
          description={content?.firstAbout?.description}
          image={isMobile ? content?.firstAbout?.mobileImg : content?.firstAbout?.image}
          alt={content?.firstAbout?.alt}
          buttonTitle="Falar com um especialista"
        />
        <About
          title={content?.secondAbout?.title}
          description={content?.secondAbout?.description}
          image={isMobile ? content?.secondAbout?.mobileImg : content?.secondAbout?.image}
          alt={content?.secondAbout?.alt}
          orientation="inverted"
          hasButton={false}
          theme="green-800"
          color="white"
        />
        <About
          title={content?.thirdAbout?.title}
          description={content?.thirdAbout?.description}
          image={isMobile ? content?.thirdAbout?.mobileImg : content?.thirdAbout?.image}
          alt={content?.thirdAbout?.alt}
          buttonTitle="Falar com um especialista"
          theme="gray-800"
        />
        <section
          className="flex justify-center h-full text-green-800 bg-white bg-no-repeat bg-right-top"
        // style={{ backgroundImage: isMobile ? "" : `url(${bgImg.src})` }}
        >
          <div className="flex justify-between container tablet:flex-col">
            <div
              className={`flex flex-col py-20 gap-10 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9`}
            >
              <h3 className="font-semibold text-2xl tablet:text-base">
                Como funciona a telemetria para pesados?
              </h3>
              <div className="flex flex-wrap gap-2">
                {content?.telemetryWork?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-4 w-[370px]"
                    >
                      <img alt="icon" src={item.img} width={56} height={56} />
                      <p className="text-center font-normal">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <Section
          sectionClass={`relative bg-orange-500 py-[96px] tablet:pt-8 tablet:px-4 tablet:pb-12`}
          containerClass="inline-flex items-center"
        >
          <div className="absolute right-3 overflow-hidden bottom-3">
            <img src={dnaBottom.src} className="tablet:max-w-[148%]" />
          </div>
          <div className="flex items-center tablet:flex-col tablet:gap-8 w-full">
            <h5 className="text-white text-2xl pr-12 tablet:pr-4 font-semibold tablet:text-base">
              {content?.telemetryInfo}
            </h5>
          </div>
        </Section>
        <section className="flex justify-center bg-gray-50 tablet:px-3">
          <div className="container py-10">
            <div className="py-5">
              <h3 className="pb-5 text-green-800 font-semibold text-2xl tablet:text-base">
                {content?.telemetryData?.title}
              </h3>
              <p className="text-green-800">
                {content?.telemetryData?.text}
              </p>
            </div>
            <div className="flex py-10 justify-between tablet:flex-col">
              {content?.telemetryData?.telemetryTypes.map((telemetry: any, index: number) => {
                return <div key={index} className="bg-white p-10 w-[48%] tablet:w-full tablet:mb-3">
                  <h3 className="pb-5 text-green-800 font-semibold text-lg tablet:text-base">
                    {telemetry.title}
                  </h3>
                  <p className="text-green-800">
                    {telemetry.text}
                  </p>
                </div>
              })}
            </div>
          </div>
        </section>
        <section className="flex justify-center text-white">
          <div
            style={{
              backgroundImage: `url(${isMobile
                ? content?.catalog?.mobileImg
                : content?.catalog?.img
                })`,
            }}
            className="flex bg-no-repeat bg-cover w-full tablet:flex-col tablet:py-0"
          >
            <div className="flex justify-center items-center flex-col bg-gray-25 w-full h-full py-16 tablet:pt-28 tablet:pb-6">
              <div className="container justify-start tablet:flex-col tablet:pb-11 tablet:px-4">
                <h3 className="font-semibold w-[900px] text-3xl mb-6 tablet:w-full tablet:text-base tablet:mb-5">
                  {content?.catalog?.title}
                </h3>
                <Button className="py-3 w-[251px] tablet:w-full">
                  Ver catálogo
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Section
          containerClass="flex gap-12 tablet:gap-5 tablet:flex-col"
          sectionClass="bg-green-800 h-[506px] tablet:h-full tablet:pb-[52px] tablet:px-4 tablet:pt-8"
        >
          <div className="basis-1/2 tablet:basis-0 h-full items-center pt-[150px] tablet:pt-3">
            <h3 className="text-white text-4xl font-semibold mb-6 tablet:mb-0 tablet:text-base">
              {content?.benefits?.title}
            </h3>
            <h4 className="text-white text-lg mb-6 tablet:mb-0 tablet:text-base">
              {content?.benefits?.text}
            </h4>
          </div>
          <div className="basis-1/2 tablet:basis-0 px-6 max-w-[50%] tablet:max-w-full tablet:px-0 h-full">
            <div className="px-6 bg-white h-full tablet:rounded">
              <Carousel
                className="h-full"
                hasDots={false}
                nextArrow={
                  <LargeNextArrow
                    width={isDesktop ? 28 : 18}
                    customProps="mr-[-32px] tablet:mr-[-52px]"
                  />
                }
                prevArrow={
                  <LargePrevArrow
                    width={isDesktop ? 28 : 18}
                    customProps="ml-[-32px] tablet:ml-[-52px]"
                  />
                }
              >
                {content?.benefits?.cards.map((card: any, index: number) => (
                  <div
                    key={index}
                    className="h-[506px] tablet:min-h-[380px] tablet:h-min"
                  >
                    <div className="px-20 tablet:px-7 h-full flex flex-col justify-center tablet:min-h-[380px] tablet:py-2">
                      <p className="text-[200px] tablet:text-[100px] font-semibold text-green-800 leading-[200px] tablet:leading-[100px]">
                        {index + 1}
                      </p>
                      <div className="text-green-800 font-bold pb-5 text-lg tablet:text-sm">
                        {card.cardTitle}
                      </div>
                      <div className="text-green-800 text-lg tablet:text-sm">
                        {card.cardText}
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </Section>
        <About
          title={content?.fourthAbout?.title}
          description={content?.fourthAbout?.description}
          image={isMobile ? content?.fourthAbout?.mobileImg : content?.fourthAbout?.image}
          alt={content?.fourthAbout?.alt}
          hasButton={false}
          forceImageDisplayOnMobile={true}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  )
}

// export async function getStaticProps() {
//   const images = await getImage("telemetria_pesados");
//   const texts = await getText("telemetria_pesados");

//   const benefits = {
//     title: texts?.["heavy_machinery_telemetry_text"]?.[0].fields.title,
//     text: texts?.["heavy_machinery_telemetry_text"]?.[0].fields.text_field[0],
//     cards: texts?.["heavy_machinery_telemetry_benefits"]?.[0].fields.subtitle.map((card: any, index: number) => {
//       return {
//         cardTitle: card,
//         cardText: texts?.["heavy_machinery_telemetry_benefits"]?.[0].fields.text_field[index]
//       }
//     })
//   };

//   const telemetryData = {
//     title: texts?.["heavy_machinery_telemetry_data_text"]?.[0].fields.title,
//     text: texts?.["heavy_machinery_telemetry_data_text"]?.[0].fields.text_field[0],
//     telemetryTypes: texts?.["heavy_machinery_telemetry_data"]?.[0].fields.subtitle.map((telemetry: any, index: number) => {
//       return {
//         title: telemetry,
//         text: texts?.["heavy_machinery_telemetry_data"]?.[0].fields.text_field[index]
//       }
//     })
//   };

//   const telemetryWork = images?.["icon_heavy_telemetry"]?.map((item: any) => {
//     return {
//       img: item.fields.native.links[0].href,
//       text: item.fields.content_text
//     }
//   });

//   const banner = {
//     img: images?.["banner_heavy_telemetry"]?.[0].fields.native.links[0].href,
//     title: images?.["banner_heavy_telemetry"]?.[0].fields.content_title,
//     mobileImg: images?.["banner_heavy_telemetry"]?.[0].mobileObj.fields.native.links[0].href
//   };

//   const catalog = {
//     img: images?.["heavy_telemetry_catalog"]?.[0].fields.native.links[0].href,
//     title: images?.["heavy_telemetry_catalog"]?.[0].fields.content_title,
//     mobileImg: images?.["heavy_telemetry_catalog"]?.[0].mobileObj.fields.native.links[0].href
//   };

//   const firstAbout = images?.["heavy_telemetry"]?.find(
//     (item: any) => item.description.includes("telemetria01")
//   );

//   const secondAbout = images?.["heavy_telemetry"]?.find(
//     (item: any) => item.description.includes("telemetria02")
//   );

//   const thirdAbout = images?.["heavy_telemetry"]?.find(
//     (item: any) => item.description.includes("telemetria03")
//   );

//   const fourthAbout = images?.["heavy_telemetry"]?.find(
//     (item: any) => item.description.includes("telemetria04")
//   );

//   return {
//     props: {
//       banner: banner || null,
//       catalog: catalog || null,
//       benefits: benefits || null,
//       telemetryInfo: texts?.["heavy_machinery_telemetry_info"]?.[0].fields.title || "",
//       telemetryWork: telemetryWork || null,
//       telemetryData: telemetryData || null,
//       firstAbout: {
//         title: firstAbout?.fields?.content_title,
//         description: firstAbout?.fields?.content_text,
//         image: firstAbout?.fields?.native.links[0].href,
//         alt: firstAbout?.fields?.alt_attribute,
//         mobileImg: firstAbout?.mobileObj?.fields?.native.links[0].href || ""
//       } || null,
//       secondAbout: {
//         title: secondAbout?.fields?.content_title,
//         description: secondAbout?.fields?.content_text,
//         image: secondAbout?.fields?.native.links[0].href,
//         alt: secondAbout?.fields?.alt_attribute,
//         mobileImg: secondAbout?.mobileObj?.fields?.native.links[0].href || ""
//       } || null,
//       thirdAbout: {
//         title: thirdAbout?.fields?.content_title,
//         description: thirdAbout?.fields?.content_text,
//         image: thirdAbout?.fields?.native.links[0].href,
//         alt: thirdAbout?.fields?.alt_attribute,
//         mobileImg: thirdAbout?.mobileObj?.fields?.native.links[0].href || ""
//       },
//       fourthAbout: {
//         title: fourthAbout?.fields?.content_title,
//         description: fourthAbout?.fields?.content_text,
//         image: fourthAbout?.fields?.native.links[0].href,
//         alt: fourthAbout?.fields?.alt_attribute,
//         mobileImg: fourthAbout?.mobileObj?.fields?.native.links[0].href || ""
//       },
//     }
//   }
// }