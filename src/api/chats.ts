import { basicAxios } from "./utils";

export interface ChatroomParams {
  internId: number;
  vacancyId: number;
}

export interface MessageCreate {
  roomId: number;
  content: string;
}

export const getChatroomMessagesRequest = (params: ChatroomParams) =>
  basicAxios.get("/chats", { params });

export const createNewMessageRequest = (data: MessageCreate) =>
  basicAxios.post("/chats", data);
