import { getImageSrc } from "@/utils/images";
import { SimpleBannerProps } from "./types";
import Button from "../shared/Button/Button";

export const SimpleBanner: React.FC<SimpleBannerProps> = (props) => {
  const { banner, textWidth = 35 } = props;

  return (
    <section
      className="bg-no-repeat bg-cover bg-center h-full"
      style={{ backgroundImage: `url(${getImageSrc(banner?.fields)})` }}
    >
      <div className="py-16 tablet:pb-6 tablet:pt-[120px] w-full h-full bg-black/60 flex justify-center">
        <div className="container tablet:px-4">
          <h3
            className={`text-white text-2xl tablet:text-base font-semibold max-w-[${textWidth}%] tablet:max-w-[96%] mb-7 tablet:mb-6`}
          >
            {banner?.fields?.content_title}
          </h3>
          <a href={banner?.fields?.href_attribute ?? "#"}>
            <Button className="max-w-[20%] w-full tablet:max-w-full">
              <p className="text-sm font-semibold">
                {banner?.fields?.buttonText ?? "Buscar equipamentos"}
              </p>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
