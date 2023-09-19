import useScreenWidth from "@/services/hooks/useScreenWidth";
import Button from "../shared/Button/Button";
import { ContactFormProps, ContactFormType } from "./types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./utils";
import { InputSelector } from "../shared/InputSelector/InputSelector";
import { Input } from "@/components/shared/Input/Input";
import { Checkbox } from "../shared/Checkbox/Checkbox";
import { useState } from "react";

export const ContactForm: React.FC<ContactFormProps> = ({
  img,
  headerText,
  paragraphText,
  buttonProps,
  variant = "orange",
  bgImage = false,
  hideImageInMobileMode = false,
  reverse = true,
  onSubmit
}) => {
  const { isMobile } = useScreenWidth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm<ContactFormType>({
    resolver: yupResolver<ContactFormType>(schema),
  });

  const [checked, setChecked] = useState<boolean>(false);

  return (
    <section
      className={`flex justify-center bg-no-repeat bg-right-bottom ${variant === "green"
        ? "text-white bg-green-800"
        : "text-green-800 bg-white"
        } `}
    // style={{
    //   backgroundImage: bgImage ? `url(${LeftImgWithRightTextBg.src})` : "",
    //   backgroundSize: isMobile ? "220px" : "580px",
    // }}
    >
      <div
        className={`flex justify-between container ${variant === "green" || reverse === false
          ? "tablet:flex-col"
          : "tablet:flex-col-reverse"
          }`}
      >
        <div
          style={{
            backgroundImage:
              hideImageInMobileMode && isMobile ? "none" : `url(${img})`,
          }}
          className={`flex justify-center bg-no-repeat bg-cover w-[564px] tablet:w-full  ${hideImageInMobileMode && isMobile
            ? "tablet:h-[25px]"
            : "tablet:h-[232px]"
            }`}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center py-5 pr-[90px] gap-6 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9"
        >
          <h3 className="text-lg tablet:text-base">
            {headerText}
          </h3>
          <div className={isMobile ? "block" : "flex"}>
            <div className={isMobile ? "flex flex-col pb-5 w-[100%]" : "flex flex-col pr-5 w-[100%]"}>
              <Input
                label="Nome*"
                placeholder="Insira seu nome"
                name="name"
                error={errors.name}
                color="green"
                className="grow w-full"
                register={register}
              />
            </div>
            <div className="flex flex-col w-[100%]">
              <Input
                label="E-mail*"
                placeholder="Insira seu email"
                name="email"
                error={errors.email}
                color="green"
                className="grow w-full"
                register={register}
              />
            </div>
          </div>
          <div className={isMobile ? "block" : "flex"}>
            <div className={isMobile ? "flex flex-col pb-5 w-[100%]" : "flex flex-col pr-5 w-[100%]"}>
              <Input
                label="Telefone*"
                placeholder="(00) 00000 0000"
                mask="(99) 99999 9999"
                name="telefone"
                error={errors.telefone}
                color="green"
                className="grow w-full"
                register={register}
              />
            </div>
            <div className="flex flex-col w-[100%]">
              <Input
                label="CNPJ*"
                placeholder="Insira o CNPJ da empresa"
                mask="99.999.999/9999-99"
                name="cnpj"
                error={errors.cnpj}
                color="green"
                className="grow w-full"
                register={register}
              />
            </div>
          </div>
          <p className="text-sm text-green-800 mt-3">
            Motivo do contato
          </p>
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
              "Fôrmas e Escoramentos",
              "Outro"
            ]}
            setValue={setValue}
            placeholder="Selecione um motivo"
          />
          <Input
            label="Comentários adicionais"
            placeholder="Se necessário, insira algum comentário"
            name="comentarios"
            error={errors.comentarios}
            color="green"
            className="grow w-full"
            register={register}
          />
          <div className="flex">
            <div>
              <Checkbox
                checked={checked}
                onToggle={() => setChecked(!checked)}
              />
            </div>
            <p className="text-xs tablet:text-xs whitespace-pre-line pl-2">
              {paragraphText}
            </p>
          </div>
          {buttonProps && (
            <Button
              type="submit"
              variant={variant === "green" ? "inverted" : "default"}
              className="max-w-[265px]"
            >
              {buttonProps?.text}
            </Button>
          )}
        </form>
      </div>
    </section>
  );
};
