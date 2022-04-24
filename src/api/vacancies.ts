import { Vacancy } from "store/vacancies/types";
import { basicAxios, mainAxios } from "./utils";

export const getVacancyRequest = (id: number) =>
  basicAxios.get(`/vacancies/${id}`);

export const createVacancyRequest = (data: Vacancy) =>
  basicAxios.post("/vacancies", data);
