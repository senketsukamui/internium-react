import {
  createVacancyRequest,
  getVacanciesRequest,
  getVacancyInvitationsRequest,
  getVacancyReactionsRequest,
  getVacancyRequest,
  makeVacancyAnnouncementRequest,
  updateVacancyRequest,
} from "api/vacancies";
import { makeAutoObservable, toJS } from "mobx";
import { Vacancy, VacancyAnnouncement, VacancyModel } from "./types";

class VacanciesStore {
  public loading: boolean = false;
  public vacancies: VacancyModel[] = [];
  public vacancy: VacancyModel | null = null;
  public reactions = null;
  public invitations = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getInvitations() {
    return toJS(this.invitations);
  }

  get getReactions() {
    return toJS(this.reactions);
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

  public getVacancyInvitations(id: number) {
    this.loading = true;
    return getVacancyInvitationsRequest(id).then(({ data }: { data: any }) => {
      this.loading = false;
      this.invitations = data.invitations;
    });
  }

  public getVacancyReactions(id: number) {
    this.loading = true;
    return getVacancyReactionsRequest(id).then(({ data }: { data: any }) => {
      this.loading = false;
      this.reactions = data.reactions;
    });
  }

  public makeVacancyAnnouncement(data: VacancyAnnouncement) {
    this.loading = true;
    return makeVacancyAnnouncementRequest(data).then(() => {
      this.loading = false;
    });
  }
}

export default new VacanciesStore();
