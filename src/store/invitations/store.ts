import {
  acceptVacancyInvitationRequest,
  createVacancyInvitationRequest,
  rejectVacancyInvitationRequest,
  revokeVacancyInvitationRequest,
} from "api/invitations";
import { VacancyInvitation } from "api/types";
import { makeAutoObservable } from "mobx";
import InternsStore from "../interns/store";

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
      const invitations = InternsStore.getInvitations;
      InternsStore.invitations = invitations.map((invitation) => {
        if (invitation.id === id) {
          return { ...invitation, rejected: true };
        }
        return invitation;
      });
    });
  };

  public acceptVacancyInvitation = (id: number) => {
    this.loading = true;
    return acceptVacancyInvitationRequest(id).then(() => {
      this.loading = false;
      const invitations = InternsStore.getInvitations;
      InternsStore.invitations = invitations.map((invitation) => {
        if (invitation.id === id) {
          return { ...invitation, accepted: true };
        }
        return invitation;
      });
    });
  };
}

export default new InvitationsStore();
