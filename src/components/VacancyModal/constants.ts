import * as yup from "yup";

export enum PaidStatuses {
  PAID = "PAID",
  NOT_PAID = "NOT_PAID",
  NOT_STATED = "NOT_STATED",
}

export const PaidStatusesTranslations = {
  [PaidStatuses.PAID]: "Оплачиваемая",
  [PaidStatuses.NOT_PAID]: "Неоплачиваемая",
  [PaidStatuses.NOT_STATED]: "Не указано",
};

export enum LocationStatuses {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  NOT_REMOTE = "NOT_REMOTE",
}

export const LocationStatusesTranslations = {
  [LocationStatuses.REMOTE]: "Удалённо",
  [LocationStatuses.HYBRID]: "Гибридный",
  [LocationStatuses.NOT_REMOTE]: "Неудалённо",
};

export const vacancySchema = yup
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
