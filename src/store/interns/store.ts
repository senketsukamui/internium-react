import { getCompanyUserProfileRequest } from "api/company-users";
import { getInternProfileRequest } from "api/interns";
import { makeAutoObservable, toJS } from "mobx";

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
}

export default new InternsStore();
