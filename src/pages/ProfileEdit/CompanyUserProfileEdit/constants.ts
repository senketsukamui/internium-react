import * as yup from "yup";

export const companyUserUpdateSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  middleName: yup.string(),
  position: yup.string().required(),
  phone: yup.string().required(),
  birthdate: yup.string().required(),
});
