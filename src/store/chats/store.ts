import {
  ChatroomParams,
  createNewMessageRequest,
  getChatroomMessagesRequest,
  MessageCreate,
} from "api/chats";
import { makeAutoObservable } from "mobx";
import { Message } from "./types";

class ChatsStore {
  loading: boolean = false;
  messages: Message[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public getChatroomMessages = (params: ChatroomParams) => {
    this.loading = true;
    return getChatroomMessagesRequest(params).then(
      ({ data }: { data: Message[] }) => {
        this.loading = false;
        this.messages = data;
      }
    );
  };

  public createChatroomMessage = (data: MessageCreate) => {
    this.loading = true;
    return createNewMessageRequest(data).then(({ data }: { data: Message }) => {
      this.loading = false;
      console.log(data);
    });
  };
}

export default new ChatsStore();
