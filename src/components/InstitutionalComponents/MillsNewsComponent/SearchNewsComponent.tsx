import { Section } from "@/components/shared/Section/Section";

export const SearchNewsComponent = ({inputValue, onClick, setInputValue}: any) => {
  return (
    <Section sectionClass="bg-beige-200 tablet:px-4">
      <div className="w-full py-6 flex flex-row tablet:flex-col tablet:gap-6 gap-8" >
        <input
          placeholder="Busque por palavra-chave ou ano"
          type="text"
          value={inputValue}
          minLength={3}
          onChange={(e) => setInputValue(e.target.value)}
          className="tablet:w-full bg-beige-200 border-b-[0.5px] border-green-800/50 outline-none placeholder:font-normal placeholder:text-green-800/50 placeholder:text-base w-[75%]"
        />
        <button onClick={(inputValue) => onClick(inputValue)} className="tablet:w-full bg-orange-500 w-[25%] rounded-3xl h-[37px] text-white text-sm font-semibold">
          Buscar
        </button>
      </div>
    </Section>
  );
};
