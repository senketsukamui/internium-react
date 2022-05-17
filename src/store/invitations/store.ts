import {
  createVacancyInvitationRequest,
  rejectVacancyInvitationRequest,
  revokeVacancyInvitationRequest,
} from "api/invitations";
import { VacancyInvitation } from "api/types";
import { makeAutoObservable } from "mobx";

class InvitationsStore {
  public loading: boolean = false;
  public profile = null;

  constructor() {
    makeAutoObservable(this);
  }

  public createVacancyInvitation = (data: VacancyInvitation) => {
    this.loading = true;
    return createVacancyInvitationRequest(data).then(() => {
      this.loading = false;
    });
  };

  public revokeVacancyInvitation = (id: number) => {
    this.loading = true;
    return revokeVacancyInvitationRequest(id).then(() => {
      this.loading = false;
    });
  };

  public rejectVacancyInvitation = (id: number) => {
    this.loading = true;
    return rejectVacancyInvitationRequest(id).then(() => {
      this.loading = false;
    });
  };
}

export default new InvitationsStore();
