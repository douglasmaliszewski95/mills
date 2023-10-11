import { getCMSContent } from "@/components/Generators/content";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { useCallback, useEffect, useState } from "react";
import { TransportContent } from "./types";
import _ from "lodash";
import { getText } from "@/services/hooks/getText";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { Banner } from "@/components/shared/Banner/Banner";
import { ImageCMS } from "@/types";
import { getImageSrc } from "@/utils/images";
import { About } from "@/components/shared/About/About";
import { transformContentToMobile } from "@/utils/content";
import { GridInformation } from "@/components/shared/GridInformation/GridInformation";
import { SimpleBanner } from "@/components/SimpleBanner/SimpleBanner";
import { CarouselTabs } from "@/components/shared/CarouselTabs/CarouselTabs";
import { SellParts } from "@/components/Category/SellParts/SellParts";
import { TrainingMenu } from "@/components/shared/TrainingMenu/TrainingMenu";
import { Trainings } from "@/components/shared/Trainings/Trainings";
import { AboutSmallImage } from "@/components/AboutSmallImage/AboutSmallImage";
import { updateParagraphs } from "@/utils/texts";
import { useRouter } from "next/router";
import TrainingDialog from "@/components/shared/Trainings/Modal/Modal";

function Maintenance() {
  const router = useRouter();
  const [content, setContent] = useState<TransportContent>();
  const [contentBase, setContentBase] = useState<any>();
  const [customServices, setCustomServices] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [flux, setFlux] = useState("" as any);

  useEffect(() => {
    const customServices = localStorage.getItem("customServices");
    setCustomServices(customServices ? JSON.parse(customServices) : undefined);
  }, []);

  useEffect(() => {
    if (customServices === undefined) {
      const newCustomServices = {
        shipping: {
          checked: false,
          state: "",
          city: "",
        },
        operationTraining: { checked: false, quantity: 0 },
        ipafTraining: { checked: false, quantity: 0 },
        loadingUnloadingOperationQuantity: { checked: false, quantity: 0 },
        seatBeltTraining: { checked: false, quantity: 0 },
        accessoriesAndImplements: {
          checked: false,
          backhoeLoader: [],
          smallLoader: [],
        },
      };
      setCustomServices(newCustomServices);
      return localStorage.setItem(
        "customServices",
        JSON.stringify(newCustomServices)
      );
    }
  }, [customServices]);

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const handleAddOrChangeCustomServices = async (
    name: string,
    value: any,
    property: string,
    href: string
  ) => {
    if (customServices.hasOwnProperty(name)) {
      const updatedCustomServices = {
        ...customServices,
        [name]: {
          ...customServices[name],
          [property]: value,
        },
      };

      setCustomServices(updatedCustomServices);
      localStorage.setItem(
        "customServices",
        JSON.stringify(updatedCustomServices)
      );
    }
    router.push(href);
    // "/carrinho/passo-01"
  };

  const addIpafToCart = () => {
    handleAddOrChangeCustomServices(
      "ipafTraining",
      true,
      "checked",
      "/carrinho/passo-01"
    );
  };

  const { isMobile } = useScreenWidth();

  const formatData = useCallback(
    ({ contentAux, contentText }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      const abouts = responsiveContent?.["treinamento"]?.sort(
        (a: ImageCMS, b: ImageCMS) =>
          a?.description?.localeCompare(b?.description)
      );

      const formattedData = {
        banner: responsiveContent?.["banner_treinamento"]?.[0],
        simpleBanner: responsiveContent?.["banner_rental_service"]?.[0],
        firstAbout: abouts?.[0],
        secondAbout: abouts?.[1],
        thirdAbout: abouts?.[2],
        map: responsiveContent?.["map_acting"]?.[0],
        logo: responsiveContent?.["prize_ipaf"]?.[0],
        tabs: contentText?.["training_ipaf_column"],
        secondTabs: contentText?.["training_national_certification_column"],
        simpleInformation: contentText?.["know_the_assistance_text"]?.[0],
        differentials: contentText?.["differential_text"]?.[0],
        otherTrainings: responsiveContent?.["other_training"]?.reverse(),
      };
      setContent(formattedData);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("treinamento");
        const contentText = await getText("treinamento");
        setContentBase({ contentAux, contentText });
        formatData({ contentAux, contentText });
      } else {
        formatData({ ...contentBase });
      }
    };
    getContent();
  }, [formatData]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const cleanBag = (item: string) => {
    const itemList = JSON.parse((localStorage.getItem("items") ?? "[]") as any);
    const findRentalLight = itemList.find(
      (item: any) => item.paymentFlow === "rentalLight"
    );
    if (itemList.length === 0) {
      return handleAddOrChangeCustomServices(
        item,
        true,
        "checked",
        "/treinamento/passo-1"
      );
    }
    if (findRentalLight) {
      return handleAddOrChangeCustomServices(
        item,
        true,
        "checked",
        "/carrinho/passo-01"
      );
    }
    if (!findRentalLight) {
      setIsDialogOpen(true);
      setFlux(item);
    }
  };

  const goToNextPage = () => {
    if (flux === "ipafTraining") {
      localStorage.setItem("items", JSON.stringify([]));
      return handleAddOrChangeCustomServices(
        "ipafTraining",
        true,
        "checked",
        "/treinamento/passo-1"
      );
    }
  };

  return (
    <>
      <TrainingDialog
        open={isDialogOpen}
        handleClose={() => handleClose()}
        handleFinalize={() => goToNextPage()}
      />
      <Header />
      <main>
        <Banner
          backgroundImage={
            content?.banner && getImageSrc(content?.banner?.fields)
          }
          title={content?.banner?.fields?.content_title ?? ""}
          linkList={[
            {
              name: "Treinamento",
              href: "/training",
            },
          ]}
        />
        <About
          title={content?.firstAbout?.fields?.content_title ?? ""}
          description={content?.firstAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.firstAbout?.fields)}
          alt={content?.firstAbout?.fields?.alt_attribute ?? ""}
          buttonTitle="Incluir no orçamento"
          onClick={() => cleanBag("ipafTraining")}
        />
        <AboutSmallImage
          title={content?.logo?.fields?.content_title ?? ""}
          alt={content?.logo?.fields?.alt_attribute ?? ""}
          image={getImageSrc(content?.logo?.fields)}
          theme="orange-500"
          color="white"
          imageFirst
          imagePadding="px-8"
        />
        {content?.tabs && <CarouselTabs tabs={content?.tabs} />}
        <SellParts
          buttonTitle="Saiba mais"
          buttonVariant="inverted"
          text={content?.simpleInformation?.fields?.title ?? ""}
          href={content?.simpleInformation?.fields?.hrefButton?.[0] ?? "#"}
        />
        <About
          title={content?.secondAbout?.fields?.content_title ?? ""}
          description={content?.secondAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.secondAbout?.fields)}
          alt={content?.secondAbout?.fields?.alt_attribute ?? ""}
          buttonTitle="Incluir no orçamento"
          orientation="inverted"
          theme="beige-200"
          onClick={() => cleanBag("operationTraining")}
        />
        {content?.tabs && (
          <CarouselTabs tabs={content?.secondTabs} theme="green-800" />
        )}
        <About
          title={content?.thirdAbout?.fields?.content_title ?? ""}
          description={content?.thirdAbout?.fields?.content_text ?? ""}
          image={getImageSrc(content?.thirdAbout?.fields)}
          alt={content?.thirdAbout?.fields?.alt_attribute ?? ""}
          hasButton={false}
          theme="orange-500"
          color="white"
          dnaColor="#ffffff"
          orientation="inverted"
        />
        {content?.differentials && (
          <TrainingMenu menu={content?.differentials} />
        )}
        {content?.otherTrainings && (
          <Trainings cards={content?.otherTrainings} />
        )}
        <SimpleBanner banner={content?.simpleBanner} />
      </main>
      <Footer />
    </>
  );
}

export default Maintenance;
