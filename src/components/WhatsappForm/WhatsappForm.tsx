import { FormValues, WhatsappFormModalProps } from "./types";
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
import whatsappIcon from "@/assets/whatsapp.svg";
import Image from "next/image";
import { HtmlRenderer } from "../HtmlRender/htmlRender";

export const WhatsappFormModal: React.FC<WhatsappFormModalProps> = (
  props
) => {
  const { children } = props;
  const [content, setContent] = useState<ImageCMS>();
  const [contentBase, setContentBase] = useState<any>();
  const [open, setOpen] = useState(false);
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
        const contentAux = await getCMSContent("modal_fale_especialista_milla_whatsapp");
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

  const onSubmit: SubmitHandler<FormValues> = (values) => {    
    // const message = `${values.name}
    // ${values.email}
    // ${values.ddd} ${values.telephone}`;
    const link = document.createElement("a");
    // link.href = `https://api.whatsapp.com/send?phone=5511943717548&text=${encodeURIComponent(message)}`;
    link.href = "https://api.whatsapp.com/send?phone=5511943717548&text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista."
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false)
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
                  <Input
                    placeholder="Nome"
                    name="name"
                    error={errors.name}
                    color="green"
                    className="grow w-full input-form"
                    register={register}
                  />
                  <Input
                    placeholder="E-mail"
                    name="email"
                    error={errors.email}
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
                    className="w-full py-2 rounded-lg"
                    style={{
                      background: "#25D366",
                      color: "#fff"
                    }}
                  >
                    <p className="font-semibold text-lg flex justify-center">
                      <Image
                        src={whatsappIcon}
                        alt="Logo do whatsapp"
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
    </Dialog.Root>
  );
};
