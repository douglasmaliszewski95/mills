import Image from "next/image";
import verticalLines from "@/assets/FindPlatform/vertical-lines.svg";
import { Form } from "./Form";
import Bg from "@/assets/img/barsBgDown.png";

export const FindMachines: React.FC = () => {
  return (
    <section
      className="flex justify-center align-middle items-center font-ibm-font h-[243px] bg-green-800 bg-repeat-x bg-bottom bg-blend-overlay"
      style={{
        backgroundImage: `url(${Bg.src})`,
      }}
    >
      <div className="container w-full tablet:pt-7 tablet:px-4 tablet:pb-5">
        <div className="flex flex-row gap-16 tablet:flex-col tablet:gap-0">
          <h2 className="text-white text-2xl mb-8 font-semibold tablet:text-lg ">
            Encontre a plataforma ideal
          </h2>
          <Form />
        </div>
      </div>
    </section>
  );
};
