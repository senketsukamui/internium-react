import {
  createVacancyRequest,
  getVacanciesRequest,
  getVacancyRequest,
  updateVacancyRequest,
} from "api/vacancies";
import { makeAutoObservable, toJS } from "mobx";
import { Vacancy, VacancyModel } from "./types";

class VacanciesStore {
  public loading: boolean = false;
  public vacancies: VacancyModel[] = [];
  public vacancy: VacancyModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getVacancyValue() {
    return toJS(this.vacancy);
  }

  get getVacanciesValue() {
    return toJS(this.vacancies);
  }

  public getVacancy(id: number) {
    this.loading = true;
    return getVacancyRequest(id).then(({ data }: { data: VacancyModel }) => {
      this.vacancy = data;
      this.loading = false;
    });
  }

  public getVacancies(params: string) {
    this.loading = true;
    return getVacanciesRequest(params).then(
      ({ data }: { data: { vacancies: VacancyModel[] } }) => {
        this.loading = false;
        this.vacancies = data.vacancies;
      }
    );
  }

  public createVacancy(data: Vacancy) {
    this.loading = true;
    return createVacancyRequest(data).then(
      ({ data }: { data: VacancyModel }) => {
        this.loading = false;
        this.vacancies.push(data);
      }
    );
  }

  public updateVacancy(data: Vacancy, id: number) {
    this.loading = true;
    return updateVacancyRequest(data, id).then(
      ({ data }: { data: VacancyModel }) => {
        this.loading = false;
        this.vacancy = data;
      }
    );
  }
}

export default new VacanciesStore();
