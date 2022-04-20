import * as yup from "yup";

export enum RegisterTypes {
  COMPANY = "COMPANY",
  COMPANY_USER = "COMPANY_USER",
  INTERN = "INTERN",
}

export const SCHEMAS = {
  [RegisterTypes.STUDENT]: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    birthDate: yup.date().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
  }),
};
