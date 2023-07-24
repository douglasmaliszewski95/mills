import React from "react";
import Image from "next/image";
import logo from "@/assets/mills-slogan-ico.svg";

import Background from "@/assets/img/meetMillsBg.png";
import MainDialog from "@/components/shared/Dialog/Dialog";

export const MeetMills = () => (
  <div
    className="justify-center flex text-black flex-wrap tablet:justify-center bg-no-repeat bg-center bg-orange"
    style={{ backgroundImage: `url(${Background.src})` }}
  >
    <div className="flex content-center flex-col flex-wrap gap-8 pt-28 pb-20 tablet:justify-center tablet:mx-8">
      <img
        src={logo}
        width={200}
        height={123}
        alt="logo"
        className="w-[200px] h-[123px]"
      />
      <MainDialog />
    </div>
  </div>
);
