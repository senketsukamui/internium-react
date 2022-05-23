import {
  acceptReactionRequest,
  createReactionRequest,
  deleteReactionRequest,
  getReactionsRequest,
  rejectReactionRequest,
} from "api/reactions";
import { makeAutoObservable, toJS } from "mobx";
import { Reaction } from "./types";

class ReactionStore {
  loading: boolean = false;
  reactions: Reaction[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getReactionsValue() {
    return toJS(this.reactions);
  }

  public createReaction(vacancyId: number) {
    this.loading = true;
    return createReactionRequest({ vacancyId }).then(({ data }) => {
      this.loading = false;
    });
  }

  public deleteReaction(reactionId: number) {
    this.loading = true;
    return deleteReactionRequest({ reactionId }).then(() => {
      this.loading = false;
      this.reactions = this.reactions!.map((reaction) => {
        if (reaction.id === reactionId) {
          return { ...reaction, archived: true };
        }
      });
    });
  }

  public acceptReaction(id: number) {
    this.loading = true;
    return acceptReactionRequest(id).then(() => {
      this.loading = false;
      this.reactions = this.reactions!.map((reaction) => {
        if (reaction.id === reactionId) {
          return { ...reaction, accepted: true };
        }
      });
    });
  }

  public rejectReaction(id: number) {
    this.loading = true;
    return rejectReactionRequest(id).then(() => {
      this.loading = false;
      this.reactions = this.reactions!.map((reaction) => {
        if (reaction.id === reactionId) {
          return { ...reaction, rejected: true };
        }
      });
    });
  }
}

export default new ReactionStore();
