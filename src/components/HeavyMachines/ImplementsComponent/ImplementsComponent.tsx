import { Section } from "@/components/shared/Section/Section";
import { ImplementsComponentProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const ImplementsComponent: React.FC<ImplementsComponentProps> = (
  props
) => {
  const { image, implementsText = [], title, orientation = 'normal'} = props;

  const { isMobile } = useScreenWidth();

  return (
    <Section
      sectionClass="bg-beige-100"
      containerClass={`flex ${orientation === 'normal' ? 'flex-row' : 'flex-row-reverse'} tablet:flex-col-reverse tablet:gap-6 gap-10`}
    >
      <div className="w-[50%] tablet:w-full text-green-800 flex flex-col justify-center tablet:px-4">
        <h1 className="text-2xl font-semibold tablet:text-base">{title}</h1>
        <div
          className={`flex ${isMobile ? "flex-col my-6" : "flex-wrap mt-6"} gap-4 `}
        >
          {implementsText.map((text: string, index: number) => (
            <div
              key={index}
              className="bg-white h-[46px] tablet:justify-center flex items-center rounded-lg px-4 tablet:text-sm"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[50%] tablet:w-full">
        <img src={image} />
      </div>
    </Section>
  );
};
