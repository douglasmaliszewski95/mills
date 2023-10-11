import * as Dialog from "@radix-ui/react-dialog";
import close from "@/assets/close.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FormModalProps } from "./types";
import { RequestQuoteFormType } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./utils";
import { Input } from "@/components/shared/Input/Input";
import Button from "@/components/shared/Button/Button";
import TalkToSpecialistImg from "@/assets/img/fale-com-especialista.jpg";

export const FormModal: React.FC<FormModalProps> = ({
  onSubmit,
  open,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestQuoteFormType>({
    mode: "onChange",
    resolver: yupResolver<RequestQuoteFormType>(schema),
  });

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="flex data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-full max-w-[901px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white focus:outline-none tablet:w-[90vw]">
          <img
            src={TalkToSpecialistImg.src}
            alt="img"
            className="tablet:hidden"
          />
          <div className="flex flex-col w-full p-10 tablet:p-5">
            <div>
              <Dialog.Title className="text-green-800 text-sm font-medium mb-6">
                Por favor, informe seus dados e entraremos em contato para
                entender qual a sua necessidade.
              </Dialog.Title>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Input
                label="Nome*"
                placeholder="Insira seu nome"
                name="name"
                error={errors.name}
                register={register}
                color="green"
                marginOnError
              />
              <Input
                label="Email*"
                placeholder="Insira seu email"
                name="email"
                error={errors.email}
                register={register}
                color="green"
                marginOnError
              />
              <Input
                label="Telefone*"
                placeholder="(00) 00000 0000"
                mask="(99) 99999 9999"
                name="phone"
                error={errors.phone}
                register={register}
                color="green"
                marginOnError
              />
              <Input
                label="Comentário"
                placeholder="Deixe aqui um comentário"
                name="comment"
                error={errors.comment}
                register={register}
                color="green"
                marginOnError
              />
              <Button size="full">Enviar</Button>
            </form>
          </div>
          <Dialog.Close
            asChild
            className="absolute cursor-pointer right-4 top-4"
            onClick={closeModal}
          >
            <Image src={close} alt="Xis" width={14} height={14} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
