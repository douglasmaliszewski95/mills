import { useCallback, useContext, useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { HeaderMenu } from "@/components/shared/Header/HeaderMenu/HeaderMenu";
import { RequestQuoteFormType } from "@/types";
import { FormModal } from "./FormModal/FormModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { HeaderProps } from "./types";
import { getText } from "@/services/hooks/getText";
import { getImage } from "@/services/hooks/getImage";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { isEmpty } from "lodash";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";
import NavigationMenuDemo from "../Navbar/NewNavbar";

export const Header: React.FC<HeaderProps> = (props) => {
  const { onSearch, theme = "rentalLight" } = props;
  const [clientSide, setClientSide] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [menu, setMenu] = useState<any>([]);
  const [themeProp, setTheme] = useState<any>(theme);
  const [mobileMenuInfo, setMobileMenuInfo] = useState<any>([]);

  const { isMobile } = useScreenWidth();

  const { currentSiteTheme } = useContext(currentSiteThemeContext);
  const isHeavy = currentSiteTheme === "rentalHeavy";

  const getContent = useCallback(async (value?: string) => {
    const [navmenu, menuImg, menuImgHeavy]: any = await Promise.all([
      getText("shared"),
      getImage("leves_mainmenu"),
      getImage("pesados_mainmenu"),
    ]);

    const menuMob = navmenu?.[
      value === "rentalLight" ? "main_menu_mobile" : "main_menu_heavy_mobile"
    ]
      ?.sort(
        (a: any, b: any) => a.fields.content_order - b.fields.content_order
      )
      ?.map((item: any, index: number) => {
        return {
          title: item?.fields?.title,
          subGroups:
            item?.fields?.subtitle?.map((subItem: any, i: number) => {
              return {
                title: subItem || null,
                href: item.fields.hrefButton?.[i] || null,
              };
            }) || null,
          href: isEmpty(item?.fields?.subtitle)
            ? item?.fields?.hrefButton?.[0]
            : "" || null,
        };
      });
    setMobileMenuInfo(menuMob);

    const menu = navmenu?.[
      value === "rentalLight" ? "main_menu" : "main_menu_heavy"
    ]
      ?.sort(
        (a: any, b: any) => a.fields.content_order - b.fields.content_order
      )
      .map((item: any, index: number) => {
        return {
          title: item.fields.title,
          subMenu:
            item.fields.subtitle?.map((subItem: any, i: number) => {
              const images =
                value === "rentalLight"
                  ? menuImg?.leves_navmenu
                  : menuImgHeavy?.pesados_navmenu;
              const img = images?.find(
                (x: any) => x.fields.content_title === subItem
              );
              return {
                title: subItem || null,
                link: item.fields.hrefButton?.[i] || null,
                image: img ? img.fields.native.links[0].href : null,
                subTitle: item.fields ? item.fields?.text_field[i] : null,
              };
            }) || null,
          link:
            item.fields.subtitle === null
              ? item.fields.hrefButton
                ? item.fields.hrefButton?.[0]
                : null
              : null,
        };
      });
    setMenu(menu);
  }, []);

  useEffect(() => {
    setClientSide(true);
    getContent(theme);
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

  const openMenu = () => setOpenModal("menu");
  const closeMenu = () => {
    window.scrollTo(0, 0);
    setOpenModal("");
  };

  const switchTheme = (value: string) => {
    setTheme(value);
    getContent(value === "rentalHeavy" ? "rentalHeavy" : "rentalLight");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return openModal === "menu"
    ? clientSide && (
        <HeaderMenu
          menuInfo={mobileMenuInfo}
          onClose={closeMenu}
          openForm={openForm}
        />
      )
    : clientSide && (
        <header>
          {isMobile && (
            <Navbar
              menu={menu}
              onSearch={onSearch}
              openMenu={openMenu}
              searchMode={searchMode}
              setSearchMode={setSearchMode}
              theme={themeProp}
              setTheme={switchTheme}
              openForm={() => setIsModalOpen(true)}
            />
          )}
          {!isMobile && (
            <NavigationMenuDemo
              menu={menu}
              onSearch={onSearch}
              openMenu={openMenu}
              searchMode={searchMode}
              setSearchMode={setSearchMode}
              theme={themeProp}
              setTheme={switchTheme}
              openForm={() => setIsModalOpen(true)}
            />
          )}
          {openModal === "confirm" && (
            <ConfirmModal
              title="Sua solicitação foi enviada com sucesso! Em breve um especialista
        entrará em contato"
            />
          )}

          <FormModal
            open={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            onSubmit={onSubmit}
          />
        </header>
      );
};
