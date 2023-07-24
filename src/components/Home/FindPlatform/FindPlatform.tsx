import Image from "next/image";
import verticalLines from "@/assets/FindPlatform/vertical-lines.svg";
import { Form } from "./Form/Form";

export const FindPlatform: React.FC = () => {
  return (
    <section className="relative font-ibm-font">
      <div className="w-full flex justify-end">
        <img
          src={verticalLines}
          alt="linhas verticais laranja e verdes"
          className="tablet:w-[75%]"
        />
      </div>
      <div className="flex justify-center">
        <div className="container w-full tablet:pt-7 tablet:px-4 tablet:pb-5">
          <h2 className="text-green-800 text-2xl mb-8 font-semibold tablet:text-lg">
            Encontre a plataforma ideal
          </h2>
          <Form />
        </div>
      </div>
    </section>
  );
};
