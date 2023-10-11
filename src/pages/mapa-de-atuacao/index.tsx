/* eslint-disable react-hooks/rules-of-hooks */
import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";

import { Header } from "@/components/shared/Header/Header";
import useScreenWidth from "@/services/hooks/useScreenWidth";

import { useCallback, useEffect, useState } from "react";
import { useGetPerformanceMap } from "@/components/PerformanceMap/useGetPerformanceMap";
import { SearchDialog } from "@/components/PerformanceMap/SearchDialog/SearchDialog";
import { updateParagraphs } from "@/utils/texts";
import { expandIco } from "@/assets";
import { MobileToggle } from "@/components/PerformanceMap/MobileToggle/MobileToggle";

export default function PerformanceMap() {
  const { isMobile } = useScreenWidth();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapZoom, setMapZoom] = useState(6);
  const [listOfMarkers, setListOfMarkers] = useState<any>([]);
  const [markerInfo, setMarkerInfo] = useState<any>([]);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [bannerResults, setBannerResults] = useState<any>([]);
  const [uniqueStates, setUniqueStates] = useState<string[]>([]);
  const [markerMobileInfo, setMarkerMobileInfo] = useState<any>([]);

  const getContent = useCallback(async () => {
    const { markers, uniqueStates, bannersResult } =
      await useGetPerformanceMap();
    setListOfMarkers(markers);
    setUniqueStates(uniqueStates);
    setBannerResults(bannersResult);
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    updateParagraphs();
  }, [markerInfo, listOfMarkers]);

  const toggleMarkerVisibility = (index: any) => {
    if (isMobile) {
      setMarkerMobileInfo(listOfMarkers[index]);
      return setMobileToggle(true);
    }
    const updatedMarkers = [...listOfMarkers];
    updatedMarkers[index].visible = !updatedMarkers[index].visible;
    setListOfMarkers(updatedMarkers);
    setMarkerInfo(listOfMarkers[index]);
  };

  const closeMarkerVisibility = (name: string) => {
    setMarkerInfo([]);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement?.requestFullscreen) {
        // Firefox
        document.documentElement?.requestFullscreen();
      } else if (document.documentElement?.requestFullscreen) {
        // Chrome, Safari, and Opera
        document.documentElement?.requestFullscreen();
      } else if (document.documentElement?.requestFullscreen) {
        // IE/Edge
        document.documentElement?.requestFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <Header theme="rentalHeavy" />
      <MobileToggle
        markerInfo={markerMobileInfo}
        isOpen={mobileToggle}
        onClose={() => setMobileToggle(false)}
      />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Mapa de Atuação",
              href: "#",
            },
          ]}
          title={`São ${listOfMarkers?.length} unidades atuando em mais de 1.400 cidades `}
          backgroundImage={
            isMobile ? bannerResults?.srcMobile : bannerResults?.src
          }
          mapsButton={
            listOfMarkers?.length > 0 && (
              <SearchDialog
                uniqueStates={uniqueStates}
                listOfMarkers={listOfMarkers}
              />
            )
          }
          height="190px"
        />
        {listOfMarkers.length > 0 && (
          <Map
            height={743}
            defaultCenter={[-23.024996, -45.5638792]}
            defaultZoom={mapZoom}
            metaWheelZoom
            animate
          >
            <ZoomControl
              buttonStyle={{
                backgroundColor: "#f37020",
                borderRadius: "100%",
                color: "white",
                height: "45px",
                width: "45px",
                marginBottom: "10px",
                left: "100px",
              }}
            />
            <button
              className="flex justify-center items-center rounded-full bg-orange-500 h-[45px] w-[45px] absolute top-[260px] left-[30px]"
              onClick={() => toggleFullScreen()}
            >
              <img src={expandIco.src} />
            </button>
            {listOfMarkers.map(({ markers }: any, index: number) => {
              return (
                <Marker
                  key={index}
                  width={36}
                  anchor={markers}
                  color="#F37021"
                  onClick={() => toggleMarkerVisibility(index)}
                />
              );
            })}
            {markerInfo.length !== 0 && (
              <Overlay anchor={markerInfo?.markers} offset={[0, 0]}>
                <div className="flex flex-col p-8 bg-white w-[333px] h-[143px] rounded-lg">
                  <div className="flex justify-between w-full font-ibm-font font-semibold text-green-800">
                    <p>{markerInfo?.unitInfo?.name}</p>
                    <button
                      className="flex text-orange-500 text-xs"
                      onClick={() =>
                        closeMarkerVisibility(markerInfo?.unitInfo?.name)
                      }
                    >
                      X
                    </button>
                  </div>
                  <p className="text-xs">{markerInfo?.unitInfo?.address} </p>
                  <a
                    href={`${markerInfo?.unitInfo?.href}`}
                    className="text-orange-500 text-xs mt-3"
                  >
                    Saiba mais sobre esta unidade
                  </a>
                </div>
              </Overlay>
            )}
          </Map>
        )}
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
