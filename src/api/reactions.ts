import { basicAxios } from "./utils";

interface ReactionActionInterface {
  vacancyId: number;
}

export const createReactionRequest = (data: ReactionActionInterface) =>
  basicAxios.post("/reactions", data);

export const deleteReactionRequest = (data: ReactionActionInterface) =>
  basicAxios.post(`/reactions/${data.vacancyId}/revoke`, { data });

export const getReactionsRequest = (params: string) =>
  basicAxios.get(`/reactions?${params}`);
