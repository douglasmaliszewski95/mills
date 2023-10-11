import { CheckBorder } from "@/assets/CheckBorder";

import { Section } from "../Section/Section";
import { TrainingMenuProps } from "./types";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { UnCheckBorder } from "@/assets/UnCheckBorder";

export const TrainingMenu: React.FC<TrainingMenuProps> = (props) => {
  const {
    menu: { fields },
  } = props;

  const { isMobile } = useScreenWidth();

  const thClass =
    "text-green-800 text-lg font-normal font-ibm-font tablet:text-xs tablet:text-left";

  return (
    <Section sectionClass="bg-beige-200 py-8">
      <h3 className="text-green-800 text-2xl tablet:px-4 tablet:text-base font-semibold mb-8 tablet:mb-6">
        {fields?.title}
      </h3>
      <div className="w-full tablet:px-4">
        <table className="w-full bg-white rounded">
          <thead>
            <tr className="flex justify-between pl-6 tablet:pl-4 tablet:pr-5 pt-5 pb-3 border-b-[1px] mb-5">
              <th className={thClass}>{fields?.subtitle?.[0]}</th>
              <div className="flex gap-[60px] pr-24 tablet:pr-0 tablet:gap-8">
                <th className={thClass}>
                  {isMobile ? "Outros" : "Outros treinamentos"}
                </th>
                <th className={thClass}>
                  {isMobile ? "Treinamento" : "Treinamento Mills"}
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            {fields?.text_field?.map((text: string) => (
              <tr className="flex justify-between tablet:gap-2" key={text}>
                <td className="pl-6 tablet:pl-4 font-semibold text-lg tablet:text-xs text-green-800 font-ibm-font pb-8">
                  {text}
                </td>
                <td className="flex pr-[152px] tablet:pr-10 gap-[184px] tablet:gap-[52px] h-10 items-center">
                  <UnCheckBorder />
                  <CheckBorder />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};
