import chevronDown from "@/assets/chevron-down.svg";
import chevronUp from "@/assets/chevron-up.svg";
import Image from "next/image";
import { useState } from "react";
import parse from 'html-react-parser';
import { SectionTextProps } from "./types";

export const SectionText: React.FC<SectionTextProps> = (props) => {
  const { title, text } = props;

  const [isOpen, setIsOpen] = useState(false);

  const change = () => {
    setIsOpen(isOpen ? false : true)
  };

  return (
    <section>
      <div className="font-ibm-font py-7">
        <div className="flex pb-5">
          <p className="text-green-800 font-bold text-2xl">
            {title}
          </p>
          <div className="pl-2 flex cursor-pointer">
            {isOpen ? (
              <Image src={chevronUp} alt="Seta apontando para cima" onClick={change} />
            ) : (
              <Image src={chevronDown} alt="Seta apontando para baixo" onClick={change} />
            )}
          </div>
        </div>
        <div className={isOpen ? "hidden" : "block"}>
          {parse(text)}
        </div>
      </div>
    </section>
  );
};