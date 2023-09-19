import Button from "@/components/shared/Button/Button";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { useForm, SubmitHandler } from "react-hook-form";

export const Form: React.FC = () => {
  const { register, handleSubmit, setValue, getValues, watch } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => data;

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
          name="machine"
          watch={watch}
          placeholder="Selecione o tipo de máquina"
          setValue={setValue}
          theme="rentalHeavy"
          className="text-white"
          options={[
            "Retroescavadeira",
            "Pá Carregadeira",
            "Escavadeira",
            "Motoniveladora",
            "Rolo Compactador",
            "Minicarregadeira",
            "Tratos de Esteiras",
          ]}
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
