import {
  getCompanyUserProfileRequest,
  updateCompanyUserProfileRequest,
} from "api/company-users";
import { CompanyUserUpdateInterface } from "api/types";
import { makeAutoObservable, toJS } from "mobx";
import { CompanyUserModel } from "./types";

class CompanyUsersStore {
  public loading: boolean = false;
  public profile: CompanyUserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getProfile() {
    return toJS(this.profile);
  }

  public getCompanyUserProfile = (id: number) => {
    this.loading = true;
    return getCompanyUserProfileRequest(id).then(
      ({ data }: { data: CompanyUserModel }) => {
        this.loading = false;
        this.profile = data;
      }
    );
  };

  public updateCompanyUserProfile(data: CompanyUserUpdateInterface, id: number) {
    this.loading = true;
    return updateCompanyUserProfileRequest(data, id).then(
      ({ data }: { data: CompanyUserModel }) => {
        this.loading = false;
        this.profile = data;
      }
    );
  }
}

export default new CompanyUsersStore();
