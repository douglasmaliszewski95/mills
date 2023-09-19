import { ImageCardsProps } from "./types";

export const ImageCards: React.FC<
  ImageCardsProps
> = ({
  img,
  headerText,
  textCards,
  orientation = "default"
}) => {
    return (
      <section className={`flex justify-center h-[500px] ${orientation === "default" ? "bg-green-800" : "bg-gray-30" } tablet:h-auto`}>
        <div className={`flex justify-between ${orientation === "default" ? "flex-row-reverse" : ""} container tablet:flex-col-reverse`}>
          <div
            className={`flex flex-col pt-10 gap-10 w-1/2 tablet:w-full tablet:px-4 tablet:pt-6 tablet:pb-9`}
          >
            <h3 className={`font-semibold text-2xl ${orientation === "default" ? "text-white" : "text-green-800"} tablet:text-base`}>
              {headerText}
            </h3>
            <div className="flex flex-wrap gap-2">
              {textCards?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center rounded bg-white max-w-[386px] py-3 px-9 font-semibold tablet:w-full tablet:text-xs tablet:justify-center"
                  >
                    <p className="text-left text-green-800 tablet:text-[10px] tablet:text-center">
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${img})`,
            }}
            className={`flex justify-center bg-no-repeat bg-cover w-[564px] tablet:w-full tablet:h-[300px] tablet:flex-col`}
          />
        </div>
      </section>
    );
  };
