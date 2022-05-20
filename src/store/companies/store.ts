import {
  deleteCompanyLogoRequest,
  getCompanyProfile,
  getCompanyVacanciesRequest,
  updateCompanyLogoRequest,
  updateCompanyProfileRequest,
} from "api/companies";
import { CompanyUpdateInterface } from "api/types";
import { makeAutoObservable, toJS } from "mobx";
import { VacancyModel } from "store/vacancies/types";
import { CompanyModel } from "./types";

class CompaniesStore {
  public loading: boolean = false;
  public vacancies: VacancyModel[] | null = null;
  public profile: CompanyModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get companyVacancies() {
    return toJS(this.vacancies);
  }

  get companyProfile() {
    return toJS(this.profile);
  }

  public getCompanyVacancies(id: number) {
    this.loading = true;
    return getCompanyVacanciesRequest(id).then(
      ({ data }: { data: { vacancies: VacancyModel[] } }) => {
        this.loading = false;
        this.vacancies = data.vacancies;
      }
    );
  }

  public getCompanyProfile(id: number) {
    this.loading = true;
    return getCompanyProfile(id).then(({ data }) => {
      this.loading = false;
      this.profile = data;
    });
  }

  public updateCompanyProfile(data: CompanyUpdateInterface, id: number) {
    this.loading = true;
    return updateCompanyProfileRequest(data, id).then(
      ({ data }: { data: CompanyModel }) => {
        this.loading = false;
        this.profile = data;
      }
    );
  }

  public deleteCompanyLogo(id: number) {
    this.loading = true;
    return deleteCompanyLogoRequest(id).then(() => {
      this.loading = false;
    });
  }

  public updateCompanyLogo(id: number, file: File) {
    this.loading = true;
    const formData = new FormData();
    formData.append("file", file);
    return updateCompanyLogoRequest(formData, id).then(() => {
      this.loading = false;
    });
  }
}

export default new CompaniesStore();
