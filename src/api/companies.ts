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

export const deleteCompanyLogoRequest = (id: number) =>
  basicAxios.delete(`/companies/${id}/logo`);

export const updateCompanyLogoRequest = (formData: FormData, id: number) =>
  basicAxios.post(`/companies/${id}/logo`, formData);
