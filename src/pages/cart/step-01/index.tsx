import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { alertIco } from "@/assets";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { Steppers } from "@/components/Cart/Steppers/Steppers";
import { CartList } from "@/components/Cart/CartList/CartList";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updateParagraphs } from "@/utils/texts";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getCMSContent } from "@/components/Generators/content";
import _ from "lodash";
import { transformContentToMobile } from "@/utils/content";
import { getImageSrc } from "@/utils/images";

export default function StepOne() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useState<any>()
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    setItems(storedItems ? JSON.parse(storedItems) : []);
  }, []);

  const { isMobile } = useScreenWidth();
  const [banner, setBanner] = useState<any>();
  const [contentBase, setContentBase] = useState<any>();

  const formatData = useCallback(
    (contentAux: any) => {
      const content = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      setBanner(content?.["banner_request_quote"]?.[0]);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("solicitar_orcamento");
        setContentBase(contentAux);
        formatData(contentAux);
      } else {
        formatData({ ...contentBase });
      }
    };
    getContent();
  }, [formatData]);

  useEffect(() => {
    updateParagraphs();
  }, [banner]);

  return (
    isClient && (
      <>
        <Header theme={localStorage.getItem("paymentFlow") ?? "rentalLight"} />
        <main className="h-full bg-white w-full font-ibm-font">
          <Banner
            linkList={[
              {
                name: "Home",
                href: "/",
              },
              { name: "Solicitar orçamento", href: "/carrinho/passo-01" },
            ]}
            title={banner?.fields?.content_title}
            backgroundImage={getImageSrc(banner?.fields)}
          />
          <div className="flex flex-col items-center ">
            <div className="my-8">
              <Steppers
                steps={[
                  {
                    step: 1,
                    text: "Qual o tipo de equipamento você precisa?",
                    active: true,
                    activeMobile: true,
                  },
                  {
                    step: 2,
                    text: "Você pode precisar de alguns dos nossos serviços",
                    active: false,
                    activeMobile: false,
                  },
                  {
                    step: 3,
                    text: "Por favor, confira seus dados",
                    active: false,
                    activeMobile: false,
                  },
                ]}
              />
            </div>
            <CartList />
            <div className="container">
              <div className="flex gap-2 mt-4 tablet:mx-5">
                <Image src={alertIco} alt="alert ico" className="w-5 h-4 " />
                <span className="text-sm italic tablet:text-xs">
                  Sujeito à disponibilidade do equipamento na filial. Um
                  equipamento similar, que respeite as suas necessidades, poderá
                  ser sugerido durante a negociação.
                </span>
              </div>
              <div className="flex justify-end mt-7 tablet:mx-5">
                <Button
                  className="w-[258px] tablet:w-full"
                  onClick={() => router.push("/carrinho/passo-02")}
                >
                  Avançar
                </Button>
              </div>
            </div>
          </div>

          <MachinesAndPlatforms />
        </main>
        <Footer />
      </>
    )
  );
}
