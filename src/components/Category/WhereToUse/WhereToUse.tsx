import { Section } from "@/components/shared/Section/Section";
import { WhereToUseProps } from "./types";
import Image from "next/image";
import verticaLines from "@/assets/light-orange-vertical-lines.png";
import { Card } from "@/components/shared/Card/Card";
import useScreenWidth from "@/services/hooks/useScreenWidth";

export const WhereToUse: React.FC<WhereToUseProps> = (props) => {
  const { title, descriptions, segments } = props;
  const { isDesktop } = useScreenWidth();

  return (
    <Section
      sectionClass="bg-gray-50 relative"
      containerClass="py-[88px] tablet:px-4 tablet:py-6"
    >
      {isDesktop && (
        <img
          src={verticaLines.src}
          alt="Linhas verticais laranja claro"
          className="absolute right-0 top-3"
        />
      )}
      <h3 className="text-green-800 font-semibold text-2xl mb-[26px] tablet:text-base">
        {title}
      </h3>
      {isDesktop ? (
        descriptions.map((description, index) => (
          <p key={index} className="text-green-800 text-lg">
            {description}
            {index < descriptions.length - 1 && <br />}
          </p>
        ))
      ) : (
        <p className="text-green-800 text-xs">{descriptions.join(" ")}</p>
      )}
      <div className="flex gap-2 mt-[45px] tablet:flex-col">
        {segments.map((segment) => (
          <Card key={segment.id} {...segment} />
        ))}
      </div>
    </Section>
  );
};
