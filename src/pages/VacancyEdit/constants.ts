import { PaidStatuses } from "components/VacancyModal/constants";
import * as yup from "yup";

export const vacancyEditSchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    location: yup.string().required(),
    paid: yup.string().required(),
    salary: yup.number().when("paid", {
      is: PaidStatuses.PAID,
      then: yup.number().required("Пожалуйста введите зарплату"),
    }),
  })
  .required();
