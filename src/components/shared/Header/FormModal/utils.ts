import * as yup from "yup";
import { phoneNumberRegex } from "@/utils/regex";

export const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail inválido"),
  phone: yup
    .string()
    .required("Campo obrigatório")
    .test("isValidNumber", "Número inválido", function (value) {
      return phoneNumberRegex.test(value);
    }),
  comment: yup.string(),
});
