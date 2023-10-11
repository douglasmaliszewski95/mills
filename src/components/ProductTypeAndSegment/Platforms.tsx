import { PlatformsProps } from "./types";
import Button from "../shared/Button/Button";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";

interface CardItemProps {
  image: string;
  headerText: string;
  order: number;
  imageMobile: string;
  buttonText: string;
  link: string;
}

export const Platforms: React.FC<PlatformsProps> = ({
  bgColor = "bg-white",
}) => {
  const { allPlatformsWeHave } = useGetCMSShared();

  return (
    <section className={`flex justify-center text-green-800 ${bgColor}`}>
      <div className="flex justify-between container tablet:flex-col">
        <div className="flex flex-col py-16 tablet:pt-4 pb-8 tablet:px-4">
          <h3 className="font-semibold text-2xl tablet:text-base tablet:w-full">
            {allPlatformsWeHave?.headerText}
          </h3>
          <div className="flex flex-wrap gap-5 mt-16 tablet:mt-6 tablet:gap-2">
            {allPlatformsWeHave?.cards?.map(
              (cardItem: CardItemProps, index: number) => {
                return (
                  <div
                    key={index}
                    style={{ backgroundImage: `url(${cardItem.image})` }}
                    className="flex flex-col text-white justify-center bg-no-repeat bg-cover items-center w-[377px] h-[345px] rounded-lg tablet:w-full tablet:h-[264px]"
                  >
                    <div className="flex w-full h-full bg-gray-25 py-8 px-3 rounded-lg">
                      <div className="flex flex-col justify-end items-center w-full">
                        <div>
                          <h4 className="font-semibold text-xl w-[218px] text-center tablet:text-base">
                            {cardItem.headerText}
                          </h4>
                          <a href={cardItem.link ?? "#"}>
                            <Button
                              className="w-full max-w-[265px] mt-16 tablet:mt-9"
                              size="large"
                            >
                              {cardItem?.buttonText}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
