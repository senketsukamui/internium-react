import { VacancyInvitation } from "./types";
import { basicAxios } from "./utils";

export const createVacancyInvitationRequest = (data: VacancyInvitation) =>
  basicAxios.post("/vacancy-invitations", data);

export const revokeVacancyInvitationRequest = (id: number) =>
  basicAxios.post(`/vacancy-invitations/${id}/revoke`);

export const rejectVacancyInvitationRequest = (id: number) =>
  basicAxios.post(`/vacancy-invitations/${id}/reject`);

export const acceptVacancyInvitationRequest = (id: number) =>
  basicAxios.post(`/vacancy-invitations/${id}/accept`);
