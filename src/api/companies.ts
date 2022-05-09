import { CompanyUpdateInterface } from "./types";
import { basicAxios } from "./utils";

export const getCompanyVacanciesRequest = (id: number) =>
  basicAxios.get(`/companies/${id}/vacancies`);

export const getCompanyProfile = (id: number) =>
  basicAxios.get(`/companies/${id}`);

export const updateCompanyProfileRequest = (
  data: CompanyUpdateInterface,
  id: number
) => basicAxios.put(`/companies/${id}`, data);
