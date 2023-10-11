export default function MillsServices({ headerText, cardList }: any) {
  return (
    <section className="flex justify-center text-white py-12 tablet:py-6">
      <div className="flex justify-between container ">
        <div className="flex flex-col justify-center gap-8 tablet:w-full w-full">
          <h3 className="font-semibold text-green-800 text-2xl tablet:text-base tablet:px-4">
            {headerText}
          </h3>
          <div className="flex flex-row gap-2 h-[365px] overflow-auto tablet:w-full tablet:overflow-auto tablet:px-4">
            {cardList?.map((card: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex justify-center text-white bg-no-repeat bg-center rounded-lg h-[335px] w-[190px]`}
                  style={{ backgroundImage: `url(${card.bgImg})` }}
                >
                  <div className="bg-black/60 rounded-lg px-6 text-center flex items-center h-[335px] w-[190px]">
                    <p className="text-xl font-semibold tablet:text-base">
                      {card.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
