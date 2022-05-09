import { CompanyUserUpdateInterface } from "./types";
import { basicAxios } from "./utils";

export const getCompanyUserProfileRequest = (id: number) =>
  basicAxios.get(`/company-users/${id}`);

export const updateCompanyUserProfileRequest = (
  data: CompanyUserUpdateInterface,
  id: number
) => basicAxios.put(`/company-users/${id}`, data);
