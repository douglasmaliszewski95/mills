import { Section } from "@/components/shared/Section/Section";
import { ApplicationsProps } from "./types";
import { getImageSrc } from "@/utils/images";
import { useRouter } from "next/router";

export const Applications: React.FC<ApplicationsProps> = (props) => {
  const { title, cards } = props;
  const router = useRouter();

  return (
    <Section sectionClass="bg-beige-200 pt-12 pb-[68px] tablet:pb-8 tablet:pt-6 tablet:px-4">
      <h3 className="text-green-800 text-2xl font-semibold mb-10 tablet:mb-5 tablet:text-base">
        {title ?? null}
      </h3>
      <div className="flex tablet:flex-col gap-5 tablet:gap-4 h-full">
        {cards.map(({ fields }, index) => (
          <a
            key={index}
            href={`${router.asPath}${fields?.href_attribute}` ?? ""}
            className="cursor-pointer basis-1/3 tablet:basis-0 bg-no-repeat bg-cover rounded-lg h-[318px] aspect-square"
            style={{ backgroundImage: `url(${getImageSrc(fields)})` }}
          >
            <div className="aspect-square w-full h-full bg-black/50 flex items-center rounded-lg justify-center tablet:h-[242px]">
              <h6 className="text-white font-semibold text-xl tablet:text-sm">
                {fields?.content_title}
              </h6>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};
