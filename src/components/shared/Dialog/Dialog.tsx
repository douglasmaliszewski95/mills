import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import play from "@/assets/play-ico.svg";

const MainDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="flex flex-col justify-center items-center text-white gap-4 text-2xl">
        <Image src={play} width={73} height={73} alt="logo" />
        Conheça a nova Mills
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black opacity-60 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] p-[25px] focus:outline-none w-3/5 h-2/3">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/GdefdcwzelY"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="grtyoutube-iframe"
        ></iframe>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default MainDialog;
