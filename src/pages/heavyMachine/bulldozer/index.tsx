import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/shared/About/About";
import { InformationWithButton } from "@/components/shared/InformationWithButton/InformationWithButton";
import { TalkToSpecialistHeavy } from "@/components/ProductTypeAndSegment/TalkToSpecialistHeavy";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useState, useEffect, useCallback } from "react";
import { getImageSrc } from "@/utils/images";
import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";
import SearchCMS from "@/dtos/SearchCMS";
import dnaBottom from "@/assets/dna-bottom.svg";
import { updateParagraphs } from "@/utils/texts";

export default function Bulldozer() {
  const { isMobile } = useScreenWidth();

  const [content, setContent] = useState<any>();

  const getContent = useCallback(async () => {
    const images = await getImage("maquinas_pesadas_trator_de_esteiras");
    const texts = await getText("maquinas_pesadas_trator_de_esteiras");
    const shared = await getImage("shared");

    const data = {
      banner: images?.["banner_heavy_machine_crawler_tractor"]?.[0],
      firstAbout: images?.["heavy_machine_crawler_tractor"]?.find(
        (item: SearchCMS) => item.description.includes("esteiras01")
      ),
      terrains: {
        title: texts?.["work_on_uneven_terrain_text"]?.[0].fields.title,
        options: texts?.[
          "work_on_uneven_terrain_text"
        ]?.[0].fields.subtitle.map((item: string, index: number) => {
          return {
            subtitle: item,
            text: texts?.["work_on_uneven_terrain_text"]?.[0].fields.text_field[
              index
            ],
          };
        }),
      },
      secondAbout: images?.["heavy_machine_crawler_tractor"]?.find(
        (item: SearchCMS) => item.description.includes("esteiras02")
      ),
      thirdAbout: images?.["heavy_machine_crawler_tractor"]?.find(
        (item: SearchCMS) => item.description.includes("esteiras03")
      ),
      truckRental: shared.truck_rental[0],
      specialist: images?.["especialista_trator_de_esteiras"]?.[0],
    };

    setContent(data);
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
            isMobile
              ? content?.banner?.fields.native.links[0].href
              : content?.banner?.mobileObj?.fields.native.links[0].href
          }
          title={content?.banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: `Categorias > ${
                content?.banner?.fields?.content_title ?? ""
              }`,
              href: "/maquinas-pesadas/trator-de-esteiras",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={
            isMobile
              ? content?.firstAbout?.mobileObj?.fields.native.links[0].href
              : content?.firstAbout?.fields.native.links[0].href
          }
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          orientation="inverted"
          buttonTitle={content?.firstAbout?.fields.button_text}
          link={content?.firstAbout?.fields.href_attribute}
          hideImage={isMobile ? true : false}
        />
        <section className="flex justify-center bg-green-800">
          <div className="container flex justify-between text-white py-10 tablet:flex-col tablet:px-3">
            <div className="flex justify-center items-center tablet:pb-5">
              <h3 className="text-2xl font-semibold tablet:text-base">
                {content?.terrains?.title}
              </h3>
            </div>
            <div>
              {content?.terrains?.options?.map((option: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`${
                      index !== 0 ? "border-t-[1px] border-beige-500" : ""
                    }`}
                  >
                    <h4 className="text-lg font-semibold py-2 pb-3 tablet:text-base">
                      {option.subtitle}
                    </h4>
                    <p className="pb-5 tablet:text-xs">{option.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={
            isMobile
              ? content?.secondAbout?.mobileObj?.fields.native.links[0].href
              : content?.secondAbout?.fields.native.links[0].href
          }
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          forceImageDisplayOnMobile={true}
        />
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={
            isMobile
              ? content?.thirdAbout?.mobileObj?.fields.native.links[0].href
              : content?.thirdAbout?.fields.native.links[0].href
          }
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          orientation="inverted"
          buttonTitle={content?.thirdAbout?.fields.button_text}
          link={content?.thirdAbout?.fields.href_attribute}
          theme="gray-50"
        />
        <InformationWithButton
          title={content?.truckRental?.fields?.content_title}
          buttonLink={content?.truckRental?.fields?.href_attribute}
          theme="bg-green-800"
          description={""}
          buttonTitle={"Saiba Mais"}
          buttonColor={"bg-orange-500"}
          buttonTextColor={"text-white"}
          showDna={false}
          image={getImageSrc(
            isMobile
              ? content?.truckRental?.mobileObj?.fields
              : content?.truckRental?.fields
          )}
          paddingY="0"
        />
        <TalkToSpecialistHeavy
          buttonText={content?.specialist?.fields.button_text}
          link={content?.specialist?.fields?.href_attribute}
          text={content?.specialist?.fields?.content_text}
          title={content?.specialist?.fields?.content_title}
          image={getImageSrc(
            isMobile
              ? content?.specialist?.mobileObj?.fields
              : content?.specialist?.fields
          )}
        />
        {/* <section
          className="flex justify-center bg-black relative tablet:px-6 bg-no-repeat bg-cover h-[510px]"
          style={
            isDesktop
              ? {
                backgroundImage: `url(${isMobile ? content?.specialist?.mobileObj?.fields.native.links[0].href : content?.specialist?.fields.native.links[0].href})`,
              }
              : {}
          }
        >
          {isMobile && (
            <div
              className="absolute w-full h-[220px] bg-no-repeat bg-cover shadow-inner shadow-innerLg"
              style={{
                backgroundImage: `url(${content?.specialist?.mobileObj?.fields.native.links[0].href})`,
              }}
            />
          )}
          <div className="relative container pb-14 pt-[90px] flex flex-col gap-11 tablet:pt-40 tablet:pl-4 tablet:pr-1">
            <div className="flex gap-2 tablet:gap-5">
              <div>
                <p className="text-white font-bold text-2xl w-[325px] tablet:text-lg">
                  {content?.specialist?.fields.content_title}
                </p>
                <p className="text-white w-[500px] tablet:text-sm tablet:w-full py-10 tablet:font-normal">
                  {content?.specialist?.fields.content_text}
                </p>
                <Button className="py-3 w-[251px]">
                {content?.specialist?.fields.button_text}
                </Button>
              </div>
            </div>
          </div>
        </section> */}
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
