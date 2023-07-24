import Button from "@/components/shared/Button/Button";

import { Carousel } from "@/components/shared/Carousel/Carousel";
import Image from "next/image";
import { stories } from "./utils";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const SuccessStories: React.FC = () => {
  const { isMobile } = useScreenWidth();

  return (
    <section className="flex justify-center pb-28 pt-20 tablet:py-0 font-ibm-font tablet:flex-col tablet:py-6">
      <div className="container flex tablet:flex-col tablet:items-center">
        <div className="max-w-[40%] w-full tablet:max-w-[100%] tablet:px-4">
          <h2 className="text-2xl text-orange-500 font-semibold mb-4 tablet:text-lg">
            Histórias de sucesso
          </h2>
          <p className="text-lg text-green-800 mb-9 tablet:text-xs max-w-[90%] tablet:max-w-full">
            Confira como nossos serviços e produtos fizeram a diferença para o
            sucesso dos projetos dos nossos clientes espalhados no Brasil.
          </p>
          <a href="https://www.google.com">
            <Button className="max-w-[264px] py-3 w-full tablet:hidden">
              Ver mais histórias
            </Button>
          </a>
        </div>
        <div className="max-w-[60%] w-full tablet:max-w-[275px]">
          <Carousel
            className="tablet:max-w-[100%] tablet:px-4 tablet:mb-8"
            spacing={isMobile ? "-20" : "-40"}
          >
            {stories.map(({ image, alt, name, occupation, article }) => (
              <div key={name}>
                <div className="flex gap-5 tablet:flex-col tablet:items-center">
                  <img
                    src={image}
                    alt={alt}
                    width={isMobile ? 91 : undefined}
                    className="mt-3 tablet:w-[91px]"
                  />
                  <div className="tablet:text-center">
                    <p className="text-green-800 font-semibold mb-2 ">{name}</p>
                    <p className="text-sm text-green-800 mb-4">
                      <i>{occupation}</i>
                    </p>
                    <article className="text-gray-300 tablet:text-xs max-w-[75%] tablet:max-w-full">
                      {article}
                    </article>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <Button className="desktop:hidden my-8 tablet:mx-5 ">
        Ver mais histórias
      </Button>
    </section>
  );
};
