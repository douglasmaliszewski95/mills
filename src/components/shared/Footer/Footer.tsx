import Image from "next/image";
import React, { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Separator from "@radix-ui/react-separator";
import {
  millsLogoOrange,
  whatsApp,
  instagram,
  facebook,
  linkedin,
  youtube,
  chevronDown,
} from "@/assets";
import { MenuProps } from "./types";
import { footerMenu, secondMenu } from "./utils";
import { MinimalistLogo } from "@/assets/MinimalistLogo";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import MobileMenu from "./MobileMenu";

export const Footer: React.FC = () => {
  const { isMobile } = useScreenWidth();
  const [activeSubmenu, setActiveSubmenu] = useState<null | number>(null);
  const [menu, setMenu] = useState(footerMenu);
  const openSubmenu = (clickedItem: MenuProps, index: number) => {
    setMenu((prevMenu) => {
      return prevMenu.map((item) => {
        if (item === clickedItem) {
          return { ...item, open: !item.open };
        } else {
          return { ...item, open: false };
        }
      });
    });
    setActiveSubmenu((prevActiveSubmenu) => {
      if (prevActiveSubmenu === index) {
        return null;
      } else {
        return index;
      }
    });
  };

  return (
    <footer className="font-ibm-font">
      <div className="flex items-center flex-col text-green-800 py-14 bg-gray-75 px-24 w-full tablet:px-4 tablet:py-6">
        <div className="container w-full">
          <div className="flex flex-wrap justify-between tablet:flex-col">
            <img
              src={millsLogoOrange}
              alt="logo"
              className="w-32 h-14 tablet:w-14 tablet:h-6 tablet: mb-4"
            />
            <div className="flex gap-3">
              <a>
                <Avatar.Root className="bg-orange-500 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]">
                  <img
                    src={whatsApp}
                    className="w-[20px] h-[20px] tablet:w-[12px] tablet:h-[12px]"
                    alt="whatsapp"
                  />
                </Avatar.Root>
              </a>
              <a>
                <Avatar.Root className="bg-orange-500 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]">
                  <img
                    src={instagram}
                    className="w-[20px] h-[20px] tablet:w-[12px] tablet:h-[12px]"
                    alt="instagram"
                  />
                </Avatar.Root>
              </a>
              <a>
                <Avatar.Root className="bg-orange-500 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]">
                  <img
                    src={facebook}
                    className="w-[12px] tablet:w-[6px] h-[12px] tablet:h-[6px]"
                    alt="facebook"
                  />
                </Avatar.Root>
              </a>
              <a>
                <Avatar.Root className="bg-orange-500 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]">
                  <img
                    src={linkedin}
                    className="w-[20px] h-[20px] tablet:w-[12px] tablet:h-[12px]"
                    alt="linkedin"
                  />
                </Avatar.Root>
              </a>
              <a>
                <Avatar.Root className="bg-orange-500 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]">
                  <img
                    src={youtube}
                    className="w-[20px] tablet:w-[17px] h-[20px] tablet:h-[17px]"
                    alt="youtube"
                  />
                </Avatar.Root>
              </a>
            </div>
          </div>
          <Separator.Root
            className="bg-green-800 h-px w-full my-4 desktop:hidden"
            decorative
            orientation="vertical"
          />
          <div className="mt-12 tablet:mt-0 tablet:text-xs">
            <ul className="font-ibm-font">
              <li className="mb-4">
                <span className="font-medium">Central de Relacionamento:</span>
                <br className="desktop:hidden" />{" "}
                <span className="tablet:text-orange-500">0800 705 1000</span>
              </li>
              <li className="mt-2">
                <span className="font-medium">Horário de atendimento:</span>
                <br className="desktop:hidden" /> Segunda a sexta, das 7 às 18h
                <span className="tablet:hidden"> | </span>
                <br className="desktop:hidden" />
                Sábados, das 8h às 12h
              </li>
            </ul>
          </div>
          <Separator.Root
            className="bg-green-800 h-px w-full my-4 desktop:hidden"
            decorative
            orientation="vertical"
          />
          {/* menu desktop */}
          <div className="tablet:hidden">
            <div className="mt-12">
              <ul className="flex gap-8 flex-wrap font-medium text-sm tablet:flex-col">
                {menu.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => openSubmenu(item, index)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {item.title}
                      <img
                        src={chevronDown}
                        className={`w-[14px] transform ${
                          item.open ? "rotate-180 transition duration-500" : ""
                        }`}
                        alt="chevronDown"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            {activeSubmenu !== null && (
              <div className="flex gap-12 bg-white py-6 px-24 mt-5 max-w-[965px] tablet:px-0 tablet:pl-6">
                <div className="flex flex-wrap gap-14 tablet:flex-col">
                  {[0, 1, 2, 3, 4].map((columnIndex) => (
                    <ul
                      key={columnIndex}
                      className="flex flex-col font-medium font-ibm-font text-sm text-orange-500 leading-7"
                    >
                      {footerMenu[activeSubmenu].submenu
                        .slice(columnIndex * 2, columnIndex * 2 + 2)
                        .map((subItem, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {subItem.title}
                          </li>
                        ))}
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-10 tablet:hidden">
            <ul className="flex flex-wrap font-medium text-sm max-w-[900px] tablet:flex-col">
              {secondMenu.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center gap-2 cursor-pointer mr-2 mb-3"
                  >
                    {item.title}
                    {item.showBorder ? (
                      <div className="h-6 w-[1px] bg-green-800" />
                    ) : (
                      <div className="h-6 w-[1px] bg-transparent" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* menu desktop */}
          <div className="flex flex-col desktop:hidden">
            <MobileMenu />
            <MobileMenu />
            <span className="text-green-800 font-medium text-sm mb-4">
              Política de Privacidade e Cookies
            </span>
            <span className="text-green-800 font-medium text-sm mb-4">
              Termos e condições de uso
            </span>
            <span className="text-green-800 font-medium text-sm mb-4">
              Contrato
            </span>
            <span className="text-green-800 font-medium text-sm mb-4">
              Programa de Integridade
            </span>
            <span className="text-green-800 font-medium text-sm ">
              Dúvidas Frequentes
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col py-4 bg-black w-full tablet:px-4">
        <div className="container w-full">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex gap-3 text-white text-sm font-normal">
              <p className="mb-0 font-ibm-font tablet:text-xs">
                ©2023. Mills.
                <br className="desktop:hidden" /> Todos os direitos reservados.
              </p>
            </div>
            <MinimalistLogo />
          </div>
        </div>
      </div>
    </footer>
  );
};
