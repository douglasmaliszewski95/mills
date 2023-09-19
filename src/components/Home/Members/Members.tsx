import React from "react";
import { members } from "./utils";

import Background from "@/assets/img/home-members.png";
import Button from "@/components/shared/Button/Button";

export const Members = () => (
  <div
    className="justify-center flex text-black flex-wrap tablet:justify-center bg-no-repeat bg-center bg-cover"
    style={{ backgroundImage: `url(${Background.src})` }}
  >
    <div className="flex content-center flex-col flex-wrap gap-8 pt-28 pb-20 items-center tablet:justify-center tablet:mx-8">
      <h4 className="text-5xl font-semibold text-white">
        Estamos sempre presentes
      </h4>
      <div className="flex flex-wrap gap-11 justify-center max-w-5xl">
        {members.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-center whitespace-pre-line"
            >
              <p className="text-7xl font-semibold text-white">
                + {item.count}
              </p>
              <p className="text-base text-white text-center whitespace-pre-line">
                {item.text}
              </p>
              <Button variant="outlined" className="mt-6">
                {item?.buttonText}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
