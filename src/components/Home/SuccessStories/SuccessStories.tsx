import Button from "@/components/shared/Button/Button";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { SuccessStoriesProps } from "./types";

export const SuccessStories: React.FC<SuccessStoriesProps> = (props) => {
  const { isMobile } = useScreenWidth();
  const { stories, successHistoryTexts, theme } = props;

  return (
    <section className="flex justify-center pb-28 pt-20 tablet:py-0 font-ibm-font tablet:flex-col tablet:py-6">
      <div className="container flex tablet:flex-col tablet:items-center">
        <div className="max-w-[40%] w-full tablet:max-w-[100%] tablet:px-4">
          <h2
            className={`text-2xl ${
              theme === "rentalLight" ? " text-orange-500" : "text-green-800"
            } font-semibold mb-4 tablet:text-lg`}
          >
            {successHistoryTexts?.title}
          </h2>
          <p className="text-lg text-green-800 mb-9 tablet:text-xs max-w-[90%] tablet:max-w-full">
            {successHistoryTexts?.text}
          </p>
          <a className="max-w-[264px]" href={successHistoryTexts?.hrefButton}>
            <Button
              className="max-w-[264px] py-2 w-full tablet:hidden"
              size="large"
            >
              {successHistoryTexts?.buttonText}
            </Button>
          </a>
        </div>
        <div className="max-w-[60%] w-full tablet:max-w-[275px]">
          <Carousel
            className="tablet:max-w-[100%] tablet:px-4 tablet:mb-8"
            spacing={isMobile ? "-20" : "-40"}
          >
            {stories &&
              stories.map(({ image, alt, name, occupation, article }) => (
                <div key={name}>
                  <div className="flex gap-5 tablet:flex-col tablet:items-center">
                    <img
                      src={image}
                      alt={alt}
                      className={`mt-3 ${
                        isMobile ? "h-[91px] w-[91px]" : "h-[131px] w-[131px]"
                      }`}
                    />
                    <div className="tablet:text-center">
                      <p className="text-green-800 font-semibold mb-2 ">
                        {name}
                      </p>
                      <p className="text-sm text-green-800 mb-4">
                        <i>{occupation}</i>
                      </p>
                      <article className="text-gray-300 tablet:text-xs max-w-[75%] tablet:max-w-full">
                        {article}
                      </article>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
      <a
        className="max-w-[full] desktop:hidden px-8"
        href={successHistoryTexts.hrefButton}
      >
        <Button className="desktop:hidden my-8 w-full">
          {successHistoryTexts?.buttonText}
        </Button>
      </a>
    </section>
  );
};
