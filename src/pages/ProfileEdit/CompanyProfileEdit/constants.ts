import * as yup from "yup";

export const companyUpdateSchema = yup.object().shape({
  city: yup.string().required(),
  description: yup.string().required(),
  shortDescription: yup.string().required(),
  website: yup.string().required(),
});
