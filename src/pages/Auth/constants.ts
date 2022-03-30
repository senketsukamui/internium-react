import * as yup from "yup";

export enum RegisterTypes {
  COMPANY = "COMPANY",
  EMPLOYEE = "EMPLOYEE",
  STUDENT = "STUDENT",
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
