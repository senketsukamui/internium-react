import { getCompanyUserProfileRequest } from "api/company-users";
import {
  getCurrentInternReactionsRequest,
  getInternProfileRequest,
  updateInternProfileRequest,
} from "api/interns";
import { makeAutoObservable, toJS } from "mobx";
import { InternUpdateInterface } from "./types";
import AuthStore from "../auth";

class InternsStore {
  public loading: boolean = false;
  public profile = null;
  public reactions = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getProfile() {
    return toJS(this.profile);
  }

  get getReactions() {
    return toJS(this.reactions);
  }

  public getInternProfile = (id: number) => {
    this.loading = true;
    return getInternProfileRequest(id).then(({ data }) => {
      this.loading = false;
      this.profile = data;
    });
  };

  public updateInternProfile = (data: InternUpdateInterface, id: number) => {
    this.loading = true;
    return updateInternProfileRequest(data, id).then(({ data }) => {
      this.loading = false;
      AuthStore.user = data;
    });
  };

  public getCurrentInternReactions = () => {
    this.loading = true;
    return getCurrentInternReactionsRequest().then(({ data }) => {
      this.reactions = data.reactions;
      this.loading = false;
    });
  };
}

export default new InternsStore();
