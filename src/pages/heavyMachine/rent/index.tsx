import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import { Benefits } from "@/components/ProductTypeAndSegment/Benefits";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { getImage } from "@/services/hooks/getImage";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import Button from "@/components/shared/Button/Button";
import { useCallback, useEffect, useState } from "react";
import SearchCMS from "@/dtos/SearchCMS";
import { ProductOCC } from "@/types";
import Link from "next/link";
import { getText } from "@/services/hooks/getText";
import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import Slider from "react-slick";

export default function Rent() {
  const themeHeavy = "rentalHeavy";
  const { isMobile, isDesktop } = useScreenWidth();

  const [banner, setBanner] = useState<any>();
  const [segment, setSegment] = useState<any>();
  const [specialist, setSpecialist] = useState<any>();
  const [machines, setMachines] = useState<any>();

  const getContent = useCallback(async () => {
    const images = await getImage("maquinas_pesadas_locacao");
    const texts = await getText("maquinas_pesadas_locacao");

    const machineTypes = await Promise.all(
      texts?.heavy_machinery_types
        ?.sort(
          (a: any, b: any) => a?.fields.content_order - b?.fields.content_order
        )
        .map(async (machine: SearchCMS) => {
          //const collection = "plataforma_aerea_de_lanca_telescopica";
          const collection = machine.fields.text_field[0];
          const resultOCC = await fetch(
            `${process.env.NEXT_PUBLIC_API_GRAPHQL}/api/platforms?collection=${collection}`
          ).then((res) => res.json());
          return {
            title: machine.fields.title,
            subtitle: machine.fields.subtitle[0],
            images:
              resultOCC?.products?.map((item: ProductOCC) => {
                return {
                  id: item.id,
                  occImage: item.fullImageURLs,
                  model: `${item.id} - ${item.brand}`,
                  description: item.displayName,
                };
              }) || [],
            btnText: machine.fields.buttonText[0],
            href: machine.fields.hrefButton[0],
          };
        })
    );

    setMachines(machineTypes);

    setBanner({
      img: images?.banner_heavy_rental?.[0].fields.native.links[0].href,
      title: images?.banner_heavy_rental?.[0].fields.content_title,
    });

    setSegment({
      img: images?.heavy_machinery_rental?.[0].fields.native.links[0].href,
      title: images?.heavy_machinery_rental?.[0].fields.content_title,
      text: images?.heavy_machinery_rental?.[0].fields.content_text,
    });

    setSpecialist({
      img: images?.fale_com_especialista?.[0].fields.native.links[0].href,
      title: images?.fale_com_especialista?.[0].fields.content_title,
      text: images?.fale_com_especialista?.[0].fields.content_text,
      mobileImg:
        images?.fale_com_especialista?.[0].mobileObj?.fields.native.links[0]
          .href,
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header theme={themeHeavy} />
      <main className="h-full bg-white w-full">
        <Banner
          subTitle="Máquinas Pesadas"
          title={banner?.title}
          backgroundImage={banner?.img}
          blur="bg-black/50"
        />
        <RightImgWithLeftText
          img={segment?.img}
          headerText={segment?.title}
          text={segment?.text}
          buttonProps={{ text: "Ver modelos" }}
          bgColor="bg-white"
          textColor="text-green-800"
          variant="default"
          theme={themeHeavy}
        />
        <section className="flex justify-center text-green-800 bg-green-800">
          <div className="flex justify-between container tablet:flex-col py-5">
            <div className="max-w-[100%] w-full">
              <Carousel
                className="flex justify-between w-full my-5 mx-5 tablet:w-auto"
                hasDots={false}
                slidesToScroll={1}
                slidesToShow={isMobile ? 1 : 4}
                adaptiveHeight={false}
              >
                {machines?.map((machine: any, index: number) => {
                  return (
                    <div key={index} className="my-5 mx-5 h-full">
                      <div className="w-[280px] h-[535px] bg-white py-5 px-5 tablet:overflow-hidden tablet:static tablet:w-[300px]">
                        <h3 className="text-green-800 text-lg font-semibold text-center pt-3">
                          {machine.title}
                        </h3>
                        <p className="text-green-800 text-sm text-center pt-3">
                          {machine.subtitle}
                        </p>
                        <div className="border-b-[2px] border-t-[2px] my-5 py-5">
                          <Carousel
                            className="h-full"
                            hasDots={false}
                            nextArrow={
                              <LargeNextArrow
                                width={isDesktop ? 28 : 12}
                                customProps="tablet:mr-[-36px]"
                                arrowBorderRightDistance={
                                  isMobile ? "tablet:right-12" : "right-1"
                                }
                              />
                            }
                            prevArrow={
                              <LargePrevArrow
                                width={isDesktop ? 28 : 12}
                                customProps="tablet:ml-[-36px]"
                                arrowBorderRightDistance={
                                  isMobile ? "tablet:left-12" : "left-1"
                                }
                              />
                            }
                          >
                            {machine.images?.map(
                              (image: any, index: number) => (
                                <div key={image.id}>
                                  <div className="flex-col tablet:px-12 tablet:my-[18px] items-center tablet:flex-col">
                                    <ImageOCC
                                      imageName={image.occImage}
                                      alt={image.description}
                                      className="max-h-[160px] mb-5"
                                    />
                                    <div className="text-center tablet:mt-[18px]">
                                      <h5 className="text-green-800 font-semibold tablet:text-sm">
                                        {image.model}
                                      </h5>
                                      <Link
                                        href={machine.href || ""}
                                        className="text-orange-800 font-bold"
                                      >
                                        Ver detalhes
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </Carousel>
                        </div>
                        <Link href={machine.href || ""}>
                          <Button size="full">{machine.btnText}</Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </section>
        <Benefits theme={themeHeavy} />
        <section
          className="flex justify-center bg-black relative tablet:px-6 bg-no-repeat bg-cover h-[510px]"
          style={
            isDesktop
              ? {
                  backgroundImage: `url(${
                    isMobile ? specialist?.mobileImg : specialist?.img
                  })`,
                }
              : {}
          }
        >
          {isMobile && (
            <div
              className="absolute w-full h-[220px] bg-no-repeat bg-cover shadow-inner shadow-innerLg"
              style={{
                backgroundImage: `url(${specialist?.mobileImg})`,
              }}
            />
          )}
          <div className="relative container pb-14 pt-[90px] flex flex-col gap-11 tablet:pt-40 tablet:pl-4 tablet:pr-1">
            <div className="flex gap-2 tablet:gap-5">
              <div>
                <p className="text-white font-bold text-2xl w-[325px] tablet:text-lg">
                  {specialist?.title}
                </p>
                <p className="text-white tablet:text-sm tablet:w-full py-10 tablet:font-normal">
                  {specialist?.text}
                </p>
                <Button className="py-3 w-[251px]">
                  Fale com especialista
                </Button>
              </div>
            </div>
          </div>
        </section>
        <MachinesAndPlatforms />
      </main>
      <Footer theme={themeHeavy} />
    </>
  );
}

// export async function getStaticProps() {
//   const images = await getImage("maquinas_pesadas_locacao");

//   const banner = {
//     img: images?.banner_heavy_rental?.[0].fields.native.links[0].href,
//     title: images?.banner_heavy_rental?.[0].fields.content_title
//   };

//   const segment = {
//     img: images?.heavy_machinery_rental?.[0].fields.native.links[0].href,
//     title: images?.heavy_machinery_rental?.[0].fields.content_title,
//     text: images?.heavy_machinery_rental?.[0].fields.content_text
//   };

//   const specialist = {
//     img: images?.fale_com_especialista?.[0].fields.native.links[0].href,
//     title: images?.fale_com_especialista?.[0].fields.content_title,
//     text: images?.fale_com_especialista?.[0].fields.content_text,
//     mobileImg: images?.fale_com_especialista?.[0].mobileObj?.fields.native.links[0].href
//   };

//   return {
//     props: {
//       banner: banner || null,
//       segment: segment || null,
//       specialist: specialist || null
//     }
//   }
// };
