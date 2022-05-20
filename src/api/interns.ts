import { InternUpdateInterface } from "store/interns/types";
import { basicAxios } from "./utils";

export const getInternProfileRequest = (id: number) =>
  basicAxios.get(`/interns/${id}`);

export const updateInternProfileRequest = (
  data: InternUpdateInterface,
  id: number
) => basicAxios.put(`/interns/${id}`, data);

export const getCurrentInternReactionsRequest = () =>
  basicAxios.get("/interns/current/reactions");

export const getCurrentInternInvitationsRequest = () =>
  basicAxios.get("/interns/current/invitations");

export const getInternsListRequest = (params: string) =>
  basicAxios.get(`/interns/?${params}`);
