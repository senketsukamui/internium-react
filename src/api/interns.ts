import { basicAxios } from "./utils";

export const getInternProfileRequest = (id: number) =>
  basicAxios.get(`/intern/${id}`);
