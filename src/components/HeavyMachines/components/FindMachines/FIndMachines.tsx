import Image from "next/image";
import verticalLines from "@/assets/FindPlatform/vertical-lines.svg";
import { Form } from "./Form";
import Bg from "@/assets/img/barsBgDown.png";
import { useEffect, useState } from "react";
import { optionsType } from "./types";
import { getCMSContent, getCMSText } from "@/components/Generators/content";

export const FindMachines: React.FC = () => {
  const [text, setText] = useState<any>();
  const getContent = async () => {
    const text = await getCMSText("home_pesados");
    setText(text);
  };

  useEffect(() => {
    getContent();
  }, []);

  const formattedOptions = () => {
    const linkArr: string[] = [];
    const nameArr: string[] = [];
    const fullArr: optionsType[] = [];

    text?.pesados_encontre_plataforma_texto[0]?.fields?.hrefButton?.map(
      (item: any) => {
        linkArr.push(item);
      }
    );

    text?.pesados_encontre_plataforma_texto[0]?.fields?.text_field?.map(
      (item: any) => {
        nameArr.push(item);
      }
    );

    for (let i = 0; i < nameArr.length; i++) {
      fullArr?.push({
        href: linkArr[i],
        name: nameArr[i],
      });
    }

    return fullArr;
  };

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
          <Form options={formattedOptions()} />
        </div>
      </div>
    </section>
  );
};
