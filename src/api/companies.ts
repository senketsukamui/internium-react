import { basicAxios } from "./utils";

export const getCompanyVacanciesRequest = (id: number) =>
  basicAxios.get(`/companies/${id}/vacancies`);

export const getCompanyProfile = (id: number) =>
  basicAxios.get(`/companies/${id}`);
