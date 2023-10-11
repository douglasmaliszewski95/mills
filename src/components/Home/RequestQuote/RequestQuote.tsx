import Button from "@/components/shared/Button/Button";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { Input } from "../../shared/Input/Input";
import { useForm } from "react-hook-form";
import { NumberInput } from "../NumberInput/NumberInput";
import { places, timeStamps, timeStampsHeavy } from "./utils";
// import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";
import { useRouter } from "next/router";
import { getCurrentTheme } from "@/utils/theme";
import { useEffect, useState } from "react";

export const RequestQuote: React.FC = () => {
  // const { equipmentFormList } = useGetCMSShared();
  const router = useRouter();
  const [theme, setTheme] = useState<string>();
  const { handleSubmit, watch, setValue, register } = useForm<FormInputs>({
    defaultValues: {
      local: "",
      dateType: "",
      quantity: 0,
    },
  });

  useEffect(() => {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
  }, []);

  const onSubmit = (data: FormInputs) => {
    router.push({
      pathname: theme === "rentalLight" ? "/plataformas-elevatorias/busca" : "/maquinas-pesadas/busca",
      query: {
        localUtility: data.local,
        days: data.quantity,
        dateType: data.dateType
      }
    });
    if (disableButton()) return;
    return console.log(data);
  };

  const disableButton = () => {
    const local = watch("local");
    const dateType = watch("dateType");
    const quantity = watch("quantity");

    if (local !== "" && dateType !== "" && quantity !== 0) return true;
    return false;
  };

  return (
    <div className="flex w-full justify-center z-[2px] absolute mb-[-60px] tablet:mt-0 tablet:mr-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container max-w-[1170px] bg-white rounded py-6 px-[52px] flex gap-10 items-center shadow-xl font-ibm-font ml-[-25px] tablet:flex-col tablet:ml-[0px] tablet:px-4"
      >
        <div className="basis-5/12 tablet:w-full">
          {/* <p className="text-sm text-green-800 mb-3">
            Qual o local de utilização?
          </p>
          <InputSelector
            name="local"
            watch={watch}
            options={equipmentFormList}
            setValue={setValue}
            placeholder="Selecione onde você irá utilizar o equipamento"
          /> */}
          <Input
            label="Qual o local de utilização?"
            color="green"
            placeholder="Selecione onde você irá utilizar o equipamento"
            name="local"
            register={register}
            className="pr-3 w-full text-green-800 text-sm"
          />
        </div>
        <div className="basis-4/12  tablet:basis-full tablet:w-full">
          <p className="text-sm text-green-800 mb-3">
            Por quanto tempo você gostaria de alugar?
          </p>
          <div className="flex gap-5 ">
            <NumberInput
              value={watch("quantity")}
              setValue={(value) => setValue("quantity", value)}
            />
            <InputSelector
              name="dateType"
              watch={watch}
              options={theme === "rentalLight" ? timeStamps : timeStampsHeavy}
              setValue={setValue}
              placeholder={theme === "rentalLight" ? "Dias" : "Meses"}
            />
          </div>
        </div>
        <div className="basis-3/12 tablet:w-full tablet:mt-[-10px]">
          <Button
            className={`w-full ${!disableButton() ? "bg-orange-500/25" : "bg-orange-500"
              }`}
            id="Solicitar Orçamento Plataformas2"
            size="large"
            disabled={disableButton()}
          >
            Solicitar orçamento
          </Button>
        </div>
      </form>
    </div>
  );
};
