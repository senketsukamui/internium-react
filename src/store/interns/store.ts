import { getCompanyUserProfileRequest } from "api/company-users";
import { getInternProfileRequest, updateInternProfileRequest } from "api/interns";
import { makeAutoObservable, toJS } from "mobx";
import { InternUpdateInterface } from "./types";

class InternsStore {
  public loading: boolean = false;
  public profile = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getProfile() {
    return toJS(this.profile);
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
    });
  };
}

export default new InternsStore();
