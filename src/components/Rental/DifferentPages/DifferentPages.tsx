import { Section } from "@/components/shared/Section/Section";
import { DifferentPagesProps } from "./types";
import { getImageSrc } from "@/utils/images";
import { ImageCMS } from "@/types";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const DifferentPages: React.FC<DifferentPagesProps> = (props) => {
  const { cards } = props;
  const { isMobile } = useScreenWidth();

  return (
    <Section containerClass="flex gap-5 tablet:gap-3 py-16 tablet:flex-col tablet:py-8 tablet:px-4">
      {cards.map((image: ImageCMS) => (
        <div key={image.name} className="w-full h-full">
          <a href={image?.fields?.href_attribute ?? "#"}>
            <div
              style={{ backgroundImage: `url(${getImageSrc(image.fields)})` }}
              className="h-[476px] tablet:h-[272px] relative w-full bg-no-repeat bg-cover rounded-t-lg tablet:rounded flex items-end justify-center"
            >
              <div
                className={`absolute bottom-0 h-full w-full ${
                  isMobile
                    ? "bg-black/60"
                    : "bg-gradient-to-b from-transparent to-black"
                } tablet:rounded`}
              ></div>
              <h6 className="text-white text-2xl tablet:text-xl font-semibold pb-24 text-center relative z-50 px-12 tablet:px-7">
                {image?.fields?.content_title}
              </h6>
            </div>
          </a>
        </div>
      ))}
    </Section>
  );
};
