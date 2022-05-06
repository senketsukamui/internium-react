import { getCompanyVacanciesRequest } from "api/companies";
import { makeAutoObservable, toJS } from "mobx";
import { VacancyModel } from "store/vacancies/types";

class CompaniesStore {
  public loading: boolean = false;
  public vacancies: VacancyModel[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get companyVacancies() {
    return toJS(this.vacancies);
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
}

export default new CompaniesStore();
