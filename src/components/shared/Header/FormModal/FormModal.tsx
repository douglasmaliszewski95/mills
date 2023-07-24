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

export const FormModal: React.FC<FormModalProps> = (props) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestQuoteFormType>({
    mode: "onChange",
    resolver: yupResolver<RequestQuoteFormType>(schema),
  });

  return (
    <Dialog.Root defaultOpen={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="py-6 px-3 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white focus:outline-none">
          <div className="flex items-start justify-between gap-2">
            <Dialog.Title className="text-green-800 text-sm font-medium mb-6">
              Por favor, informe seus dados e entraremos em contato para
              entender qual a sua necessidade.
            </Dialog.Title>
            <Dialog.Close asChild className="mt-[-9px]">
              <img className="w-[14px] h-[14px]" src={close} alt="Xis" />
            </Dialog.Close>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
