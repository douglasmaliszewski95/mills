import { useForm } from "react-hook-form";
import { FormProps, RequestQuoteFormType } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./utils";
import { Input } from "@/components/shared/Input/Input";
import Button from "@/components/shared/Button/Button";

export const Form: React.FC<FormProps> = (props) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RequestQuoteFormType>({
    resolver: yupResolver<RequestQuoteFormType>(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nome*"
        placeholder="Insira seu nome"
        name="name"
        error={errors.name}
        register={register}
        color="green"
        marginOnError
      />
      <Input
        label="Email*"
        placeholder="Insira seu email"
        name="email"
        error={errors.email}
        register={register}
        color="green"
        marginOnError
      />
      <Input
        label="Telefone*"
        placeholder="(00) 00000 0000"
        mask="(99) 99999 9999"
        name="phone"
        error={errors.phone}
        register={register}
        color="green"
        marginOnError
      />
      <Input
        label="Comentário"
        placeholder="Deixe aqui um comentário"
        name="comment"
        error={errors.comment}
        register={register}
        color="green"
        marginOnError
      />
      <Button size="full">Enviar</Button>
    </form>
  );
};
