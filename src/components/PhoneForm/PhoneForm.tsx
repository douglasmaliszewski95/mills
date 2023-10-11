import { FormValues, PhoneFormModalProps } from "./types";
import * as Dialog from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./utils";
import { Input } from "../shared/Input/Input";
import { useCallback, useEffect, useState } from "react";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { getCMSContent } from "@/components/Generators/content";
import _ from "lodash";
import { ImageCMS } from "@/types";
import { transformContentToMobile } from "@/utils/content";
import { getImageSrc } from "@/utils/images";
import close_gray from "@/assets/close_gray.svg";
import phone from "@/assets/phone-ico.svg";
import green_check from "@/assets/green_check.svg";
import { InputSelector } from "../shared/InputSelector/InputSelector";
import Image from "next/image";
import { HtmlRenderer } from "../HtmlRender/htmlRender";

export const PhoneFormModal: React.FC<PhoneFormModalProps> = (
  props
) => {
  const { children } = props;
  const [content, setContent] = useState<ImageCMS>();
  const [contentBase, setContentBase] = useState<any>();
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { isDesktop, isMobile } = useScreenWidth();

  const formatData = useCallback(
    async (contentAux: any) => {
      const responsiveContent = isMobile
        ? transformContentToMobile(contentAux)
        : contentAux;
      setContent(responsiveContent?.["modal_milla"]?.[0]);
    },
    [isMobile]
  );

  useEffect(() => {
    const getContent = async () => {
      if (isMobile === undefined) return;
      if (_.isEmpty(contentBase)) {
        const contentAux = await getCMSContent("modal_fale_especialista_milla_fone");
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
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
  });

  const modal = () => {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 tablet:overflow-y-scroll"
        onClick={() => setOpenSuccess(false)}
      >
        <div className="fixed bg-white max-w-[35%] tablet:max-w-full tablet:w-[90%] tablet:h-auto top-[58%] right-[5%] rounded-xl">
          {/* Header */}
          <div
            className={`flex w-full px-10 tablet:px-6 rounded-lg items-start pb-8 pt-14 tablet:pb-4 tablet:pt-8 items-center justify-between bg-white-500`}
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                src={green_check}
                alt="check"
                className="mb-10"
                width="77"
                height="77"
              />
              <h3 className="text-lg font-semibold tablet:text-base text-green-800">
                Sua solicitação foi enviada com sucesso! Em breve um especialista entrará em contato.
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const formData = {
      nome: values.name,
      motivoContato: values.motivo,
      telefone: `${values.ddd} ${values.telephone}`
    };

    const result: any = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    if (result.ok) {
      setOpen(false);
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
      }, 3000);
    }
  };

  return (
    <Dialog.Root modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0 px-12" />
        <Dialog.Content className="z-50 fixed max-w-[30%] tablet:px-4 tablet:max-w-none w-full top-[58%] right-[-14%] tablet:top-[40%] tablet:left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white tablet:bg-transparent shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex tablet:bg-white rounded-lg">
            {/* {isDesktop && (
              <div className="basis-1/2">
                <img
                  className="w-[456px] h-[482px] tablet:h-[300px]"
                  src={getImageSrc(content?.fields)}
                />
              </div>
            )} */}
            <div
              className={`${isDesktop ? "p-6" : "p-4"
                } flex flex-col relative`}
            >
              <Dialog.Close className="w-full flex justify-end absolute right-3 top-3">
                <img src={close_gray.src} />
              </Dialog.Close>
              <div className="flex">
                <Image
                  src={getImageSrc(content?.fields)}
                  alt="Milla"
                  className="mr-2"
                  width="77"
                  height="77"
                />
                <h2 className="font-bold text-orange-500 tablet:text-sm">
                  <HtmlRenderer htmlContent={content?.fields?.content_title} />
                </h2>
              </div>
              <div className="mt-6 flex justify-start">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-4"
                >
                  <InputSelector
                    name="motivo"
                    watch={watch}
                    options={[
                      "Atendimento técnico",
                      "Desconto/Cancelamento Fatura",
                      "2° via de boleto/Negociação de dívidas",
                      "Locação de plataformas elevatórias e geradores e compressores",
                      "Locação de Máquinas Pesadas (Linha Amarela)",
                      "Vendas",
                      "Fôrmas e Escoramentos"
                    ]}
                    setValue={setValue}
                    placeholder="Motivo do contato"
                    className="input-form"
                  />
                  <Input
                    placeholder="Nome"
                    name="name"
                    error={errors.name}
                    color="green"
                    className="grow w-full input-form"
                    register={register}
                  />
                  <div className="flex">
                    <Input
                      placeholder="DDD"
                      name="ddd"
                      mask="(99)"
                      error={errors.ddd}
                      color="green"
                      className="grow w-full input-form max-w-[20%]"
                      register={register}
                    />
                    <Input
                      placeholder="Telefone/Celular"
                      mask="99999 9999"
                      name="telephone"
                      error={errors.telephone}
                      color="green"
                      className="grow w-full input-form ml-5"
                      register={register}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-orange-500 text-white"
                  >
                    <p className="font-semibold text-lg flex justify-center">
                      <Image
                        src={phone}
                        alt="Fone"
                        className="mr-5"
                      />
                      {content?.fields?.button_text ?? "Enviar"}
                    </p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
      {openSuccess && modal()}
    </Dialog.Root>
  );
};
