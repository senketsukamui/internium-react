import * as yup from "yup";

export const internUpdateSchema = yup.object().shape({
  location: yup.string().required(),
  description: yup.string().required(),
  birthdate: yup.string().required(),
  gender: yup.boolean().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  middleName: yup.string(),
});
