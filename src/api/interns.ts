import { InternUpdateInterface } from "store/interns/types";
import { basicAxios } from "./utils";

export const getInternProfileRequest = (id: number) =>
  basicAxios.get(`/intern/${id}`);

export const updateInternProfileRequest = (
  data: InternUpdateInterface,
  id: number
) => basicAxios.put(`/intern/${id}`, data);

export const getCurrentInternReactionsRequest = () =>
  basicAxios.get("/intern/current/reactions");
