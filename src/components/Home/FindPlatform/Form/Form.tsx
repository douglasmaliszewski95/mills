import Button from "@/components/shared/Button/Button";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { useForm, SubmitHandler } from "react-hook-form";
import { FindPlatformInputs } from "./types";

export const Form: React.FC = () => {
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<FindPlatformInputs>();

  const onSubmit: SubmitHandler<FindPlatformInputs> = (data) => data;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow gap-10 mb-12 font-ibm-font tablet:flex-col tablet:mb-5"
    >
      <div className="grow">
        <p className="text-sm text-green-800 mb-3">
          Qual a altura do trabalho?
        </p>
        <InputSelector
          name="height"
          watch={watch}
          placeholder="Selecione uma altura"
          setValue={setValue}
          options={["5 metros", "10 metros", "20 metros"]}
        />
      </div>
      <div className="grow groundTypeClass">
        <p className="text-sm text-green-800 mb-3">Qual o tipo de terreno?</p>
        <InputSelector
          name="groundType"
          placeholder="Selecione um terreno"
          watch={watch}
          setValue={setValue}
          options={["Meses", "Anos"]}
        />
      </div>
      <div className="grow">
        <p className="text-sm text-green-800 mb-3">Qual o tipo de ambiente?</p>
        <InputSelector
          name="enviromentType"
          watch={watch}
          placeholder="Selecione um ambiente"
          setValue={setValue}
          options={["Meses", "Anos"]}
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
