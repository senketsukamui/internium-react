import * as yup from "yup";

export const vacancySchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    location: yup.string().required(),
  })
  .required();

export enum PaidStatuses {
  PAID = "Оплачиваемая",
  NOT_PAID = "Неоплачиваемая",
  NOT_STATED = "Не указано",
}

export enum LocationStatuses {
  REMOTE = "Удалённая",
  HYBRID = "Гибридная",
  NOT_REMOTE = "Неудалённая",
}
