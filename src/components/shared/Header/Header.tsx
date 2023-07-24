import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar/Navbar";

import { HeaderMenu } from "@/components/shared/Header/HeaderMenu/HeaderMenu";
import { mobileMenuInfo } from "@/components/shared/Navbar/utils";
import { RequestQuoteFormType } from "@/types";
import { FormModal } from "./FormModal/FormModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = (props) => {
  const { onSearch } = props;

  const [openModal, setOpenModal] = useState("");
  const [searchMode, setSearchMode] = useState(false);

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

  return openModal === "menu" ? (
    <HeaderMenu
      menuInfo={mobileMenuInfo}
      onClose={closeMenu}
      openForm={openForm}
    />
  ) : (
    <header>
      <Navbar
        onSearch={onSearch}
        openMenu={openMenu}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
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
