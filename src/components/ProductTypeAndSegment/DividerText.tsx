import Button from "../shared/Button/Button";
import { DividerTextProps } from "./types";
import barsBg from "@/assets/img/barsBgDown.png";

export const DividerText: React.FC<DividerTextProps> = ({ text }) => {
  return (
    <section
      className="flex justify-center text-white bg-green-800 bg-no-repeat bg-right-bottom tablet:px-4"
      style={{ backgroundImage: `url(${barsBg.src})` }}
    >
      <div className="flex container tablet:flex-col-reverse">
        <h3 className="whitespace-pre-line font-semibold text-2xl tablet:text-base py-14 tablet:pt-8 tablet:pb-28">
          {text}
        </h3>
      </div>
    </section>
  );
};
