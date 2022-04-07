import * as yup from "yup";

export enum AuthorizationStatuses {
  PHONE,
  OTP,
  INFO,
}

export const signupSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    middleName: yup.string(),
    email: yup.string().required(),
    birthdate: yup.date().required(),
    gender: yup.boolean().required(),
  })
  .required();
