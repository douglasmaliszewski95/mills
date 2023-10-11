import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
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
  whatsAppGreen,
} from "@/assets";
import { MenuProps } from "./types";
import { secondMenu } from "./utils";
import { MinimalistLogo } from "@/assets/MinimalistLogo";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import MobileMenu from "./MobileMenu";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import { CartModal } from "../CartModal/CartModal";
import { TalkToSpecialistModal } from "../TalkToSpecialistModal/TalkToSpecialistModal";

interface FooterProps {
  theme?: string;
}

export const Footer = ({ theme }: FooterProps) => {
  const { footerData, footerList } = useGetCMSShared();
  const { currentSiteTheme } = useContext(currentSiteThemeContext);
  const { isMobile } = useScreenWidth();
  const [activeSubmenu, setActiveSubmenu] = useState<null | number>(null);
  const [menuFooter, setMenuFooter] = useState<any>([]);
  const [currentMobileMenu, setCurrentMobileMenu] = useState("");

  useEffect(() => {
    setMenuFooter(
      isMobile
        ? footerList?.mobileMenu
        : currentSiteTheme === "rentalLight"
        ? footerList?.menu
        : footerList?.heavyMenu
    );
  }, [
    isMobile
      ? footerList?.mobileMenu
      : currentSiteTheme === "rentalLight"
      ? footerList?.menu
      : footerList?.heavyMenu,
  ]);

  const openSubmenu = (clickedItem: MenuProps, index: number) => {
    setMenuFooter((prevMenu: any) => {
      return prevMenu.map((item: any) => {
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
            <Image
              src={millsLogoOrange}
              alt="Mills - Locação de Equipamentos e Plataforma Elevatória"
              className="w-32 h-14 tablet:w-14 tablet:h-6 tablet: mb-4"
            />
            <div className="flex gap-3">
              <a href="https://api.whatsapp.com/send/?phone=5511943717548&text&type=phone_number&app_absent=0">
                <Avatar.Root
                  className={`${
                    currentSiteTheme === "rentalLight"
                      ? "bg-orange-500"
                      : "bg-green-800"
                  } inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]`}
                >
                  <Image
                    src={
                      currentSiteTheme === "rentalLight"
                        ? whatsApp
                        : whatsAppGreen
                    }
                    width={isMobile ? 12 : 20}
                    height={isMobile ? 12 : 20}
                    alt="whatsapp"
                  />
                </Avatar.Root>
              </a>
              <a href="https://www.instagram.com/millsoficial" target="blank">
                <Avatar.Root
                  className={`${
                    currentSiteTheme === "rentalLight"
                      ? "bg-orange-500"
                      : "bg-green-800"
                  } inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]`}
                >
                  <Image
                    src={instagram}
                    width={isMobile ? 12 : 20}
                    height={isMobile ? 12 : 20}
                    alt="Locação de Equipamento e Plataformas Elevatória"
                  />
                </Avatar.Root>
              </a>
              <a href="https://www.facebook.com/millsbr/" target="blank">
                <Avatar.Root
                  className={`${
                    currentSiteTheme === "rentalLight"
                      ? "bg-orange-500"
                      : "bg-green-800"
                  } inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]`}
                >
                  <Image
                    src={facebook}
                    width={isMobile ? 6 : 12}
                    height={isMobile ? 6 : 12}
                    alt="facebook"
                  />
                </Avatar.Root>
              </a>
              <a
                href="https://www.linkedin.com/company/millsoficial/mycompany"
                target="blank"
              >
                <Avatar.Root
                  className={`${
                    currentSiteTheme === "rentalLight"
                      ? "bg-orange-500"
                      : "bg-green-800"
                  } inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]`}
                >
                  <Image
                    src={linkedin}
                    width={isMobile ? 12 : 20}
                    height={isMobile ? 12 : 20}
                    alt="Locação de Equipamento e Plataformas Elevatória"
                  />
                </Avatar.Root>
              </a>
              <a href="https://www.youtube.com/user/canalmills" target="blank">
                <Avatar.Root
                  className={`${
                    currentSiteTheme === "rentalLight"
                      ? "bg-orange-500"
                      : "bg-green-800"
                  } inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle tablet:h-[32px] tablet:w-[32px]`}
                >
                  <Image
                    src={youtube}
                    width={isMobile ? 17 : 20}
                    height={isMobile ? 17 : 20}
                    alt="Locação de Equipamento e Plataformas Elevatória"
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
                <span className="font-medium">
                  {footerData?.central?.title}
                </span>
                <br className="desktop:hidden" />{" "}
                <span className="tablet:text-orange-500">
                  {footerData?.central?.text}
                </span>
              </li>
              <li className="mt-2">
                <span className="font-medium">
                  {footerData?.horario?.title}
                </span>
                <br className="desktop:hidden" /> {footerData?.horario?.text}
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
                {menuFooter?.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      onClick={() => openSubmenu(item, index)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {item.title}
                      <Image
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
                      {menuFooter[activeSubmenu].submenu
                        .slice(columnIndex * 2, columnIndex * 2 + 2)
                        .map((subItem: any, index: number) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <a href={subItem.url}>{subItem.title}</a>
                          </li>
                        ))}
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* menu mobile */}
          <div className="flex desktop:hidden">
            <div className="flex flex-col w-full gap-6">
              {menuFooter?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col w-full text-sm font-medium`}
                    onClick={() => {
                      setCurrentMobileMenu(
                        currentMobileMenu === item.title ? "" : item.title
                      );
                    }}
                  >
                    <div className="flex gap-2 cursor-pointer items-center text-green-800">
                      {item.title}

                      <Image
                        src={chevronDown}
                        className={`w-[14px] transform ${
                          currentMobileMenu === item.title
                            ? "rotate-180 transition duration-500"
                            : ""
                        }`}
                        alt="chevronDown"
                      />
                    </div>
                    {currentMobileMenu === item.title && (
                      <div className="px-6 bg-white py-4 my-4 flex flex-col gap-6 text-orange-500">
                        {item.submenu.map((submenu: any, index: number) => (
                          <a key={index} href={submenu.url}>{submenu.title}</a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10">
            <ul className="flex flex-wrap font-medium gap-4 text-sm max-w-[950px] tablet:flex-col">
              {footerData?.[isMobile ? "mobileLinks" : "links"]?.map(
                (item: any, index: number) => {
                  if (item.link === "modal_especialista") {
                    return (
                      <li
                        key={index}
                        className="flex items-center gap-2 cursor-pointer mr-2 mb-3"
                      >
                        <TalkToSpecialistModal>
                          <p>{item.title}</p>
                        </TalkToSpecialistModal>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 cursor-pointer mr-2 mb-3"
                    >
                      <a target="_blank" href={item.link}>{item.title}</a>
                    </li>
                  );
                }
              )}
            </ul>
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
      <CartModal />
    </footer>
  );
};
