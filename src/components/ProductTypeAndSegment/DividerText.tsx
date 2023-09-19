import useScreenWidth from "@/services/hooks/useScreenWidth";
import { DividerTextProps } from "./types";
import barsBg from "@/assets/img/barsBgDown.png";

export const DividerText: React.FC<DividerTextProps> = ({ text }) => {
  const { isMobile } = useScreenWidth();
  return (
    <section
      className="flex justify-center text-white bg-green-800 bg-no-repeat bg-right-bottom tablet:px-4"
      style={{
        backgroundImage: `url(${barsBg.src})`,
        backgroundSize: isMobile ? "220px" : "auto",
      }}
    >
      <div className="flex container tablet:flex-col-reverse">
        <h3 className="whitespace-pre-line font-semibold text-2xl max-w-[970px] tablet:text-sm py-14 tablet:pt-8 tablet:pb-28">
          {text}
        </h3>
      </div>
    </section>
  );
};
