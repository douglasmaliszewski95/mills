import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail incorreto").required("Campo obrigatório"),
  ddd: yup.string().required("Campo obrigatório"),
  telephone: yup.string().required("Campo obrigatório")
});
