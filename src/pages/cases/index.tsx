/* eslint-disable react-hooks/rules-of-hooks */
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Header } from "@/components/shared/Header/Header";
import DynamicSection from "@/components/HeavyMachines/components/DynamicSection";
import Button from "@/components/shared/Button/Button";
import { Opinion } from "@/components/ProductTypeAndSegment/Opinion";
import { useCallback, useEffect, useState } from "react";
import { useGetCMSCases } from "@/components/Cases/useGetCmsCases";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useRouter } from "next/router";
import { updateParagraphs } from "@/utils/texts";

export default function Cases() {
  const router = useRouter();
  const { isMobile } = useScreenWidth();
  const [content, setContent] = useState<any>();

  const getContent = useCallback(async () => {
    const {
      bannersResult,
      supportCustomers,
      listCases,
      customerReviews,
      changeInnovatePart,
    } = await useGetCMSCases();
    setContent({
      bannersResult,
      supportCustomers,
      listCases,
      customerReviews,
      changeInnovatePart,
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
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: content?.bannersResult.title,
              href: "#",
            },
          ]}
          title={content?.bannersResult.title}
          backgroundImage={content?.bannersResult.src}
        />
        <DynamicSection
          paddingTop="pb-10"
          backgroundColor="bg-gray-80"
          leftComponent={
            <div className="flex flex-col align-middle justify-center gap-6  max-w-[482px] tablet:px-4">
              <h3 className="font-semibold text-green-800 text-2xl tablet:text-base">
                {content?.supportCustomers?.title}
              </h3>
              <p className="text-green-800  tablet:text-xs tablet:mb-8">
                {content?.supportCustomers?.text}
              </p>
            </div>
          }
          rightComponent={
            <div
              style={{
                backgroundImage: `url(${
                  isMobile
                    ? content?.supportCustomers?.mobileImg
                    : content?.supportCustomers?.img
                })`,
              }}
              className={`flex justify-center bg-no-repeat bg-cover w-[564px] h-[495px] py-12 tablet:w-full tablet:h-[232px] tablet: mb-[-40px]`}
            />
          }
        />

        <DynamicSection
          leftComponent={
            <div className="flex flex-col align-middle justify-center gap-6 py-11 tablet:px-4">
              {content?.listCases?.map((list: any) => {
                return (
                  <div
                    key={list?.href}
                    className="flex flex-row border border-green-800 border-solid rounded-lg tablet:flex-col tablet:border-beige-100"
                  >
                    <img
                      src={list?.img}
                      className="h-[379px] w-[563px] rounded-l-lg tablet:rounded-t-lg tablet:rounded-b-none  tablet:max-w-full tablet:max-h-[193px]"
                    />
                    <div className="flex flex-col justify-center px-12 max-w-[587px] gap-8 tablet:py-6 tablet:px-3">
                      <img alt="logo image" src={list?.logo} width="209px" />
                      <p className="text-base">{list?.text}</p>
                      <Button
                        className="max-w-[265px]"
                        onClick={() => router.push(`cases/${list?.href}`)}
                      >
                        Saiba mais
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        />

        <Opinion content={content?.customerReviews} />

        <DynamicSection
          paddingBottom="pb-10"
          backgroundColor="bg-gray-80"
          leftComponent={
            <div
              style={{
                backgroundImage: `url(${
                  isMobile
                    ? content?.changeInnovatePart?.srcMobile
                    : content?.changeInnovatePart?.src
                })`,
              }}
              className={`flex justify-center bg-no-repeat bg-cover w-[564px] h-[495px] py-12 tablet:w-full tablet:h-[232px] tablet: mb-[-40px] tablet:mt-[-25px]`}
            />
          }
          rightComponent={
            <div className="flex flex-col align-middle justify-center gap-6  max-w-[482px] tablet:px-4">
              <h3 className="font-semibold text-green-800 text-2xl tablet:text-base tablet:mt-14">
                {content?.changeInnovatePart?.text}
              </h3>
              <Button
                className="w-[265px] py-3"
                onClick={() => router.push(content?.changeInnovatePart?.href)}
              >
                Conheça a Mills
              </Button>
            </div>
          }
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
