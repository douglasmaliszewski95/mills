import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { Steppers } from "@/components/Cart/Steppers/Steppers";
import { CartList } from "@/components/Cart/CartList/CartList";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Button from "@/components/shared/Button/Button";
import { useRouter } from "next/router";
import { getCMSContent } from "@/components/Generators/content";
import _ from "lodash";
import { transformContentToMobile } from "@/utils/content";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useCallback, useEffect, useState } from "react";

export default function StepOne() {
  const router = useRouter();
  const { banner } = useGetCMSAssemblyStructure();
  const { isMobile } = useScreenWidth();

  const [content, setContent] = useState<any>();
  const [contentBase, setContentBase] = useState<any>();

  const formatData = useCallback(
    ({ contentAux }: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;

      setContent(responsiveContent);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("pecas_carrinho");
        setContentBase({ contentAux });
        formatData({ contentAux });
      } else {
        formatData({ ...contentBase });
      }
    };
    getContent();
  }, [formatData]);

  return (
    <>
      <Header />
      <main className="h-full bg-white w-full font-ibm-font">
        <Banner
          linkList={[
            {
              name: "Home",
              href: "/",
            },
            {
              name: "Venda de peças",
              href: "/formas-e-escoramentos",
            },
            {
              name: "Buscar peça",
              href: "/formas-e-escoramentos/busca",
            },
            {
              name: "Solicitar orçamento",
              href: "/formas-e-escoramentos/busca/carrinho/passo-01",
            },
          ]}
          title={"Solicitar orçamento"}
          backgroundImage={banner?.src}
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
                  text: "Por favor, confira seus dados",
                  active: false,
                  activeMobile: false,
                },
              ]}
            />
          </div>
          <CartList isSimpleCard />
          <div className="container">
            <div className="flex justify-end mt-7 tablet:mx-5">
              <Button
                className="w-[258px] tablet:w-full"
                onClick={() =>
                  router.push("/formas-e-escoramentos/carrinho/passo-02")
                }
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
  );
}
