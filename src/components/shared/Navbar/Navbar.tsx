import React, { Fragment, useState } from "react";
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
import { menu } from "./utils";
import { SearchInput } from "./SearchInput/SearchInput";
import { SearchModal } from "./SearchModal/SearchModal";

export const Navbar: React.FC<NavbarProps> = (props) => {
  const { openMenu, searchMode, setSearchMode, onSearch } = props;

  const { isMobile } = useScreenWidth();
  const [menuView, setMenuView] = useState("rentalLight");
  const backgroundColor =
    menuView === "rentalHeavy" ? "bg-green-800" : "bg-orange-500";
  const backgroundButton =
    menuView === "rentalHeavy" ? "" : "bg-white text-orange-500";

  const triggerClass =
    "font-ibm-font text-sm text-white data-[state=open]:font-bold data-[highlighted]:outline-none";

  const menuItemClass =
    "text-green-800 group pl-5 leading-none flex items-center h-[58px] px-[10px] relative select-none outline-none data-[state=open]:bg-orange-500 data-[state=open]:rounded-r data-[state=open]:text-violet11 data-[highlighted]:bg-orange-500 data-[highlighted]:text-white data-[highlighted]:text-green-800 data-[highlighted]:rounded-s-none";

  const renderWithImage = (subItem: any, index: number) => {
    if (subItem.image) {
      return (
        <Menubar.Sub>
          <Menubar.SubTrigger className={menuItemClass}>
            {subItem.title}
          </Menubar.SubTrigger>
          <Menubar.Portal>
            <Menubar.SubContent
              key={index}
              className="bg-white h-fit pt-5 mt-[-18px] pl-14 pb-[68px] pr-9"
              alignOffset={calculateOffset(-3, index)}
            >
              <img
                key={index}
                className="mb-4 rounded w-[394px] h-[260px]"
                src={subItem.image}
                alt="Pa carregadeira"
              />
              <p className="text-green-800 font-normal text-xs w-[382px]">
                {subItem.subTitle}
              </p>
            </Menubar.SubContent>
          </Menubar.Portal>
        </Menubar.Sub>
      );
    } else {
      return (
        <Menubar.Item key={index} className={menuItemClass}>
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
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    }
  };
  const handleSearchMode = (action: boolean) => {
    return action ?? undefined;
  };
  return (
    <nav>
      <div className="flex w-full tablet:pl-0 justify-center items-center bg-brown-100 tablet:px-4">
        <div className="container flex justify-between items-center">
          <div className="tablet:flex">
            <button
              onClick={() => setMenuView("rentalLight")}
              className="py-1 px-8 tablet:py-[6px] text-sm text-white bg-orange-500 font-normal tablet:px-4 tablet:text-[10px] tablet:leading-3"
            >
              Rental Leves
            </button>
            <button
              onClick={() => setMenuView("rentalHeavy")}
              className="py-1 px-8 tablet:py-[6px] text-sm text-white bg-green-800 font-normal tablet:px-4 tablet:text-[10px] tablet:leading-3"
            >
              Rental Pesados
            </button>
          </div>
          <div className="flex items-center h-fit tablet:gap-1">
            <img
              className="w-[18px] h-[18px]"
              src={brazil}
              alt="Bandeira do brasil"
            />
            <p className="tablet:hidden text-xs text-green-800 ml-1 mr-2">
              Português
            </p>
            <div className="mt-[3px] tablet:ml-1">
              <ChevronDown color="#004042" width="8" height="4" />
            </div>
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
              <img src={millsLogo} className="w-[76px] h-[32px]" alt="logo" />
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
                {menu.map((item) => {
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
                            className="font-medium text-sm mt-[20px] text-white bg-white py-5 w-80 will-change-[transform,opacity]"
                            align="start"
                            sideOffset={5}
                            alignOffset={-25}
                          >
                            {item.subMenu.map((subItem: any, index) => {
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
                  <img
                    className="w-[16px] h-[16px]"
                    src={search}
                    alt="search"
                    width={16}
                    height={16}
                  />
                </button>
              )}
              {menuView === "rentalLight" && <LoginButton />}

              <a className="cursor-pointer min-w-[16px]">
                <img className="w-[16px] h-[16px]" src={carBag} alt="carBag" />
              </a>
              <div className="cursor-pointer" onClick={openMenu}>
                <HamburgerMenuIcon
                  width={isMobile ? 22 : 20}
                  height={isMobile ? 24 : 22}
                  color="white"
                  className="desktop:hidden"
                />
              </div>
              <Button
                className={`text-xs px-7 tablet:hidden ${backgroundButton}`}
              >
                <p
                  className={`${
                    menuView === "rentalLight"
                      ? "text-orange-500"
                      : "text-white"
                  } font-semibold whitespace-nowrap`}
                >
                  Orçamento rápido
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
