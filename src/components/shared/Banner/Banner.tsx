import Link from "next/link";
import { BannerProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const Banner: React.FC<BannerProps> = (props) => {
  const {
    breadcrumb,
    title,
    backgroundImage,
    blur = "",
    linkList,
    height,
    subTitle,
    buttonLink = "",
    buttonTitle = "",
    width = "w-full",
  } = props;

  const { isMobile } = useScreenWidth();

  return (
    <section className="flex justify-center text-white">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="flex bg-no-repeat bg-cover w-full tablet:flex-col tablet:py-0"
      >
        <div
          className={`flex justify-center items-center flex-col bg-black/60 w-full h-60 ${
            height ? `tablet:h-[${height}]` : "tablet:h-40"
          }`}
        >
          <div className="container justify-start tablet:flex-col tablet:px-4">
            <ul className="flex gap-1 text-white mb-4 tablet:mb-6">
              {linkList?.map((link: any, index: number) => (
                <li key={link.name} className="flex gap-1 tablet:text-[10px]">
                  <Link href={link?.href || ""}>{link?.name}</Link>
                  {index < linkList.length - 1 && <p> {">"} </p>}
                </li>
              ))}
            </ul>

            {subTitle && (
              <h4 className="text-base tablet:text-xs tablet:font-normal mb-4">
                {subTitle}
              </h4>
            )}

            <h1
              className={`mb-6 text-white text-3xl ${width} tablet:font-bold tablet:w-full font-bold tablet:text-lg`}
            >
              {title ?? null}
            </h1>
            {buttonLink && buttonTitle && !isMobile && (
              <a
                href={buttonLink}
                className="text-sm bg-orange-500 rounded-3xl py-2 px-24 text-white font-semibold"
              >
                {buttonTitle}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
