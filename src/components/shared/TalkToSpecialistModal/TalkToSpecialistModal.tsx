import Button from "../Button/Button";
import { FormValues, TalkToSpecialistModalProps } from "./types";
import * as Dialog from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./utils";
import { Input } from "../Input/Input";
import { useCallback, useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getCMSContent } from "@/components/Generators/content";
import _ from "lodash";
import { ImageCMS } from "@/types";
import { transformContentToMobile } from "@/utils/content";
import { getImageSrc } from "@/utils/images";
import { v4 as uuidv4 } from "uuid";
import close from "@/assets/close.svg";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import checkCircle from "@/assets/check-circle.svg";
import Image from "next/image";

export const TalkToSpecialistModal: React.FC<TalkToSpecialistModalProps> = (
  props
) => {
  const { children } = props;
  const [content, setContent] = useState<ImageCMS>();
  const [contentBase, setContentBase] = useState<any>();
  const { isDesktop, isMobile } = useScreenWidth();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const formatData = useCallback(
    async (contentAux: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;
      setContent(responsiveContent?.["modal_especialista"]?.[0]);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("modal_especialista");
        setContentBase(contentAux);
        formatData(contentAux);
      } else {
        formatData(contentBase);
      }
    };
    getContent();
  }, [formatData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const data = {
      ...values,
      budgetId: uuidv4(),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch("/api/checkout", options);

    setIsOpenAlert(true);
    setIsOpen(false);

    setTimeout(() => {
      setIsOpenAlert(false);
    }, 2000);
  };

  return isOpenAlert ? (
    <AlertDialog.Root open={isOpenAlert}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/60 fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-auto bg-white flex flex-col items-center gap-4 p-10 rounded">
              <Image src={checkCircle} alt="Ícone de certo" />
              <p className="text-green-800 font-semibold text-lg text-center">
                Sua solicitação foi enviada com sucesso! Em breve um
                <br />
                especialista entrará em contato
              </p>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  ) : (
    <Dialog.Root modal open={isOpen}>
      <Dialog.Trigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0 px-12 relative z-50" />
        <Dialog.Content className="z-50 fixed max-w-[900px] tablet:px-4 tablet:max-w-none w-full h-[482px] tablet:h-[300px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white tablet:bg-transparent shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex tablet:bg-white rounded-lg">
            {isDesktop && (
              <div className="basis-1/2">
                <img
                  className="w-[456px] h-[482px] tablet:h-[300px]"
                  src={getImageSrc(content?.fields)}
                />
              </div>
            )}
            <div
              className={`${
                isDesktop ? "basis-1/2 p-6" : "p-4"
              } flex flex-col relative`}
            >
              <Dialog.Close
                onClick={() => setIsOpen(false)}
                className="w-full flex justify-end absolute right-3 top-3"
              >
                <img src={close.src} />
              </Dialog.Close>
              <h2 className="font-medium text-green-800 tablet:text-sm">
                {content?.fields?.content_title}
              </h2>
              <div className="mt-6 flex justify-start">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-4"
                >
                  <Input
                    label="Nome*"
                    placeholder="Insira seu nome"
                    name="name"
                    error={errors.name}
                    color="green"
                    className="grow w-full"
                    register={register}
                  />
                  <Input
                    label="E-Mail*"
                    placeholder="Insira seu email"
                    name="email"
                    error={errors.email}
                    color="green"
                    className="grow w-full"
                    register={register}
                  />
                  <Input
                    label="Telefone*"
                    placeholder="(00) 00000 0000"
                    mask="(99) 99999 9999"
                    name="phone"
                    error={errors.phone}
                    color="green"
                    className="grow w-full"
                    register={register}
                  />
                  <Input
                    label="Comentário"
                    placeholder="Deixe aqui um comentário"
                    name="comment"
                    error={errors.comment}
                    color="green"
                    className="grow w-full"
                    register={register}
                  />
                  <Button className="max-w-[260px] w-full">
                    <p className="font-semibold text-sm">
                      {content?.fields?.buttonText ?? "Enviar"}
                    </p>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
