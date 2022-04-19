import * as yup from "yup";

export const registerSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().required(),
    city: yup.string().required(),
    password: yup.string().required(),
    tin: yup.string().required(),
  })
  .required();
