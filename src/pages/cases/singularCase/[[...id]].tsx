/* eslint-disable react-hooks/rules-of-hooks */
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import LeftImgWithRightTextBg from "@/assets/img/LeftImgWithRightTextBg.png";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";

import { useGetCMSOtherPage } from "@/services/hooks/useGetCMSOtherPage";
import { Header } from "@/components/shared/Header/Header";
import DynamicSection from "@/components/HeavyMachines/components/DynamicSection";
import lineUp from "@/assets/img/linesUp.png";
import Button from "@/components/shared/Button/Button";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import { HtmlRenderer } from "@/components/HtmlRender/htmlRender";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import useScreenWidth from "@/services/hooks/useScreenWidth";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetCmsSingularCase } from "@/components/Cases/useGetCmsSingularCase";
import { useGetCMSCases } from "@/components/Cases/useGetCmsCases";

export default function SingularCase() {
  const { isMobile } = useScreenWidth();
  const router = useRouter();
  const [content, setContent] = useState<any>();

  const getContent = useCallback(async (id: any) => {
    const {
      firstSection,
      bannersResult,
      whatTheyNeeded,
      dividerSection,
      hirePlatformsText,
      millsVersusText,
      testimoniesText,
    } = await useGetCmsSingularCase({ id });
    const { listCases } = await useGetCMSCases();
    setContent({
      firstSection,
      bannersResult,
      whatTheyNeeded,
      dividerSection,
      hirePlatformsText,
      millsVersusText,
      testimoniesText,
      listCases,
    });
  }, []);
  console.log({ content });
  useEffect(() => {
    const { id }: any = router.query;
    if (id) getContent(id[0]);
  }, [router.query]);
  return (
    <>
      <Header theme="rentalHeavy" />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Cases",
              href: "/cases",
            },
            {
              name: content?.bannersResult.title,
              href: "#",
            },
          ]}
          title={`Caso ${content?.bannersResult.title}`}
          backgroundImage={
            isMobile
              ? content?.bannersResult.srcMobile
              : content?.bannersResult.src
          }
        />
        <DynamicSection
          paddingTop="pb-10"
          backgroundColor="bg-gray-80"
          backgroundImageSrc={LeftImgWithRightTextBg}
          backgroundStyle="bg-no-repeat bg-bottom-right-mobile"
          customDivStyles="tablet:flex-col-reverse"
          leftComponent={
            <div
              style={{
                backgroundImage: `url(${content?.firstSection.img})`,
                width: "inherit",
                backgroundSize: "cover",
              }}
              className={`flex justify-center bg-no-repeat bg-cover h-[495px] py-12 tablet:w-full tablet:h-[232px] tablet: mb-[-40px]`}
            />
          }
          rightComponent={
            <div className="flex flex-col align-middle justify-center gap-6 w-full bg-no-repeat bg-right-bottom tablet:px-4">
              <div className="ml-12 w-[476px] tablet:w-full tablet:ml-0">
                <h3 className="font-semibold text-green-800 text-2xl tablet:text-base">
                  {content?.firstSection.title}
                </h3>
                <p className="text-green-800 mt-6 tablet:text-xs tablet:mb-8">
                  {content?.firstSection.text}
                </p>
              </div>
            </div>
          }
        />
        <DynamicSection
          paddingTop="pb-10"
          backgroundColor="bg-beige-200"
          leftComponent={
            <div className="flex flex-col text-green-800 align-middle justify-center gap-6 w-full bg-no-repeat bg-right-bottom tablet:px-4">
              <div className="mr-12 w-[476px] tablet:w-full tablet:mt-8">
                <span className="font-normal">
                  {content?.whatTheyNeeded.title}
                </span>
                <h3 className="font-semibold text-green-800 mt-4 text-2xl tablet:text-base">
                  {content?.whatTheyNeeded.subtitle}
                </h3>
                <p className="text-green-800 mt-6 tablet:text-xs tablet:mb-8 ">
                  {content?.whatTheyNeeded.text}
                </p>
              </div>
            </div>
          }
          rightComponent={
            <div
              style={{
                backgroundImage: `url(${
                  isMobile
                    ? content?.whatTheyNeeded.mobileImage ??
                      content?.whatTheyNeeded.img
                    : content?.whatTheyNeeded.img
                })`,
                width: isMobile ? "100%" : "1024px",
                backgroundSize: "cover",
              }}
              className={`bg-right-bottom flex justify-center bg-no-repeat bg-cover h-[495px]  py-12 tablet:w-full tablet:h-[232px] tablet: mb-[-40px]`}
            />
          }
        />
        {content?.dividerSection.text && (
          <DynamicSection
            backgroundColor="bg-green-800"
            backgroundImageSrc={lineUp}
            backgroundStyle="bg-no-repeat bg-top-right tablet:bg-mobile tablet:bg-top-right-mobile"
            leftComponent={
              <div className="flex py-16 bg-no-repeat w-full tablet:flex-col tablet:py-7 tablet:px-4">
                <p className="text-[28px] font-semibold text-white max-w-[792px] tablet:text-base">
                  {content?.dividerSection.text}
                </p>
              </div>
            }
          />
        )}

        <DynamicSection
          paddingTop="pb-10"
          backgroundColor="bg-beige-200"
          leftComponent={
            <div
              style={{
                backgroundImage: `url(${
                  isMobile
                    ? content?.hirePlatformsText.mobileImg
                    : content?.hirePlatformsText.img
                })`,
                width: "inherit",
                backgroundSize: "cover",
              }}
              className={`bg-right-bottom flex justify-center bg-no-repeat bg-cover h-[495px]  py-12 tablet:w-full tablet:h-[232px] tablet:mb-[-40px] tablet:mt-[-25px]`}
            />
          }
          rightComponent={
            <div className="flex flex-col align-middle justify-center font-ibm-font gap-6 w-full bg-no-repeat bg-right-bottom tablet:pl-4">
              <div className="ml-12 tablet:ml-0 tablet:mt-14">
                <h3 className="font-semibold text-green-800 text-2xl mb-6 tablet:text-base tablet:mt-4">
                  {content?.hirePlatformsText.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {content?.hirePlatformsText.subtitleList.map(
                    (text: string, index: number) => {
                      return (
                        <div
                          key={index}
                          className="py-5 bg-green-800 text-white px-9 rounded-l-lg tablet:text-xs"
                        >
                          {text}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          }
        />
        {content?.millsVersusText.title !== "" &&
          content?.millsVersusText?.subtitleHeader[1] === "Balancim" && (
            <DynamicSection
              paddingTop="py-10"
              leftComponent={
                <div className="flex flex-col text-green-800 w-full">
                  <div className="flex flex-col max-w-[876px] tablet:px-4">
                    <h1 className="text-2xl font-semibold mb-3 tablet:text-base">
                      {content?.millsVersusText.title}
                    </h1>
                    <span className="tablet:text-xs">
                      {content?.millsVersusText.textField}
                    </span>
                  </div>
                  <div className="flex flex-row gap-6 mt-14 tablet:flex-col tablet:px-4">
                    <div className="w-full">
                      <span className="flex justify-center border-2 border-green-10 rounded py-3 w-full">
                        {content?.millsVersusText?.subtitleHeader[0]}
                      </span>
                      <div className="flex justify-between mt-6 tablet:flex-col tablet:w-full tablet:gap-4">
                        {content?.millsVersusText?.millsVersusList?.map(
                          (item: any) => {
                            return (
                              item?.content_title ===
                                "Plataforma Elevatória" && (
                                <div className="flex flex-col items-center w-[184px] py-16 border-2 border-green-10 rounded tablet:w-full tablet:flex-row tablet:text-xs tablet:gap-5 tablet:py-2 tablet:px-7 tablet:text-start">
                                  <img src={item?.logo} alt="icon" />
                                  <p>{item?.text}</p>
                                </div>
                              )
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <span className="flex justify-center border-2 border-beige-50 rounded py-3 w-full">
                        {content?.millsVersusText?.subtitleHeader[1]}
                      </span>
                      <div className="flex justify-between mt-6 tablet:flex-col tablet:gap-4">
                        {content?.millsVersusText?.millsVersusList?.map(
                          (item: any) => {
                            return (
                              item?.content_title === "Balancim" && (
                                <div className="flex flex-col items-center w-[184px] py-16 border-2 border-beige-50 rounded tablet:w-full tablet:flex-row tablet:text-xs tablet:gap-5 tablet:py-2 tablet:px-7 tablet:text-start">
                                  <img src={item?.logo} alt="icon" />
                                  <p>{item?.text}</p>
                                </div>
                              )
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          )}

        {content?.millsVersusText.title !== "" &&
          content?.millsVersusText?.subtitleHeader[1] === "Andaime" && (
            <DynamicSection
              paddingTop="py-10"
              leftComponent={
                <div className="flex flex-col text-green-800 w-full">
                  <div className="flex flex-col max-w-[876px] tablet:px-4">
                    <h1 className="text-2xl font-semibold mb-3 tablet:text-base">
                      {content?.millsVersusText.title}
                    </h1>
                    <span className="tablet:text-xs">
                      {content?.millsVersusText.textField}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6 mt-14 tablet:flex-col tablet:px-4">
                    <div className="w-full">
                      <span className="flex justify-center border-2 border-green-10 rounded py-3 w-full">
                        {content?.millsVersusText?.subtitleHeader[0]}
                      </span>
                      <div className="flex justify-between mt-6 tablet:flex-col tablet:w-full tablet:gap-4">
                        {content?.millsVersusText?.millsVersusList?.map(
                          (item: any) => {
                            return (
                              item?.content_title ===
                                "Plataforma Elevatória" && (
                                <div className="flex flex-col items-center w-[222px] text-center px-2 py-7 border-2 border-green-10 rounded tablet:w-full tablet:flex-row tablet:text-xs tablet:gap-5 tablet:py-2 tablet:text-start">
                                  <img src={item?.logo} alt="icon" />
                                  <p className="mt-5 tablet:mt-0">
                                    {item?.text}
                                  </p>
                                </div>
                              )
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <span className="flex justify-center border-2 border-beige-50 rounded py-3 w-full">
                        {content?.millsVersusText?.subtitleHeader[1]}
                      </span>
                      <div className="flex justify-between mt-6 tablet:flex-col tablet:gap-4">
                        {content?.millsVersusText?.millsVersusList?.map(
                          (item: any) => {
                            return (
                              item?.content_title === "Andaime" && (
                                <div className="flex flex-col items-center w-[222px] text-center px-2 py-7 border-2 border-beige-50 rounded tablet:w-full tablet:flex-row tablet:text-xs tablet:gap-5 tablet:py-2 tablet:text-start">
                                  <img src={item?.logo} alt="icon" />
                                  <p className="mt-5 tablet:mt-0">
                                    {item?.text}
                                  </p>
                                </div>
                              )
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          )}

        <DynamicSection
          backgroundColor="bg-orange-500"
          backgroundImageSrc={lineUp}
          backgroundStyle="bg-no-repeat bg-top-right tablet:bg-mobile tablet:bg-top-right-mobile"
          leftComponent={
            <div className="flex flex-col py-16 bg-no-repeat w-full text-white tablet:flex-col tablet:py-0 tablet:px-4">
              <p className="text-[28px] font-semibold max-w-[792px] mb-14 tablet:text-base tablet:mb-7">
                {content?.testimoniesText.title}
              </p>
              <div className="flex justify-between tablet:flex-col  tablet:gap-14">
                {content?.testimoniesText.subtitle.map(
                  (testimonial: any, index: number) => {
                    return (
                      <div key={index} className="max-w-[539px]">
                        <p className="font-normal mb-2 tablet:text-sm">
                          <HtmlRenderer htmlContent={testimonial} />
                        </p>
                        <p className="font-normal mt-4 tablet:text-xs">
                          <HtmlRenderer
                            htmlContent={content?.testimoniesText.text[index]}
                          />
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          }
        />

        <DynamicSection
          customStyles="tablet:mb-4"
          leftComponent={
            <div className="flex flex-col py-16 bg-no-repeat w-full text-green-800 tablet:flex-col tablet:py-0 tablet:px-4">
              <p className="text-[28px] font-semibold max-w-[792px] mb-14 tablet:text-base tablet:mb-4">
                Continue explorando histórias como esta
              </p>
              <Carousel slidesToShow={isMobile ? 1 : 4}>
                {content?.listCases?.map((item: any) => {
                  return (
                    <div
                      key={item?.href}
                      className="flex flex-col justify-between border-2 border-beige-50 rounded p-6 mr-2 max-w-[282px] h-[346px]"
                    >
                      <div className="h-60">
                        <img src={item.logo} alt="logo_ico" width="107px" />
                        <p className="pt-6 text-sm">{item.text}</p>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => router.replace(`/cases/${item?.href}`)}
                      >
                        Saiba mais
                      </Button>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          }
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
