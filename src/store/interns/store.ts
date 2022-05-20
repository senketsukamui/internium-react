import { getCompanyUserProfileRequest } from "api/company-users";
import {
  getCurrentInternInvitationsRequest,
  getCurrentInternReactionsRequest,
  getInternProfileRequest,
  getInternsListRequest,
  updateInternProfileRequest,
} from "api/interns";
import { makeAutoObservable, toJS } from "mobx";
import { Intern, InternUpdateInterface } from "./types";
import AuthStore from "../auth";

class InternsStore {
  public loading: boolean = false;
  public profile = null;
  public reactions = null;
  public invitations = null;
  public interns: Intern[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getInvitations() {
    return toJS(this.invitations);
  }

  get getInterns() {
    return toJS(this.interns);
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

  public getInternsList = (params: string) => {
    this.loading = true;
    return getInternsListRequest(params).then(
      ({ data }: { data: { interns: Intern[] } }) => {
        this.loading = false;
        this.interns = data.interns;
      }
    );
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

  public getCurrentInternInvitations = () => {
    this.loading = true;
    return getCurrentInternInvitationsRequest().then(({ data }) => {
      this.invitations = data.invitations;
      this.loading = false;
    });
  };
}

export default new InternsStore();
