import { emailRegex, nameRegex } from "@/utils/regex";
import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .matches(nameRegex, "Nome inválido")
    .required("Campo obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .matches(emailRegex, "E-mail inválido")
    .required("Campo obrigatório"),
});
