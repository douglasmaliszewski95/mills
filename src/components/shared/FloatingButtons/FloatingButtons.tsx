import Image from "next/image";
import React from "react";
import phone from "@/assets/phone-ico.svg";
import whats from "@/assets/whats-ico.svg";

export const FloatingButtons: React.FC = () => (
  <div className="flex gap-8 fixed z-50 top-3/4 right-3">
    <a className="bg-orange p-4 rounded-full shadow-slate-50">
      <Image src={phone} width={28} height={28} alt="phone" />
    </a>
    <a className="bg-[#25D366] p-4 rounded-full shadow-slate-50">
      <Image src={whats} width={28} height={28} alt="phone" />
    </a>
  </div>
);
