import Button from "@/components/shared/Button/Button";
import { Input } from "@/components/shared/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./utils";
import { NewsletterFormProps, NewsletterFormType } from "./types";

export const NewsletterForm: React.FC<NewsletterFormProps> = (props) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormType>({
    resolver: yupResolver<NewsletterFormType>(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full gap-8 items-end tablet:flex-col"
    >
      <Input
        label="Nome"
        placeholder="Insira seu nome"
        name="name"
        error={errors.name}
        className="grow w-full"
        register={register}
      />
      <Input
        label="E-mail"
        placeholder="Insira seu email"
        name="email"
        error={errors.email}
        className="grow w-full"
        register={register}
      />
      <div className="grow w-full">
        <Button className="w-full" size="small">
          Cadastrar
        </Button>
      </div>
    </form>
  );
};
