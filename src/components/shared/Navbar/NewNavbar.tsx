import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { search, millsLogo, carBag } from "@/assets";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { RequestQuoteFormType } from "./HeaderMenu/Form/types";
import { isEmpty } from "lodash";
import { getText } from "@/services/hooks/getText";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getImage } from "@/services/hooks/getImage";
import { useRouter } from "next/router";
import brazil from "@/assets/brazil.svg";
import Link from "next/link";
import { SearchModal } from "./SearchModal/SearchModal";
import { SearchInput } from "./SearchInput/SearchInput";
import { LoginButton } from "./LoginButton";
import { TalkToSpecialistModal } from "../TalkToSpecialistModal/TalkToSpecialistModal";
import Button from "../Button/Button";
import { getCurrentTheme } from "@/utils/theme";

const NavigationMenuDemo = (props: any) => {
  const {
    menu,
    openMenu,
    searchMode,
    setSearchMode = () => null,
    onSearch,
    setTheme = () => null,
  } = props;
  const [clientSide, setClientSide] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const [mobileMenuInfo, setMobileMenuInfo] = useState<any>([]);

  const { isMobile } = useScreenWidth();

  const { currentSiteTheme, setCurrentSiteTheme } = useContext(
    currentSiteThemeContext
  );
  const isHeavy = currentSiteTheme === "rentalHeavy";

  const backgroundColor = isHeavy ? "bg-green-800" : "bg-orange-500";
  const backgroundButton = isHeavy ? "" : "bg-white text-orange-500";

  const menuClassStyle = isHeavy
    ? "hover:bg-white hover:text-green-800 text-white"
    : "hover:bg-orange-500 hover:text-white text-green-800";

  useEffect(() => {
    const currentTheme = getCurrentTheme();
    setCurrentSiteTheme(currentTheme);
    setTheme(currentTheme);
  }, []);

  const sendAlert = () => {
    window.scrollTo(0, 0);
    setOpenModal("confirm");
    setTimeout(() => {
      setOpenModal("");
    }, 4000);
  };

  const onSubmit = (formData: RequestQuoteFormType) => {
    fetch(`${process.env.NEXT_PUBLIC_API_GRAPHQL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setOpenModal("");
        sendAlert();
        setIsModalOpen(false);
      })
      .catch((error) => {
        alert("Erro ao enviar a solicitação");
        console.error("Erro ao fazer a solicitação:", error);
      });
  };

  const openForm = () => {
    window.scrollTo(0, 0);
    setIsModalOpen(true);
    setOpenModal("form");
  };

  const closeMenu = () => {
    window.scrollTo(0, 0);
    setOpenModal("");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
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
  const handleSearchMode = (isOpenSearchMode: boolean) => {
    setSearchMode(isOpenSearchMode);
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
  const [imageSrc, setImageSrc] = useState("");
  const [showImageDiv, setShowImageDiv] = useState(false);
  const [activeSubItem, setActiveSubItem] = useState(null);

  const renderWithImage = (subItem: any, index: number) => {
    const handleMouseEnter = () => {
      setActiveSubItem(subItem);
    };

    const handleMouseLeave = () => {
      setActiveSubItem(null);
    };

    if (subItem.image) {
      return (
        <div
          className={`flex items-center h-[58px] cursor-pointer w-full`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            onClick={() => router.push(subItem.link ?? "/")}
            className={`flex items-center px-6 w-[332px] h-[58px] rounded-e-[4px] ${menuClassStyle}`}
          >
            {subItem.title}
          </div>
          <div className="h-full right-[37px] top-[28px] absolute">
            {activeSubItem === subItem && (
              <div className="">
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
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <NavigationMenu.Link
          asChild
          key={index}
          // className={menuItemClass}
          className={`flex items-center cursor-pointer px-6 w-[332px] h-[58px] ${menuClassStyle} rounded-e-[4px]`}
          onClick={() => router.push(subItem.link ?? "/")}
        >
          <a>{subItem.title}</a>
        </NavigationMenu.Link>
      );
    }
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
              <NavigationMenu.Root className="relative z-[1] flex w-full justify-center items-center">
                <NavigationMenu.List className="center m-0 flex list-none gap-3">
                  {menu?.map((item: any, index: number) => {
                    return (
                      <NavigationMenu.Item key={index}>
                        <NavigationMenu.Trigger
                          onClick={() => goToPage(item.link ?? "")}
                          className="group flex select-none items-center justify-between rounded-[4px] px-3 text-[14px] outline-none focus:transparent text-white font-normal"
                        >
                          {item.title}
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content
                          className={`${
                            isHeavy ? "bg-green-800" : "bg-white"
                          } data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 w-full sm:w-auto ${
                            item?.subMenu ? "h-[361px]" : ""
                          }`}
                        >
                          {item?.subMenu?.map((subItem: any, index: number) => {
                            return (
                              <Fragment key={index}>
                                {renderWithImage(subItem, index)}
                              </Fragment>
                            );
                          })}
                        </NavigationMenu.Content>
                      </NavigationMenu.Item>
                    );
                  })}
                </NavigationMenu.List>

                <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                  <NavigationMenu.Viewport
                    className={`data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300  w-full ${backgroundColor}`}
                  />
                </div>
              </NavigationMenu.Root>
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

export default NavigationMenuDemo;
