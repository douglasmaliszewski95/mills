import Image from "next/image";
import Button from "../shared/Button/Button";
import bgImg from "@/assets/img/WhyRestAerialPlatformsBg.png";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const WhyRestAerialPlatforms: React.FC<any> = ({
  headerText,
  whyList,
}) => {
  const { isMobile } = useScreenWidth();
  return (
    <section
      className="flex justify-center h-full text-green-800 bg-white bg-no-repeat bg-right-top"
      style={{ backgroundImage: isMobile ? "" : `url(${bgImg.src})` }}
    >
      <div className="flex justify-between container tablet:flex-col">
        <div
          className={`flex flex-col py-20 gap-10 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9`}
        >
          <h3 className="font-semibold text-2xl max-w-[459px] tablet:text-base">
            {headerText}
          </h3>
          <div className="flex flex-wrap gap-2">
            {whyList?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 w-[370px]"
                >
                  <Image alt="icon" src={item.icon} width={56} height={56} />
                  <h3 className="text-green-800">
                    <b>{item.header}</b>
                  </h3>
                  <p className="text-center font-normal">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
