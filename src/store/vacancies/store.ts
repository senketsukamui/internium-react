import { createVacancyRequest, getVacancyRequest } from "api/vacancies";
import { makeAutoObservable } from "mobx";
import { Vacancy, VacancyModel } from "./types";

class VacanciesStore {
  public loading: boolean = false;
  public vacancies: VacancyModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public getVacancy(id: number) {
    this.loading = true;
    return getVacancyRequest(id).then(({ data }: { data: VacancyModel }) => {
      this.loading = false;
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
