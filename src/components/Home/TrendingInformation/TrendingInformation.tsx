import { PostCard } from "./PostCard/PostCard";
import Image from "next/image";
import bgUp from "@/assets/img/bgUp.png";
import Button from "@/components/shared/Button/Button";
import { Carousel } from "@/components/shared/Carousel/Carousel";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { posts } from "./utils";

export const TrendingInformation: React.FC = () => {
  const { isMobile } = useScreenWidth();

  return (
    <section className="relative flex flex-col items-center h-[506px] bg-orange-500 tablet:h-full">
      <div className="flex justify-between items-center container w-full pt-20 pb-12 font-ibm-font tablet:flex-col tablet:py-6">
        <div className="flex flex-col gap-6 w-full tablet:pl-4">
          <p className="text-white text-2xl font-semibold tablet:text-lg">
            Conheça a uP, <br /> a Revista Digital da Mills
          </p>
          <p className="text-white text-lg tablet:text-xs">
            Fique por dentro de tudo o que acontece no
            <br className="desktop:hidden" /> mercado e receba conteúdo gratuito
            sobre
            <br className="desktop:hidden" /> novidades e tendências
          </p>
          <Button
            variant="inverted"
            size="large"
            className="relative z-index-1 tablet:hidden"
          >
            Ver publicações
          </Button>
        </div>
        <div className="w-[60%] mb-10 tablet:w-[100%] tablet:mt-3 tablet:pl-2">
          <div className="tablet:w-[285px]">
            <Carousel
              slidesToScroll={isMobile ? 1 : 3}
              className="flex"
              slidesToShow={isMobile ? 1 : 3}
              darkOrangeDot
            >
              {posts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </Carousel>
          </div>
        </div>
        <Button
          variant="inverted"
          size="large"
          className="relative z-index-1 mt-6 desktop:hidden"
        >
          Ver publicações
        </Button>
        <img
          src={bgUp.src}
          alt="background"
          className="absolute left-[151px] bottom-3 tablet:hidden"
        />
      </div>
    </section>
  );
};
