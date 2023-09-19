import { ImageCMS } from "@/types";
import { Section } from "../Section/Section";
import { TrainingsProps } from "./types";
import { getImageSrc } from "@/utils/images";
import Button from "../Button/Button";

export const Trainings: React.FC<TrainingsProps> = (props) => {
  const { cards } = props;

  return (
    <Section containerClass="pt-8 pb-12 tablet:px-4 tablet:pt-6 tablet:pb-8">
      <h5 className="text-2xl tablet:text-base tablet:pr-10 text-green-800 font-semibold mb-6">
        Outros treinamentos oferecidos pelas Mills:
      </h5>
      <div className="flex flex-col gap-6">
        {cards?.map((image: ImageCMS) => (
          <div
            key={image?.description}
            className="w-full border-[1px] border-opacity-40 border-green-800 gap-12 tablet:gap-6 rounded-xl flex tablet:flex-col"
          >
            <img
              src={getImageSrc(image?.fields)}
              alt={image?.fields?.alt_attribute ?? ""}
              className="basis-1/2 tablet:basis-0 tablet:rounded-t-xl"
            />
            <div className="basis-1/2 tablet:basis-0 flex flex-col justify-center tablet:px-4">
              <h6 className="text-lg tablet:text-sm text-green-800 font-semibold mb-4">
                {image?.fields?.content_title}
              </h6>
              <p className="text-sm tablet:text-xs text-green-800 mb-6">
                {image?.fields?.content_subtitle}
              </p>
              <p className="text-green-800 mb-8 tablet:mb-6 tablet:text-sm">
                <b>{image?.fields?.content_text?.split(":")?.[0]}:</b>
                {image?.fields?.content_text?.split(":")?.[1]}
              </p>
              <Button className="max-w-[50%] tablet:max-w-full tablet:mb-6">
                <p className="font-semibold text-sm">Incluir no orçamento</p>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
