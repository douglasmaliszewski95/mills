import React from "react";
import Image from "next/image";
import { personIco } from "@/assets";
import { PersonIcon } from "@radix-ui/react-icons";
import * as Menubar from "@radix-ui/react-menubar";
import * as Avatar from "@radix-ui/react-avatar";
import Button from "../Button/Button";
import { PersonIco } from "@/assets/PersonIco";

export const LoginButton = () => {
  return (
    <Menubar.Root className="flex tablet:hidden">
      <Menubar.Menu>
        <Menubar.Trigger className="cursor-pointer tablet:hidden">
          <PersonIco color="white" width="16" height="16" />
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="flex flex-col items-center gap-3 bg-white py-4 px-5 shadow rounded-b"
            sideOffset={41}
            alignOffset={-100}
          >
            <Avatar.Root className="bg-green-800 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <Image src={personIco} width={21} height={21} alt="person" />
            </Avatar.Root>

            <p className=" text-green-800 text-xs font-normal">
              Olá, acesse o Portal do Cliente
            </p>
            <a href="https://cliente.mills.com.br/" className="w-44">
              <Button className="w-44">Fazer login</Button>
            </a>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};
