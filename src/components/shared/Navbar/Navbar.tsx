import React, { Fragment, useEffect, useState, useContext, use } from "react";
import Image from "next/image";
import { search, millsLogo, carBag } from "@/assets";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Menubar from "@radix-ui/react-menubar";
import Button from "../Button/Button";
import { LoginButton } from "./LoginButton";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { NavbarProps } from "./types";
import brazil from "@/assets/brazil.svg";
import { ChevronDown } from "@/assets/ChevronDown";
import Link from "next/link";
//import { menu } from "./utils";
import { SearchInput } from "./SearchInput/SearchInput";
import { SearchModal } from "./SearchModal/SearchModal";
import { useRouter } from "next/router";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import { TalkToSpecialistModal } from "../TalkToSpecialistModal/TalkToSpecialistModal";
import { getCurrentTheme } from "@/utils/theme";

export const Navbar: React.FC<NavbarProps> = (props) => {
  const {
    menu,
    openMenu,
    searchMode,
    setSearchMode = () => null,
    onSearch,
    setTheme = () => null,
  } = props;
  const { currentSiteTheme, setCurrentSiteTheme } = useContext(
    currentSiteThemeContext
  );

  const { isMobile } = useScreenWidth();
  const router = useRouter();

  const isHeavy = currentSiteTheme === "rentalHeavy";

  const backgroundColor = isHeavy ? "bg-green-800" : "bg-orange-500";
  const backgroundButton = isHeavy ? "" : "bg-white text-orange-500";

  const triggerClass =
    "font-ibm-font text-sm text-white data-[state=open]:font-bold data-[highlighted]:outline-none";

  const menuItemClass = `${
    isHeavy
      ? "text-white data-[state=open]:bg-white data-[state=open]:text-green-800 data-[highlighted]:bg-white data-[highlighted]:text-green-800"
      : "text-green-800 data-[state=false]:bg-orange-500 data-[highlighted]:bg-orange-500 data-[highlighted]:text-white"
  } group pl-5 leading-none flex items-center h-[58px] px-[10px] relative select-none outline-none data-[state=open]:rounded-r data-[highlighted]:text-green-800 data-[highlighted]:rounded-s-none cursor-pointer`;

  useEffect(() => {
    const currentTheme = getCurrentTheme();
    setCurrentSiteTheme(currentTheme);
    setTheme(currentTheme);
  }, []);

  const handleSelectRentalTheme = (theme: string) => {
    if (theme === "rentalHeavy") {
      setTheme(theme);
      localStorage.setItem("paymentFlow", theme);
      router.push("/maquinas-pesadas");
    } else {
      setTheme(theme);
      localStorage.setItem("paymentFlow", theme);
      router.push("/");
    }
  };

  const renderWithImage = (subItem: any, index: number) => {
    if (subItem.image) {
      return (
        <Menubar.Sub>
          <Menubar.SubTrigger
            className={menuItemClass}
            onClick={() => router.push(subItem.link ?? "/")}
          >
            {subItem.title}
          </Menubar.SubTrigger>
          <Menubar.Portal>
            <Menubar.SubContent
              key={index}
              className={`${
                isHeavy ? "bg-green-800" : "bg-white"
              } h-fit pt-5 mt-[-18px] pl-14 pb-[68px] pr-9`}
              alignOffset={calculateOffset(-3, index)}
            >
              <Image
                key={index}
                className="mb-4 rounded"
                src={subItem.image}
                width={394}
                height={260}
                alt="Pa carregadeira"
              />
              <p
                className={`${
                  isHeavy ? "text-white" : "text-green-800"
                } font-normal text-xs w-[382px]`}
              >
                {subItem.subTitle}
              </p>
            </Menubar.SubContent>
          </Menubar.Portal>
        </Menubar.Sub>
      );
    } else {
      return (
        <Menubar.Item
          key={index}
          className={menuItemClass}
          onClick={() => router.push(subItem.link ?? "/")}
        >
          {subItem.title}
        </Menubar.Item>
      );
    }
  };

  const calculateOffset = (value: number, index: number) => {
    let offset = value;
    if (index === 0) return offset;
    offset -= 58 * index;
    return offset;
  };

  const goToPage = (linkDestination: string) => {
    const link = document.createElement("a");
    if (linkDestination !== "") {
      link.href = linkDestination;
      link.target = "";
      link.rel = "noopener noreferrer";
      link.click();
    }
  };
  const handleSearchMode = (isOpenSearchMode: boolean) => {
    setSearchMode(isOpenSearchMode);
  };

  return (
    <nav>
      <div className="flex w-full tablet:pl-0 justify-center items-center bg-brown-100 tablet:px-4">
        <div className="container flex justify-between items-center">
          <div className="tablet:flex">
            <button
              onClick={() => handleSelectRentalTheme("rentalLight")}
              className="py-1 px-8 tablet:py-[6px] text-sm text-white bg-orange-500 font-normal tablet:px-4 tablet:text-[10px] tablet:leading-3"
            >
              Rental Leves
            </button>
            <button
              onClick={() => handleSelectRentalTheme("rentalHeavy")}
              className="py-1 px-8 tablet:py-[6px] text-sm text-white bg-green-800 font-normal tablet:px-4 tablet:text-[10px] tablet:leading-3"
            >
              Rental Pesados
            </button>
          </div>
          <div className="flex items-center h-fit tablet:gap-1">
            <Image
              src={brazil}
              alt="Bandeira do brasil"
              width={18}
              height={18}
            />
            <p className="tablet:hidden text-xs text-green-800 ml-1 mr-2">
              Português
            </p>
            {/* <div className="mt-[3px] tablet:ml-1">
              <ChevronDown color="#004042" width="8" height="4" />
            </div> */}
          </div>
        </div>
      </div>
      <div className={`${backgroundColor} flex justify-center`}>
        <div
          className={`flex w-full ${
            !searchMode && "gap-4"
          } container py-6 tablet:py-3 justify-between items-center tablet:px-4 ${backgroundColor}`}
        >
          <div className={`flex w-full ${!searchMode && "mr-6"}`}>
            <Link href="/">
              <Image
                src={millsLogo}
                width={76}
                height={32}
                alt="Mills - Locação de Equipamentos e Plataforma Elevatória"
              />
            </Link>
            {searchMode ? (
              isMobile ? (
                <SearchModal
                  onSearch={onSearch}
                  onClose={() => handleSearchMode(false)}
                />
              ) : (
                <SearchInput
                  onSearch={onSearch}
                  closeInput={() => handleSearchMode(false)}
                />
              )
            ) : (
              <Menubar.Root className="flex tablet:hidden justify-between w-full pl-9">
                {menu?.map((item: any) => {
                  return (
                    <Menubar.Menu key={item.title}>
                      <Menubar.Trigger
                        className={triggerClass}
                        onClick={() => goToPage(item.link ?? "")}
                      >
                        {item.title}
                      </Menubar.Trigger>
                      {item.subMenu && (
                        <Menubar.Portal>
                          <Menubar.Content
                            className={`font-medium text-sm mt-[18px] text-white ${
                              isHeavy ? "bg-green-800" : "bg-white"
                            } py-5 w-80 will-change-[transform,opacity]`}
                            align="start"
                            sideOffset={5}
                            alignOffset={-25}
                            onInteractOutside={(e) => e.preventDefault()}
                          >
                            {item.subMenu.map((subItem: any, index: number) => {
                              return (
                                <Fragment key={index}>
                                  {renderWithImage(subItem, index)}
                                </Fragment>
                              );
                            })}
                          </Menubar.Content>
                        </Menubar.Portal>
                      )}
                    </Menubar.Menu>
                  );
                })}
              </Menubar.Root>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              {(isMobile || !searchMode) && (
                <button
                  onClick={() => handleSearchMode(true)}
                  className="cursor-pointer min-w-[16px]"
                >
                  <Image src={search} alt="search" width={16} height={16} />
                </button>
              )}
              {currentSiteTheme === "rentalLight" && <LoginButton />}
              {currentSiteTheme === null && <LoginButton />}
              <a
                className="cursor-pointer min-w-[16px]"
                href="/carrinho/passo-01"
              >
                <Image src={carBag} alt="carBag" width={16} height={16} />
              </a>
              <div className="cursor-pointer" onClick={openMenu}>
                <HamburgerMenuIcon
                  width={isMobile ? 22 : 20}
                  height={isMobile ? 24 : 22}
                  color="white"
                  className="desktop:hidden"
                />
              </div>
              <TalkToSpecialistModal>
                <Button
                  className={`text-xs px-7 tablet:hidden ${backgroundButton}`}
                >
                  <p
                    className={`${
                      currentSiteTheme === "rentalLight" ||
                      currentSiteTheme === null
                        ? "text-orange-500"
                        : "text-white"
                    } font-semibold whitespace-nowrap`}
                  >
                    Orçamento rápido
                  </p>
                </Button>
              </TalkToSpecialistModal>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
