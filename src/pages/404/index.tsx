import { Footer } from "@/components/shared/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import Button from "@/components/shared/Button/Button";
import { useRouter } from "next/router";
import { getImage } from "@/services/hooks/getImage";
import { Header } from "@/components/shared/Header/Header";

const NotFoundPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<any>();
  const [menuView, setMenuView] = useState<"rentalLight" | "rentalHeavy">(
    "rentalLight"
  );
  const getContent = useCallback(async () => {
    const result = await getImage("erro404");
    setContent(result?.erro404[0]);
  }, []);

  useEffect(() => {
    if (router.asPath.includes("pesadas")) return setMenuView("rentalHeavy");
    return setMenuView("rentalLight");
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header theme={menuView} />
      <main className="h-full bg-white w-full font-ibm-font">
        <div
          className="justify-center flex text-black flex-wrap tablet:justify-center bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${content?.fields.native.links[0].href})`,
          }}
        >
          <div className="bg-black/60 w-full flex justify-center">
            <div className="container">
              <div className="flex flex-col items-end justify-center h-[440px] px-20 tablet:px-4 tablet:pt-[350px] tablet:h-full tablet:pb-10">
                <div className="max-w-[406px]">
                  <h1 className="text-white text-4xl font-bold tablet:text-base tablet:font-semibold mb-3">
                    Aconteceu algo errado
                  </h1>
                  <p className="text-white mb-4 tablet:mb-6">
                    {content?.fields.content_text}
                  </p>
                  <Button
                    className="max-w-[258px] w-full py-2 text-sm"
                    onClick={() => router.push("/")}
                  >
                    <b>Ir para home</b>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
