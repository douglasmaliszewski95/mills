import useScreenWidth from "@/services/hooks/useScreenWidth";
import Button from "../Button/Button";
import { Section } from "../Section/Section";
import banner from "@/assets/img/mills-personnel.jpg";

export const ExpertRecommendation: React.FC = () => {
  const { isMobile } = useScreenWidth();

  return (
    <Section
      backgroundImage={banner.src}
      sectionClass="bg-cover bg-no-repeat"
      containerClass="py-[66px] tablet:px-4 tablet:pb-6 tablet:pt-25 h-fit"
    >
      <h2 className="text-white text-2xl font-semibold mb-6 tablet:text-base tablet:mb-[18px]">
        Ainda tem dúvidas sobre qual é o <br />
        equipamento mais indicado para sua demanda?
      </h2>
      <Button className="tablet:w-full">
        <p className="text-sm font-semibold px-[40px]">
          Fale com um especialista
        </p>
      </Button>
    </Section>
  );
};
