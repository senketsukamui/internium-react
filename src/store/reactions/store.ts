import {
  createReactionRequest,
  deleteReactionRequest,
  getReactionsRequest,
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

  public getReactions(reactionId: string) {
    this.loading = true;
    return getReactionsRequest({ reactionId }).then(({ data }) => {
      this.loading = false;
    });
  }
}

export default new ReactionStore();
