import {
  createVacancyRequest,
  getVacanciesRequest,
  getVacancyRequest,
} from "api/vacancies";
import { makeAutoObservable } from "mobx";
import { Vacancy, VacancyModel } from "./types";

class VacanciesStore {
  public loading: boolean = false;
  public vacancies: VacancyModel[] = [];
  public vacancy: VacancyModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public getVacancy(id: number) {
    this.loading = true;
    return getVacancyRequest(id).then(({ data }: { data: VacancyModel }) => {
      this.loading = false;
    });
  }

  public getVacancies() {
    this.loading = true;
    return getVacanciesRequest().then(({ data }: { data: VacancyModel[] }) => {
      this.loading = false;
      this.vacancies = data;
    });
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
}

export default new VacanciesStore();
