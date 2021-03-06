import * as yup from "yup";

export const signupSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    middleName: yup.string(),
    position: yup.string(),
    phone: yup.string().required(),
    password: yup.string().required(),
    birthdate: yup.date().required(),
  })
  .required();
