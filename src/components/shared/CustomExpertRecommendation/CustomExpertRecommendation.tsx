import { getImageSrc } from "@/utils/images";
import { CustomExpertRecommendationProps } from "./types";
import { TalkToSpecialistModal } from "../TalkToSpecialistModal/TalkToSpecialistModal";
import Button from "../Button/Button";

export const CustomExpertRecommendation: React.FC<
  CustomExpertRecommendationProps
> = (props) => {
  const { content } = props;

  return (
    <section
      style={{ backgroundImage: `url(${getImageSrc(content?.fields)})` }}
      className="w-full bg-no-repeat bg-cover"
    >
      <div className="w-full bg-black/30 h-full flex flex-col justify-center items-center py-[126px]">
        <div className="container">
          <h5 className="text-2xl text-white font-semibold max-w-[40%] mb-8">
            {content?.fields?.content_title}
          </h5>
          <TalkToSpecialistModal>
            <Button className="py-2 max-w-[260px]" size="large">
              Fale com um especialista
            </Button>
          </TalkToSpecialistModal>
        </div>
      </div>
    </section>
  );
};
