import { basicAxios } from "./utils";

export const getCompanyUserProfileRequest = (id: number) =>
  basicAxios.get(`/company-users/${id}`);
