import * as yup from "yup";

export const schema = yup.object({
  motivo: yup.string().required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  ddd: yup.string().required("Campo obrigatório"),
  telephone: yup.string().required("Campo obrigatório")
})