import { HeaderMenuProps } from "./types";
import close from "@/assets/close.svg";
import Image from "next/image";
import Button from "../../Button/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { PersonIco } from "@/assets/PersonIco";
import { Form } from "./Form/Form";

export const HeaderMenu: React.FC<HeaderMenuProps> = (props) => {
  const { menuInfo, setIsMenuOpen, onSubmit } = props;

  return (
    <section className="p-[18px]">
      <div className="flex flex-col items-end w-full mb-6">
        <Image src={close} alt="Xis" onClick={() => setIsMenuOpen(false)} />
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

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button size="full" className="py-2 text-sm font-semibold">
            Orçamento rápido
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="py-6 px-3 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white focus:outline-none">
            <div className="flex items-start justify-between gap-2">
              <Dialog.Title className="text-green-800 text-sm font-medium mb-6">
                Por favor, informe seus dados e entraremos em contato para
                entender qual a sua necessidade.
              </Dialog.Title>
              <Dialog.Close asChild className="mt-[-9px]">
                <Image src={close} alt="Xis" width={14} height={14} />
              </Dialog.Close>
            </div>
            <Form onSubmit={onSubmit} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};
