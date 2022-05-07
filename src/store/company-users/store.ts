import { getCompanyProfile, getCompanyVacanciesRequest } from "api/companies";
import { getCompanyUserProfileRequest } from "api/company-users";
import { makeAutoObservable, toJS } from "mobx";

class CompanyUsersStore {
  public loading: boolean = false;
  public profile = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getProfile() {
    return toJS(this.profile);
  }

  public getCompanyUserProfile = (id: number) => {
    this.loading = true;
    return getCompanyUserProfileRequest(id).then(({ data }) => {
      this.loading = false;
      this.profile = data;
    });
  };
}

export default new CompanyUsersStore();
