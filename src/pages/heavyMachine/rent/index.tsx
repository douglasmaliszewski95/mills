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
//import { ImageOCC } from "@/components/shared/ImageOCC/ImageOCC";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import { LargeNextArrow } from "@/components/shared/Arrows/LargeNextArrow/LargeNextArrow";
import { LargePrevArrow } from "@/components/shared/Arrows/LargePrevArrow/LargePrevArrow";
import { updateParagraphs } from "@/utils/texts";
import { TalkToSpecialistModal } from "@/components/shared/TalkToSpecialistModal/TalkToSpecialistModal";
import { getImageOCC } from "@/services/hooks/getImageOCC";
import { getBaseUrl } from "@/utils/product";

export default function Rent() {
  const themeHeavy = "rentalHeavy";
  const { isMobile, isDesktop } = useScreenWidth();

  const [banner, setBanner] = useState<any>();
  const [segment, setSegment] = useState<any>();
  const [specialist, setSpecialist] = useState<any>();
  const [machines, setMachines] = useState<any>();
  const [segTitle, setSegTitle] = useState('');

  useEffect(() => {
    updateParagraphs();
  }, [banner, segment, specialist, machines]);

  const getContent = useCallback(async () => {
    const [
      images,
      texts
    ]: any = await Promise.all([
      getImage("maquinas_pesadas_locacao"),
      getText("maquinas_pesadas_locacao")
    ]);

    setSegTitle(texts?.heavy_machinery_segments_text[0]?.fields?.title)

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
            images: await Promise.all(
              resultOCC?.products?.map(async (item: ProductOCC) => {
                const urlImage = await getImageOCC(item.fullImageURLs[0]).then(response => response?.toString());
                const baseUrl = getBaseUrl(item.type);
                return {
                  id: item.id,
                  occImage: urlImage || "",
                  model: `${item.id} - ${item.brand}`,
                  description: item.displayName,
                  href: `/${baseUrl}${item.route}`
                };
              }) || []
            ),
            btnText: machine.fields.buttonText[0],
            href: machine.fields.hrefButton[0],
          };
        })
    );    

    setBanner({
      img: images?.banner_heavy_rental?.[0].fields.native.links[0].href,
      title: images?.banner_heavy_rental?.[0].fields.content_title,
    });

    setSegment({
      img: images?.heavy_machinery_rental?.[0].fields.native.links[0].href,
      title: images?.heavy_machinery_rental?.[0].fields.content_title,
      text: images?.heavy_machinery_rental?.[0].fields.content_text,
      href: images?.heavy_machinery_rental?.[0].fields.href_attribute,
    });

    setSpecialist({
      img: images?.fale_com_especialista?.[0].fields.native.links[0].href,
      title: images?.fale_com_especialista?.[0].fields.content_title,
      text: images?.fale_com_especialista?.[0].fields.content_text,
      mobileImg:
        images?.fale_com_especialista?.[0].mobileObj?.fields.native.links[0]
          .href,
    });

    setMachines(machineTypes);
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
          buttonProps={{ text: "Ver modelos", link: segment?.href }}
          bgColor="bg-white"
          textColor="text-green-800"
          variant="default"
          theme={themeHeavy}
        />
        <section className="flex justify-center text-green-800 bg-green-800">
          <div className="flex justify-between container tablet:flex-col pt-3 pb-8">
            <div className="max-w-[100%] w-full">
              <Carousel
                className="flex justify-between w-full my-5 mx-5 tablet:w-auto"
                hasDots={true}
                slidesToScroll={isMobile ? 1 : 4}
                slidesToShow={isMobile ? 1 : 4}
                adaptiveHeight={false}
              >
                {machines?.map((machine: any, index: number) => {
                  return (
                    <div key={index} className="my-5 mx-5 h-full tablet:!w-auto">
                      <div className="w-[280px] h-[535px] bg-white py-5 px-5 tablet:overflow-hidden tablet:static tablet:w-[240px]">
                        <div className="h-[150px]">
                          <h3 className="text-green-800 text-lg font-semibold text-center pt-3">
                            {machine.title}
                          </h3>
                          <p className="text-green-800 text-sm text-center pt-3">
                            {machine.subtitle}
                          </p>
                        </div>
                        <div className="border-b-[2px] border-t-[2px] my-5 py-5 h-[250px]">
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
                                  <div className="flex flex-col tablet:px-12 tablet:my-[18px] items-center tablet:flex-col">
                                    {/* <ImageOCC
                                      imageName={image.occImage}
                                      alt={image.description}
                                      className="max-h-[160px] mb-5"
                                    /> */}
                                    <img className="max-h-[160px] mb-5" src={image.occImage} alt={image.description} />
                                    <div className="text-center tablet:mt-[18px]">
                                      <h5 className="text-green-800 font-semibold tablet:text-sm">
                                        {image.model}
                                      </h5>
                                      <Link
                                        href={image.href || ""}
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
        <Benefits theme={themeHeavy} headerText={segTitle}/>
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
              className="absolute w-full h-full bg-no-repeat bg-cover tablet:opacity-50"
              style={{
                backgroundImage: `url(${specialist?.mobileImg})`,
              }}
            />
          )}
          <div className="relative container pb-14 pt-[90px] flex flex-col gap-11 tablet:pt-40">
            <div className="flex gap-2 tablet:gap-5">
              <div>
                <p className="text-white font-bold text-2xl w-[325px] tablet:text-lg tablet:w-full">
                  {specialist?.title}
                </p>
                <p className="text-white w-[50%] tablet:w-full tablet:text-sm tablet:w-full py-10 tablet:font-normal">
                  {specialist?.text}
                </p>
                <TalkToSpecialistModal>
                  <Button className="py-2 w-[260px] tablet:w-full">
                    <p className="font-semibold text-sm">
                      Fale com um especialista
                    </p>
                  </Button>
                </TalkToSpecialistModal>
              </div>
            </div>
          </div>
        </section>
        <MachinesAndPlatforms />
      </main>
      <Footer />
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
