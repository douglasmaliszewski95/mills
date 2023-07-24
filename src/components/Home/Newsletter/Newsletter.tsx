import { useState } from "react";
import { Section } from "@/components/shared/Section/Section";
import { NewsletterForm } from "./Form/Form";
import { NewsletterFormProps } from "./Form/types";
import { SubmitHandler } from "react-hook-form";
import checkCircle from "@/assets/check-circle.svg";
import Image from "next/image";

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
      <h2 className="text-white font-semibold text-2xl max-w-[40%] w-full tablet:max-w-full tablet:text-lg tablet:mb-7">
        Quer receber conteúdos exclusivos? Inscreva-se na nossa newsletter
      </h2>
      <NewsletterForm onSubmit={handleSubmit} />
      {isModalOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none tablet:mt-7">
          <div className="relative w-auto bg-white flex flex-col items-center gap-4 p-10 rounded">
            <img src={checkCircle} alt="Ícone de certo" />
            <p className="text-green-800 font-semibold text-lg text-center">
              Cadastro realizado com sucesso!
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};
