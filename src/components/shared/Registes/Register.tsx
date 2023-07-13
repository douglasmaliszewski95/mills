import Image from "next/image";
import React from "react";
import mail from "@/assets/mail-ico.svg";
import { Input } from "../Input/Input";
import Button from "../Button/Button";

export const Register: React.FC = () => (
  <div className="py-8 bg-brown-100 justify-center flex text-green-800 flex-wrap tablet:justify-center">
    <div className="flex flex-col content-center tablet:justify-center tablet:mx-8">
      <div className="flex items-start flex-wrap tablet:flex-col">
        <div className="flex mr-16 gap-4 tablet:mb-5">
          <Image src={mail} width={37} height={28} alt="logo" />
          <h2 className="text-xl font-semibold">
            Quer receber conteúdos exclusivos?
            <br /> Inscreva-se na nossa newsletter
          </h2>
        </div>
        <form>
          <div className="flex gap-6 mb-4 tablet:flex-col">
            <Input placeholder="Insira seu nome" />
            <Input placeholder="Insira seu e-mail" type="email" />
            <Button className="w-44">Cadastrar</Button>
          </div>
          <p className="text-xs font-normal">
            Estes dados serão utilizados de acordo com nossa{" "}
            <a href="#">Política de Privacidade e Cookies</a>
          </p>
        </form>
      </div>
    </div>
  </div>
);
