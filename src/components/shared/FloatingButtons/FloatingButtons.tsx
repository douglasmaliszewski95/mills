import Image from "next/image";
import React from "react";
import phone from "@/assets/phone-ico.svg";
import whats from "@/assets/whatsapp.svg";

export const FloatingButtons: React.FC = () => (
  <div className="flex flex-col gap-5 fixed z-50 bottom-8 tablet:bottom-[160px] right-8 tablet:right-4">
    <a className="bg-orange-500 p-4 rounded-full shadow-slate-50 cursor-pointer">
      <Image src={phone} width={28} height={28} alt="phone" />
    </a>
    <a className="bg-[#25D366] p-4 rounded-full shadow-slate-50 cursor-pointer">
      <Image src={whats} width={28} height={28} alt="phone" />
    </a>
  </div>
);
