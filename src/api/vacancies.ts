import { Vacancy, VacancyAnnouncement } from "store/vacancies/types";
import { basicAxios, mainAxios } from "./utils";

export const getVacancyRequest = (id: number) =>
  basicAxios.get(`/vacancies/${id}`);

export const getVacanciesRequest = (params: string) =>
  basicAxios.get(`/vacancies/?${params}`);

export const getVacancyInvitationsRequest = (id: number) =>
  basicAxios.get(`/vacancies/${id}/invitations`);

export const getVacancyReactionsRequest = (id: number) =>
  basicAxios.get(`/vacancies/${id}/reactions`);

export const createVacancyRequest = (data: Vacancy) =>
  basicAxios.post("/vacancies", data);

export const updateVacancyRequest = (data: Vacancy, id: number) =>
  basicAxios.put(`/vacancies/${id}`, data);

export const makeVacancyAnnouncementRequest = (data: VacancyAnnouncement) =>
  basicAxios.post("/vacancy-announcements", data);
