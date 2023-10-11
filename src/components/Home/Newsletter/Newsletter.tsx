import { useState } from "react";
import { Section } from "@/components/shared/Section/Section";
import { NewsletterForm } from "./Form/Form";
import { NewsletterFormProps } from "./Form/types";
import { SubmitHandler } from "react-hook-form";
import checkCircle from "@/assets/check-circle.svg";
import Image from "next/image";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export const Newsletter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendAlert = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const handleSubmit: SubmitHandler<NewsletterFormProps> = (data) => {
    sendAlert();
  };

  return (
    <Section
      sectionClass="bg-gray-700 pb-11 pt-9 tablet:px-4 font-ibm-font"
      containerClass="flex tablet:flex-col"
    >
      <p className="text-white font-semibold text-2xl max-w-[40%] w-full tablet:max-w-full tablet:text-lg tablet:mb-7">
        Quer receber conteúdos exclusivos? Inscreva-se na nossa newsletter
      </p>
      <NewsletterForm onSubmit={handleSubmit} />
      <AlertDialog.Root open={isModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black/60 fixed inset-0" />
          <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]">
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
              <div className="relative w-auto bg-white flex flex-col items-center gap-4 p-10 rounded">
                <Image src={checkCircle} alt="Ícone de certo" />
                <p className="text-green-800 font-semibold text-lg text-center">
                  Cadastro realizado com sucesso!
                </p>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Section>
  );
};
