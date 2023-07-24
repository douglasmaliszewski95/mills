import { HeaderMenuProps } from "./types";
import close from "@/assets/close.svg";
import Image from "next/image";
import Button from "../../Button/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { PersonIco } from "@/assets/PersonIco";

export const HeaderMenu: React.FC<HeaderMenuProps> = (props) => {
  const { menuInfo, onClose, openForm } = props;

  return (
    <section className="p-[18px] fixed top-0 right-0 w-full h-full z-50 bg-white overflow-auto">
      <div className="flex flex-col items-end w-full mb-6" onClick={onClose}>
        <img src={close} alt="Xis" />
      </div>
      <Button
        variant="outlined"
        size="full"
        className="flex items-center justify-center gap-2 mb-6"
      >
        <PersonIco color="#F37021" width="16" height="16" />
        <p className="py-1 text-sm">Fazer login</p>
      </Button>
      {menuInfo.map((info) => (
        <>
          <h3
            key={info.title}
            className={`font-medium text-green-800 text-base border-b-[1px] border-green-800 mb-4 ${
              info?.subGroups?.length > 0 ? "pb-2" : "pb-4"
            }`}
          >
            {info.title}
          </h3>
          {info?.subGroups?.length > 0 &&
            info.subGroups.map(({ title, href }) => (
              <a key={title} href={href} className="w-full">
                <p className="text-green-800 text-xs mb-4">{title}</p>
              </a>
            ))}
        </>
      ))}
      <p className="text-green-800 font-medium text-sm leading-none">
        Central de Relacionamento:
      </p>
      <p className="underline text-green-800 text-sm mb-6">0800 705 1000</p>
      <p className="text-green-800 font-medium text-sm">
        Horário de atendimento:
      </p>
      <p className="text-green-800 text-sm mb-6">
        Segunda a sexta, das 7 às 18h <br />
        Sábados, das 8h às 12h
      </p>
      <Button
        size="full"
        className="py-2 text-sm font-semibold"
        onClick={openForm}
      >
        Orçamento rápido
      </Button>
    </section>
  );
};
