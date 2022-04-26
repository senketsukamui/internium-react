import { basicAxios, mainAxios } from "./utils";

export const getSpecializationsRequest = () =>
  basicAxios.get("/specializations");

export const getSpecializationRequest = (id: number) =>
  basicAxios.get(`/specializations/${id}`);
