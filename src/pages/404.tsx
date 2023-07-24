import { Footer } from "@/components/shared/Footer/Footer";
import { HeaderMenu } from "@/components/shared/Header/HeaderMenu/HeaderMenu";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { RequestQuoteFormType } from "@/types";
import checkCircle from "@/assets/check-circle.svg";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";
import { mobileMenuInfo } from "@/components/shared/Navbar/utils";
import bg404 from "@/assets/img/404bg.png";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import Button from "@/components/shared/Button/Button";
import { useRouter } from "next/router";

const NotFoundPage = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendAlert = () => {
    window.scrollTo(0, 0);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 4000);
  };

  const onSubmit = (data: RequestQuoteFormType) => {
    setIsMenuOpen(false);
    sendAlert();
  };

  return isMenuOpen ? (
    <HeaderMenu
      menuInfo={mobileMenuInfo}
      setIsMenuOpen={setIsMenuOpen}
      onSubmit={onSubmit}
    />
  ) : (
    <>
      <Navbar setIsMenuOpen={setIsMenuOpen} />
      <main className="h-full bg-white w-full font-ibm-font">
        {isModalOpen && (
          <Dialog.Root open={isModalOpen}>
            <Dialog.Trigger />
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="py-9 px-3 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white focus:outline-none">
                <div className="flex items-center gap-4 flex-col">
                  <img src={checkCircle} alt="green right check" />
                  <Dialog.Title className="text-green-800 text-sm font-semibold text-center">
                    Sua solicitação foi enviada com sucesso! Em breve um
                    especialista entrará em contato
                  </Dialog.Title>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
        <div
          className="justify-center flex text-black flex-wrap tablet:justify-center bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${bg404.src})` }}
        >
          <div className="bg-black/60 w-full flex justify-center">
            <div className="container">
              <div className="flex flex-col items-end justify-center h-[440px] px-20 tablet:px-4 tablet:pt-[350px] tablet:h-full tablet:pb-10">
                <div className="max-w-[406px]">
                  <h1 className="text-white text-4xl font-bold tablet:text-base tablet:font-semibold mb-3">
                    Aconteceu algo errado
                  </h1>
                  <p className="text-white mb-4 tablet:mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.{" "}
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
