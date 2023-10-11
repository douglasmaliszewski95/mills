import { PostCard } from "./PostCard/PostCard";
import Image from "next/image";
import bgUp from "@/assets/img/bgUp.png";
import Button from "@/components/shared/Button/Button";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { useRouter } from "next/router";
import { PostCardProps } from "./PostCard/types";
import { HtmlRenderer } from "@/components/HtmlRender/htmlRender";

interface TrendingInformationProps {
  millsMagazine: {
    text?: string;
    title?: string;
    posts?: PostCardProps[];
    href?: string;
    buttonTitle?: string;
  };
  theme?: "rentalLight" | "rentalHeavy";
}

export const TrendingInformation = ({
  millsMagazine,
  theme = "rentalLight",
}: TrendingInformationProps) => {
  const { isMobile } = useScreenWidth();
  const router = useRouter();

  return (
    <section
      className={`relative flex flex-col items-center h-[506px]  ${
        theme === "rentalLight" ? "bg-orange-500" : "bg-green-800"
      }  tablet:h-full`}
    >
      <div className="flex justify-between items-center container w-full pt-20 pb-12 font-ibm-font tablet:flex-col tablet:py-6">
        <div className="flex flex-col gap-6 w-full tablet:pl-4">
          <h3 className="text-white text-2xl whitespace-pre-line font-semibold tablet:text-lg w">
            {millsMagazine?.title}
          </h3>
          <p className="text-white text-lg whitespace-pre-line tablet:text-xs">
            {millsMagazine?.text}
          </p>
          <a href={millsMagazine?.href ?? "#"}>
            <Button
              variant={`${theme === "rentalLight" ? "inverted" : "default"}`}
              size="large"
              className="relative z-10 tablet:hidden"
            >
              {millsMagazine?.buttonTitle ?? "Ver publicações"}
            </Button>
          </a>
        </div>
        <div className="w-[60%] mb-10 tablet:w-[100%] tablet:mt-3 tablet:pl-2">
          <div className="tablet:w-[285px]">
            <Carousel
              slidesToScroll={isMobile ? 1 : 3}
              className="flex w-full"
              slidesToShow={isMobile ? 1 : 3}
              darkOrangeDot
            >
              {millsMagazine?.posts?.map((post, index) => (
                <PostCard key={index} {...post} theme={theme} />
              ))}
            </Carousel>
          </div>
        </div>
        <a className="" href={millsMagazine?.href}>
        <Button
          variant="inverted"
          size="large"
          className="relative z-index-1 mt-6 desktop:hidden"
        >
           {millsMagazine?.buttonTitle}
        </Button>
        </a>
        <Image
          src={bgUp}
          alt="background"
          className="absolute left-[151px] bottom-3 tablet:hidden"
        />
      </div>
    </section>
  );
};
