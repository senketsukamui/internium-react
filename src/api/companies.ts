import { basicAxios } from "./utils";

export const getCompanyVacanciesRequest = (id: number) =>
  basicAxios.get(`/companies/${id}/vacancies`);
