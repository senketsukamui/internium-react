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
      console.log(data);
      this.loading = false;
    });
  }

  public deleteReaction(vacancyId: number) {
    this.loading = true;
    return deleteReactionRequest({ vacancyId }).then(({ data }) => {
      this.loading = false;
    });
  }

  public getReactions(vacancyId: number) {
    this.loading = true;
    return getReactionsRequest({ vacancyId }).then(({ data }) => {
      this.loading = false;
    });
  }
}

export default new ReactionStore();
