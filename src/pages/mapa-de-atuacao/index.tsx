/* eslint-disable react-hooks/rules-of-hooks */
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import LeftImgWithRightTextBg from "@/assets/img/LeftImgWithRightTextBg.png";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Map, Marker, Overlay } from "pigeon-maps";

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
import dynamic from "next/dynamic";
import { useGetPerformanceMap } from "@/components/PerformanceMap/useGetPerformanceMap";

export default function PerformanceMap() {
  const { isMobile } = useScreenWidth();
  const router = useRouter();
  const [content, setContent] = useState<any>();
  const [listOfMarkers, setListOfMarkers] = useState<any>([]);
  const [markerInfo, setMarkerInfo] = useState<any>([]);

  const getContent = useCallback(async () => {
    const { markers } = await useGetPerformanceMap();
    setListOfMarkers(markers);
    // setContent();
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  const toggleMarkerVisibility = (index: any) => {
    const updatedMarkers = [...listOfMarkers];
    updatedMarkers[index].visible = !updatedMarkers[index].visible;
    setListOfMarkers(updatedMarkers);
    setMarkerInfo(listOfMarkers[index]);
  };

  return (
    <>
      <Header theme="rentalHeavy" />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Mapa de Atuação",
              href: "#",
            },
          ]}
          title={`São 55 unidades atuando em mais de 1.400 cidades `}
          backgroundImage={""}
          buttonTitle="Buscar unidades"
        />
        {listOfMarkers && (
          <div style={{ width: "100%" }}>
            <Map height={743} defaultZoom={3}>
              {listOfMarkers?.map((marker: any, index: number) => {
                return (
                  <>
                    <Marker
                      width={36}
                      anchor={[marker.latitude, marker.longitude]}
                      onClick={() => toggleMarkerVisibility(index)}
                    />
                    {marker.visible && (
                      <Overlay
                        anchor={[marker.latitude, marker.longitude]}
                        offset={[0, 0]}
                      >
                        <div className="flex flex-col p-8 bg-white w-[333px] h-[143px] rounded-lg">
                          <div className="flex justify-between w-full font-ibm-font font-semibold text-green-800">
                            <p>{markerInfo?.unitInfo?.name}</p>
                            <button
                              className="flex text-orange-500 text-xs"
                              onClick={() => toggleMarkerVisibility(index)}
                            >
                              X
                            </button>
                          </div>
                          <p className="text-xs">
                            {markerInfo?.unitInfo?.address}
                          </p>
                          <a className="text-orange-500 text-xs mt-3">
                            Saiba mais sobre esta unidade
                          </a>
                        </div>
                      </Overlay>
                    )}
                  </>
                );
              })}
            </Map>
          </div>
        )}

        {/* 
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
        /> */}
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
