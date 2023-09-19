import Button from "@/components/shared/Button/Button";
import { InputSelector } from "@/components/shared/InputSelector/InputSelector";
import { useForm } from "react-hook-form";
import { NumberInput } from "../NumberInput/NumberInput";
import { places, timeStamps } from "./utils";
import { useGetCMSShared } from "@/services/hooks/useGetCMSShared";

export const RequestQuote: React.FC = () => {
  const { equipmentFormList } = useGetCMSShared();
  const { handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      local: "",
      dateType: "",
      quantity: 0,
    },
  });

  const onSubmit = (data: FormInputs) => {
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
    <div className="flex w-full justify-center z-10 absolute mb-[-60px] tablet:mt-0 tablet:mr-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container max-w-[1170px] bg-white rounded py-6 px-[52px] flex gap-10 items-center shadow-xl font-ibm-font ml-[-25px] tablet:flex-col tablet:ml-[0px] tablet:px-4"
      >
        <div className="basis-5/12 tablet:w-full">
          <p className="text-sm text-green-800 mb-3">
            Qual o local de utilização?
          </p>
          <InputSelector
            name="local"
            watch={watch}
            options={equipmentFormList}
            setValue={setValue}
            placeholder="Selecione onde você irá utilizar o equipamento"
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
              options={timeStamps}
              setValue={setValue}
              placeholder="Dias"
            />
          </div>
        </div>
        <div className="basis-3/12 tablet:w-full tablet:mt-[-10px]">
          <Button
            className={`w-full ${
              !disableButton() ? "bg-orange-500/25" : "bg-orange-500"
            }`}
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
