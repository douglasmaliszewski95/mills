import React from "react";
import { SteppersProps } from "./types";

export const Steppers: React.FC<SteppersProps> = ({ steps }) => {
  const mobileStep = steps.filter((item) => item.activeMobile === true);
  return (
    <>
      <div className="flex item-center justify-center align-middle">
        {steps.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-3">
              <div
                className={`flex items-center justify-center rounded-full h-11 w-11 text-white text-2xl ${
                  item.active ? "bg-green-800" : "bg-green-800/30"
                }`}
              >
                {item.step}
              </div>
              <p
                className={`w-[204px] text-center ${
                  item.active ? "text-green-800" : "text-green-800/30"
                } tablet:w-[30px] tablet:hidden`}
              >
                {item.text}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="block mt-5 w-[220px] mx-[-80px] tablet:w-[35px] tablet:flex tablet:mx-auto">
                <hr
                  className={`h-[2px] w-[220px] ${
                    item.active ? "bg-green-800" : "bg-green-800/30"
                  } tablet:w-[50px]`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {mobileStep[0] && (
        <p className="max-w-[203px] text-center mt-6 desktop:hidden">
          {mobileStep[0].text}
        </p>
      )}
    </>
  );
};
