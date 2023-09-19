import { Section } from "@/components/shared/Section/Section";
import { SellPartsProps } from "./types";
import Button from "@/components/shared/Button/Button";
import dnaBottom from "@/assets/dna-bottom.svg";

export const SellParts: React.FC<SellPartsProps> = (props) => {
  const {
    text,
    buttonTitle = "Ver peças",
    buttonVariant = "default",
    theme = "green-800",
    href,
  } = props;
  return (
    <Section
      sectionClass={`relative bg-${theme} py-[96px] tablet:pt-8 tablet:px-4 tablet:pb-12`}
      containerClass="inline-flex items-center"
    >
      <div className="absolute right-3 overflow-hidden bottom-3">
        <img src={dnaBottom.src} className="tablet:max-w-[148%]" />
      </div>
      <div className="flex items-center tablet:flex-col tablet:gap-8 w-full">
        <h5 className="basis-1/2 text-white text-2xl pr-12 tablet:pr-4 font-semibold tablet:text-base">
          {text}
        </h5>
        <div className="basis-1/2 w-full flex justify-center">
          <div className="tablet:w-full">
            <a href={href}>
              <Button
                className="tablet:w-full relative z-50"
                variant={buttonVariant}
              >
                <p className="font-semibold text-sm px-[96px] whitespace-nowrap tablet:w-full">
                  {buttonTitle}
                </p>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};
