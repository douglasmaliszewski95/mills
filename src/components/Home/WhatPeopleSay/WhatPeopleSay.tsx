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
        <h3 className="text-base font-normal text-orange">
          HISTÓRIAS DE SUCESSO
        </h3>
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
        <Image src={quotation} width={42} height={34} alt="Histórias de Sucesso Mills - Locação de Equipamentos e Plataforma Elevatória" />
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
          <Image src={picture} width={38} height={42} alt="avatar" />
          <div className="ml-3">
            <h5 className="text-orange font-bold">Arthur Lavieri</h5>
            <p className="text-orange">CEO da TÓPICO Locações e Equipamentos</p>
          </div>
        </div>
      </article>
    </div>
  </section>
);
