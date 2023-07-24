import React from "react";
import Image from "next/image";
import Background from "@/assets/img/people-say.png";
import quotation from "@/assets/quotation.svg";
import picture from "@/assets/img/picture.jpg";
import Button from "@/components/shared/Button/Button";

export const WhatPeopleSay = () => (
  <section
    className="justify-center flex text-black flex-wrap tablet:justify-center bg-no-repeat bg-center bg-cover"
    style={{ backgroundImage: `url(${Background.src})` }}
  >
    <div className="flex content-center flex-row flex-wrap gap-20 pt-28 pb-20 items-center tablet:justify-center tablet:mx-8">
      <div>
        <h4 className="text-base font-normal text-orange">
          HISTÓRIAS DE SUCESSO
        </h4>
        <p className="text-4xl font-semibold text-green-800">
          O que os clientes dizem
          <br /> sobre a Mills - Locação
          <br /> de Equipamentos e<br /> Plataformas Elevatórias
        </p>
        <Button size="small" className="mt-2">
          Conheça algumas histórias
        </Button>
      </div>
      <article>
        <img className="w-[42px] h-[34px]" src={quotation} alt="quotation" />
        <p className="font-semibold text-green-800 italic mt-5">
          Com o crescimento das nossas operações em todo o Brasil,
          <br />
          precisávamos de um parceiro de qualidade e alcance nacional,
          <br /> capaz de compreender as nossas exigências no quesito
          <br /> segurança e manutenção. Encontramos na Mills esta parceria e
          <br />
          continuamos a expandir.
        </p>
        <div className="flex mt-7">
          <img className="w-[38px] h-[42px]" src={picture.src} alt="avatar" />
          <div className="ml-3">
            <h5 className="text-orange font-bold">Arthur Lavieri</h5>
            <p className="text-orange">CEO da TÓPICO Locações e Equipamentos</p>
          </div>
        </div>
      </article>
    </div>
  </section>
);
