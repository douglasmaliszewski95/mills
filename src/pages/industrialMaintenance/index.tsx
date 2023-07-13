import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { mobileMenuInfo } from "@/components/shared/Navbar/utils";
import checkCircle from "@/assets/check-circle.svg";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Banner } from "@/components/shared/Banner/Banner";
import banner from "@/assets/img/elevatingPlatforms.jpg";
import Button from "@/components/shared/Button/Button";

import bgElevating from "@/assets/img/bgElevating.jpg";
import bgOperator from "@/assets/img/operators.png";
import bgOperatorMobile from "@/assets/img/operatorsMobile.png";
import lineUp from "@/assets/img/linesUp.png";
import { clock, credibility, noises, operator, signal } from "@/assets";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { HeaderMenu } from "@/components/shared/Header/HeaderMenu/HeaderMenu";
import { RequestQuoteFormType } from "@/types";

export default function Home() {
  const { isMobile } = useScreenWidth();
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
                  <Image src={checkCircle} alt="green right check" />
                  <Dialog.Title className="text-green-800 text-sm font-semibold text-center">
                    Sua solicitação foi enviada com sucesso! Em breve um
                    especialista entrará em contato
                  </Dialog.Title>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
        <Banner
          breadcrumb="Geradores > Indústrias"
          title="Aplicação de compressores e geradores na Indústria"
          backgroundImage={banner.src}
        />
        <div className="flex justify-center text-green-800">
          <div className="flex justify-between container tablet:flex-col-reverse">
            <div
              style={{ backgroundImage: `url(${bgElevating.src})` }}
              className="flex justify-center bg-no-repeat bg-cover w-[564px] h-[505px] tablet:w-full tablet:h-[232px]"
            />
            <div className="flex flex-col justify-center pr-[90px] gap-6 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9">
              <h3 className="font-semibold text-2xl tablet:text-base">
                Garanta a preservação da infraestrutura física do local, o
                funcionamento do estabelecimento e a eficiência dos processos de
                produção
              </h3>
              <p className="text-lg tablet:text-xs">
                Os serviços de manutenção e instalação industrial são atividades
                que incluem os setores de elétrica, construção civil, hidráulica
                e mecânica. Além de diminuir o risco de acidentes, a manutenção
                ajuda a preservar o valor patrimonial de um bem e a evitar que
                seus reparos fiquem custosos a longo prazo.
              </p>
            </div>
          </div>
        </div>
        {/* Second */}
        <div className="flex justify-center text-green-800 bg-beige-200">
          <div className="flex justify-between container tablet:flex-col">
            <div className="flex flex-col  pt-20 pr-12 gap-10 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9">
              <h3 className="font-semibold text-2xl tablet:text-base">
                Para esse tipo de serviço, as plataformas elevatórias são
                destinadas aos serviços de:
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="rounded bg-white py-3 px-9 text-center font-semibold tablet:w-full tablet:text-xs">
                  <p>Manutenção de telhados</p>
                </div>
                <div className="rounded bg-white py-3 px-9 text-center font-semibold tablet:w-full tablet:text-xs">
                  <p>Instalação de Linha de Vida</p>
                </div>
                <div className="rounded bg-white py-3 px-9 text-center font-semibold tablet:w-full tablet:text-xs">
                  <p>Pintura</p>
                </div>
                <div className="rounded bg-white py-3 px-9 text-center font-semibold tablet:w-full tablet:text-xs">
                  <p>Montagem Eletromecânica</p>
                </div>
                <div className="rounded bg-white py-3 px-9 text-center font-semibold tablet:w-full tablet:text-xs">
                  <p>Manutenção Elétrica</p>
                </div>
                <div className="rounded bg-white py-3 px-9 text-center font-semibold tablet:w-full tablet:text-xs">
                  <p>Manutenção Hidráulica</p>
                </div>
              </div>
              <Button className="max-w-[265px] py-3 tablet:max-w-full">
                Ver modelos
              </Button>
            </div>
            <div
              style={{ backgroundImage: `url(${bgElevating.src})` }}
              className="flex justify-center bg-no-repeat bg-cover w-[564px] h-[505px] tablet:w-full tablet:h-[232px]"
            />
          </div>
        </div>
        {/* Second */}
        {/* Third */}
        <div className="flex justify-center text-green-800">
          <div className="flex justify-between container tablet:flex-col">
            <div className="flex flex-col py-16 tablet:pt-4 pb-8 tablet:px-4">
              <h3 className="font-semibold w-[610px] text-2xl tablet:text-base tablet:w-full">
                Principais benefícios das plataformas elevatórias nos serviços
                de manutenção e instalação industrial
              </h3>
              <div className="flex flex-wrap gap-2 mt-16">
                <div className="flex flex-col justify-center items-center w-[229px] rounded border border-green-800 py-8 px-3 tablet:w-full tablet:flex-row tablet:py-4">
                  <Image src={clock} alt="Relógio" className="mb-3" />
                  <div className="tablet:ml-6">
                    <h4 className="font-semibold mb-4 tablet:text-sm">
                      Redução de tempo/custos
                    </h4>
                    <p className="w-[190px] text-center tablet:text-xs tablet:text-start">
                      Com as plataformas elevatórias, você ganha agilidade na
                      execução dos trabalhos e diminui gastos
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-[229px] rounded border border-green-800 py-8 px-3 tablet:w-full tablet:flex-row tablet:py-4">
                  <Image
                    src={signal}
                    alt="Relógio"
                    className="mb-3 tablet:w-11"
                  />
                  <div className="tablet:ml-6">
                    <h4 className="font-semibold text-center mb-4 tablet:text-sm tablet:text-start">
                      Entrega eficiente
                    </h4>
                    <p className="w-[190px] text-center tablet:text-xs tablet:text-start">
                      Com segurança, os operadores conseguem ter mais agilidade
                      na função.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-[229px] rounded border border-green-800 py-8 px-3 tablet:w-full tablet:flex-row tablet:py-4">
                  <Image
                    src={credibility}
                    alt="Relógio"
                    className="mb-3 tablet:w-11"
                  />
                  <div className="tablet:ml-6">
                    <h4 className="font-semibold text-center mb-4 tablet:text-sm tablet:text-start">
                      Credibilidade
                    </h4>
                    <p className="w-[190px] text-center tablet:text-xs tablet:text-start">
                      Mais credibilidade para a empresa ao realizar um serviço
                      mais rápido de qualidade.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-[229px] rounded border border-green-800 py-8 px-3 tablet:w-full tablet:flex-row tablet:py-4">
                  <Image
                    src={operator}
                    alt="Relógio"
                    className="mb-3 tablet:w-11"
                  />
                  <div className="tablet:ml-6">
                    <h4 className="font-semibold text-center mb-4 tablet:text-sm tablet:text-start">
                      Operação segura
                    </h4>
                    <p className="w-[190px] text-center tablet:text-xs tablet:text-start">
                      As plataformas são equipamentos seguros e estáveis, e
                      trazem conforto para o operador
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-[229px] rounded border border-green-800 py-8 px-3 tablet:w-full tablet:flex-row tablet:py-4">
                  <Image
                    src={noises}
                    alt="Relógio"
                    className="mb-3 tablet:w-11"
                  />
                  <div className="tablet:ml-6">
                    <h4 className="font-semibold text-center mb-4 tablet:text-sm tablet:text-start">
                      Redução de ruídos
                    </h4>
                    <p className="w-[190px] text-center tablet:text-xs tablet:text-start">
                      São mais silenciosas para executar trabalhos em ambientes
                      fechados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Third */}
        {/* Fourth */}
        <div className="flex justify-center bg-orange-500 text-white">
          <div
            style={{
              backgroundImage: `url(${isMobile ? null : lineUp.src})`,
            }}
            className="flex justify-center py-11 bg-no-repeat w-full tablet:flex-col tablet:py-0"
          >
            <div className="flex justify-end desktop:hidden">
              <Image src={lineUp} alt="barUp" width="212" />
            </div>
            <div className="flex container justify-between tablet:flex-col tablet:pb-11 tablet:pt-4 tablet:px-4">
              <div className="flex items-center">
                <h3 className="font-semibold text-3xl tablet:text-base tablet:mb-5">
                  Opinião de nossos clientes
                </h3>
              </div>
              <div className="max-w-[444px]">
                <p className="text-lg font-semibold mb-2 tablet:text-sm">
                  Vinícius de Carvalho
                </p>
                <span className="italic text-sm tablet:text-[10px]">
                  Lima e Pergher Indústria e Comércio
                </span>
                <p className="font-normal mt-4 tablet:text-xs">
                  “A Mills tem mais opções de equipamentos. Vocês são a maior do
                  segmento e possuem a variedade que precisamos, quando
                  precisamos de um alcance específico, já sei que posso contar
                  com a variedade da frota de vocês.”
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Fourth */}
        {/* Fifty */}
        <div className="flex justify-center text-green-800">
          <div className="flex justify-between container tablet:flex-col">
            <div className="flex flex-col py-16 tablet:pt-4 pb-8 tablet:px-4">
              <h3 className="font-semibold text-2xl tablet:text-base tablet:w-full">
                Conheça cada tipo de plataforma e descubra a ideal para o seu
                projeto
              </h3>
              <div className="flex flex-wrap gap-5 mt-16 tablet:mt-6">
                <div
                  style={{ backgroundImage: `url(${bgElevating.src})` }}
                  className="flex flex-col text-white justify-center items-center w-[377px] h-[345px] rounded-lg tablet:w-full tablet:h-[264px]"
                >
                  <div className="flex w-full h-full bg-gray-25 py-8 px-3 rounded-lg">
                    <div className="flex flex-col justify-end items-center w-full">
                      <div>
                        <h4 className="font-semibold text-xl w-[218px] text-center tablet:text-base">
                          Plataforma Elevatória Articulada
                        </h4>
                        <Button className="w-full max-w-[265px] mt-16 tablet:mt-9">
                          Ver modelos
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ backgroundImage: `url(${bgElevating.src})` }}
                  className="flex flex-col text-white justify-center items-center w-[377px] h-[345px] rounded-lg tablet:w-full tablet:h-[264px]"
                >
                  <div className="flex w-full h-full bg-gray-25 py-8 px-3 rounded-lg">
                    <div className="flex flex-col justify-end items-center w-full">
                      <div>
                        <h4 className="font-semibold text-xl w-[218px] text-center tablet:text-base">
                          Plataforma Elevatória Telescópica
                        </h4>
                        <Button className="w-full max-w-[265px] mt-16 tablet:mt-9">
                          Ver modelos
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ backgroundImage: `url(${bgElevating.src})` }}
                  className="flex flex-col text-white justify-center items-center w-[377px] h-[345px] rounded-lg tablet:w-full tablet:h-[264px]"
                >
                  <div className="flex w-full h-full bg-gray-25 py-8 px-3 rounded-lg">
                    <div className="flex flex-col justify-end items-center w-full">
                      <div>
                        <h4 className="font-semibold text-xl w-[218px] text-center tablet:text-base">
                          Plataforma Elevatória Tesoura
                        </h4>
                        <Button className="w-full max-w-[265px] mt-16 tablet:mt-9">
                          Ver modelos
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fifty */}
        {/* Sixth */}
        <div className="flex justify-center text-white">
          <div
            style={{
              backgroundImage: `url(${
                isMobile ? bgOperatorMobile.src : bgOperator.src
              })`,
            }}
            className="flex bg-no-repeat w-full tablet:flex-col tablet:py-0"
          >
            <div className="flex justify-center items-center flex-col bg-gray-25 w-full h-full py-16 tablet:pt-28 tablet:pb-6">
              <div className="container justify-start tablet:flex-col tablet:pb-11 tablet:px-4">
                <h3 className="font-semibold text-3xl mb-6 tablet:text-base tablet:mb-5">
                  Ainda tem dúvidas sobre qual é o
                  <br /> equipamento mais indicado para sua demanda?
                </h3>
                <Button className="py-3 w-[251px] tablet:w-full">
                  Fale com um especialista
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Sixth */}
      </main>
      <Footer />
    </>
  );
}
