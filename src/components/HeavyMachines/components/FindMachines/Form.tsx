import Button from "@/components/shared/Button/Button";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionsType, formType } from "./types";
import { useRouter } from "next/router";

export const Form: React.FC<formType> = (props) => {
  const { options } = props;
  const { register, handleSubmit, setValue, getValues, watch } = useForm<any>();
  const router = useRouter();

  const onSubmit: SubmitHandler<optionsType> = (data) => {
    options?.map((option: optionsType) => {
      if (option.name === data.name) router.push(option.href);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow gap-10 mb-12 font-ibm-font tablet:flex-col tablet:mb-5"
    >
      <div className="grow max-w-[389px]">
        <label className="desktop:hidden text-xs text-white">
          Qual é a categoria do seu trabalho ?
        </label>
        <InputSelector
          name="name"
          watch={watch}
          placeholder="Selecione o tipo de máquina"
          setValue={setValue}
          theme="rentalHeavy"
          className="text-white"
          options={options.map((option: optionsType) => option.name)}
        />
      </div>
      <div className="flex items-end">
        <Button size="large" type="submit" className="h-fit tablet:w-full">
          Ver modelos
        </Button>
      </div>
    </form>
  );
};
