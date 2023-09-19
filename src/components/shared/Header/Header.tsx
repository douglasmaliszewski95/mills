import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { HeaderMenu } from "@/components/shared/Header/HeaderMenu/HeaderMenu";
import { mobileMenuInfo } from "@/components/shared/Navbar/utils";
import { RequestQuoteFormType } from "@/types";
import { FormModal } from "./FormModal/FormModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { HeaderProps } from "./types";
import { getText } from "@/services/hooks/getText";
import { getImage } from "@/services/hooks/getImage";

export const Header: React.FC<HeaderProps> = (props) => {
  const { onSearch, theme = "rentalLight" } = props;

  const [openModal, setOpenModal] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [menu, setMenu] = useState<any>([]);
  const [themeProp, setTheme] = useState<any>(theme);

  const getContent = useCallback(async (value?: string) => {
    const navmenu: any = await getText("shared");
    const menuImg: any = await getImage("leves_mainmenu");

    const menu = navmenu?.[value === "rentalLight" ? "main_menu" : "main_menu_heavy"]
      ?.sort(
        (a: any, b: any) => a.fields.content_order - b.fields.content_order
      )
      .map((item: any, index: number) => {
        return {
          title: item.fields.title,
          subMenu:
            item.fields.subtitle?.map((subItem: any, i: number) => {
              const img = menuImg?.leves_navmenu?.find(
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
    getContent(theme);
  }, []);

  const sendAlert = () => {
    window.scrollTo(0, 0);
    setOpenModal("confirm");
    setTimeout(() => {
      setOpenModal("");
    }, 4000);
  };

  const onSubmit = (data: RequestQuoteFormType) => {
    setOpenModal("");
    sendAlert();
  };

  const openForm = () => {
    window.scrollTo(0, 0);
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

  return openModal === "menu" ? (
    <HeaderMenu
      menuInfo={mobileMenuInfo}
      onClose={closeMenu}
      openForm={openForm}
    />
  ) : (
    <header>
      <Navbar
        menu={menu}
        onSearch={onSearch}
        openMenu={openMenu}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        theme={themeProp}
        setTheme={switchTheme}
      />
      {openModal === "confirm" && (
        <ConfirmModal
          title="Sua solicitação foi enviada com sucesso! Em breve um especialista
        entrará em contato"
        />
      )}
      {openModal === "form" && <FormModal onSubmit={onSubmit} />}
    </header>
  );
};
