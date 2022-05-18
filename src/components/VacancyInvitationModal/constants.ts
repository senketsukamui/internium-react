import * as yup from "yup";

export const invitationSchema = yup
  .object()
  .shape({
    vacancyId: yup.number().nullable().required(),
    message: yup.string().required(),
  })
  .required();
