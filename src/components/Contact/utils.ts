import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail inválido"),
  telefone: yup.string().required("Campo obrigatório"),
  cnpj: yup.string().required("Campo obrigatório"),
  motivo: yup.string().required("Campo obrigatório"),
  comentarios: yup.string()
});