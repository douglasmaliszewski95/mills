import Button from "@/components/shared/Button/Button";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const RentalElevatingPlatforms: React.FC<any> = ({ content }) => {
  const { isMobile } = useScreenWidth();

  return (
    <section
      className="flex justify-center pb-20 pt-24 font-ibm-font bg-cover tablet:px-4 tablet:py-6 tablet:mb-0"
      style={{
        backgroundImage: isMobile
          ? `url(${content?.mobileImage})`
          : `url(${content?.image})`,
      }}
    >
      <div className="container w-full tablet:pt-52">
        <div className="max-w-[726px] tablet:max-w-full">
          <p
            className={` text-2xl font-semibold mb-6 tablet:text-lg tablet:mb-3 text-green-800`}
          >
            {content?.title}
          </p>
          <p
            className={` text-base mb-8 tablet:text-xs tablet:mb-3 text-green-800`}
          >
            {content?.description}
          </p>
          <a href={content?.href} >
          <Button
            variant={"outlined"}
            className="max-w-[264px] w-full tablet:h-[37px] tablet:max-w-full"
          >
            <p className="text-sm font-semibold">Saiba mais</p>
          </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
