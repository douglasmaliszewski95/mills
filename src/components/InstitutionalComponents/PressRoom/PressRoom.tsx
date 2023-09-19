import { DnaBottom } from "@/assets/DnaBottom";
import { Section } from "@/components/shared/Section/Section";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { PressRoomProps, RoomProps } from "./types";

export const PressRoom: React.FC<PressRoomProps> = (props) => {
  const {rooms = [], title} = props;

  const {isMobile} = useScreenWidth();

  return (
    <section className="relative">
      {!isMobile && 
      <div className="absolute bottom-1 right-3">
        <DnaBottom color="white" />
      </div>
}
      <Section sectionClass="bg-beige-200" containerClass="py-12 tablet:py-8 tablet:px-4">
        <div className="text-green-800">
          <h1 className="text-2xl font-semibold tablet:text-base">{title}</h1>
          <div className="flex flex-row gap-6 tablet:gap-2 tablet:flex-col">
            {rooms.map((item: RoomProps, index: number) => {
              return (
                <div className={`text-green-800 text-sm ${index === 0 && 'tablet:border-b-[1px] tablet:border-beige-500/75 tablet:pb-6'}`} key={index}>
                  <h1 className="my-4">{item.title}</h1>
                  <h2 className="font-semibold">{item.name}</h2>
                  <h3>{item.email}</h3>
                  <p>{item.phone}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </section>
  );
};
