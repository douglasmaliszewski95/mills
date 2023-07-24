import { Carousel } from "@/components/shared/Carousel/Carousel";
import Button from "@/components/shared/Button/Button";
import { NextArrow, PrevArrow } from "./Arrows";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { BannerCarouselProps } from "./types";

export const BannerCarousel: React.FC<BannerCarouselProps> = (props) => {
  const { banners } = props;
  const { isMobile } = useScreenWidth();
  return (
    <div className="tablet:mt-[275px]">
      <Carousel
        spacing={isMobile ? "30" : "80"}
        nextArrow={
          <NextArrow
            width={isMobile ? 20 : undefined}
            customProps="tablet:right-4"
          />
        }
        prevArrow={!isMobile && <PrevArrow width={isMobile ? 20 : undefined} />}
      >
        {banners &&
          banners.map(({ src, title, buttonTitle, id, srcMobile }) => (
            <div key={id}>
              <div
                style={{
                  backgroundImage: `url(${isMobile ? srcMobile : src})`,
                }}
                className="flex justify-center bg-no-repeat bg-cover font-ibm-font tablet:bg-center tablet:bg-cover"
              >
                <div className="bg-gradient-to-t from-black to-transparent w-full flex justify-center">
                  <div className="container">
                    <div className="flex flex-col items-center justify-center h-[440px] px-20 tablet:px-4 tablet:h-[350px]">
                      <div className="tablet:pt-11">
                        <h1 className="text-4xl font-semibold text-white mb-9 tablet:text-base">
                          {title}
                        </h1>
                        <Button
                          className="max-w-[248px] w-full tablet:max-w-full"
                          size="large"
                        >
                          {buttonTitle}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};
