import { basicAxios } from "./utils";

interface ReactionActionInterface {
  vacancyId: number;
}

export const createReactionRequest = (data: ReactionActionInterface) =>
  basicAxios.post("/reactions", data);

export const deleteReactionRequest = (data: ReactionActionInterface) =>
  basicAxios.post(`/reactions/${data.vacancyId}/revoke`, { data });

export const acceptReactionRequest = (id: number) =>
  basicAxios.post(`/reactions/${id}/accept`);

export const rejectReactionRequest = (id: number) =>
  basicAxios.post(`/reactions/${id}/reject`);

export const getReactionsRequest = (params: string) =>
  basicAxios.get(`/reactions?${params}`);
